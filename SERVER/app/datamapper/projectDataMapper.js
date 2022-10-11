const client = require("./client");

const projectDataMapper = {
    // async createProject(projectInfo, id) {

    // },

    async getAllProjects(id) {
        // Query to get allproject in DB without
        const query = {
            text: `SELECT pro.id,
            pro.name,
            pro.date,
            pro.status,
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
