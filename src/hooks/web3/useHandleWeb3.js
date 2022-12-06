import React, {useContext} from 'react';
import Web3 from "web3";
import {BigNumber, ethers} from "ethers";
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

            if (user){
                if (!window?.[user?.["providerName"]]) accountsChangedCallback()
                const provider = new ethers.providers.Web3Provider(window?.[user?.["providerName"]], "any");
                const acc = await provider.send("eth_requestAccounts", []);
                const network = await provider.getNetwork();

                if (acc[0]?.toLowerCase() !== user?.publicAddress?.toLowerCase() || network?.chainId !== user?.provider) accountsChangedCallback();
            }


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

    const getContractByProvider = async (data) => {
        return new ItemApi()
            .getContractByProvider(data)
            .then(res => res?.status ? res?.data : null);
    }

    const getProviderData = async () => {
        const provider = new ethers.providers.Web3Provider(window?.[user?.["providerName"]], "any");

        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const nonce = await signer.getTransactionCount();

        return {signer, address, nonce, provider}
    }

    const getTokenContract = async (data) => {
        return new ItemApi()
            .getTokenContract(data)
            .then(res => res?.status ? res?.data : null);
    }

    const approve = async (selectedToken, isUpdate = false) => {
        const contractData = await getContract();
        const tokenContractData = await getTokenContract({
                provider: user?.provider,
                token: selectedToken,
        });
        if (!contractData) return null;


        const {signer, address} = await getProviderData();

        const contract = new ethers.Contract(contractData?.address?.toLowerCase(), contractData?.abi, signer);
        const tokenContract = new ethers.Contract(tokenContractData?.address, tokenContractData?.abi, signer);

        const allowance = await tokenContract.allowance(address, contractData?.address);
        const decimals = await tokenContract.decimals();

        const price_decimals_hex = await contract.PRICE_DECIMALS()
        const price_decimals = parseInt(price_decimals_hex, 16)

        const getPrice = async () => {
            switch (isUpdate) {
                case "info": {
                    const info_price_hex = await contract.UPDATE_INFO_AMOUNT()
                    const info_price = parseInt(info_price_hex, 10)
                    return (info_price / (10 ** price_decimals)) * (10 ** decimals)
                }
                case "photo": {
                    const photo_price_hex = await contract.UPDATE_PHOTO_AMOUNT()
                    const photo_price = parseInt(photo_price_hex, 10)
                    return (photo_price / (10 ** price_decimals)) * (10 ** decimals)
                }
                default: {
                    const mint_price_hex = await contract.MINT_AMOUNT()
                    const mint_price = parseInt(mint_price_hex, 10)
                    return (mint_price / (10 ** price_decimals)) * (10 ** decimals)
                }
            }
        }

        const sum = await getPrice()

        if (parseInt(allowance._hex, 16) >= sum) return true;

        try {
            const approve = await tokenContract.approve(contractData?.address?.toLowerCase(), BigNumber.from(sum.toString()))
            const receipt = await approve.wait()
            if (!!receipt?.status) return receipt
            return null
        } catch (e) {
            console.error("Approve error: ", e)
        }
    }

    const mintNFT = async (item, selectedToken) => {

        const contractData = await getContract();
        const tokenContractData = await getTokenContract({
            provider: user?.provider,
            token: selectedToken,
        });
        if (!contractData) return null;

        const {signer, address} = await getProviderData();

        const contract = new ethers.Contract(contractData?.address?.toLowerCase(), contractData?.abi, signer);

        const tokenContract = new ethers.Contract(tokenContractData?.address, tokenContractData?.abi, signer);
        const decimals = await tokenContract.decimals();

        const price_decimals_hex = await contract.PRICE_DECIMALS()
        const price_decimals = parseInt(price_decimals_hex, 10)

        const mint_price_hex = await contract.MINT_AMOUNT()
        const mint_price = parseInt(mint_price_hex, 10)
        const sum = (mint_price / (10 ** price_decimals)) * (10 ** decimals)

        try {
            const mint = await contract.mintNFT(address?.toLowerCase(), `https://${item?.ipnsLink}.ipns.cf-ipfs.com`, BigNumber.from(sum.toString()), tokenContractData?.address?.toLowerCase(), {
                    gasLimit: 1100000,
                })
            const receipt = await mint.wait()

            if (!!receipt?.status) {
                const dataToDecode = receipt.logs.find(log => {
                    return log.data.includes(user?.publicAddress?.slice(2, -1))
                })

                const decodeData = await ethers.utils.defaultAbiCoder.decode([ "address", "uint256" ], dataToDecode.data);
                return {...receipt, tokenID: decodeData[1]};
            }
            return null
        } catch (e) {
            console.error("Minting error: ", e)
            return null
        }
    }

    const updateNFTInfo = async (selectedToken) => {

        const contractData = await getContract();
        const tokenContractData = await getTokenContract({
            provider: user?.provider,
            token: selectedToken,
        });
        if (!contractData) return null;

        const {signer} = await getProviderData()


        const contract = new ethers.Contract(contractData?.address?.toLowerCase(), contractData?.abi, signer);
        const tokenContract = new ethers.Contract(tokenContractData?.address, tokenContractData?.abi, signer);
        const decimals = await tokenContract.decimals();

        const price_decimals_hex = await contract.PRICE_DECIMALS()
        const price_decimals = parseInt(price_decimals_hex, 10)

        const mint_price_hex = await contract.UPDATE_INFO_AMOUNT()
        const mint_price = parseInt(mint_price_hex, 10)
        const sum = (mint_price / (10 ** price_decimals)) * (10 ** decimals)

        try {
            const update = await contract.updateInfo(tokenContractData?.address?.toLowerCase(), BigNumber.from(sum.toString()), {
                gasLimit: 210000,
            })
            const receipt = await update.wait();

            if (!!receipt?.status) return true
            return null
        } catch (e) {
            console.error("Update info error: ", e)
            return null
        }
    }

    const updateNFTPhoto = async (selectedToken) => {

        const contractData = await getContract();
        const tokenContractData = await getTokenContract({
            provider: user?.provider,
            token: selectedToken,
        });
        if (!contractData) return null;

        const {signer} = await getProviderData()

        const tokenContract = new ethers.Contract(tokenContractData?.address, tokenContractData?.abi, signer);
        const contract = new ethers.Contract(contractData?.address?.toLowerCase(), contractData?.abi, signer);
        const decimals = await tokenContract.decimals();

        const price_decimals_hex = await contract.PRICE_DECIMALS()
        const price_decimals = parseInt(price_decimals_hex, 10)

        const mint_price_hex = await contract.UPDATE_PHOTO_AMOUNT()
        const mint_price = parseInt(mint_price_hex, 10)
        const sum = (mint_price / (10 ** price_decimals)) * (10 ** decimals)

        try {
            const update = await contract.updatePhoto(tokenContractData?.address?.toLowerCase(), BigNumber.from(sum.toString()), {
                gasLimit: 210000,
            })
            const receipt = await update.wait();

            if (!!receipt?.status) return true
            return null
        } catch (e) {
            console.error("Update photo error: ", e)
            return null
        }
    }

    return {
        getNetwork,
        loadWeb3,
        mintNFT,
        updateNFTInfo,
        updateNFTPhoto,
        approve,
        getProviderData,
        getContract,
        getContractByProvider,
    }
};

export default useHandleWeb3;