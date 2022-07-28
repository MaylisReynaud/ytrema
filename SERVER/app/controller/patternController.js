// IMPORT
const patternDataMapper = require("../datamapper/patternDataMapper");

const patternController = {
    async create(request, response, next) {
        try {
            // User ID targeted
            const { userId: id } = request.params;

            // New pattern's data
            const patternInfo = request.body;

            // Create the pattern in DB
            const savedPattern = await patternDataMapper.createPattern(
                patternInfo,
                id
            );

            // An error occured, any object was not created in the DB
            if (!savedPattern) {
                response.locals.notFound =
                    "Une erreur est survenue : La création du patron en base de données a échouée.";

                // Go to errorController
                return next();
            }

            // Here, the pattern object is created in the DB
            response.status(200).json({ savedPattern });
        } catch (error) {
            next(error);
        }
    },

    async findAll(request, response, next) {
        try {
            // User ID targeted
            const { userId: id } = request.params;

            // Get all member's patterns
            const patterns = await patternDataMapper.getAllPatterns(id);

            // send 
            patterns === "No data"
                ? response.status(204).json()
                : // Send data to the client
                  response.status(200).json({ patterns });
        } catch (error) {
            next(error);
        }
    },

    async findById(request, response, next) {
        try {
            // User ID and pattern ID targeted
            const { userId: id, patternId } = request.params;
            
            // Get pattern info from DB
            const pattern = await patternDataMapper.getPatternById(id, patternId);

            // In this case, any data has not been found from DB
            if (!pattern) {
                response.locals.notFound = "Patron non trouvé";

                // Go to errorController
                return next();
            }

            // Send data to the client
            return response.status(200).json({ pattern });
        } catch (error) {
            next(error);
        }
    },

    async update(request, response, next) {
        try {
            // User ID and pattern ID targeted
            const { userId: id, patternId } = request.params;

            // Pattern info to update
            const patternInfo = request.body;

            // Update the Pattern data in DB
            const updatedPatternData = await patternDataMapper.updatePatternById(
                id,
                patternId,
                patternInfo
            );

            // No data updated because this pattern has not been found
            if (!updatedPatternData) {
                response.locals.notFound =
                    "Une erreur est survenue : ce patron n'est pas répertorié dans votre patronthèque. Vos informations n'ont pas pu être mises à jour.";
                return next();
            }

            // Here, the pattern data is updated in DB
            return response.status(200).json({ updatedPatternData });
        } catch (error) {
            next(error);
        }
    },

    async delete(request, response, next) {
        try {
            // User ID and pattern ID targeted
            const { userId: id, patternId } = request.params;

            // Delete the pattern data in DB
            const patternToDelete = await patternDataMapper.deletePatternById(id, patternId);

            // No data deleted because this pattern has not been found
            if (!patternToDelete) {
                response.locals.notFound =
                    "Une erreur est survenue : ce patron n'est pas répertorié dans votre patronthèque. Vos informations n'ont pas pu être supprimées.";
                return next();
            }

            // Here, the pattern data is deleted in DB
            return response.status(204).json();
        } catch (error) {
            next(error);
        }
    },

    async deleteAll(request, response, next) {
        try {
            // User ID targeted
            const { userId: id } = request.params;

            // Delete all pattern data in DB
            const deleteAllPatterns = await patternDataMapper.deleteAll(id);

            // No data deleted because this account does'nt have any patterns yet
            if (!deleteAllPatterns) {
                response.locals.notFound =
                    "Aucun patron n'est répertorié dans votre patronthèque, vous ne pouvez donc pas procéder à sa suppression";
                return next();
            }

            // Here, all pattern data have been in DB
            return response.status(204).json();

        } catch (error) {
            next(error)
        }
    }
};

module.exports = patternController;
