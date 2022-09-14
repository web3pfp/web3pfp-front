import React, {useContext} from 'react';
import ItemApi from "../utils/api/ItemApi";
import useHandleWeb3 from "./web3/useHandleWeb3";
import {ethers} from "ethers";
import {Context} from "../store";

const useHandleNft = ({onRequestClose = () => {}, callback = () => {}, handleLoader = () => {}}) => {
    const [{user}] = useContext(Context);
    const handleWeb3 = useHandleWeb3();

    const exit = () => {
        onRequestClose()
        handleLoader(false);
        setTimeout(callback, 500)
    }

    const mintNFT = async (formData, selectedToken) => {
        handleLoader(true);

        const approveData = await handleWeb3.approve(selectedToken);
        if (!approveData) {
            console.error("NFT hasn't been created -  not approved");
            exit();
            return null;
        }

        const createdItem = await new ItemApi()
            .create(formData)
            .then(res => res?.status ? res?.data : null)
            .catch(() => null);

        const data = await handleWeb3.mintNFT(createdItem, selectedToken);
        const parsedToken = data?.tokenID || null;

        if (!data) {
            console.error("NFT hasn't been created");
            return await deleteNFT(createdItem);
        }

        const tnxRes = await data?.wait()?.catch(() => data);

        if (!tnxRes?.transactionHash) {
            console.log("transaction: ", tnxRes)
            console.error("NFT hasn't been created - empty transaction hash");
            return await deleteNFT(createdItem);
        }

        const tokenID = parsedToken ? parseInt(parsedToken?._hex, 16) : parseInt(tnxRes?.events[tnxRes?.events?.length - 1]?.args?.tokenId?._hex, 16);
        console.log("tokenID", tokenID)

        new ItemApi()
            .confirm({item: createdItem, tnx: tnxRes, tokenID: tokenID})
            .finally(() => {
                handleLoader(false);
                exit();
            })
    }

    const updateNFT = async (formData, selectedToken) => {
        handleLoader(true);

        const approveData = await handleWeb3.approve(selectedToken, true);
        if (!approveData) return null;


        const data = await handleWeb3.updateNFT(selectedToken);
        if (!data) exit();

        const tnxRes = await data;
        if (!tnxRes) exit();

        new ItemApi()
            .update(formData)
            .finally(() => {
                exit()
            })
    }

    const deleteNFT = async (item) => {
        return new ItemApi()
            .delete(item)
            .then(() => {
                exit()
            })
    }

    const checkNFTsOwner = async (tokens) => {
        const contractData = await handleWeb3.getContract();
        const {signer} = await handleWeb3.getProviderData();

        const contract = new ethers.Contract(contractData?.address?.toLowerCase(), contractData?.abi, signer);

        const asyncFilter = async (arr, predicate) => {
            const results = await Promise.all(arr.map(predicate));
            return arr.filter((_v, index) => results[index]);
        }

        return await asyncFilter(tokens, async (tkn) => {
            const ownerOf = await contract.ownerOf(tkn?.tokenID);

            if (ownerOf?.toLowerCase() === user?.publicAddress?.toLowerCase()) {
                return true
            } else {
                changeNFTsOwner(tkn, ownerOf)
                return false
            }
        });
    }

    const changeNFTsOwner = (item, newOwner) => {
        new ItemApi().changeOwner({item, newOwner})
    }

    return {mintNFT, updateNFT, checkNFTsOwner};
};

export default useHandleNft;