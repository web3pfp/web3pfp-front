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
        const parsedToken = data?.tokenID || null;

        console.log("parsedToken", parsedToken)
        console.log("data", data)

        if (!data) return await deleteNFT(createdItem)

        const tnxRes = await data?.wait()?.catch(() => data)
        console.log("tnxRes", tnxRes)

        if (!tnxRes?.transactionHash) return await deleteNFT(createdItem)

        const tokenID = parsedToken ? parseInt(parsedToken?._hex, 16) : parseInt(tnxRes?.events[tnxRes?.events?.length - 1]?.args?.tokenId?._hex, 16)

        console.log("tokenID", tokenID)

        new ItemApi()
            .confirm({item: createdItem, tnx: tnxRes, tokenID: tokenID})
            .finally(() => {
                exit()
            })
    }

    const updateNFT = async (formData) => {

        const data = await handleWeb3.updateNFT()
        if (!data) exit()

        const tnxRes = await data.wait().catch(() => data)
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