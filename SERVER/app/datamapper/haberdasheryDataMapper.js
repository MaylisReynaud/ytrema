const client = require("./client");

const haberdasheryDataMapper = {
    async createHaberdashery(haberdasheryInfo, id) {
        const {
            name,
            website,
            haberdashery,
            quantity,
            price,
            size,
            unity,
            color,
            precise_color,
            photo,
            is_cut,
        } = haberdasheryInfo;

        let query;

        // Check if the haberdashery has already exist, if is_cut is false
        if (!is_cut) {
            const existingHaberdashery = await this.doesHaberdasheryExist(
                name,
                haberdashery,
                price,
                size,
                unity,
                color,
                precise_color,
                id
            );

            // If yes, update its quantity
            if (existingHaberdashery) {
                const newQuantity =
                    quantity + Number(existingHaberdashery.quantity);

                // Query to update the haberdashery quantity
                query = {
                    text: `UPDATE "haberdashery" SET "quantity" = $1 WHERE "id" = $2 RETURNING *`,
                    values: [newQuantity, existingHaberdashery.id],
                };

                // Send query to DB
                const updatedHaberdasheryResult = await client.query(query);

                // Get request result
                const { rows: updatedHaberdashery } = updatedHaberdasheryResult;

                // Return result
                return updatedHaberdashery[0];
            }
        }

        // If the haberdashery has not already exist or "is_cut" property is true, create it in the DB
        // Query to create haberdashery in DB
        query = {
            text: `INSERT INTO "haberdashery"("name", "website", "haberdashery", "quantity", "price", "size", "unity", "color", "precise_color", "photo", "is_cut", "member_id") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
            values: [
                name,
                website,
                haberdashery,
                quantity,
                price,
                size,
                unity,
                color,
                precise_color,
                photo,
                is_cut,
                id,
            ],
        };

        // If is_cut property is true, each quantity has to be saved in a distinct row in the DB
        if (is_cut && quantity > 1) {
            // Update the quantity to 1 in the query
            query.values[3] = 1;

            // Create each row in the DB except for the last one, It will be created outside of this condition
            for (let i = quantity; i > 1; i--) {
                await client.query(query);
            }
        }

        // Send query to DB
        const createdHaberdasheryResult = await client.query(query);

        // Get request result
        const { rows: createdHaberdashery } = createdHaberdasheryResult;
        // Return result
        return createdHaberdashery[0];
    },

    async doesHaberdasheryExist(
        name,
        haberdashery,
        price,
        size,
        unity,
        color,
        precise_color,
        id
    ) {
        // Query to search the haberdashery in DB
        const query = {
            text: `SELECT id, quantity FROM "haberdashery" WHERE "name" = $1 AND "haberdashery" = $2 AND "price" = $3 AND "size" = $4 AND "unity" = $5 AND "color" = $6 AND "precise_color" = $7 AND "member_id" = $8`,
            values: [
                name,
                haberdashery,
                price,
                size,
                unity,
                color,
                precise_color,
                id,
            ],
        };

        // Send query to DB
        const haberdasheryResult = await client.query(query);

        // The haberdashery does not exist so create it
        if (haberdasheryResult.rowCount == 0) {
            return null;
            // It exists update its quantity
        } else {
            // Get request result
            const { rows: existingHaberdashery } = haberdasheryResult;

            // Return result
            return existingHaberdashery[0];
        }
    },

    async getAllHaberdasheries(id) {
        // Query to get all haberdasheries in DB
        const query = {
            text: `SELECT h.*,
            JSON_AGG(DISTINCT vpopwhu) AS project_profile_photo_array
            FROM "haberdashery" h
            LEFT OUTER JOIN "view_photos_of_project_with_haberdasheries_used" vpopwhu
                ON h.id = vpopwhu.haberdashery_id
            WHERE h.member_id = $1
            GROUP BY h.id
            `,
            values: [id],
        };

        // Send query to DB
        const getAllHaberdasheriesResult = await client.query(query);

        // If the member has not saved any haberdashery yet -- success 204
        if (getAllHaberdasheriesResult.rowCount == 0) {
            return "No data";
        }

        // Get request result
        const { rows: allHaberdasheries } = getAllHaberdasheriesResult;

        // Treatment of the project profile photo array
        allHaberdasheries.map((h) =>
            {
                // For each array of project profile photo replace NULL value by an empty array when the haberdashery has not been used in any project yet
                h.project_profile_photo_array.length == 1 &&
            h.project_profile_photo_array[0] == null
                ? (h.project_profile_photo_array = [])
                : null;

                // Keep only the profile's photo for each project concerned
                if (h.project_profile_photo_array.length > 0) {
                    // Array of the projects' ids
                    const projectIdTab = h.project_profile_photo_array.map(e => e.project_id);

                    // Remove duplicates
                    h.project_profile_photo_array = h.project_profile_photo_array.filter(
                        ({ project_id }, index) => projectIdTab.indexOf(project_id) === index
                    );

                }
            }
        );

        // Return result
        return allHaberdasheries;
    },

    async getHaberdasheryById(id, haberdasheryId) {
        // Query to get one haberdashery in DB
        const query = {
            text: `SELECT * FROM "haberdashery" WHERE "member_id" = $1 and "id" = $2`,
            values: [id, haberdasheryId],
        };

        // Send query to DB
        const getOneHaberdasheryResult = await client.query(query);

        // Haberdashery not found in DB --error404
        if (getOneHaberdasheryResult.rowCount == 0) {
            return null;
        }

        // Get request result
        const { rows: oneHaberdashery } = getOneHaberdasheryResult;

        // Return result
        return oneHaberdashery[0];
    },

    async updateHaberdasheryById(id, haberdasheryId, haberdasheryInfoToUpdate) {
        // haberdashery info to update
        const {
            name,
            website,
            haberdashery,
            quantity,
            price,
            size,
            unity,
            color,
            precise_color,
            photo,
            is_cut,
        } = haberdasheryInfoToUpdate;

        // Query to update haberdashery in DB
        const query = {
            text: `UPDATE "haberdashery" SET "name" = $1, "website" = $2, "haberdashery" = $3, "quantity" = $4, "price" = $5, "size" = $6, "unity" = $7, "color" = $8, "precise_color" = $9, "photo" = $10, "is_cut" = $11 WHERE "member_id" = $12 AND "id" = $13 RETURNING *`,
            values: [
                name,
                website,
                haberdashery,
                quantity,
                price,
                size,
                unity,
                color,
                precise_color,
                photo,
                is_cut,
                id,
                haberdasheryId,
            ],
        };

        // If is_cut property is true and quantity property greater than 1, only the existing row in the DB can be updated, it is necessary to create the other rows.
        if (is_cut && quantity > 1) {
            // Update the quantity to subtract the row that will be updated in the DB
            haberdasheryInfoToUpdate.quantity = quantity - 1;

            // Create the other rows
            await this.createHaberdashery(haberdasheryInfoToUpdate, id);

            // Update the quantity to 1 in the updating query
            query.values[3] = 1;
        }

        // Send query to DB
        const updatedHaberdasheryResult = await client.query(query);

        // Haberdashery not found in DB --error404
        if (updatedHaberdasheryResult.rowCount == 0) {
            return null;
        }

        // Get request result
        const { rows: updatedHaberdashery } = updatedHaberdasheryResult;

        // Return result
        return updatedHaberdashery[0];
    },

    async deleteHaberdasheryById(id, haberdasheryId) {
        //  Query to delete the haberdashery data
        const query = {
            text: `DELETE FROM "haberdashery" WHERE "member_id" = $1 AND "id" = $2`,
            values: [id, haberdasheryId],
        };

        // Send the query to DB
        const haberdasheryToDeleteResult = await client.query(query);

        // Get request result
        const { rowCount } = haberdasheryToDeleteResult;

        // Any rows weren't deleted in DB --error404
        if (rowCount == 0) {
            return null;
        }

        // Here, the haberdashery data has been deleted
        return true;
    },

    async deleteAll(id) {
        //  Query to delete all fhaberdasheries in DB
        const query = {
            text: `DELETE FROM "haberdashery" WHERE "member_id" = $1`,
            values: [id],
        };

        // Send the query to DB
        const allHaberdasheriesToDeleteResult = client.query(query);

        // Get request result
        const { rowCount } = allHaberdasheriesToDeleteResult;

        // Any rows weren't deleted in DB --error404
        if (rowCount == 0) {
            return null;
        }

        // Here, all haberdasheries data have been deleted
        return true;
    },
};

module.exports = haberdasheryDataMapper;
