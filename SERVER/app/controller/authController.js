require("dotenv").config();
const authDataMapper = require("../datamapper/authDataMapper");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = process.env.SALTROUNDS;

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

            //  Retrieve id and hashed password store in DB
            const { id, pseudo, password: storedHashedPwd } = getMember;

            // Compare stored password with request.body.password
            const validPwd = bcrypt.compareSync(password, storedHashedPwd);

            // Incorrect entered password
            if (!validPwd) {
                response.locals.notFound = "Email et/ou password invalide";
                return next();
            }

            // Login/ password valid give the member a token
            response.json({
                id,
                pseudo,
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

            // Is password and checkPassword matching ?
            // If not, throw an error 409
            if (memberInfo.password !== memberInfo.checkPassword) {
                response.locals.type = 409;
                response.locals.conflict =
                `Les saisies dans les champs 'mot de passe' et 'confirmation du mot de passe' doivent être identiques`;
                return next();
            }

            // Hash password
            const hashedPwd = bcrypt.hashSync(
                memberInfo.password,
                Number(saltRounds)
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
            response.json({ newMember });
        } catch (error) {
            next(error);
        }
    },
};

module.exports = authController;
