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

    const getProviderData = async () => {
        const provider = new ethers.providers.Web3Provider(window?.[user?.["providerName"]], "any");

        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const nonce = await signer.getTransactionCount();

        return {signer, address, nonce}
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

        const {signer, address, nonce} = await getProviderData();

        const tokenContract = new ethers.Contract(tokenContractData?.address, tokenContractData?.abi, signer);

        const allowance = await tokenContract.allowance(address, contractData?.address);
        const decimals = await tokenContract.decimals();
        const sum = isUpdate ? 0.3 * (10 ** decimals) : 3 * (10 ** decimals)

        if (parseInt(allowance._hex, 16) >= sum) return true;

        const approveData = new Promise((resolve) => {

            tokenContract.on("Approval", async (from, to, amount, event) => {
                const receipt = await event.getTransactionReceipt();
                const tnx = await event.getTransaction();

                event.removeListener();
                event?.transactionHash && address.toLowerCase() === receipt?.from?.toLowerCase() ? resolve(event) : resolve(null);

                if (nonce === tnx.nonce && address?.toLowerCase() === tnx.from?.toLowerCase() && event?.transactionHash) {
                    resolve(tnx);
                } else {
                    resolve(null);
                }
            });
        })

        const approve = new Promise(async (resolve) => {
            const res = await tokenContract.approve(contractData?.address?.toLowerCase(), BigNumber.from(sum.toString()))
                .then(res => {
                    console.log("approve res ->", res)
                    resolve(res);
                })
                .catch(err => {
                    console.log("approve err ->", err)
                    resolve(err);
                })

            return res;
        })

        const approveRes = await approve;

        if (approveRes.toString().includes("user rejected transaction")) {
            tokenContract.removeAllListeners("Approval");
            return null;
        } else {
            return await approveData;
        }
    }

    // const mintNFTMetamask = async (item) => {
    //     console.log("mintNFTMetamask")
    //
    //     const contractData = await getContract();
    //     const tokenContractData = await getTokenContract();
    //     if (!contractData) return null;
    //
    //     const provider = new ethers.providers.Web3Provider(window?.[user?.["providerName"]], "any");
    //
    //     const signer = await provider.getSigner()
    //     const address = await signer.getAddress();
    //
    //     const tokenContract = new ethers.Contract(tokenContractData?.address, tokenAbi, signer)
    //     console.log("tokenContract", tokenContract)
    //
    //     const approveRes = await tokenContract.approve(contractData?.address?.toLowerCase(), 300)
    //     console.log("approveRes", approveRes)
    //
    //     await approveRes.wait();
    //
    //     const contract = new ethers.Contract(contractData?.address?.toLowerCase(), contractData?.abi, signer);
    //     console.log("contract", contract)
    //
    //     try {
    //         return await contract.mintNFT(address, `https://ipfs.pragmaticdlt.com/ipns/${item?.ipnsLink}`, 300, tokenContractData?.address?.toLowerCase(), {
    //             gasLimit: 210000,
    //         })
    //     } catch (e) {
    //         console.log("e", e)
    //         return null
    //     }
    // }

    const mintNFT = async (item, selectedToken) => {

        const contractData = await getContract();
        const tokenContractData = await getTokenContract({
            provider: user?.provider,
            token: selectedToken,
        });
        if (!contractData) return null;

        const {signer, address, nonce} = await getProviderData();

        const contract = new ethers.Contract(contractData?.address?.toLowerCase(), contractData?.abi, signer);

        const tokenContract = new ethers.Contract(tokenContractData?.address, tokenContractData?.abi, signer);
        const decimals = await tokenContract.decimals();

        const sum = 3 * (10 ** decimals)

        const data = new Promise((resolve) => {
            contract.on("Transfer", async (from, to, amount, event) => {
                const receipt = await event.getTransactionReceipt();
                const tnx = await event.getTransaction();

                const decodeData = await ethers.utils.defaultAbiCoder.decode([ "address", "uint256" ], receipt.logs[receipt.logs.length - 1].data);

                event.removeListener();

                if (nonce === tnx.nonce && address?.toLowerCase() === tnx.from?.toLowerCase()) {
                    resolve({...tnx, tokenID: decodeData[1]});
                } else {
                    resolve(null);
                }
            });
        })

        const mint = new Promise(async (resolve) => {
            const res = contract.mintNFT(address, `https://ipfs.pragmaticdlt.com/ipns/${item?.ipnsLink}`, BigNumber.from(sum.toString()), tokenContractData?.address?.toLowerCase(), {
                gasLimit: 210000,
            })
                .then(res => {
                    console.log("mint res ->", res)
                    resolve(res)
                })
                .catch(err => {
                    console.log("mint err ->", err)
                    resolve(err)
                })

            return res;
        })

        const mintRes = await mint

        if (mintRes.toString().includes("user rejected transaction")) {
            console.log("if")
            contract.removeAllListeners("Transfer")
            return null
        } else {
            console.log("else", await data)
            return await data
        }

    }

    const updateNFT = async (selectedToken) => {

        const contractData = await getContract();
        const tokenContractData = await getTokenContract({
            provider: user?.provider,
            token: selectedToken,
        });
        if (!contractData) return null;

        const {signer, address} = await getProviderData()

        const tokenContract = new ethers.Contract(tokenContractData?.address, tokenContractData?.abi, signer);
        const decimals = await tokenContract.decimals();

        const sum = 0.3 * (10 ** decimals)

        const contract = new ethers.Contract(contractData?.address?.toLowerCase(), contractData?.abi, signer);

        const data = new Promise((resolve) => {
            contract.once("NFTUpdated", async (from) => {

                if (address?.toLowerCase() === from?.toLowerCase()) {
                    resolve(true);
                } else {
                    resolve(null);
                }
            });
        })

        const update = new Promise(async (resolve) => {
            const res = contract.updateNFT(tokenContractData?.address?.toLowerCase(), BigNumber.from(sum.toString()), {
                gasLimit: 210000,
            })
                .then(res => resolve(res))
                .catch(err => resolve(err))

            return res;
        })

        const updateRes = await update;

        if (updateRes.toString().includes("user rejected transaction")) {
            contract.removeAllListeners("NFTUpdated")
            return null
        } else {
            return await data
        }


    }

    return {
        getNetwork,
        loadWeb3,
        mintNFT,
        updateNFT,
        approve,
        getProviderData,
        getContract,
    }
};

export default useHandleWeb3;