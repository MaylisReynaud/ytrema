const client = require("./client");

const patternDataMapper = {
    async createPattern(patternInfo, id) {
        const {
            name,
            website,
            brand,
            clothing,
            gender,
            price,
            personal_notes,
            format,
            pdf_instructions,
            photo,
        } = patternInfo;

        let query;

        // Query to create pattern in DB
        query = {
            text: `INSERT INTO "pattern"("name", "website", "brand", "clothing", "gender", "price", "personal_notes", "format", "pdf_instructions", "photo", "member_id") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
            values: [
                name,
                website,
                brand,
                clothing,
                gender,
                price,
                personal_notes,
                format,
                pdf_instructions,
                photo,
                id,
            ],
        };


        // Send query to DB
        const createdPatternResult = await client.query(query);

        // Get request result
        const { rows: createdPattern } = createdPatternResult;
        // Return result
        return createdPattern[0];
    },

    async getAllPatterns(id) {
        // Query to get all patterns in DB
        const query = {
            text: `SELECT * FROM "pattern" WHERE "member_id" = $1`,
            values: [id],
        };

        // Send query to DB
        const getAllPatternsResult = await client.query(query);

        // If the member has not saved any pattern yet -- success 204
        if (getAllPatternsResult.rowCount == 0) {
            return "No data";
        }

        // Get request result
        const { rows: allPatterns } = getAllPatternsResult;

        // Return result
        return allPatterns;
    },

    async getPatternById(id, patternId) {
        // Query to get one pattern in DB
        const query = {
            text: `SELECT * FROM "pattern" WHERE "member_id" = $1 and "id" = $2`,
            values: [id, patternId],
        };

        // Send query to DB
        const getOnePatternResult = await client.query(query);

        // Pattern not found in DB --error404
        if (getOnePatternResult.rowCount == 0) {
            return null;
        }

        // Get request result
        const { rows: onePattern } = getOnePatternResult;

        // Return result
        return onePattern[0];
    },

    async updatePatternById(id, patternId, patternInfoToUpdate) {
        // pattern info to update
        const {
            name,
            website,
            brand,
            clothing,
            gender,
            price,
            personal_notes,
            format,
            pdf_instructions,
            photo,
        } = patternInfoToUpdate;

        // Query to update pattern in DB
        const query = {
            text: `UPDATE "pattern" SET "name" = $1, "website" = $2, "brand" = $3, "clothing" = $4, "gender" = $5, "price" = $6, "personal_notes" = $7, "format" = $8, "pdf_instructions" = $9, "photo" = $10 WHERE "member_id" = $11 AND "id" = $12 RETURNING *`,
            values: [
                name,
                website,
                brand,
                clothing,
                gender,
                price,
                personal_notes,
                format,
                pdf_instructions,
                photo,
                id,
                patternId,
            ],
        };


        // Send query to DB
        const updatedPatternResult = await client.query(query);

        // Haberdashery not found in DB --error404
        if (updatedPatternResult.rowCount == 0) {
            return null;
        }

        // Get request result
        const { rows: updatedPattern } = updatedPatternResult;

        // Return result
        return updatedPattern[0];
    },

    async deletePatternById(id, patternId) {
        //  Query to delete the pattern data
        const query = {
            text: `DELETE FROM "pattern" WHERE "member_id" = $1 AND "id" = $2`,
            values: [id, patternId],
        };

        // Send the query to DB
        const patternToDeleteResult = await client.query(query);

        // Get request result
        const { rowCount } = patternToDeleteResult;

        // Any rows weren't deleted in DB --error404
        if (rowCount == 0) {

            return null;
        }

        // Here, the pattern data has been deleted
        return true;
    },
};

module.exports = patternDataMapper;