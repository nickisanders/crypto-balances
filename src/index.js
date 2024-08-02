// src/index.js
const { checkBalances } = require('./services/balanceService');

const address = '0x445df4f5fd31F2F89c9A9694E9AA8a5F4e43D2b1';

checkBalances(address).catch((error) => {
  console.error('Error checking balances:', error);
});

