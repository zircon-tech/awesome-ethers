import { ethers } from "ethers";
import "dotenv/config";

const api_key = process.env.PROVIDER_API_KEY;
const ProviderURL = `https://polygon-mumbai.g.alchemy.com/v2/${api_key}`; // example using an url (Alchemy)

async function main() {
  console.log("Example of providers running...");

  // Ways for setting up a provider with ethers...
  // let provider =  ethers.getDefaultProvider(80001); // arguments (chainid)
  // let provider = new ethers.JsonRpcProvider(ProviderURL); // arguments (url)
  let provider = new ethers.AlchemyProvider(80001, api_key); // arguments (chainId, apikey) Mumbai chainId
  //  let provider = new ethers.InfuraProvider(5, api_key); // arguments (chainId, apikey) Goerli chainId

  console.log(`provider: ${JSON.stringify(provider)}`);

  // Get the current block number
  const blockNumber = await provider.getBlockNumber();
  console.log(`blockNumber: ${JSON.stringify(blockNumber)}`);

  const balance = await provider.getBalance(
    "0x3099a9d5a86e16Cd363c2CD8867F5b3035f6F5D7"
  );

  // It's necessary format the balance because it is a BigNumber and cannot be display
  const formatedBalance = ethers.formatEther(balance); // formatEther gets a BigNumber and returns its equivalent in Ether format
  console.log(`balance: ${JSON.stringify(formatedBalance)}`);
  /* Convertions 
  1 Ether = 1000000000 Gwei
  1 Ether = 1000000000000000000 Wei
 */
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
