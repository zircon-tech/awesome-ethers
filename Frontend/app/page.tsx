'use client';
import { ethers } from 'ethers';
import Image from 'next/image'
import { useState, useEffect } from 'react';

export default function Home() {
  const [isConnected, setIsConnect] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState(undefined);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (typeof (window as any).ethereum !== "undefined") {
      setHasMetamask(true);
    }
  }, [setHasMetamask]);

  async function connect() {
    if (typeof (window as any).ethereum !== "undefined") {
      try {
        await (window as any).ethereum.request({ method: "eth_requestAccounts"});
        setIsConnect(true);
        let provider = new ethers.BrowserProvider((window as any).ethereum);
        const signer = await provider.getSigner();
        setSigner(signer);
        setAddress(signer.address);
        const balance = await provider.getBalance(signer.address);
        setBalance(balance);
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsConnect(false);
    }
  }

  async function execute() {
    if (typeof (window as any).ethereum !== "undefined") {
      const contractAddress = "0xB8E73c1D20c32e7bc22642239EED8844Dc55c2D4";
      const abi = [
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "initMessage",
              "type": "string"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "newMessage",
              "type": "string"
            }
          ],
          "name": "update",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "message",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ];
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        await contract.update("Techlunch!");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  }

  return (
    <div>
      {hasMetamask ? (
        isConnected ? (
          "Connected! " + address + " Balance: " + balance
        ) : (
          <button onClick={() => connect()}>Connect</button>
        )
      ) : (
        "Please install metamask"
      )}
      <br />
      {isConnected ? <button onClick={() => execute()}>Execute</button> : ""}
    </div>
  )
}
