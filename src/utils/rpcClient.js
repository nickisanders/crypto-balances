// src/utils/rpcClient.js
const axios = require('axios');

const getBalance = async (rpcUrl, address) => {
  const response = await axios.post(rpcUrl, {
    jsonrpc: '2.0',
    method: 'eth_getBalance',
    params: [address, 'latest'],
    id: 1,
  });
  return response.data.result;
};

module.exports = { getBalance };

