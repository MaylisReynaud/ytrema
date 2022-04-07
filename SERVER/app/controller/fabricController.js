// IMPORT
const fabricDataMapper = require("../datamapper/fabricDataMapper");

const fabricController = {
    async create(request, response, next) {
        try {
            // User ID targeted
            const { userId: id } = request.params;

            // New fabric's data
            const fabricInfo = request.body;

            // Create the fabric in DB
            const savedFabric = await fabricDataMapper.createFabric(
                fabricInfo,
                id
            );

            // An error occured, any object was not created in the DB
            if (!savedFabric) {
                response.locals.notFound =
                    "Une erreur est survenue : La création du tissu en base de données à échoué.";

                // Go to errorController
                return next();
            }

            // Here, the fabric object is created in the DB
            response.status(200).json({ savedFabric });
        } catch (error) {
            next(error);
        }
    },

    async findAll(request, response, next) {
        try {
            // User ID targeted
            const { userId: id } = request.params;

            // Get all member's fabrics
            const fabrics = await fabricDataMapper.getAllFabrics(id);

            // send 
            fabrics === "No data"
                ? response.status(204).json()
                : // Send data to the client
                  response.status(200).json({ fabrics });
        } catch (error) {
            next(error);
        }
    },

    async findById(request, response, next) {
        try {
            // User ID and fabric ID targeted
            const { userId: id, fabricId } = request.params;
            
            // Get fabric info from DB
            const fabric = await fabricDataMapper.getFabricById(id, fabricId);

            // In this case, any data has not been found from DB
            if (!fabric) {
                response.locals.notFound = "Tissu non trouvé";

                // Go to errorController
                return next();
            }

            // Send data to the client
            return response.status(200).json({ fabric });
        } catch (error) {
            next(error);
        }
    },

    async update(request, response, next) {
        try {
            // User ID and fabric ID targeted
            const { userId: id, fabricId } = request.params;

            // Fabric info to update
            const fabricInfo = request.body;

            // Update the fabric data in DB
            const updatedFabricData = await fabricDataMapper.updateFabricById(
                id,
                fabricId,
                fabricInfo
            );

            // No data updated because this fabric has not been found
            if (!updatedFabricData) {
                response.locals.notFound =
                    "Une erreur est survenue : ce tissu n'est pas répertorié dans votre tissuthèque. Vos informations n'ont pas pu être mises à jour.";
                return next();
            }

            // Here, the fabric data is updated in DB
            return response.status(200).json({ updatedFabricData });
        } catch (error) {
            next(error);
        }
    },

    async delete(request, response, next) {
        try {
            // User ID and fabric ID targeted
            const { userId: id, fabricId } = request.params;

            // Delete the fabric data in DB
            const fabricToDelete = await fabricDataMapper.deleteFabricById(id, fabricId);

            // No data deleted because this fabric has not been found
            if (!fabricToDelete) {
                response.locals.notFound =
                    "Une erreur est survenue : ce tissu n'est pas répertorié dans votre tissuthèque. Vos informations n'ont pas pu être supprimées.";
                return next();
            }

            // Here, the fabric data is deleted in DB
            response.status(204).json();
        } catch (error) {
            next(error);
        }
    },
};

module.exports = fabricController;
