const client = require("./client");

const reviewDataMapper = {
    async createOrUpdateReview(reviewInfo, id) {
        const { content } = reviewInfo;

        // Has the member already written a comment?
        let query = {
            text: `SELECT "id" FROM "review" WHERE "member_id" = $1`,
            values: [id],
        };

        // Send query to DB
        const existingReviewResult = await client.query(query);

        // Yes, he has already done it. Update the existing comment in DB
        if (existingReviewResult.rowCount == 1) {
            query.text = `UPDATE "review" SET "content" = $2 WHERE id = $1 RETURNING *`;
            query.values = [existingReviewResult.rows[0].id, content];

            // Send query to DB
            const updatedReviewResult = await client.query(query);

            // Get request result
            const { rows: updatedReview } = updatedReviewResult;

            // Return result
            return updatedReview[0];
        }

        // No, It's the first time. Create the review in DB
        query.text = `INSERT INTO "review"("content", "member_id") VALUES($1, $2) RETURNING *`;
        query.values = [content, id];

        // Send query to DB
        const createdReviewResult = await client.query(query);

        // Get request result
        const { rows: createdReview } = createdReviewResult;
        // Return result
        return { status: "created", data: createdReview[0] };
    },

    async getAllReviews() {
        // Query to get all reviews
        const query = {
            text: `SELECT * FROM "review" ORDER BY id ASC`,
        };

        // Send query to DB
        const getAllReviewsResult = await client.query(query);

        // If no review yet -- success 204
        if (getAllReviewsResult.rowCount == 0) {
            return "No data";
        }

        // Get request result
        const { rows: allReviews } = getAllReviewsResult;

        // Return result
        return allReviews;
    },

    async getReviewByUserId(id) {
        // Query to get the review in DB
        const query = {
            text: `SELECT * FROM "review" WHERE "member_id" = $1`,
            values: [id],
        };

        // Send query to DB
        const getOneReviewResult = await client.query(query);

        // Review not found in DB --error404
        if (getOneReviewResult.rowCount == 0) {
            return null;
        }

        // Get request result
        const { rows: oneReview } = getOneReviewResult;

        // Return result
        return oneReview[0];
    },

    async deleteReviewByUserId(id) {
        //  Query to delete the review
        const query = {
            text: `DELETE FROM "review" WHERE "member_id" = $1`,
            values: [id,],
        };

        // Send the query to DB
        const reviewToDeleteResult = client.query(query);

        // Get request result
        const { rowCount } = reviewToDeleteResult;

        // Any rows weren't deleted in DB --error404
        if (rowCount == 0) {
            return null;
        }

        // Here, the review data has been deleted
        return true;
    },
};

module.exports = reviewDataMapper;
