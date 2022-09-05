import React from 'react';
import ItemApi from "../utils/api/ItemApi";
import useHandleWeb3 from "./web3/useHandleWeb3";

const useHandleNft = ({onRequestClose, callback}) => {
    const handleWeb3 = useHandleWeb3();

    const exit = () => {
        onRequestClose()
        setTimeout(callback, 500)
    }

    const mintNFT = async (formData, selectedToken, handleLoader) => {
        handleLoader(true);

        const approveData = await handleWeb3.approve(selectedToken);
        if (!approveData) return null;


        const createdItem = await new ItemApi()
            .create(formData)
            .then(res => res?.status ? res?.data : null)
            .catch(() => null);

        const data = await handleWeb3.mintNFT(createdItem, selectedToken);
        const parsedToken = data?.tokenID || null;

        if (!data) return await deleteNFT(createdItem);

        const tnxRes = await data?.wait()?.catch(() => data);

        if (!tnxRes?.transactionHash) return await deleteNFT(createdItem);

        const tokenID = parsedToken ? parseInt(parsedToken?._hex, 16) : parseInt(tnxRes?.events[tnxRes?.events?.length - 1]?.args?.tokenId?._hex, 16);

        new ItemApi()
            .confirm({item: createdItem, tnx: tnxRes, tokenID: tokenID})
            .finally(() => {
                handleLoader(false);
                exit();
            })
    }

    const updateNFT = async (formData, selectedToken, handleLoader) => {
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
                handleLoader(false);
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

    return {mintNFT, updateNFT};
};

export default useHandleNft;