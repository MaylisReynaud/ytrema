const authDataMapper = require("../datamapper/authDataMapper");
const bcrypt = require("bcrypt");
const saltRounds = process.env.SALTROUNDS;

const authController = {
    // handleLoginForm(request, response, next) {

    // },

    async handleSignForm(request, response, next) {
        try {
            const memberInfo = request.body;
            
            // Hash password
            const hashedPwd = bcrypt.hashSync(memberInfo.password, Number(saltRounds));

            // Replace the password by hashed password
            memberInfo.password = hashedPwd;

            // Create the member in DB
            const newMember = await authDataMapper.createMember(memberInfo);

            // In this case, DB's result is null because the member's email is already in DB
            if (!newMember) {
                response.locals.notFound =
                    "Une erreur est survenue, votre compte n'a pas pu être créé.";
                return next();
            }

            // In this case, the member's pseudo is already used in DB
            if (newMember === "pseudoAlreadyUsed") {
                response.locals.type = 409;
                response.locals.conflict =
                    "Désolé, ce pseudo n'est pas disponible, merci d'en choisir un autre.";
                return next();
            }

            // Here, the member is registered in DB
            response.json({ newMember });

        } catch (error) {
            next(error);
        }
    },
};

module.exports = authController;
