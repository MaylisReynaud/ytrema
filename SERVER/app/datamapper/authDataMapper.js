const client = require('./client');

const authDataMapper = {

    async createMember(memberInfo) {
        
        const { pseudo, email, password } = memberInfo;

        // Query to check if the member already exists
        const doesMemberAlreadyExistQuery = {
            text: `SELECT "id", "pseudo", "email" FROM "member" WHERE "pseudo" = $1 OR email = $2`,
            values: [pseudo, email]
        };

        // Send query to DB
        const doesMemberAlreadyExistResult = await client.query(doesMemberAlreadyExistQuery);

        // a) if he already exists return an error
        if (doesMemberAlreadyExistResult.rowCount !== 0) {
            
            // Get request result
            const {rows: existingMember} = doesMemberAlreadyExistResult;
            
            // pseudo already exists -- error409
            if (existingMember[0].pseudo === pseudo) {
                return "pseudoAlreadyUsed";

                // email already exists -- error404
            } else {
                return null;
            }
        }
        
        // b) doesn't exist so create the member in DB
        const memberToCreateQuery = {
            text: `INSERT INTO "member"("pseudo", "email", "password") VALUES($1, $2, $3) RETURNING *`,
            values: [pseudo, email, password]
        };

        // Send query to DB
        const createdMemberResult = await client.query(memberToCreateQuery);

        // Get request result
        const {rows: createdMember} = createdMemberResult ;

        // Remove the password of the result
        delete createdMember[0].password;

        // Return result
        return createdMember[0];

    },

    async getMemberByEmail(email) {
        
        // Query to get the member info from his email
        const getMemberByEmailQuery = {
            text: `SELECT "id", "pseudo", "password" FROM "member" WHERE "email" = $1`,
            values: [email]
        };

        // Send query to DB
        const getMemberByEmailResult = await client.query(getMemberByEmailQuery);

        // Email not found in DB --error404
        if (getMemberByEmailResult.rowCount == 0) {
            return null;
        }

        // Get request result
        const {rows: foundMember} = getMemberByEmailResult;

        // Return result
        return foundMember[0];

    }
}

module.exports = authDataMapper;