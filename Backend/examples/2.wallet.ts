// Introduction about Wallet
import { ethers } from "ethers";
import "dotenv/config";

const api_key = process.env.PROVIDER_API_KEY;
const local_private_key = process.env.PRIVATE_KEY!;

async function main() {
  console.log("Example of wallet running...");
  // Set provider
  let provider = new ethers.AlchemyProvider(80001, api_key);

  // Create wallet instance from private key
  let localWallet = new ethers.Wallet(local_private_key);

  // Create wallet instance randomly
  let generatedWallet = ethers.Wallet.createRandom();
  // Get randomMnemonic
  let randomMnemonic = generatedWallet.mnemonic;
  console.log(
    `From new account ${
      generatedWallet.address
    } randomMnemonic = ${JSON.stringify(randomMnemonic)}`
  );

  // Signing a message
  const message = "TechLunch!";

  const sigLocal = await localWallet.signMessage(message);
  const sigGenerated = await generatedWallet.signMessage(message);

  // Validating a message; notice the address matches the signer
  const verificationLocal = ethers.verifyMessage(message, sigLocal);
  const verificationGenerated = ethers.verifyMessage(message, sigGenerated);
  console.log(`Verification from the local wallet: ${verificationLocal} `);
  console.log(
    `Verification from the generated wallet: ${verificationGenerated} `
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
