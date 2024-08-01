// src/services/balanceService.js
const fs = require('fs');
const path = require('path');
const { getBalance } = require('../utils/rpcClient');

const readBlockchainInfo = () => {
  const filePath = path.resolve(__dirname, '../../blockchains.txt');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return fileContent.split('\n').map(line => {
    const [name, rpcUrl, asset] = line.split(',');
    return { name, rpcUrl, assets: [asset] };
  });
};

const blockchains = readBlockchainInfo();

const checkBalances = async (address) => {
  for (const blockchain of blockchains) {
    console.log(`Checking balances on ${blockchain.name}`);
    const balance = await getBalance(blockchain.rpcUrl, address);
    console.log(`Balance of ${blockchain.assets[0]}: ${parseInt(balance, 16) / 1e18}`);
  }
};

module.exports = { checkBalances };