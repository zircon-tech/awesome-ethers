// Introduction on deploy a contract
import { ethers } from "ethers";
import * as fs from "fs-extra"; // In case you want to directly use the generated compiled
import { Voting_sol_Voting } from "./data/types/Voting_sol_Voting";
import "dotenv/config";

const api_key = process.env.PROVIDER_API_KEY;

async function main() {
  let provider = new ethers.InfuraProvider(5, api_key); // goerli
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
  console.log(`contract is being deployed`);
  await contract.waitForDeployment();
  await contract.deploymentTransaction()?.wait();
  const contractAddress = await contract.getAddress();
  console.log(`Contract deployed to ${contractAddress}`);
  const deployTx = await contract.deploymentTransaction();
  console.log("Here is the transaction:");
  console.log(deployTx);
  // Now get a typed instance of the contract
  const voting = new ethers.Contract(
    contractAddress,
    abi,
    wallet
  ) as unknown as Voting_sol_Voting;

  // Now we will have all functions available

  // read function
  let currentProposalCounts = await voting.proposalsCount();
  console.log(`Current proposal count is ${currentProposalCounts}`);

  // write function
  const tx = await voting.addAdmin(wallet.address);
  console.log(`tx: ${JSON.stringify(tx)}`);
  console.log("wait for transaction, remember await to wait()");
  const txReceipt = await tx.wait(3); // If you don't wait for this tx, then the next call will be false
  console.log(`txReceipt: ${JSON.stringify(txReceipt)}`);
  let isAdmin = await voting.admins(wallet.address);
  console.log(`is Admin ${isAdmin}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
