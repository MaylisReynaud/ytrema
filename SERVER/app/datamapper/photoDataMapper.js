const client = require("./client");

const photoDataMapper = {
    async doesThisProjectBelongToThisMember(projectId, memberId) {
        // Query to search this in DB
        const query = {
            text: `SELECT * FROM "project" WHERE "id" = $1 AND member_id = $2`,
            values: [projectId, memberId],
        };

        // Send query to DB
        const projectResult = await client.query(query);

        // Any project with this ID isn't existing for this member
        if (projectResult.rowCount == 0) {
            return null;
            // It exists we can create a note for it
        } else {
            // Get request result
            return true;
        }
    },

    async createPhoto(photoInfo, projectId, id) {
        const { personal_notes, photo } = photoInfo;

        let query;

        // Check if this project belongs to this member
        const existingProject = await this.doesThisProjectBelongToThisMember(
            projectId,
            id
        );

        if (!existingProject) {
            return null;
        }

        // Query to save the photo in DB
        query = {
            text: `INSERT INTO "photo"("photo", "personal_notes", "project_id") VALUES($1, $2, $3) RETURNING *`,
            values: [photo, personal_notes, projectId],
        };

        // Query to send when any photo isn't sent
        !photo &&
            (query = {
                text: `INSERT INTO "photo"("personal_notes", "project_id") VALUES($1, $2) RETURNING *`,
                values: [personal_notes, projectId],
            });

        // Send query to DB
        const createdPhotoResult = await client.query(query);

        // Get request result
        const { rows: createdPhoto } = createdPhotoResult;

        // Return result
        return createdPhoto[0];
    },

    async getAllPhotos(id, projectId) {
        // Query to get all photos of a defined project for a member
        const query = {
            text: `SELECT * FROM "view_of_all_photos_of_projects" WHERE project_id = $1 AND member_id = $2 ORDER BY id ASC`,
            values: [projectId, id],
        };

        // Send query to DB
        const getAllPhotosResult = await client.query(query);

        // If the member has not saved any photo yet -- success 204
        if (getAllPhotosResult.rowCount == 0) {
            return "No data";
        }

        // Get request result
        const { rows: allPhotos } = getAllPhotosResult;

        // Return result
        return allPhotos;
    },

    async getPhotoById(id, photoId, projectId) {
        // Query to get one photo by its ID of a defined project for a member
        const query = {
            text: `SELECT * FROM "view_of_all_photos_of_projects" WHERE id = $1 AND project_id = $2 AND member_id = $3`,
            values: [photoId, projectId, id],
        };

        // Send query to DB
        const getOnePhotoResult = await client.query(query);

        // Photo not found in DB --error404
        if (getOnePhotoResult.rowCount == 0) {
            return null;
        }

        // Get request result
        const { rows: onePhoto } = getOnePhotoResult;

        // Return result
        return onePhoto[0];
    },

    async updatePhotoById(id, photoId, photoInfoToUpdate, projectId) {
        // photo info to update
        const { personal_notes, photo } = photoInfoToUpdate;

        let query;

        // Check if this project belongs to this member
        const existingProject = await this.doesThisProjectBelongToThisMember(
            projectId,
            id
        );

        if (!existingProject) {
            return null;
        }

        // Query to update photo in DB
        query = {
            text: `UPDATE "photo" SET "photo" = $1, "personal_notes" = $2 WHERE "id" = $3 AND project_id = $4 RETURNING *`,
            values: [photo, personal_notes, photoId, projectId],
        };

        // If photo ID equal 1 only the photo field must be updated
        photoId == 1 &&
            (query.text = `UPDATE "photo" SET "photo" = $1 WHERE "id" = $2 AND project_id = $3 RETURNING *`,
            query.values = [photo, photoId, projectId]);

        // Send query to DB
        const updatedPhotoResult = await client.query(query);

        // Haberdashery not found in DB --error404
        if (updatedPhotoResult.rowCount == 0) {
            return null;
        }

        // Get request result
        const { rows: updatedPhoto } = updatedPhotoResult;

        // Return result
        return updatedPhoto[0];
    },

    async deletePhotoById(id, photoId, projectId) {
        // Check if this project belongs to this member
        const existingProject = await this.doesThisProjectBelongToThisMember(
            projectId,
            id
        );

        if (!existingProject) {
            return null;
        }

        //  Query to delete the photo data
        const query = {
            text: `DELETE FROM "photo" WHERE "id" = $1 AND "project_id" = $2`,
            values: [photoId, projectId],
        };

        // Send the query to DB
        const photoToDeleteResult = await client.query(query);

        // Get request result
        const { rowCount } = photoToDeleteResult;

        // Any rows weren't deleted in DB --error404
        if (rowCount == 0) {
            return null;
        }

        // Here, the photo data has been deleted
        return true;
    },
};

module.exports = photoDataMapper;
