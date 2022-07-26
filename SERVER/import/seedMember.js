require('dotenv').config();
const { Client } = require('pg');

// Get member's data
const members = require('./data_members.json');

( async () => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });
    await client.connect();

    // delete all the rows from "member" table
    await client.query(`TRUNCATE TABLE "member", "haberdashery", "review", "fabric", "project", "pattern", "photo", "project_has_haberdashery", "project_has_fabric", "project_has_pattern" RESTART IDENTITY CASCADE`);

    for (let member of members) {
        // loading data in "member" table
        await client.query(`INSERT INTO "member"("pseudo", "email", "password", "chest_measurement", "waist_measurement", "hip_measurement", "role", "avatar")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
            [
                member.pseudo,
                member.email,
                member.password == 1 ? (process.env.MEMBER_1) : (member.password == 2) ? (process.env.MEMBER_2) : (member.password == 3) ? (process.env.MEMBER_3) : (process.env.MEMBER_4),
                member.chest_measurement,
                member.waist_measurement,
                member.hip_measurement,
                member.role,
                member.avatar
            ])
    };

    await client.end();
})();