// IMPORT
const projectDataMapper = require('../datamapper/projectDataMapper');

const projectController = {
    async create (request, response, next) {
        try {
            // User ID targeted
            const { userId: id } = request.params;

            // New project's data
            const projectInfo = request.body;

            // Create the project in DB
            const savedProject = await projectDataMapper.createProject(
                projectInfo,
                id
            );

            response.status(200).json({ savedProject });
            // response.status(200).json({ projectInfo, id });

        } catch (error) {
            next(error);
        }
    },

    async findAll (request, response, next) {
        try {
            // User ID targeted
            const { userId: id } = request.params;

            // Get all member's projects
            const projects = await projectDataMapper.getAllProjects(id);

            // send 
            projects === "No data"
                ? response.status(204).json()
                : // Send data to the client
                response.status(200).json({ projects });
        } catch (error) {
            next(error);
        }
    },

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

    async delete(request, response, next) {
        try {
            // User ID and project ID targeted
            const { userId: id, projectId } = request.params;

            // Delete the project data in DB
            const projectToDelete = await projectDataMapper.deleteProjectById(id, projectId);

            // No data deleted because this project has not been found
            if (!projectToDelete) {
                response.locals.notFound =
                    "Une erreur est survenue : ce projet n'est pas répertorié. Vos informations n'ont pas pu être supprimées.";
                return next();
            }

            // Here, the project data is deleted in DB
            return response.status(204).json();
        } catch (error) {
            next(error);
        }
    },

    async deleteAll(request, response, next) {
        try {
            // User ID targeted
            const { userId: id } = request.params;

            // Delete all project data in DB
            const deleteAllProjects = await projectDataMapper.deleteAll(id);

            // No data deleted because this account does'nt have any projects yet
            if (!deleteAllProjects) {
                response.locals.notFound =
                    "Aucun projet n'a été réalisé, vous ne pouvez donc pas procéder à leur suppression";
                return next();
            }

            // Here, all project data have been in DB
            return response.status(204).json();

        } catch (error) {
            next(error)
        }
    }
};


module.exports = projectController;