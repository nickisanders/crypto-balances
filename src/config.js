// src/config.js
require('dotenv').config();

const config = {
  infuraProjectId: process.env.INFURA_PROJECT_ID
};

module.exports = config;

