// src/index.js
const { checkBalances } = require('./services/balanceService');

const address = '0xYourCryptoAddressHere';

checkBalances(address).catch((error) => {
  console.error('Error checking balances:', error);
});

