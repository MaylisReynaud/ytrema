// IMPORT
const memberDataMapper = require("../datamapper/memberDataMapper");
const checkingPassword = require("../services/utils_functions");

const memberController = {
    async findById(request, response, next) {
        try {
            // User ID targeted
            const { userId: id } = request.params;

            // Get member info from DB
            const member = await memberDataMapper.getMemberById(id);

            // In this case, any data has not found from DB
            if (!member) {
                response.locals.notFound = "Données non trouvées";

                // Go to errorController
                return next();
            }

            // Send data to the client
            return response.status(200).json({ member });
        } catch (error) {
            next(error);
        }
    },

    async update(request, response, next) {
        try {
            // User ID targeted
            const { userId: id } = request.params;

            // Member info to update
            const memberInfo = request.body;

            // If password to update
            if (memberInfo.password) {
                // Check if password and check-password match
                const result = await checkingPassword.doBothPwdMatch(
                    memberInfo.password,
                    memberInfo.checkPassword
                );

                // If not, throw an error 409 after updating error info
                if (result.message) {
                    response.locals.type = result.type;
                    response.locals.conflict = result.message;

                    // Go to errorController
                    return next();
                } else {
                    // If yes, hash the password before update it in DB
                    const hashedPwd = await checkingPassword.hashPwd(
                        memberInfo.password
                    );

                    // Replace the password by hashed password
                    memberInfo.password = hashedPwd;
                }
            }

            // Update the member profile in DB
            const updateMemberProfil = await memberDataMapper.updateMemberById(
                id,
                memberInfo
            );

            // Object to update error info if necessary
            let errorInfo = {
                type: null,
                message: "",
            };

            // Any rows weren't updated in DB because they haven't been found
            if (!updateMemberProfil) {
                response.locals.notFound =
                    "Une erreur est survenue : donnée(s) non trouvée(s). Vos informations n'ont pas pu être mises à jour.";
                return next();
            }

            // Member info were not updated in DB because email or pseudo chosen is already existed
            if (typeof updateMemberProfil !== "object") {
                // Error message management
                switch (updateMemberProfil) {
                    case "email already used":
                        errorInfo.type = 409;
                        errorInfo.message =
                            "Une erreur est survenue, votre compte n'a pas pu être créé";
                        break;
                    case "pseudo already used":
                        errorInfo.type = 409;
                        errorInfo.message =
                            "Désolé, ce pseudo n'est pas disponible, merci d'en choisir un autre.";
                        break;
                }

                // Update error info
                if (errorInfo.type) {
                    response.locals.type = errorInfo.type;
                    response.locals.conflict = errorInfo.message;

                    // Go to errorController
                    return next();
                }
            }

            // Here, the member profil is updated in DB
            return response.status(200).json({ updateMemberProfil });
        } catch (error) {
            next(error);
        }
    },

    async delete(request, response, next) {
        try {
            // User ID targeted
            const { userId: id } = request.params;
    
            const memberToDelete = await memberDataMapper.deleteMemberById(id);

            // The member profil wasn't deleted in DB because it hasn't been found
            if (!memberToDelete) {
                response.locals.notFound = "Une erreur est survenue : donnée(s) non trouvée(s). Vos informations n'ont pas pu être supprimées.";
                return next();
            }

            // Here, the member profil is deleted in DB
            response.status(204).json();
            
        } catch (error) {
            
        }
    }
};

module.exports = memberController;
