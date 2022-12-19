// IMPORT
const reviewDataMapper = require("../datamapper/reviewDataMapper");

const reviewController = {
    async createOrUpdate(request, response, next) {
        try {
            // User ID targeted
            const { userId: id } = request.params;

            // Review's content
            const reviewInfo = request.body;

            // Create or update the rewiew in DB
            const savedReview = await reviewDataMapper.createOrUpdateReview(
                reviewInfo,
                id
            );

            // An error occured, any object was not created in the DB
            if (!savedReview) {
                response.locals.notFound =
                    "Une erreur est survenue : La sauvegarde de votre commentaire en base de données a échouée.";

                // Go to errorController
                return next();
            }

            // Send response
            savedReview.status === "created"
                ? // Here, the fabric object is created in the DB
                  response.status(201).json({ savedReview })
                : // Here, the fabric object is updated in the DB
                  response.status(200).json({ savedReview });
        } catch (error) {
            next(error);
        }
    },

    async findAll(_, response, next) {
        try {
            // Get all reviews
            const reviews = await reviewDataMapper.getAllReviews();

            // send 
            reviews === "No data"
                ? response.status(204).json()
                : // Send data to the client
                  response.status(200).json({ reviews });
        } catch (error) {
            next(error);
        }
    },    

    async findByUserId(request, response, next) {
        try {
            // User ID targeted
            const { userId: id } = request.params;

            // Get review info from DB
            const review = await reviewDataMapper.getReviewByUserId(id);

            // In this case, any data has not been found from DB
            if (!review) {
                response.locals.notFound = "Aucun commentaire trouvé";

                // Go to errorController
                return next();
            }

            // Send data to the client
            return response.status(200).json({ review });
        } catch (error) {
            next(error);
        }
    },

    async delete(request, response, next) {
        try {
            // User ID targeted
            const { userId: id } = request.params;

            // Delete the review data in DB
            const reviewToDelete = await reviewDataMapper.deleteReviewByUserId(
                id
            );

            // No data deleted because this review has not been found
            if (!reviewToDelete) {
                response.locals.notFound =
                    "Une erreur est survenue : Aucun commentaire n'est répertorié dans votre compte.";
                return next();
            }

            // Here, the review data is deleted in DB
            response.status(204).json();
        } catch (error) {
            next(error);
        }
    },
};

module.exports = reviewController;
