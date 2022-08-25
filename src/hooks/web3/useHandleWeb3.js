import React from 'react';
import Web3 from "web3";
import {ethers} from "ethers";

const useHandleWeb3 = () => {

    const loadWeb3 = async (accountsChangedCallback) => {
        if (window?.ethereum) {
            // window.web3 = new Web3(window.ethereum);
            await window.ethereum.request({ method: `eth_requestAccounts` });

            window.ethereum.on("accountsChanged", () => accountsChangedCallback());
            window.ethereum.on("chainChanged", () => accountsChangedCallback());
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            console.warn("Non ethereum!");
        }
    };

    const getNetwork = async () => {
        const provider = new ethers.providers.Web3Provider(window?.ethereum, "any");
        const network = await provider.getNetwork();
        return network?.chainId;
    };

    return {getNetwork, loadWeb3}
};

export default useHandleWeb3;