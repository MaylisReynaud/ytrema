const client = require("./client");

const photoDataMapper = require("./photoDataMapper");

const projectDataMapper = {
    async createProject(projectInfo, id) {
        const {
            name,
            status,
            personal_notes,
            photo,
            fabrics,
            haberdasheries,
            patterns,
        } = projectInfo;

        // 1/ CALCULATE THE PROJECT'S COST OF PRODUCTION AND THE COSTS BY ARTICLE
        let projectCost = 0;

        // Cost of fabric used
        fabrics.map((el) => {
            const { fabric_price: price, fabric_used_size: used } = el;

            // Article's cost
            el.article_cost = Number(((used * price) / 100).toFixed(2));

            // Add to production cost
            projectCost += el.article_cost;
        });

        // Cost of haberdashery used
        haberdasheries.map((el) => {
            const {
                haberdashery_is_cut: isCut,
                haberdashery_is_a_set: isASet,
                haberdashery_article_qty: article_qty,
                haberdashery_size: size,
                haberdashery_price: price,
                haberdashery_used_size: used,
            } = el;

            if (!isCut && !isASet) {
                // Article's cost
                el.article_cost = Number((used * price).toFixed(2));
            }

            if (!isCut && isASet) {
                // Article's cost
                el.article_cost = Number(
                    ((used * price) / article_qty).toFixed(2)
                );
            }

            if (isCut) {
                // Article's cost
                el.article_cost = Number(((used * price) / size).toFixed(2));
            }

            // Add to production cost
            projectCost += el.article_cost;
        });

        // Cost of pattern used
        patterns.map((el) => {
            const { pattern_price: price } = el;

            // Article's cost
            el.article_cost = Number(price);

            // Add to production cost
            projectCost += el.article_cost;
        });

        // Add the cost of production to projectInfo
        projectInfo.cost_price = Number(projectCost.toFixed(2));

        // 2/ SAVE THE PROJECT AND GET ITS ID
        // Query to create project in DB
        let query = {
            text: `INSERT INTO "project"("name", "cost_price", "status", "member_id") VALUES($1, $2, $3, $4) RETURNING id`,
            values: [name, projectInfo.cost_price, status, id],
        };

        // Send query to DB
        const createdProjectResult = await client.query(query);

        // Get request result
        const { rows: createdProject } = createdProjectResult;

        // Get project ID
        const { id: projectId } = createdProject[0];

        // Query to save project's photo in DB
        query = {
            text: `INSERT INTO "photo"("photo", "personal_notes", "project_id") VALUES($1, $2, $3)`,
            values: [photo, personal_notes, projectId],
        };

        // Query to send when any photo isn't sent
        !photo &&
            (query = {
                text: `INSERT INTO "photo"("personal_notes", "project_id") VALUES($1, $2)`,
                values: [personal_notes, projectId],
            });

        // Send query to DB
        await client.query(query);

        // 3/ UPDATE STOCK OF FABRICS AND HABERDASHERIES AND ADD THEM IN THE TABLES OF ASSOCIATION
        // Add in project_has_fabric and update stock in fabric
        fabrics.map(
            async ({ fabric_id: id, fabric_used_size: used, article_cost }) => {
                await client.query(
                    `INSERT INTO "project_has_fabric"("project_id", "fabric_id", "used_size", "article_cost") VALUES ($1, $2, $3, $4)`,
                    [projectId, id, used, article_cost]
                );

                await client.query(
                    `UPDATE "fabric" SET "stock_qty" = ("stock_qty"::numeric - $2::numeric) WHERE "id" = $1`,
                    [id, used]
                );
            }
        );

        // Add in project_has_haberdashery and update stock in haberdashery
        haberdasheries.map(
            async ({
                haberdashery_id: id,
                haberdashery_used_size: used,
                article_cost,
            }) => {
                await client.query(
                    `INSERT INTO "project_has_haberdashery"("project_id", "haberdashery_id", "used_size", "article_cost") VALUES ($1, $2, $3, $4)`,
                    [projectId, id, used, article_cost]
                );

                await client.query(
                    `UPDATE "haberdashery" SET "stock_qty" = ("stock_qty"::numeric - $2::numeric) WHERE id = $1`,
                    [id, used]
                );
            }
        );

        // Add in project_has_pattern
        patterns.map(async ({ pattern_id: id, article_cost }) => {
            await client.query(
                `INSERT INTO "project_has_pattern" ("project_id", "pattern_id", "article_cost") VALUES ($1, $2, $3)`,
                [projectId, id, article_cost]
            );
        });

        // 4/ RETRIEVE NEW CREATED PROJECT
        const newCreatedProject = await this.getProjectById(id, projectId);

        return newCreatedProject;
    },

    async addNewFabric(fabricInfoToAdd, projectId, id) {
        // project info to add
        const {
            fabric_id: fabricId,
            fabric_price: price,
            fabric_used_size: used,
        } = fabricInfoToAdd;

        // Check if this project belongs to this member
        const existingProject =
            await photoDataMapper.doesThisProjectBelongToThisMember(
                projectId,
                id
            );

        if (!existingProject) {
            return null;
        }

        // Check if this fabric belongs to this member
        let query = {
            text: `SELECT * FROM "fabric" WHERE "id" = $1 AND "member_id" = $2`,
            values: [fabricId, id],
        };

        // Send query to DB
        const doesThisFabricBelongToThisMember = await client.query(query);

        // This fabric has not been found  --error404
        if (doesThisFabricBelongToThisMember == 0) {
            return null;
        }

        // Check if this project already has this fabric
        query = {
            text: `SELECT * FROM "project_has_fabric" WHERE "fabric_id" = $1 AND "project_id" = $2`,
            values: [fabricId, projectId],
        };

        // Send query to DB
        const doesThisProjectHasThisFabric = await client.query(query);

        // This project has already contain this fabric  --error409
        if (doesThisProjectHasThisFabric.rowCount == 1) {
            return "Update fabric";
        }

        // Calculate the cost of fabric used
        const articleCost = Number(((used * price) / 100).toFixed(2));

        // Query to add the fabric in project_has_fabric
        query = {
            text: `INSERT INTO "project_has_fabric"("project_id", "fabric_id", "used_size", "article_cost") VALUES ($1, $2, $3, $4)`,
            values: [projectId, fabricId, used, articleCost],
        };

        // Send query to DB
        await client.query(query);

        // Query to update in DB the field stock_qty in the table fabric
        query = {
            text: `UPDATE "fabric" SET "stock_qty" = ("stock_qty"::numeric - $2::numeric) WHERE "id" = $1`,
            values: [fabricId, used],
        };

        // Send query to DB
        await client.query(query);

        // Query to update in DB the field cost_price in the table project
        query = {
            text: `UPDATE "project" SET "cost_price" = ("cost_price"::numeric + $2::numeric) WHERE "id" = $1 RETURNING *`,
            values: [projectId, articleCost],
        };

        // Send query to DB
        // const updatedProjectResult = await client.query(query);
        await client.query(query);

        const allProject = await this.getAllProjects(id);
        // Get request result
        // const { rows: updatedProject } = updatedProjectResult;

        // Return result
        // return updatedProject[0];
        return allProject;
    },

    async addNewHaberdashery(haberdasheryInfoToAdd, projectId, id) {
        // haberdashery info to add
        const {
            haberdashery_id: haberdasheryId,
            haberdashery_is_cut: isCut,
            haberdashery_is_a_set: isASet,
            haberdashery_article_qty: article_qty,
            haberdashery_size: size,
            haberdashery_price: price,
            haberdashery_used_size: used,
        } = haberdasheryInfoToAdd;

        // Check if this project belongs to this member
        const existingProject =
            await photoDataMapper.doesThisProjectBelongToThisMember(
                projectId,
                id
            );

        if (!existingProject) {
            return null;
        }

        // Check if this haberdashery belongs to this member
        let query = {
            text: `SELECT * FROM "haberdashery" WHERE "id" = $1 AND "member_id" = $2`,
            values: [haberdasheryId, id],
        };

        // Send query to DB
        const doesThisHaberdasheryBelongToThisMember = await client.query(query);

        // This haberdashery has not been found  --error404
        if (doesThisHaberdasheryBelongToThisMember == 0) {
            return null;
        }

        // Check if this project already has this haberdashery
        query = {
            text: `SELECT * FROM "project_has_haberdashery" WHERE "haberdashery_id" = $1 AND "project_id" = $2`,
            values: [haberdasheryId, projectId],
        };

        // Send query to DB
        const doesThisProjectHasThisHaberdashery = await client.query(query);

        // This project has already contain this haberdashery  --error409
        if (doesThisProjectHasThisHaberdashery.rowCount == 1) {
            return "Update haberdashery";
        }

        // Calculate the cost of haberdashery used
        let articleCost = 0;

        if (!isCut && !isASet) {
                // Haberdashery CASE 1
                articleCost = Number((used * price).toFixed(2));
            }

            if (!isCut && isASet) {
                // Haberdashery CASE 2
                articleCost = Number(
                    ((used * price) / article_qty).toFixed(2)
                );
            }

            if (isCut) {
                // Haberdashery CASE 3
                articleCost = Number(((used * price) / size).toFixed(2));
            }

        // Query to add the haberdashery in project_has_haberdashery
        query = {
            text: `INSERT INTO "project_has_haberdashery"("project_id", "haberdashery_id", "used_size", "article_cost") VALUES ($1, $2, $3, $4)`,
            values: [projectId, haberdasheryId, used, articleCost],
        };

        // Send query to DB
        await client.query(query);

        // Query to update in DB the field stock_qty in the table haberdashery
        query = {
            text: `UPDATE "haberdashery" SET "stock_qty" = ("stock_qty"::numeric - $2::numeric) WHERE "id" = $1`,
            values: [haberdasheryId, used],
        };

        // Send query to DB
        await client.query(query);

        // Query to update in DB the field cost_price in the table project
        query = {
            text: `UPDATE "project" SET "cost_price" = ("cost_price"::numeric + $2::numeric) WHERE "id" = $1 RETURNING *`,
            values: [projectId, articleCost],
        };

        // Send query to DB
        // const updatedProjectResult = await client.query(query);
        await client.query(query);

        const allProject = await this.getAllProjects(id);
        // Get request result
        // const { rows: updatedProject } = updatedProjectResult;

        // Return result
        // return updatedProject[0];
        return allProject;
    },

    async addNewPattern(patternInfoToAdd, projectId, id) {
        // pattern info to add
        const { pattern_id: patternId, pattern_price: price } = patternInfoToAdd;

        // Check if this project belongs to this member
        const existingProject =
            await photoDataMapper.doesThisProjectBelongToThisMember(
                projectId,
                id
            );

        if (!existingProject) {
            return null;
        }

        // Check if this pattern belongs to this member
        let query = {
            text: `SELECT * FROM "pattern" WHERE "id" = $1 AND "member_id" = $2`,
            values: [patternId, id],
        };

        // Send query to DB
        const doesThisPatternBelongToThisMember = await client.query(query);

        // This pattern has not been found  --error404
        if (doesThisPatternBelongToThisMember == 0) {
            return null;
        }

        // Check if this project already has this pattern
        query = {
            text: `SELECT * FROM "project_has_pattern" WHERE "pattern_id" = $1 AND "project_id" = $2`,
            values: [patternId, projectId],
        };

        // Send query to DB
        const doesThisProjectHasThisPattern = await client.query(query);

        // This project has already contain this pattern  --error409
        if (doesThisProjectHasThisPattern.rowCount == 1) {
            return "pattern already used";
        }

        // Convert the cost of pattern used
        const articleCost = Number(price.toFixed(2));

        // Query to add the pattern in project_has_pattern
        query = {
            text: `INSERT INTO "project_has_pattern"("project_id", "pattern_id", "article_cost") VALUES ($1, $2, $3)`,
            values: [projectId, patternId, articleCost],
        };

        // Send query to DB
        await client.query(query);

        // Query to update in DB the field cost_price in the table project
        query = {
            text: `UPDATE "project" SET "cost_price" = ("cost_price"::numeric + $2::numeric) WHERE "id" = $1 RETURNING *`,
            values: [projectId, articleCost],
        };

        // Send query to DB
        // const updatedProjectResult = await client.query(query);
        await client.query(query);

        const allProject = await this.getAllProjects(id);
        // Get request result
        // const { rows: updatedProject } = updatedProjectResult;

        // Return result
        // return updatedProject[0];
        return allProject;
    },

    async getAllProjects(id) {
        // Query to get allproject in DB without
        const query = {
            text: `SELECT pro.id,
            pro.name,
            pro.date,
            pro.status,
            pro.cost_price,
            JSON_AGG(DISTINCT vofu) AS fabric_array,
            JSON_AGG(DISTINCT vohu) AS haberdashery_array,
            JSON_AGG(DISTINCT vopu) AS pattern_array,
            JSON_AGG(DISTINCT voapop) AS photos_array
            FROM "project" pro
            LEFT OUTER JOIN "view_of_fabrics_used" vofu
                ON pro.id = vofu.project_id
            LEFT OUTER JOIN "view_of_haberdasheries_used" vohu
                ON pro.id = vohu.project_id
            LEFT OUTER JOIN "view_of_patterns_used" vopu
                ON pro.id = vopu.project_id
            JOIN "view_of_all_photos_of_projects" voapop
                ON pro.id = voapop.project_id
            WHERE pro.member_id = $1
            GROUP BY pro.id`,
            values: [id],
        };

        // Send query to DB
        const getAllProjectsResult = await client.query(query);

        // If the member has not saved any project yet -- success 204
        if (getAllProjectsResult.rowCount == 0) {
            return "No data";
        }

        // Get request result
        const { rows: allPatterns } = getAllProjectsResult;

        // For each project replace NULL value by an empty array when there is no data in fabric, haberdashery or pattern's arrays
        allPatterns.map((pattern) => {
            pattern.fabric_array.length == 1 && pattern.fabric_array[0] == null
                ? (pattern.fabric_array = [])
                : null;
            pattern.haberdashery_array.length == 1 &&
            pattern.haberdashery_array[0] == null
                ? (pattern.haberdashery_array = [])
                : null;
            pattern.pattern_array.length == 1 &&
            pattern.pattern_array[0] == null
                ? (pattern.pattern_array = [])
                : null;
        });

        // Return result
        return allPatterns;
    },

    async getProjectById(id, projectId) {
        // Query to get one project in DB
        const query = {
            text: `SELECT pro.id,
            pro.name,
            pro.date,
            pro.status,
            pro.cost_price,
            JSON_AGG(DISTINCT vofu) AS fabric_array,
            JSON_AGG(DISTINCT vohu) AS haberdashery_array,
            JSON_AGG(DISTINCT vopu) AS pattern_array
            FROM "project" pro
            LEFT OUTER JOIN "view_of_fabrics_used" vofu
                ON pro.id = vofu.project_id
            LEFT OUTER JOIN "view_of_haberdasheries_used" vohu
                ON pro.id = vohu.project_id
            LEFT OUTER JOIN "view_of_patterns_used" vopu
                ON pro.id = vopu.project_id
            WHERE member_id = $1 AND pro.id = $2
            GROUP BY pro.id`,
            values: [id, projectId],
        };

        // Send query to DB
        const getOneProjectResult = await client.query(query);

        // Project not found in DB --error404
        if (getOneProjectResult.rowCount == 0) {
            return null;
        }

        // Get request result
        const { rows: oneProject } = getOneProjectResult;

        // Replace NULL value by an empty array when there is no data in fabric, haberdashery or pattern's arrays
        oneProject[0].fabric_array.length == 1 &&
        oneProject[0].fabric_array[0] == null
            ? (oneProject[0].fabric_array = [])
            : null;
        oneProject[0].haberdashery_array.length == 1 &&
        oneProject[0].haberdashery_array[0] == null
            ? (oneProject[0].haberdashery_array = [])
            : null;
        oneProject[0].pattern_array.length == 1 &&
        oneProject[0].pattern_array[0] == null
            ? (oneProject[0].pattern_array = [])
            : null;

        // Query to get the profile's photo of the project
        query.text = `SELECT * FROM get_photo_of_project($1)`;
        query.values = [projectId];

        // Send query to DB
        const getPhotoOfProjectResult = await client.query(query);

        // Get request result
        const { rows: getPhotoOfProject } = getPhotoOfProjectResult;

        // Add the photo info on the result
        oneProject[0].imageCard = {
            id: getPhotoOfProject[0].id,
            photo: getPhotoOfProject[0].photo,
        };

        // Return result
        return oneProject[0];
    },

    async updateProjectById(id, projectId, projectInfoToUpdate) {
        // project info to update
        const { name, status } = projectInfoToUpdate;

        // Check if this project belongs to this member
        const existingProject =
            await photoDataMapper.doesThisProjectBelongToThisMember(
                projectId,
                id
            );

        if (!existingProject) {
            return null;
        }

        // Query to update project in DB
        const query = {
            text: `UPDATE "project" SET "name" = $1, "status" = $2 WHERE "id" = $3 AND "member_id" = $4 RETURNING *`,
            values: [name, status, projectId, id],
        };

        // Send query to DB
        const updatedProjectResult = await client.query(query);

        // Haberdashery not found in DB --error404
        if (updatedProjectResult.rowCount == 0) {
            return null;
        }

        // Get request result
        const { rows: updatedProject } = updatedProjectResult;

        // Return result
        return updatedProject[0];
    },

    async updateFabricInProject(
        id,
        projectId,
        fabricId,
        projectFabricInfoToUpdate
    ) {
        // project info to update
        const {
            old_used_size: oldSize,
            old_article_cost: oldPrice,
            used_size,
        } = projectFabricInfoToUpdate;

        // Check if this project belongs to this member
        const existingProject =
            await photoDataMapper.doesThisProjectBelongToThisMember(
                projectId,
                id
            );

        if (!existingProject) {
            return null;
        }

        // Check if this project has this fabric
        let query = {
            text: `SELECT * FROM "project_has_fabric" WHERE "fabric_id" = $1 AND "project_id" = $2`,
            values: [fabricId, projectId],
        };

        // Send query to DB
        const doesThisProjectHasThisFabric = await client.query(query);

        // This project has not this fabric --error404
        if (doesThisProjectHasThisFabric.rowCount == 0) {
            return null;
        }

        // Calculate the new cost of fabric used
        const newArticleCost = Number(
            ((oldPrice / oldSize) * used_size).toFixed(2)
        );

        // Calculate the delta between the old an the new quantity used
        const delta = used_size - oldSize;

        // Query to update in DB the fields used_size and article_cost in the table project_has_fabric
        query = {
            text: `UPDATE "project_has_fabric" SET "used_size" = $1, "article_cost" = $2 WHERE "project_id" = $3 AND "fabric_id" = $4`,
            values: [used_size, newArticleCost, projectId, fabricId],
        };

        // Send query to DB
        await client.query(query);

        // Query to update in DB the field stock_qty in the table fabric
        query = {
            text: `UPDATE "fabric" SET "stock_qty" = ("stock_qty"::numeric - $2::numeric) WHERE "id" = $1`,
            values: [fabricId, delta],
        };

        // Send query to DB
        await client.query(query);

        // Query to update in DB the field cost_price in the table project
        query = {
            text: `UPDATE "project" SET "cost_price" = ("cost_price"::numeric - $2::numeric + $3::numeric) WHERE "id" = $1 RETURNING *`,
            values: [projectId, oldPrice, newArticleCost],
        };

        // Send query to DB
        // const updatedProjectResult = await client.query(query);
        await client.query(query);

        const allProject = await this.getAllProjects(id);
        // Get request result
        // const { rows: updatedProject } = updatedProjectResult;

        // Return result
        // return updatedProject[0];
        return allProject;
    },

    async updateHaberdasheryInProject(
        id,
        projectId,
        haberdasheryId,
        projectHaberdasheryInfoToUpdate
    ) {
        // project info to update
        const {
            old_used_size: oldSize,
            old_article_cost: oldPrice,
            used_size,
        } = projectHaberdasheryInfoToUpdate;

        // Check if this project belongs to this member
        const existingProject =
            await photoDataMapper.doesThisProjectBelongToThisMember(
                projectId,
                id
            );

        if (!existingProject) {
            return null;
        }

        // Check if this project has this haberdashery
        let query = {
            text: `SELECT * FROM "project_has_haberdashery" WHERE "haberdashery_id" = $1 AND "project_id" = $2`,
            values: [haberdasheryId, projectId],
        };

        // Send query to DB
        const doesThisProjectHasThisHaberdashery = await client.query(query);

        // This project has not this haberdashery --error404
        if (doesThisProjectHasThisHaberdashery.rowCount == 0) {
            return null;
        }

        // Calculate the new cost of haberdashery used
        const newArticleCost = Number(
            ((oldPrice / oldSize) * used_size).toFixed(2)
        );

        // Calculate the delta between the old an the new quantity used
        const delta = used_size - oldSize;

        // Query to update in DB the fields used_size and article_cost in the table project_has_haberdashery
        query = {
            text: `UPDATE "project_has_haberdashery" SET "used_size" = $1, "article_cost" = $2 WHERE "project_id" = $3 AND "haberdashery_id" = $4`,
            values: [used_size, newArticleCost, projectId, haberdasheryId],
        };

        // Send query to DB
        await client.query(query);

        // Query to update in DB the field stock_qty in the table haberdashery
        query = {
            text: `UPDATE "haberdashery" SET "stock_qty" = ("stock_qty"::numeric - $2::numeric) WHERE "id" = $1`,
            values: [haberdasheryId, delta],
        };

        // Send query to DB
        await client.query(query);

        // Query to update in DB the field cost_price in the table project
        query = {
            text: `UPDATE "project" SET "cost_price" = ("cost_price"::numeric - $2::numeric + $3::numeric) WHERE "id" = $1 RETURNING *`,
            values: [projectId, oldPrice, newArticleCost],
        };

        // Send query to DB
        // const updatedProjectResult = await client.query(query);
        await client.query(query);

        const allProject = await this.getAllProjects(id);
        // Get request result
        // const { rows: updatedProject } = updatedProjectResult;

        /// Return result
        // return updatedProject[0];
        return allProject;
    },

    async deleteProjectById(id, projectId) {
        //  Query to delete the project data
        const query = {
            text: `DELETE FROM "project" WHERE "member_id" = $1 AND "id" = $2`,
            values: [id, projectId],
        };

        // Send the query to DB
        const projectToDeleteResult = await client.query(query);

        // Get request result
        const { rowCount } = projectToDeleteResult;

        // Any rows weren't deleted in DB --error404
        if (rowCount == 0) {
            return null;
        }

        // Here, the project data has been deleted
        return true;
    },

    async deleteAll(id) {
        //  Query to delete all projects in DB
        const query = {
            text: `DELETE FROM "project" WHERE "member_id" = $1`,
            values: [id],
        };

        // Send the query to DB
        const allProjectsToDeleteResult = client.query(query);

        // Get request result
        const { rowCount } = allProjectsToDeleteResult;

        // Any rows weren't deleted in DB --error404
        if (rowCount == 0) {
            return null;
        }

        // Here, all projects data have been deleted
        return true;
    },
};

module.exports = projectDataMapper;
