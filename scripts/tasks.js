// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require('hardhat');

async function main() {
  const accounts = await hre.ethers.getSigners();
  const owner = accounts[0];
  console.log('owner', owner.address);

  const contractAddr = '0x9afe95fd31bc74c30ca1d326d92a80159e22eb14';
  const fans = await hre.ethers.getContractAt('Fans3Shares', contractAddr);

  // get price
  const price = await fans.getPrice(3, 1);
  console.log('price', price);
  return;

  const tx = await fans.buyShares(owner.address, 1);
  console.log(tx);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
