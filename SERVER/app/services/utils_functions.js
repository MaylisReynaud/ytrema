const bcrypt = require("bcrypt");
const saltRounds = process.env.SALTROUNDS;

const checkingPassword = {
    // Function to check if password and check password matche
    async doBothPwdMatch(password, checkPassword) {
        // If not, configure an object to update error info
        if (password !== checkPassword) {
            return {
                type: 409,
                message: `Les saisies dans les champs 'mot de passe' et 'confirmation du mot de passe' doivent être identiques.`,
            };
        }
        // If yes, return true
        return true;
    },

    // Function to hash password
    async hashPwd(password) {
        // Return hashed password
        return bcrypt.hashSync(password, Number(saltRounds));
    },

    // Function to compare the password and the hashed password stored in DB
    async comparePwd(password, storedHashedPwd) {
        return bcrypt.compareSync(password, storedHashedPwd);
    }
};

module.exports = checkingPassword;
