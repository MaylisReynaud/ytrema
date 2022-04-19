const errorController = {
    async error404(_, response) {
        if (response.locals.type === 403) {
            response.status(403).json({
                error: {
                    url: _.url,
                    code: 403,
                    type: "Forbidden",
                    message: `${response.locals.forbidden}`,
                },
            });
        } else if (response.locals.type === 409) {
            response.status(409).json({
                error: {
                    url: _.url,
                    code: 409,
                    type: "Conflict",
                    message: `${response.locals.conflict}`,
                },
            });
        } else {
            response.status(404).json({
                error: {
                    url: _.url,
                    code: 404,
                    type: "Not Found",
                    message: `${response.locals.notFound}`,
                },
            })
        }
    },

    async error500(error, _, response, __) {
        response.status(500).json({
            error: {
                code: 500,
                type: "fatal error",
                details: error.message,
            },
        });
    },
};

module.exports = errorController;
