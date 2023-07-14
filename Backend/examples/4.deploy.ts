// Introduction on deploy a contract
import { ethers } from "ethers";
import * as fs from "fs-extra"; // In case you want to directly use the generated compiled
/* import { abi } from "./data/deployContract_sol_SimpleStorage"; // you can use this instead of the readfile
import { bin } from "./data/deployContract_sol_SimpleStorage_bin";  */ // you can use this instead of the readfile
import "dotenv/config";

// const abi = ["function proposalCounts() view returns (uint256)"]; // other way to define the abi

const api_key = process.env.PROVIDER_API_KEY;

async function main() {
  let provider = new ethers.AlchemyProvider(80001, api_key);
  let wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
  //  from read file
  const abi = fs.readFileSync(
    "./examples/data/compiled/Voting_sol_Voting.abi",
    "utf8"
  );
  const bin = fs.readFileSync(
    "./examples/data/compiled//Voting_sol_Voting.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, bin, wallet);
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy();
  console.log(`contract: ${contract}`);
  const contractDeployed = await contract.waitForDeployment();
  console.log(`contractDeployed: ${contractDeployed}`);
  const deploymentReceipt = await contract.deploymentTransaction()?.wait();
  console.log(`deploymentReceipt: ${deploymentReceipt}`);
  console.log(`Contract deployed to ${contract.getAddress()}`);
  console.log("Here is the transaction:");
  console.log(contract.deploymentTransaction);

  // let currentProposalCounts = await contract.;
  // console.log(`Current proposal count is ${currentProposalCounts}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
