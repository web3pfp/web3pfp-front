import React, {useContext} from 'react';
import ItemApi from "../utils/api/ItemApi";
import useHandleWeb3 from "./web3/useHandleWeb3";
import {ethers} from "ethers";
import {Context} from "../store";

const useHandleNft = ({onRequestClose = () => {}, callback = () => {}, handleLoader = () => {}, handleUploadError = () => {}}) => {
    const [{user}] = useContext(Context);
    const handleWeb3 = useHandleWeb3();

    const exit = () => {
        onRequestClose()
        handleLoader(false);
        setTimeout(callback, 1000)
    }

    const mintNFT = async (formData, selectedToken) => {
        handleLoader(true);

        const approveData = await handleWeb3.approve(selectedToken);
        if (!approveData) {
            console.error("NFT hasn't been created -  not approved");
            exit();
            return null;
        }

        let attempt = 0;

        const createRecursion = async () => {
            return await new ItemApi()
                .create(formData)
                .then(async (res) => {
                    if (res?.status) return res?.data

                    if (attempt < 2) {
                        attempt++;
                        return await createRecursion()
                    } else {
                        return null
                    }
                })
                .catch(() => null)
        }

        const createdItem = await createRecursion()

        if (!createdItem) {
            handleUploadError();
            return null;
        }

        const data = await handleWeb3.mintNFT(createdItem, selectedToken);
        const parsedToken = data?.tokenID || null;

        if (!data) {
            console.error("NFT hasn't been created");
            return await deleteNFT(createdItem);
        }

        if (!data?.transactionHash) {
            console.error("NFT hasn't been created - empty transaction hash");
            return await deleteNFT(createdItem);
        }

        const tokenID = parsedToken ? parseInt(parsedToken?._hex, 16) : parseInt(data?.events[data?.events?.length - 1]?.args?.data?._hex, 16);
        console.log("tokenID", tokenID)

        new ItemApi()
            .confirm({item: createdItem, tnx: data, tokenID: tokenID})
            .finally(() => {
                handleLoader(false);
                exit();
            })
    }

    const updateNFTInfo = async (formData, selectedToken) => {
        handleLoader(true);

        const approveData = await handleWeb3.approve(selectedToken, "info");
        if (!approveData) {
            console.error("Info hasn't been updated -  not approved");
            exit();
            return null;
        }

        await new ItemApi()
            .updateInfo(formData)
            .catch(() => exit())

        const data = await handleWeb3.updateNFTInfo(selectedToken);
        if (!data) exit();

        let attempt = 0;

        const confirmRecursion = async () => {
            await new ItemApi()
                .updateInfoConfirm(formData)
                .then(async (res) => {
                    if (!res.status) {
                        if (attempt < 2) {
                            attempt++;
                            await confirmRecursion()
                        }
                    }
                })
                .catch(() => exit())
        }

        await confirmRecursion()

        exit();
    }

    const updateNFTPhoto = async (formData, selectedToken) => {
        handleLoader(true);

        const approveData = await handleWeb3.approve(selectedToken, "photo");
        if (!approveData) {
            console.error("Photo hasn't been updated -  not approved");
            exit();
            return null;
        }

        await new ItemApi()
            .updatePhoto(formData)
            .catch(() => exit())


        const data = await handleWeb3.updateNFTPhoto(selectedToken);
        if (!data) exit();

        let attempt = 0;

        const confirmRecursion = async () => {
            await new ItemApi()
                .updatePhotoConfirm(formData)
                .then(async (res) => {
                    if (!res.status) {
                         if (attempt < 2) {
                             attempt++;
                             await confirmRecursion()
                         }
                    }
                })
        }

        await confirmRecursion()

        exit();
    }

    const deleteNFT = async (item) => {
        return new ItemApi()
            .delete(item)
            .then(() => {
                exit()
            })
    }

    const getAll = () => {
        return new ItemApi().getAll()
            .then(async (res) => {
                if (res?.status) {
                    const filtered = await checkNFTsOwner(res?.data)
                        .then(res => res)
                        .catch(() => res?.data)
                    return filtered
                }
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
            if (tkn?.provider !== user?.provider) return true
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

    return {mintNFT, updateNFTInfo, updateNFTPhoto, checkNFTsOwner, getAll};
};

export default useHandleNft;