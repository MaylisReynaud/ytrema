// IMPORT
const projectDataMapper = require('../datamapper/projectDataMapper');

const projectController = {
    // async create (request, response, next) {

    // },

    // async findAll (request, response, next) {

    // },

    async findById(request, response, next) {
        try {
            // User ID and project ID targeted
            const { userId: id, projectId } = request.params;
            
            // Get project info from DB
            const project = await projectDataMapper.getProjectById(id, projectId);

            // In this case, any data has not been found from DB
            if (!project) {
                response.locals.notFound = "Projet non trouvé";

                // Go to errorController
                return next();
            }

            // Send data to the client
            return response.status(200).json({ project });
        } catch (error) {
            next(error);
        }
    },
};

module.exports = projectController;