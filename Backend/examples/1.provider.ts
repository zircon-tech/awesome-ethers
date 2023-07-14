// Introduction about Provider
import { ethers } from "ethers";
import "dotenv/config";

const api_key = process.env.PROVIDER_API_KEY;
const ProviderURL = `https://polygon-mumbai.g.alchemy.com/v2/${api_key}`; // example using an url (Alchemy)

async function main() {
  console.log("Example of providers running...");

  // Ways for setting up a provider with ethers...
  // let provider = ethers.getDefaultProvider(80001); // arguments (chainid)
  // let provider = new ethers.JsonRpcProvider(ProviderURL); // arguments (url)
  let provider = new ethers.AlchemyProvider(80001, api_key); // arguments (chainId, apikey) Mumbai chainId
  //  let provider = new ethers.InfuraProvider(5, api_key); // arguments (chainId, apikey) Goerli chainId

  console.log(`provider: ${JSON.stringify(provider)}`);

  // Some examples of what you can do with the provider

  // Get network
  const network = await provider.getNetwork();
  console.log(`Network: ${JSON.stringify(network)}`);

  // Get the current block number
  const blockNumber = await provider.getBlockNumber();
  console.log(`blockNumber: ${JSON.stringify(blockNumber)}`);

  // Get the bytecode for address
  const bytecode = await provider.getCode(
    "0xbb0fF9011fe7A3B128Be53619743D9DD3C363C05"
  );
  console.log(`bytecode: ${JSON.stringify(bytecode)}`);

  // Get balance
  const balance = await provider.getBalance(
    "0x3099a9d5a86e16Cd363c2CD8867F5b3035f6F5D7"
  );

  // It's necessary format the balance because it is a BigNumber (Wei) and cannot be display
  const formatedBalance = ethers.formatEther(balance); // formatEther gets a BigNumber and returns its equivalent in Ether format
  console.log(`balance: ${JSON.stringify(formatedBalance)}`);
  /* Convertions 
  1 Ether = 1000000000 Gwei
  1 Ether = 1000000000000000000 Wei
 
  // Convert user-provided strings in ether to wei for a value
  const eth = ethers.parseEther("1.0");
  // 1000000000000000000n

  // Convert user-provided strings in gwei to wei for max base fee
  const feePerGas = ethers.parseUnits("4.5", "gwei");
  // 4500000000n

  // Convert a value in wei to a string in ether to display in a UI
  ethers.formatEther(eth);
  // '1.0'

  // Convert a value in wei to a string in gwei to display in a UI
  ethers.formatUnits(feePerGas, "gwei");
  // '4.5'*/
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
