// Introduction about estimateGasFee

// About getGasFee "https://github.com/ethers-io/ethers.js/discussions/2439#discussioncomment-1857403"
/* 
The function 
getGasFee was deprecated now (2023) getFeeData is used instead 
*/
import { ethers } from "ethers";
import * as fs from "fs-extra"; // In case you want to directly use the generated compiled
import { Voting_sol_Voting } from "./data/types/Voting_sol_Voting"; // Generated with typechain
import "dotenv/config";

const api_key = process.env.PROVIDER_API_KEY;
const local_private_key = process.env.PRIVATE_KEY!;
const url = `https://goerli.infura.io/v3/${api_key}`;
async function main() {
  console.log("Example of estimateGasFee running...");
  // Set provider
  let provider = new ethers.AlchemyProvider(5, api_key);
  // Create wallet instance from private key
  let signer = new ethers.Wallet(local_private_key);
  // Create Contract instance
  //  from read file
  const abi = fs.readFileSync(
    "./examples/data/compiled/Voting_sol_Voting.abi",
    "utf8"
  );
  const address = "0xf61e062f66914fDe7787620844f02b7a24A919dC"; // Address of a deployed Voting contract

  const voting = new ethers.Contract(
    address,
    abi,
    signer
  ) as unknown as Voting_sol_Voting;

  console.log("getting the estimate gas for the tx ");
  // Get gasFeeData
  const feeData = await provider.getFeeData();
  console.log("Getting gas fee data from Provider...");
  console.log(JSON.stringify(feeData));
  // e.g. {"_type":"FeeData","gasPrice":"91559","maxFeePerGas":"1000000022","maxPriorityFeePerGas":"1000000000"}

  const currentGasPrice = feeData.gasPrice;
  // Returns a bigINT
  const estimateBI = await voting.addAdmin.estimateGas(signer.address); // Getting Error: missing provider (operation="estimateGas", code=UNSUPPORTED_OPERATION, version=6.6.3)
  // Steps
  // multiply estimate gas by gasPrice
  // Maybe adding a small tolerance amount
  // Format the estimated gas

  // const estimateGasFees = ethers.formatEther(estimateGasFeesBI);

  console.log("estimateGasFees"); // TODO: this
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
