const client = require("./client");

const projectDataMapper = {
    // async createProject(projectInfo, id) {

    // },

    // async getAllProjects(id) {

    // },

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
            JOIN "view_of_fabrics_used" vofu
                ON pro.id = vofu.project_id
            JOIN "view_of_haberdasheries_used" vohu
                ON pro.id = vohu.project_id
            JOIN "view_of_patterns_used" vopu
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
