require('dotenv').config(); // Initialize dotenv config

const express = require('express'); // Import express
const bodyParser = require('body-parser'); // Import body-parses
const logger = require('./bin/helpers/utils/logger');
const mysqlCon =require('./bin/helpers/databases/mysql/connection')
const config = require('./bin/configs/global_config')
const app = express(); // Create method
const port = process.env.PORT || 5000; // Default PORT

const route = require('./bin/app/server');

app.listen(port, () => {
  mysqlCon.init(config.get('/mysqlConfig'))
  logger.log('info',`App listening on port ${port}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', route);

