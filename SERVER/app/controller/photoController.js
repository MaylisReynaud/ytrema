// IMPORT
const photoDataMapper = require("../datamapper/photoDataMapper");

const photoController = {
    async create(request, response, next) {
        try {
            // User ID and project ID targeted
            const { userId: id , projectId } = request.params;

            // New photo's data for a defined project
            const photoInfo = request.body;

            // Create the photo in DB
            const savedPhoto = await photoDataMapper.createPhoto(
                photoInfo,
                projectId,
                id
            );

            // An error occured, any object was not created in the DB
            if (!savedPhoto) {
                response.locals.notFound =
                    "Une erreur est survenue : La création de la note en base de données a échouée.";
                // Go to errorController
                return next();
            }

            // Here, the photo object is created in the DB
            response.status(200).json({ savedPhoto });
        } catch (error) {
            next(error);
        }
    },

    async findAll(request, response, next) {
        try {
            // User ID and project ID targeted
            const { userId: id, projectId } = request.params;

            // Get all photos of a defined project for a member
            const photos = await photoDataMapper.getAllPhotos(id, projectId);

            // send 
            photos === "No data"
                ? response.status(204).json()
                : // Send data to the client
                response.status(200).json({ photos });
        } catch (error) {
            next(error);
        }
    },

    async findById(request, response, next) {
        try {
            // User ID, photo ID and project ID targeted
            const { userId: id, photoId, projectId } = request.params;
            
            // Get photo info from DB
            const photo = await photoDataMapper.getPhotoById(id, photoId, projectId);

            // In this case, any data has not been found from DB
            if (!photo) {
                response.locals.notFound = "Note non trouvée";

                // Go to errorController
                return next();
            }

            // Send data to the client
            return response.status(200).json({ photo });
        } catch (error) {
            next(error);
        }
    },

    async update(request, response, next) {
        try {
            // User ID, photo ID and project ID targeted
            const { userId: id, photoId, projectId } = request.params;

            // Photo info to update
            const photoInfo = request.body;

            // Update the Photo data in DB
            const updatedPhotoData = await photoDataMapper.updatePhotoById(
                id,
                photoId,
                photoInfo,
                projectId
            );

            // No data updated because this photo has not been found
            if (!updatedPhotoData) {
                response.locals.notFound =
                    "Une erreur est survenue : cette note n'est pas répertoriée dans votre projet. Vos informations n'ont pas pu être mises à jour.";
                return next();
            }

            // Here, the photo data is updated in DB
            return response.status(200).json({ updatedPhotoData });
        } catch (error) {
            next(error);
        }
    },

    async delete(request, response, next) {
        try {
            // User ID, photo ID and project ID targeted
            const { userId: id, photoId, projectId } = request.params;

            // Delete the photo data in DB
            const photoToDelete = await photoDataMapper.deletePhotoById(id, photoId, projectId);

            // No data deleted because this photo has not been found
            if (!photoToDelete) {
                response.locals.notFound =
                    "Une erreur est survenue : cette note n'est pas répertoriée dans votre projet. Vos informations n'ont pas pu être supprimées.";
                return next();
            }

            // Here, the photo data is deleted in DB
            return response.status(204).json();
        } catch (error) {
            next(error);
        }
    },
};

module.exports = photoController;
