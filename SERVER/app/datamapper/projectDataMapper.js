const client = require("./client");


const projectDataMapper = {
    async createProject(projectInfo, id) {
        const {name, status, personal_notes, photo, fabrics, haberdasheries, patterns} = projectInfo;
        
        // 1/ CALCULATE THE PRJECT'S COST OF PRODUCTION
        let projectCost = 0;

        // Cost of fabric used
        fabrics.map(({fabric_price: price, fabric_used_size: used, fabric_purchase_qty: bought}) => {
            projectCost += (price * used) / bought;
        });

        // Cost of haberdashery used
        haberdasheries.map(({haberdashery_price: price, haberdashery_used_size: used, haberdashery_purchase_qty: bought}) => {
            projectCost += (price * used) / bought;
        });

        // Cost of pattern
        patterns.map(({pattern_price: price}) => {
            projectCost += price;
        });

        // Add the cost of production to projectInfo
        projectInfo.cost_price = Number(projectCost.toFixed(2));

        // 2/ SAVE THE PROJECT AND GET ITS ID
        // Query to create project in DB
        let query = {
            text: `INSERT INTO "project"("name", "cost_price", "status", "member_id") VALUES($1, $2, $3, $4) RETURNING id`,
            values: [
                name,
                projectInfo.cost_price,
                status,
                id
            ]
        };

        // Send query to DB
        const createdProjectResult = await client.query(query);

        // Get request result
        const { rows: createdProject } = createdProjectResult;
        // Get project ID
        const {id: projectId} = createdProject[0];

        // Query to save project's photo in DB
        query = {
            text: `INSERT INTO "photo"("photo", "personal_notes", "project_id") VALUES($1, $2, $3)`,
            values: [
                photo,
                personal_notes,
                projectId
            ]
        };

        // Send query to DB
        await client.query(query);

        // 3/ UPDATE STOCK OF FABRICS AND HABERDASHERIES AND ADD THEM IN THE TABLES OF ASSOCIATION
        // Add in project_has_fabric and update stock in fabric
        fabrics.map( async ({fabric_id: id, fabric_qty_stock: stock, fabric_used_size: used}) => {
            await client.query(`INSERT INTO "project_has_fabric"("project_id", "fabric_id", "used_size") VALUES ($1, $2, $3) RETURNING *`,
            [
                projectId,
                id,
                used    
            ]);

        });

        // Add in project_has_haberdashery and update stock in haberdashery
        haberdasheries.map( async ({haberdashery_id: id, haberdashery_qty_stock: stock, haberdashery_used_size: used}) => {
            await client.query(`INSERT INTO "project_has_haberdashery"("project_id", "haberdashery_id", "used_size") VALUES ($1, $2, $3) RETURNING *`,
            [
                projectId,
                id,
                used    
            ])
        });

        // Add in project_has_pattern
        patterns.map( async ({pattern_id: id}) => {
            await client.query(`INSERT INTO "project_has_pattern" ("project_id", "pattern_id") VALUES ($1, $2)`,
            [
                projectId,
                id
            ])
        });

        return "ok";

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
        allPatterns.map(pattern => {
            pattern.fabric_array.length == 1 && pattern.fabric_array[0] == null ? pattern.fabric_array = [] : null;
            pattern.haberdashery_array.length == 1 && pattern.haberdashery_array[0] == null ? pattern.haberdashery_array = [] : null;
            pattern.pattern_array.length == 1 && pattern.pattern_array[0] == null ? pattern.pattern_array = [] : null;
        })

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
        oneProject[0].fabric_array.length == 1 && oneProject[0].fabric_array[0] == null ? oneProject[0].fabric_array = [] : null;
        oneProject[0].haberdashery_array.length == 1 && oneProject[0].haberdashery_array[0] == null ? oneProject[0].haberdashery_array = [] : null;
        oneProject[0].pattern_array.length == 1 && oneProject[0].pattern_array[0] == null ? oneProject[0].pattern_array = [] : null;

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
            photo: getPhotoOfProject[0].photo
        };

        // Return result
        return oneProject[0];

    },
};

module.exports = projectDataMapper;
