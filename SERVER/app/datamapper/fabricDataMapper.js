const client = require("./client");

const fabricDataMapper = {
    async createFabric(fabricInfo, id) {
        const {
            name,
            website,
            designer,
            color,
            precise_color,
            fabric,
            composition,
            weight,
            article_qty,
            stock_qty,
            width,
            price,
            photo
        } = fabricInfo;

        // Query to create fabric in DB
        const query = {
            text: `INSERT INTO "fabric"("name", "website", "designer", "color", "precise_color", "fabric", "composition", "weight", "article_qty", "stock_qty", "width", "price", "photo", "member_id") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
            values: [
                name,
                website,
                designer,
                color,
                precise_color,
                fabric,
                composition,
                weight,
                article_qty,
                stock_qty,
                width,
                price,
                photo,
                id
            ]
        };

        // If article_qty is greater than 1, each quantity has to be saved in a disticnt row in the DB
        if (article_qty > 1) {
            // Update the article_qty to 1 in the query
            query.values[8] = 1;

            // Create each row in the DB except for the last one, It will be created outside of this condition
            for (let i = article_qty; i > 1; i--) {
                await client.query(query);
            }
        }

        // Send query to DB
        const createdFabricResult = await client.query(query);

        // Get request result
        const { rows: createdFabric } = createdFabricResult;
        // Return result
        return createdFabric[0];
    },

    async getAllFabrics(id) {
        // Query to get all fabrics in DB
        const query = {
            text: `SELECT f.*,
            JSON_AGG(DISTINCT vpopwfu) AS project_profile_photo_array
            FROM "fabric" f
            LEFT OUTER JOIN "view_photos_of_project_with_fabrics_used" vpopwfu
                ON f.id = vpopwfu.fabric_id
            WHERE f.member_id = $1
            GROUP BY f.id
            `,
            values: [id]
        };

        // Send query to DB
        const getAllFabricsResult = await client.query(query);

        // If the member has not saved any fabric yet -- success 204
        if (getAllFabricsResult.rowCount == 0) {
            return "No data";
        }

        // Get request result
        const {rows: allFabrics} = getAllFabricsResult;

        // Treatment of the project profile photo array
        allFabrics.map((f) =>
            {
                // For each array of project profile photo replace NULL value by an empty array when the fabric has not been used in any project yet
                f.project_profile_photo_array.length == 1 &&
            f.project_profile_photo_array[0] == null
                ? (f.project_profile_photo_array = [])
                : null;

                // Keep only the profile's photo for each project concerned
                if (f.project_profile_photo_array.length > 0) {
                    // Array of the projects' ids
                    const projectIdTab = f.project_profile_photo_array.map(e => e.project_id);

                    // Remove duplicates
                    f.project_profile_photo_array = f.project_profile_photo_array.filter(
                        ({ project_id }, index) => projectIdTab.indexOf(project_id) === index
                    );

                }
            }
        );

        // Return result
        return allFabrics;
    },

    async getFabricById(id, fabricId) {
        // Query to get one fabric in DB
        const query = {
            text: `SELECT * FROM "fabric" WHERE "member_id" = $1 and "id" = $2`,
            values: [id, fabricId]
        };

        // Send query to DB
        const getOneFabricResult = await client.query(query);

        // Fabric not found in DB --error404
        if (getOneFabricResult.rowCount == 0) {
            return null;
        }

        // Get request result
        const {rows: oneFabric} = getOneFabricResult;

        // Return result
        return oneFabric[0];
    },

    async updateFabricById(id, fabricId, fabricInfoToUpdate) {
        // fabric info to update
        const {
            name,
            website,
            designer,
            color,
            precise_color,
            fabric,
            composition,
            weight,
            stock_qty,
            width,
            price,
            photo
        } = fabricInfoToUpdate;

        // Query to update fabric in DB
        const query = {
            text: `UPDATE "fabric" SET "name" = $1, "website" = $2, "designer" = $3, "color" = $4, "precise_color" = $5, "fabric" = $6, "composition" = $7, "weight" = $8, "stock_qty" = $9, "width" = $10, "price" = $11, "photo" = $12 WHERE "member_id" = $13 AND "id" = $14 RETURNING *`,
            values: [
                name,
                website,
                designer,
                color,
                precise_color,
                fabric,
                composition,
                weight,
                stock_qty,
                width,
                price,
                photo,
                id,
                fabricId
            ]
        };

        // Send query to DB
        const updatedFabricResult = await client.query(query);

        // Fabric not found in DB --error404
        if (updatedFabricResult.rowCount == 0) {
            return null;
        }

        // Get request result
        const {rows: updatedFabric} = updatedFabricResult;

        // Return result
        return updatedFabric[0];

    },

    async deleteFabricById(id, fabricId) {
        //  Query to delete the fabric data
        const query = {
            text: `DELETE FROM "fabric" WHERE "member_id" = $1 AND "id" = $2`,
            values: [id, fabricId],
        };

        // Send the query to DB
        const fabricToDeleteResult = client.query(query);

        // Get request result
        const { rowCount } = fabricToDeleteResult;

        // Any rows weren't deleted in DB --error404
        if (rowCount == 0) {
            return null;
        }

        // Here, the fabric data has been deleted
        return true;
    },

    async deleteAll(id) {
        //  Query to delete all fabrics in DB
        const query = {
            text: `DELETE FROM "fabric" WHERE "member_id" = $1`,
            values: [id],
        };

        // Send the query to DB
        const allFabricsToDeleteResult = client.query(query);

        // Get request result
        const { rowCount } = allFabricsToDeleteResult;

        // Any rows weren't deleted in DB --error404
        if (rowCount == 0) {
            return null;
        }

        // Here, all fabrics data have been deleted
        return true;
    }
};

module.exports = fabricDataMapper;
