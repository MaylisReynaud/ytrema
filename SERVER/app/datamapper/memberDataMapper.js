const client = require("./client");

const memberDataMapper = {
    async getMemberById(id) {
        // Query to get member info from ID
        const getMemberByIdQuery = {
            text: `SELECT * FROM "member" WHERE "id" = $1`,
            values: [id],
        };

        // Send query to DB
        const getMemberByIdResult = await client.query(getMemberByIdQuery);

        // Member not found in DB --error404
        if (getMemberByIdResult.rowCount === 0) {
            return null;
        }

        // Get request result
        const { rows: foundMember } = getMemberByIdResult;

        // Remove the password of the result
        delete foundMember[0].password;

        // Return result
        return foundMember[0];
    },

    async updateMemberById(id, memberInfoToUpdate) {
        // Member info to update
        const { pseudo, email, password, checkPassword, ...rest } =
            memberInfoToUpdate;
            
        // Booleans to control if the data update is allowed
        let updateEmailAllowed = false;
        let updatePseudoAllowed = false;

        // Query to get the member info from his email or update
        let query = {
            text: `SELECT "email" FROM "member" WHERE "email" = $1`,
            values: [email],
        };

        // If email info to update
        if (email) {
            // Send query to DB to check if the email is already existed
            const getMemberByEmailResult = await client.query(query);

            // If yes, email is already existed --error409
            if (getMemberByEmailResult.rowCount != 0) {
                return "email already used";
            }

            // If not, allow updating email
            updateEmailAllowed = true;
        }

        // If pseudo info to update
        if (pseudo) {
            // Send query to DB to check if the pseudo is already existed
            query = {
                text: `SELECT "pseudo" FROM "member" WHERE pseudo = $1`,
                values: [pseudo],
            };

            const getMemberByPseudoResult = await client.query(query);

            // If yes, pseudo is already existed --error409
            if (getMemberByPseudoResult.rowCount != 0) {
                return "pseudo already used";
            }

            // If not, allow updating pseudo
            updatePseudoAllowed = true;
        }

        // If password info to update, send the query to DB
        if (password) {
            query = {
                text: `UPDATE "member" SET "password" =$1 WHERE "id" = $2`,
                values: [password, id],
            };

            const updatePasswordResult = await client.query(query);

            // Get request result
            const { rowCount } = updatePasswordResult;

            // Any rows weren't updated in DB --error404
            if (rowCount == 0) {
                return null;
            }
        }

        // The update of email is allowed, send the query to DB
        if (email && updateEmailAllowed) {
            query = {
                text: `UPDATE "member" SET "email" = $1 WHERE "id" = $2`,
                values: [email, id],
            };

            const updateEmailResult = await client.query(query);

            // Get request result
            const { rowCount } = updateEmailResult;

            // Any rows weren't updated in DB --error404
            if (rowCount == 0) {
                return null;
            }
        }

        // The update of pseudo is allowed, send the query to DB
        if (pseudo && updatePseudoAllowed) {
            query = {
                text: `UPDATE "member" SET "pseudo" = $1 WHERE "id" = $2`,
                values: [pseudo, id],
            };

            const updatePseudoResult = await client.query(query);

            // Get request result
            const { rowCount } = updatePseudoResult;

            // Any rows weren't updated in DB --error404
            if (rowCount == 0) {
                return null;
            }
        }

        // Send query to DB to update the other info
        if (rest) {
            const {
                chest_measurement,
                waist_measurement,
                hip_measurement,
                avatar,
            } = rest;

            query = {
                text: `UPDATE "member" SET "chest_measurement" = $1, "waist_measurement" = $2, "hip_measurement" = $3, "avatar" = $4 WHERE "id" = $5`,
                values: [
                    chest_measurement,
                    waist_measurement,
                    hip_measurement,
                    avatar,
                    id
                ],
            };

            const updateOtherInfoResult = await client.query(query);

            // Get request result
            const { rowCount } = updateOtherInfoResult;

            // Any rows weren't updated in DB --error404
            if (rowCount == 0) {
                return null;
            }
        }

        // Return the result of the update
        const updatedMemberResult = await this.getMemberById(id);

        return updatedMemberResult;
    },

    async deleteMemberById(id) {
        
        //  Query to delete the member profil
        const memberToDeleteQuery = {
            text: `DELETE FROM "member" WHERE "id" = $1`,
            values: [id]
        }

        // Send the query to DB
        const memberToDeleteResult = client.query(memberToDeleteQuery);

        // Get request result
        const { rowCount } = memberToDeleteResult;

        // Any rows weren't deleted in DB --error404
        if (rowCount == 0) {
            return null;
        }

        // Here, the member profil has been deleted
        return true;
    }
};

module.exports = memberDataMapper;
