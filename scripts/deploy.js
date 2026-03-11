const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying TokuSBT with account:", deployer.address);

  const TokuSBT = await ethers.getContractFactory("TokuSBT");
  const sbt = await TokuSBT.deploy();
  await sbt.waitForDeployment();

  const address = await sbt.getAddress();
  console.log("TokuSBT deployed to:", address);
  console.log("\nAdd this to your .env.local:");
  console.log(`NEXT_PUBLIC_SBT_CONTRACT_ADDRESS=${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
