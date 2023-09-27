require('dotenv/config')
require('@openzeppelin/hardhat-upgrades')
// require('@nomiclabs/hardhat-web3');
require('@nomicfoundation/hardhat-verify')

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

function accounts() {
  privatekey = process.env.PrivateKey
  if (!privatekey)
    return {
      mnemonic: 'test test test test test test test test test test test junk',
    }
  return [privatekey]
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  networks: {
    hardhat: {},
    localhost: {
      url: 'http://127.0.0.1:8545',
      accounts: accounts(),
    },
    online: {
      chainId: 1,
      url: process.env.NETWORK_INFURA_URL_MAINNET,
      accounts: accounts(),
    },
    goerli: {
      gasPrice: 3000000000,
      url: process.env.NETWORK_INFURA_URL_GOERLI,
      accounts: accounts(),
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.19',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
}
