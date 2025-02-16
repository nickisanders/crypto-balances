# Crypto Balances

**Crypto Balances** is a Node.js service that checks the asset balances of a specified crypto address across multiple blockchains using external RPC services.

## Features

- Checks balances for multiple blockchains
- Configurable via an external text file
- Uses Infura for Ethereum and Polygon

## Setup

### Prerequisites

- Node.js
- NPM

### Installation

1. Clone the repository:
    ```sh
    git clone git@github.com:nickisanders/crypto-balances.git
    cd crypto-balances
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory with your Infura project ID:
    ```env
    INFURA_PROJECT_ID=your_infura_project_id
    ```

4. Create a `blockchains.txt` file in the root directory:
    ```txt
    Ethereum,https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID,ETH
    Polygon,https://polygon-mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID,MATIC
    ```

## Usage

1. Update the address in `src/index.js`:
    ```javascript
    const address = '0xYourCryptoAddressHere';
    ```

2. Run the service:
    ```sh
    npm run start
    ```

## Project Structure

```
crypto-balances/
|-- src/
|   |-- config.js
|   |-- services/
|   |   |-- balanceService.js
|   |-- utils/
|   |   |-- rpcClient.js
|   |-- index.js
|-- blockchains.txt
|-- .env
|-- package.json
```

## Contributing

Contributions are welcome! Please fork this repository and submit pull requests.

## License

This project is licensed under the MIT License.
