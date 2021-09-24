import './input.css'

import React, { useState, useEffect } from "react";
import Web3 from "web3";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {
  contractAddress,
  contractabi, tokenAddress, tokenabi
} from "../../constant";

function InputComp() {

  let interv = null;
  let accountAd;
  const [account, setAccount] = useState("Connect To Wallet");
  const [network, setNetwork] = useState(null);
  const [enterlottery, setlottery] = useState();
  const [value, setValue] = useState(0);


  const [numberofTokens, setNumberofTokens] = useState(0);
  const [rewards, setRewards] = useState(0);
  // const [totalSupply, setTotalSupply] = useState(0);
  /*
  const [players, setPlayers] = useState(0);
  const [players, setPlayers] = useState(0);
  */

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
      console.log("error", "Error while connecting metamask");
    }
  };

  const setNetworkType = async (netId) => {
    console.log("id", netId);
    switch (netId) {
      case 1:
        console.log("This is mainnet");
        // Accounttype = "1";
        setNetwork(" Mainnet");
        break;
      case 2:
        console.log("This is the deprecated Morden test network.");
        // network ="deprecated"
        setNetwork(" Deprecated");
        break;
      case 3:
        console.log("This is the ropsten test network.");
        // network = "ropsten";
        setNetwork("Ropsten");
        break;
      case 4:
        console.log("This is the Rinkeby test network.");
        // network = "Rinkeby";
        setNetwork("Rinkeby");
        break;
      case 42:
        console.log("This is the Kovan test network.");
        // network = "Kovan";
        setNetwork(" Kovan");
      case 97:
        console.log("Binance test network.");
        // network = "Kovan";
        setNetwork(" Kovan");
      case 56:
        console.log("Binance Main network.");
        // network = "Kovan";
        setNetwork(" Kovan");
        break;
      default:
        console.log("This is an unknown network.");
        // network = "Detecting...";
        setNetwork(" Detecting...");

    }
    console.log("network", { network });
  }

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
      let accountDetails = await contract.methods.dividendsOf(accountAd).call();
      console.log("stakeValue", accountDetails);
      setRewards(accountDetails);

      accountDetails = await contract.methods.totalDistributions().call();
      console.log("totalDistributions", accountDetails);
      // setTotalBnbDsitributed(accountDetails);


      contract = new web3.eth.Contract(tokenabi, tokenAddress);
      accountDetails = await contract.methods.balanceOf(accountAd).call();
      console.log("balanceOf", accountDetails);
      // setWalletMoney(accountDetails);
    } catch (e) {
      console.log("error", e);
    }
  };


  const stake = async () => {
    try {
      const web3 = window.web3;
      let contract = new web3.eth.Contract(contractabi, contractAddress);
      let accountDetails = await contract.methods.stake(
        numberofTokens
      )
        .send({
          from: account
        });
      console.log("accountDetails", accountDetails);
    } catch (e) {
      console.log("error", e);
    }
  };

  const unstake = async () => {
    try {
      const web3 = window.web3;
      let contract = new web3.eth.Contract(contractabi, contractAddress);
      let accountDetails = await contract.methods.unstake(
        numberofTokens
      )
        .send({
          from: account
        });
      console.log("accountDetails", accountDetails);
    } catch (e) {
      console.log("error", e);
    }
  };
  const withdraw = async () => {
    try {
      const web3 = window.web3;
      let contract = new web3.eth.Contract(contractabi, contractAddress);
      let accountDetails = await contract.methods.withdraw(
        numberofTokens
      )
        .send({
          from: account
        });
      console.log("accountDetails", accountDetails);
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
    <div class="main-boxes-container--full-width">    
      <div class="main-box">

        <div className="withdraw__container">
          <h5 class="heading-5">Rewards: <span class="heading-5--light">{rewards} AVAX</span></h5>
          <button class="btns btns--primary" onClick={withdraw}>Withdraw</button>
        </div>

        <div className="input-container">
          <div className="input-field">
            <input className="input-field__input" type="text" name="" id="" onChange={(e) => { setNumberofTokens(e.target.value) }} />
          </div>
          <div className="input__bottom">
            <button className="btns btns--secondary" onClick={stake}>STAKE</button>
            <button className="btns btns--secondary" onClick={unstake}>UNSTAKE</button>
          </div>
        </div>
      </div>
    </div>
    <div className="social-mobile">
      <a class="social-mobile__social-link" href="https://t.me/NironOfficial"><i class="fab fa-telegram-plane social-mobile__social-link--icon"></i></a>
      <a class="social-mobile__social-link" href="http://niron.finance/"><i class="fab fa-twitter social-mobile__social-link--icon"></i></a>
    </div>
    
    </>
  )
}

export default InputComp
