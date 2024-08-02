// src/services/balanceService.js
const fs = require('fs');
const path = require('path');
const { getBalance } = require('../utils/rpcClient');
const config = require('../config');

const readBlockchainInfo = () => {
  const filePath = path.resolve(__dirname, '../../blockchains.txt');
  const fileContent = fs.readFileSync(filePath, 'utf-8').trim();
  return fileContent.split('\n').map(line => {
    const [name, rpcUrlBase, asset] = line.split(',');
    const rpcUrl = `${rpcUrlBase}${config.infuraProjectId}`;
    return { name, rpcUrl, assets: [asset] };
  });
};

const blockchains = readBlockchainInfo();

const checkBalances = async (address) => {
  for (const blockchain of blockchains) {
    console.log(`Checking balances on ${blockchain.name}`);
    try {
      const balance = await getBalance(blockchain.rpcUrl, address);
      console.log(`Balance of ${blockchain.assets[0]}: ${parseInt(balance, 16) / 1e18}`);
    } catch (error) {
      console.error(`Error checking balance on ${blockchain.name}:`, error);
    }
  }
};

module.exports = { checkBalances };
