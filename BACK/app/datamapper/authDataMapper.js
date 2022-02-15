const client = require('./client');

const authDataMapper = {

    async createMember(memberInfo) {

        const { pseudo, email, password } = memberInfo;

        // Check if the member already exists
        const doesMemberAlreadyExist = await client.query(`SELECT "id", "pseudo", "email" FROM "member" WHERE "pseudo" = $1 OR email = $2`, [pseudo, email]);

        // a) if yes return an error
        if (doesMemberAlreadyExist.rowCount !== 0) {
            
            // Get request result
            const {rows: existingMember} = doesMemberAlreadyExist;
            
            // pseudo already exists -- error409
            if (existingMember[0].pseudo === pseudo) {
                return "pseudoAlreadyUsed";

                // email already exists -- error404
            } else {
                console.log("DatamaPer null");
                return null;
            }
        }
        
        // b) doesn't exist so create the member in DB
        const memberToCreate = await client.query(`INSERT INTO "member"("pseudo", "email", "password") VALUES($1, $2, $3) RETURNING *`,[pseudo, email, password]);

        // Get request result
        const {rows: createdMember} = memberToCreate;

        // Remove the password of the result
        delete createdMember[0].password;

        return createdMember[0];

        
    }
}

module.exports = authDataMapper;