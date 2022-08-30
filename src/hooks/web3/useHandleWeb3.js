import React, {useContext} from 'react';
import Web3 from "web3";
import {ethers} from "ethers";
import ItemApi from "../../utils/api/ItemApi";
import {Context} from "../../store";

const useHandleWeb3 = () => {
    const [{user}] = useContext(Context);

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

    const getContract = async () => {
        return new ItemApi()
            .getContract()
            .then(res => res?.status ? res?.data : null);
    }

    const mintNFT = async (item) => {

        const contractData = await getContract();
        if (!contractData) return null;

        const provider = new ethers.providers.Web3Provider(window?.[user?.["providerName"]], "any");

        const signer = await provider.getSigner()
        const address = await signer.getAddress();

        const contract = new ethers.Contract(contractData?.address, contractData?.abi, signer);

        try {
            return await contract.mintNFT(address, `https://ipfs.pragmaticdlt.com/ipns/${item?.ipnsLink}`, {
                gasLimit: 210000,
                value: Number(0.00021) * 10 ** 18,
            })
        } catch (e) {
            return null
        }


    }

    const updateNFT = async () => {

        const contractData = await getContract();
        if (!contractData) return null;

        const provider = new ethers.providers.Web3Provider(window?.[user?.["providerName"]], "any");

        const signer = await provider.getSigner()

        const contract = new ethers.Contract(contractData?.address, contractData?.abi, signer);

        try {
            return await contract.updateNFT({
                gasLimit: 210000,
                value: Number(0.00021) * 10 ** 18,
            })
        } catch (e) {
            return null
        }


    }

    return {getNetwork, loadWeb3, mintNFT, updateNFT}
};

export default useHandleWeb3;