const errorController = {
    async error404(_, response) {
        response.locals.type === 409
            ? response.status(409).json({
                    error: {
                        code: 409,
                        type: "Conflict",
                        message: `${response.locals.conflict}`,
                    },
                })
            : response.status(404).json({
                    error: {
                        code: 404,
                        type: "Not Found",
                        message: `${response.locals.notFound}`,
                    },
                });
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
