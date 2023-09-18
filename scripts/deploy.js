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

  // const fans = await ethers.deployContract('Fans3Shares');
  // await fans.waitForDeployment();
  // console.log('deploy fans address', fans.address);

  // deploy with proxy
  const Fans = await hre.ethers.getContractFactory('Fans3Shares');
  const proxy = await upgrades.deployProxy(Fans, []);
  await proxy.waitForDeployment();
  console.log('deploy address', proxy.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
