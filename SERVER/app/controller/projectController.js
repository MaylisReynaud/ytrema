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

        } catch (error) {
            next(error);
        }
    },

    async addFabric (request, response, next) {
        try {
            // User ID targeted
            const { userId: id, projectId } = request.params;

            // New fabric's data
            const fabricInfo = request.body;

            // Create the project in DB
            const addFabric = await projectDataMapper.addNewFabric(
                fabricInfo,
                projectId,
                id
            );

            // The fabric has not been added
            if (!addFabric) {
                response.locals.notFound =
                    "Une erreur est survenue : ce tissu n'a pas pu être ajouté au projet.";
                return next();
            };

            // In this case, the fabric is already used in this project, so the client must use "updateFabricUsed" not "addFabric"
            if (addFabric === "Update fabric") {
                response.locals.type = 409;
                response.locals.conflict =
                    "Désolé, ce tissu est déjà présent dans votre projet, nous ne pouvons pas l'ajouter une nouvelle fois. En cas de modification de la quantité utilisée merci de bien vouloir modifier la fiche directement.";
                return next();
            }

            // Here, the fabric has been added to the project
            response.status(200).json({ addFabric });

        } catch (error) {
            next(error);
        }
    },

    async addHaberdashery (request, response, next) {
        try {
            // User ID targeted
            const { userId: id, projectId } = request.params;

            // New haberdashery's data
            const haberdasheryInfo = request.body;

            // Create the project in DB
            const addHaberdashery = await projectDataMapper.addNewHaberdashery(
                haberdasheryInfo,
                projectId,
                id
            );

            // The haberdashery has not been added
            if (!addHaberdashery) {
                response.locals.notFound =
                    "Une erreur est survenue : cet article de mercerie n'a pas pu être ajouté au projet.";
                return next();
            }

            // In this case, the haberdashery is already used in this project, so the client must use "updateHaberdasheryUsed" not "addHaberdashery"
            if (addHaberdashery === "Update haberdashery") {
                response.locals.type = 409;
                response.locals.conflict =
                    "Désolé, cet article de mercerie est déjà présent dans votre projet, nous ne pouvons pas l'ajouter une nouvelle fois. En cas de modification de la quantité utilisée merci de bien vouloir modifier la fiche directement.";
                return next();
            }

            // Here, the haberdashery has been added to the project
            response.status(200).json({ addHaberdashery });

        } catch (error) {
            next(error);
        }
    },

    async addPattern (request, response, next) {
        try {
            // User ID targeted
            const { userId: id, projectId } = request.params;

            // New pattern's data
            const patternInfo = request.body;

            // Create the project in DB
            const addPattern = await projectDataMapper.addNewPattern(
                patternInfo,
                projectId,
                id
            );

            // The pattern has not been added
            if (!addPattern) {
                response.locals.notFound =
                    "Une erreur est survenue : ce patron n'a pas pu être ajouté au projet.";
                return next();
            }

            // In this case, the pattern is already used in this project"
            if (addPattern === "pattern already used") {
                response.locals.type = 409;
                response.locals.conflict =
                    "Désolé, ce patron est déjà présent dans votre projet, nous ne pouvons pas l'ajouter une nouvelle fois.";
                return next();
            }

            // Here, the pattern has been added to the project
            response.status(200).json({ addPattern });

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

    async update(request, response, next) {
        try {
            // User ID and project ID targeted
            const { userId: id, projectId } = request.params;

            // Project info to update
            const projectInfo = request.body;

            // Update the Project data in DB
            const updatedProjectData = await projectDataMapper.updateProjectById(
                id,
                projectId,
                projectInfo
            );

            // No data updated because this project has not been found
            if (!updatedProjectData) {
                response.locals.notFound =
                    "Une erreur est survenue : ce projet n'est pas répertorié. Vos informations n'ont pas pu être mises à jour.";
                return next();
            }

            // Here, the project data is updated in DB
            return response.status(200).json({ updatedProjectData });
        } catch (error) {
            next(error);
        }
    },

    async updateFabricUsed(request, response, next) {
        try {
            // User ID and project ID targeted
            const { userId: id, projectId, fabricId } = request.params;

            // Fabric info to update
            const projectFabricInfo = request.body;

            // Update the fabric data for this project in DB
            const updatedFabricDataUsed = await projectDataMapper.updateFabricInProject(
                id,
                projectId,
                fabricId,
                projectFabricInfo
            );

            // No data updated because this fabric has not been found for this project
            if (!updatedFabricDataUsed) {
                response.locals.notFound =
                    "Une erreur est survenue : ce tissu n'est pas répertorié dans votre projet. Vos informations n'ont pas pu être mises à jour.";
                return next();
            }

            // Here, the fabric data for this project is updated in DB
            return response.status(200).json({ updatedFabricDataUsed });
        } catch (error) {
            next(error);
        }
    },

    async updateHaberdasheryUsed(request, response, next) {
        try {
            // User ID and project ID targeted
            const { userId: id, projectId, haberdasheryId } = request.params;

            // Haberdashery info to update
            const projectHaberdasheryInfo = request.body;

            // Update the haberdashery data for this project in DB
            const updatedHaberdasheryDataUsed = await projectDataMapper.updateHaberdasheryInProject(
                id,
                projectId,
                haberdasheryId,
                projectHaberdasheryInfo
            );

            // No data updated because this haberdashery has not been found for this project
            if (!updatedHaberdasheryDataUsed) {
                response.locals.notFound =
                    "Une erreur est survenue : cet article de mercerie n'est pas répertorié dans votre projet. Vos informations n'ont pas pu être mises à jour.";
                return next();
            }

            // Here, the haberdashery data for this project is updated in DB
            return response.status(200).json({ updatedHaberdasheryDataUsed });
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