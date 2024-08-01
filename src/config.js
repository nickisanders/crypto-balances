// src/config.js
require('dotenv').config();

const config = {
  infuraProjectId: process.env.INFURA_PROJECT_ID,
  alchemyApiKey: process.env.ALCHEMY_API_KEY,
};

module.exports = config;

