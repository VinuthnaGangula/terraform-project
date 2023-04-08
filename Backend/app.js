require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const router = require('./Router/route');
app.use(bodyParser.json());
app.use(cors());
const serverless = require('serverless-http');
router(app);

app.listen(3001, (err) => {
    if (err) {
        console.log('Error:' + err);
    }
    console.log('Server running at 3001: 3001');
});

module.exports.handler = serverless(app);