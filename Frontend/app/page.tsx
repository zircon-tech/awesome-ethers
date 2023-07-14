'use client';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import abi from './abi';

export default function Home() {
  const [isConnected, setIsConnect] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState(undefined);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [message, setMessage] = useState("");

  const contractAddress = "0xB8E73c1D20c32e7bc22642239EED8844Dc55c2D4";

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
        const sign = await provider.getSigner();
        setSigner(sign);
        setAddress(sign.address);
        const balance = await provider.getBalance(sign.address);
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

  async function getmessage() {
    if (typeof (window as any).ethereum !== "undefined") {
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        const msg = await contract.message();
        setMessage(msg);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  }

  async function signMessage() {
    const messageSigned = await signer.signMessage(message);
    alert(messageSigned);
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
      <br /><br />
      {isConnected ? <>
        <button onClick={() => execute()}>Execute update message</button>
        <br/>
        <button onClick={() => getmessage()}>Get Message</button>
        <br/>
        <button onClick={() => signMessage()}>Sign Message</button>
      </> : ""}
      <br /><br />
      { message }
    </div>
  )
}
