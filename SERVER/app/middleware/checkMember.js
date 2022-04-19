// MW pour vérifier si l'utilisateur connecté souhaite accéder à ses propres données

// Controller import
const errorController = require('../controller/errorController');

module.exports = async (request, response, next) => {
    try {
        // Ignore this checking step if the request is about signup or login, in this case it's the error middleware which is concerned
        if (request.url === '/signup' || request.url === '/login') {
            // Go to errorController
            return next();
        }

        // Get the url requested
        const urlRequested = request.url.split('/');

        // Extract user ID from url
        const userId = urlRequested[urlRequested.length - 1];

        // Retrieve member ID in locals
        const memberID = response.locals.memberID;
        
        // Check if the member wants his own personal data
        // If not, throw an error 403
        if (memberID != userId) {
            response.locals.type = 403;
            response.locals.forbidden =
            `Vos droits d'accès ne vous permettent pas d'accéder à cette ressource.`;

            return errorController.error404(request, response);
        }

        // If yes, go to concerned router
        next();

    } catch (error) {
        response.status(401).json({
            error: {
                message: error.message
            },
        });
    }
};

