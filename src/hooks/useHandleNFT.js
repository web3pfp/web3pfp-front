import React from 'react';
import ItemApi from "../utils/api/ItemApi";
import useHandleWeb3 from "./web3/useHandleWeb3";

const useHandleNft = ({onRequestClose, callback}) => {
    const handleWeb3 = useHandleWeb3();

    const exit = () => {
        onRequestClose()
        callback()
    }

    const mintNFT = async (formData) => {

        const createdItem = await new ItemApi()
            .create(formData)
            .then(res => res?.status ? res?.data : null)
            .catch(() => null)

        const data = await handleWeb3.mintNFT(createdItem)
        if (!data) return await deleteNFT(createdItem)

        const tnxRes = await data.wait().catch(() => null)
        if (!tnxRes) return await deleteNFT(createdItem)

        const tokenID = parseInt(tnxRes?.events[0]?.args?.tokenId?._hex, 16)

        new ItemApi()
            .confirm({item: createdItem, tnx: tnxRes, tokenID: tokenID})
            .finally(() => {
                exit()
            })
    }

    const updateNFT = async (formData) => {

        const data = await handleWeb3.updateNFT()
        if (!data) exit()

        const tnxRes = await data.wait().catch(() => null)
        if (!tnxRes) exit()

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

    return {mintNFT, updateNFT};
};

export default useHandleNft;