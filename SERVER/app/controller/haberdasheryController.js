// IMPORT
const haberdasheryDataMapper = require("../datamapper/haberdasheryDataMapper");

const haberdasheryController = {
    async create(request, response, next) {
        try {
            // User ID targeted
            const { userId: id } = request.params;

            // New haberdashery's data
            const haberdasheryInfo = request.body;

            // Create the haberdashery in DB
            const savedHaberdashery =
                await haberdasheryDataMapper.createHaberdashery(
                    haberdasheryInfo,
                    id
                );

            // An error occured, any object was not created in the DB
            if (!savedHaberdashery) {
                response.locals.notFound =
                    "Une erreur est survenue : La création de l'article de mercerie en base de données a échouée.";

                // Go to errorController
                return next();
            }

            // Here, the haberdashery object is created in the DB
            response.status(200).json({ savedHaberdashery });
        } catch (error) {
            next(error);
        }
    },

    async findAll(request, response, next) {
        try {
            // User ID targeted
            const { userId: id } = request.params;

            // Get all member's haberdashery
            const haberdasheries =
                await haberdasheryDataMapper.getAllHaberdasheries(id);

            // send
            haberdasheries === "No data"
                ? response.status(204).json()
                : // Send data to the client
                  response.status(200).json({ haberdasheries });
        } catch (error) {
            next(error);
        }
    },

    async findById(request, response, next) {
        try {
            // User ID and haberdashery ID targeted
            const { userId: id, haberdasheryId } = request.params;

            // Get haberdashery info from DB
            const haberdashery = await haberdasheryDataMapper.getHaberdasheryById(
                id,
                haberdasheryId
            );

            // In this case, any data has not been found from DB
            if (!haberdashery) {
                response.locals.notFound = "Article de mercerie non trouvé";

                // Go to errorController
                return next();
            }

            // Send data to the client
            return response.status(200).json({ haberdashery });
        } catch (error) {
            next(error);
        }
    },

    async update(request, response, next) {
        try {
            // User ID and haberdashery ID targeted
            const { userId: id, haberdasheryId } = request.params;

            // Haberdashery info to update
            const haberdasheryInfo = request.body;

            // Update the haberdashery data in DB
            const updatedHaberdasheryData =
                await haberdasheryDataMapper.updateHaberdasheryById(
                    id,
                    haberdasheryId,
                    haberdasheryInfo
                );

            // No data updated because this haberdashery has not been found
            if (!updatedHaberdasheryData) {
                response.locals.notFound =
                    "Une erreur est survenue : cet article de mercerie n'est pas répertorié dans votre merceriethèque. Vos informations n'ont pas pu être mises à jour.";
                return next();
            }

            // Here, the haberdashery data is updated in DB
            return response.status(200).json({ updatedHaberdasheryData });
        } catch (error) {
            next(error);
        }
    },

    async delete(request, response, next) {
        try {
            // User ID and haberdashery ID targeted
            const { userId: id, haberdasheryId } = request.params;

            // Delete the haberdashery data in DB
            const haberdasheryToDelete =
                await haberdasheryDataMapper.deleteHaberdasheryById(id, haberdasheryId);

            // No data deleted because this haberdashery has not been found
            if (!haberdasheryToDelete) {
                response.locals.notFound =
                    "Une erreur est survenue : cet article de mercerie n'est pas répertorié dans votre merceriethèque. Vos informations n'ont pas pu être supprimées.";
                return next();
            }

            // Here, the haberdashery data is deleted in DB
            response.status(204).json();
        } catch (error) {
            next(error);
        }
    },
};

module.exports = haberdasheryController;
