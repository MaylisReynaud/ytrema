const client = require("./client");

const fabricDataMapper = {
    async createFabric(fabricInfo, id) {
        const {
            name,
            website,
            designer,
            color,
            precise_color,
            fabric,
            composition,
            weight,
            quantity,
            width,
            price,
            photo
        } = fabricInfo;

        // Query to create fabric in DB
        const query = {
            text: `INSERT INTO "fabric"("name", "website", "designer", "color", "precise_color", "fabric", "composition", "weight", "quantity", "width", "price", "photo", "member_id") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
            values: [
                name,
                website,
                designer,
                color,
                precise_color,
                fabric,
                composition,
                weight,
                quantity,
                width,
                price,
                photo,
                id
            ]
        };

        // Send query to DB
        const createdFabricResult = await client.query(query);

        // Get request result
        const { rows: createdFabric } = createdFabricResult;
        // Return result
        return createdFabric[0];
    },

    async getAllFabrics(id) {
        // Query to get all fabrics in DB
        const query = {
            text: `SELECT * FROM "fabric" WHERE "member_id" = $1`,
            values: [id]
        };

        // Send query to DB
        const getAllFabricsResult = await client.query(query);

        // If the member has not saved any fabric yet -- success 204
        if (getAllFabricsResult.rowCount == 0) {
            return "No data";
        }

        // Get request result
        const {rows: allFabrics} = getAllFabricsResult;

        // Return result
        return allFabrics;
    },

    async getFabricById(id, fabricId) {
        // Query to get one fabric in DB
        const query = {
            text: `SELECT * FROM "fabric" WHERE "member_id" = $1 and "id" = $2`,
            values: [id, fabricId]
        };

        // Send query to DB
        const getOneFabricResult = await client.query(query);

        // Fabric not found in DB --error404
        if (getOneFabricResult.rowCount == 0) {
            return null;
        }

        // Get request result
        const {rows: oneFabric} = getOneFabricResult;

        // Return result
        return oneFabric[0];
    },

    async updateFabricById(id, fabricId, fabricInfoToUpdate) {
        // fabric info to update
        const {
            name,
            website,
            designer,
            color,
            precise_color,
            fabric,
            composition,
            weight,
            quantity,
            width,
            price,
            photo
        } = fabricInfoToUpdate;

        // Query to update fabric in DB
        const query = {
            text: `UPDATE "fabric" SET "name" = $1, "website" = $2, "designer" = $3, "color" = $4, "precise_color" = $5, "fabric" = $6, "composition" = $7, "weight" = $8, "quantity" = $9, "width" = $10, "price" = $11, "photo" = $12 WHERE "member_id" = $13 AND "id" = $14 RETURNING *`,
            values: [
                name,
                website,
                designer,
                color,
                precise_color,
                fabric,
                composition,
                weight,
                quantity,
                width,
                price,
                photo,
                id,
                fabricId
            ]
        };

        // Send query to DB
        const updatedFabricResult = await client.query(query);

        // Fabric not found in DB --error404
        if (updatedFabricResult.rowCount == 0) {
            return null;
        }

        // Get request result
        const {rows: updatedFabric} = updatedFabricResult;

        // Return result
        return updatedFabric[0];

    },

    async deleteFabricById(id, fabricId) {
        //  Query to delete the fabric data
        const query = {
            text: `DELETE FROM "fabric" WHERE "member_id" = $1 AND "id" = $2`,
            values: [id, fabricId],
        };

        // Send the query to DB
        const fabricToDeleteResult = client.query(query);

        // Get request result
        const { rowCount } = fabricToDeleteResult;

        // Any rows weren't deleted in DB --error404
        if (rowCount == 0) {
            return null;
        }

        // Here, the fabric data has been deleted
        return true;
    },
};

module.exports = fabricDataMapper;
