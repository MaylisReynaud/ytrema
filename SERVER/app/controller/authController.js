// IMPORT
const authDataMapper = require("../datamapper/authDataMapper");
const jwt = require("jsonwebtoken");
const checkingPassword = require("../services/utils_functions");

const authController = {
    async handleLoginForm(request, response, next) {
        try {
            const { email, password } = request.body;

            // Get member by email
            const getMember = await authDataMapper.getMemberByEmail(email);

            // Member is not found
            if (!getMember) {
                response.locals.notFound = "Email et/ou password invalide";
                return next();
            }

            //  Retrieve data stored in DB
            const { id, pseudo, password: storedHashedPwd, email: emailDB, chest_measurement, waist_measurement, hip_measurement, role, avatar } = getMember;

            // Compare stored password with request.body.password
            const validPwd = await checkingPassword.comparePwd(
                password,
                storedHashedPwd
            );

            // Incorrect entered password
            if (!validPwd) {
                response.locals.notFound = "Email et/ou password invalide";
                return next();
            }

            // Login/ password valid give the member a token
            response.status(200).json({
                id,
                pseudo,
                email: emailDB,
                chest_measurement,
                waist_measurement,
                hip_measurement,
                role,
                avatar,
                memberToken: jwt.sign(
                    {
                        memberId: id,
                    },
                    process.env.SECRET,
                    { expiresIn: "2h" }
                ),
            });
        } catch (error) {
            next(error);
        }
    },

    async handleSignForm(request, response, next) {
        try {
            const memberInfo = request.body;

            // Are password and checkPassword matching ?
            const result = await checkingPassword.doBothPwdMatch(
                memberInfo.password,
                memberInfo.checkPassword
            );

            // If not, throw an error 409
            if (result.message) {
                response.locals.type = result.type;
                response.locals.conflict = result.message;

                // Go to errorController
                return next();
            }

            // If yes, hash the password
            const hashedPwd = await checkingPassword.hashPwd(
                memberInfo.password
            );

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
            response.status(200).json({ newMember });
        } catch (error) {
            next(error);
        }
    },
};

module.exports = authController;
