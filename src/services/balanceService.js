
const fs = require('fs');
const path = require('path');
const {Web3} = require('web3');
const { getBalance } = require('../utils/rpcClient');
const config = require('../config');

// ERC20 ABI to interact with the token contracts
const ERC20_ABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
];

const readBlockchainInfo = () => {
  const filePath = path.resolve(__dirname, '../../blockchains.txt');
  const fileContent = fs.readFileSync(filePath, 'utf-8').trim();
  return fileContent.split('\n').map(line => {
    const [name, rpcUrlBase, nativeAsset, tokenAddress, tokenSymbol] = line.split(',');
    const rpcUrl = `${rpcUrlBase}${config.infuraProjectId}`;
    return { name, rpcUrl, nativeAsset, tokenAddress, tokenSymbol };
  });
};

const blockchains = readBlockchainInfo();

const checkBalances = async (address) => {
  for (const blockchain of blockchains) {
    const web3 = new Web3(new Web3.providers.HttpProvider(blockchain.rpcUrl));
    
    // Check native asset balance
    console.log(`Checking balances on ${blockchain.name}`);
    try {
      const balance = await getBalance(blockchain.rpcUrl, address);
      console.log(`Balance of ${blockchain.nativeAsset}: ${parseInt(balance, 16) / 1e18}`);
    } catch (error) {
      console.error(`Error checking balance on ${blockchain.name} for native asset:`, error);
    }

    // Check ERC20 token balance
    if (blockchain.tokenAddress && blockchain.tokenSymbol) {
      const tokenContract = new web3.eth.Contract(ERC20_ABI, blockchain.tokenAddress);
      try {
        const tokenBalance = await tokenContract.methods.balanceOf(address).call();
        // Convert BigInt to number safely
        console.log(`Balance of ${blockchain.tokenSymbol}: ${Number(tokenBalance) / 1e18}`);
      } catch (error) {
        console.error(`Error checking balance on ${blockchain.name} for token ${blockchain.tokenSymbol}:`, error);
      }
    }
  }
};

module.exports = { checkBalances };
