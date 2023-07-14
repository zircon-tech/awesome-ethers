// Introduction on instances of a deployed contract
import { ethers } from "ethers";
import "dotenv/config";

const api_key = process.env.PROVIDER_API_KEY; // Must be in mainnet

const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint)",
];

const address = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; // DAI Contract

async function main() {
  let provider = new ethers.AlchemyProvider(1, api_key);

  // Create an instance of an existing contract

  const contract = new ethers.Contract(address, ERC20_ABI, provider);

  const name = await contract.name();
  const symbol = await contract.symbol();
  const totalSupply = await contract.totalSupply();

  console.log(`\nReading from ${address}\n`);
  console.log(`Name: ${name}`);
  console.log(`Symbol: ${symbol}`);
  console.log(`Total Supply: ${totalSupply}\n`);

  const balance = await contract.balanceOf(
    "0x6c6Bc977E13Df9b0de53b251522280BB72383700"
  );

  console.log(`Balance Returned: ${balance}`);
  console.log(`Balance Formatted: ${ethers.formatEther(balance)}\n`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
