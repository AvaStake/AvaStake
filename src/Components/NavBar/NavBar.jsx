
import React, { useState, useEffect } from "react";
import './navbar.css'
import Web3 from "web3";
import {
  contractAddress,
  contractabi
} from "../../constant";

function NavBar() {
  
    let interv = null;
    let accountAd;
    const [account, setAccount] = useState("Connect To Wallet");
    const [network, setNetwork] = useState(null);
    const [enterlottery, setlottery] = useState();
    const [players, setPlayers] = useState(0);
    const [balance, setBalance] = useState(0);
  
    const loadWeb3 = async () => {
      let isConnected = false;
      try {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          await window.ethereum.enable();
  
          isConnected = true;
        } else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider);
          isConnected = true;
        } else {
          isConnected = false;
          console.log("error", 
          "Metamask is not installed, please install it on your browser to connect.");
        }
        if (isConnected === true) {
          const web3 = window.web3;
          let contract = new web3.eth.Contract(contractabi, contractAddress);
          let accounts = await getAccounts();
          setAccount(accounts[0]);
          accountAd = accounts[0];
          let accountDetails = null;
          window.ethereum.on("accountsChanged", function (accounts) {
          
            setAccount(accounts[0]);
            accountAd = accounts[0];
                      getUpdateAccount(accounts);
            console.log(accounts);
          });
        }
        console.log("web3.eth", await window.web3.eth.getChainId());
        // setNetworkType(await window.web3.eth.getChainId());
        loadData();
      } catch (error) {
        console.log("error","Error while connecting metamask");
      }
    };
  
   
  
    const getUpdateAccount = async (accounts) => {
      const web3 = window.web3;
      let contract = new web3.eth.Contract(contractabi, contractAddress);
    };
  
    const getAccounts = async () => {
      const web3 = window.web3;
      try {
        let accounts = await web3.eth.getAccounts();
        console.log(accounts);
        return accounts;
      } catch (error) {
        console.log("Error while fetching acounts: ", error);
        return null;
      }
    };
    
    const isLockedAccount = async () => {
      try {
        let accounts = await getAccounts();
        if (accounts.length > 0) {
          console.log("Metamask is unlocked");
        } else {
          console.log("Metamask is locked");
        }
      } catch (error) {
        alert("Error while checking locked account");
      }
    };
  

    const loadData = async () => {
      try {
        console.log("accountDetails", accountAd);
  
        const web3 = window.web3;
        let contract = new web3.eth.Contract(contractabi, contractAddress);
        let accountDetails = await contract.methods.balanceOf(accountAd).call();
        console.log("accountDetails", accountDetails);
      // accountDetails);  setbalance(
      } catch (e) {
        console.log("error", e);
      }
    };
    useEffect(() => {
        loadWeb3();
        setInterval(() => {
          if (account) {
            loadWeb3();
          } else {
            loadWeb3();
          }
        }, 1000);
      }, []);
    
    return (
        <>
           <div class="navigation-bar">
            <h1 class="heading-primary">Stake AVA</h1>
            <div class="navigation-bar__wallet-box">
              <span className="wallet0" class="navigation-bar__wallet-box-text"><i class="fas fa-wallet"></i></span>
              <span className="wallet text-truncate" class="navigation-bar__wallet-box-text--small">{account}</span>
            </div>
           </div> 
        </>
    )
}

export default NavBar
