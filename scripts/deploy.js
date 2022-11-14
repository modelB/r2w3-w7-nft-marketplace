const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("deployer obtained");
  const balance = await deployer.getBalance();
  console.log("balance obtained");
  const Marketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  console.log("Marketplace factory established");
  const marketplace = await Marketplace.deploy();
  console.log("marketplace instance created");

  await marketplace.deployed();
  console.log("marketplace deployed");

  const data = {
    address: marketplace.address,
    abi: JSON.parse(marketplace.interface.format("json")),
  };

  //This writes the ABI and address to the mktplace.json
  fs.writeFileSync("./src/Marketplace.json", JSON.stringify(data));
  console.log("deploy finished");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
