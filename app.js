require('dotenv').config();
const express = require('express');
const cors = require('cors');

const router = require('./BACK/app/router');

const app = express();

app.use(express.json());
app.use(cors('*'));

app.use(router);

app.listen(process.env.PORT || 4000, () => {
    console.log('Server running on : ', process.env.PORT);
});


