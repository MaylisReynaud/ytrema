require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = async (request, response, next) => {
    try {
        // If there is an error message in response.locals go to the error middleware
        if (response.locals.conflict || response.locals.notFound) {
            return next();
        }

        const token = request.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.SECRET);
        const memberId = decodedToken.memberId;

        if (request.body.memberId && request.body.memberId !== memberId) {
            throw "Unauthorized member ID";
        } else {
            // Save member ID in locals
            response.locals.memberID = memberId;
            next();
        }
    } catch (error) {
        response.status(401).json({
            // error: new Error("Unauthorized request !"),
            error: {
                message: error.message
            },
        });
    }
};

