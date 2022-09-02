import React, {useContext} from 'react';
import Web3 from "web3";
import {BigNumber, ethers} from "ethers";
import ItemApi from "../../utils/api/ItemApi";
import {Context} from "../../store";

const tokenAbi = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_upgradedAddress",
                "type": "address"
            }
        ],
        "name": "deprecate",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "deprecated",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_evilUser",
                "type": "address"
            }
        ],
        "name": "addBlackList",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "upgradedAddress",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "balances",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "maximumFee",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "_totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "unpause",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_maker",
                "type": "address"
            }
        ],
        "name": "getBlackListStatus",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            },
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "allowed",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "paused",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "who",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "pause",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getOwner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "newBasisPoints",
                "type": "uint256"
            },
            {
                "name": "newMaxFee",
                "type": "uint256"
            }
        ],
        "name": "setParams",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "issue",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "redeem",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "remaining",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "basisPointsRate",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "isBlackListed",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_clearedUser",
                "type": "address"
            }
        ],
        "name": "removeBlackList",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "MAX_UINT",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_blackListedUser",
                "type": "address"
            }
        ],
        "name": "destroyBlackFunds",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "_initialSupply",
                "type": "uint256"
            },
            {
                "name": "_name",
                "type": "string"
            },
            {
                "name": "_symbol",
                "type": "string"
            },
            {
                "name": "_decimals",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Issue",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Redeem",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "newAddress",
                "type": "address"
            }
        ],
        "name": "Deprecate",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "feeBasisPoints",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "maxFee",
                "type": "uint256"
            }
        ],
        "name": "Params",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "_blackListedUser",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_balance",
                "type": "uint256"
            }
        ],
        "name": "DestroyedBlackFunds",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "AddedBlackList",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "RemovedBlackList",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [],
        "name": "Pause",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [],
        "name": "Unpause",
        "type": "event"
    }
]

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

    const getTokenContract = async () => {
        return new ItemApi()
            .getTokenContract()
            .then(res => res?.status ? res?.data : null);
    }

    const mintNFT = async (item) => {
        if (user?.["providerName"] === "ethereum") {
            return await mintNFTMetamask(item)
        } else {
            return await mintNFTWithLiquidity(item)
        }
    }

    const mintNFTMetamask = async (item) => {
        console.log("mintNFTMetamask")

        const contractData = await getContract();
        const tokenContractData = await getTokenContract();
        if (!contractData) return null;

        const provider = new ethers.providers.Web3Provider(window?.[user?.["providerName"]], "any");

        const signer = await provider.getSigner()
        const address = await signer.getAddress();

        const tokenContract = new ethers.Contract(tokenContractData?.address, tokenAbi, signer)
        console.log("tokenContract", tokenContract)

        const approveRes = await tokenContract.approve(contractData?.address?.toLowerCase(), 300)
        console.log("approveRes", approveRes)

        await approveRes.wait();

        const contract = new ethers.Contract(contractData?.address?.toLowerCase(), contractData?.abi, signer);
        console.log("contract", contract)

        try {
            return await contract.mintNFT(address, `https://ipfs.pragmaticdlt.com/ipns/${item?.ipnsLink}`, 300, tokenContractData?.address?.toLowerCase(), {
                gasLimit: 210000,
            })
        } catch (e) {
            console.log("e", e)
            return null
        }
    }

    const mintNFTWithLiquidity = async (item) => {
        console.log("mintNFTWithLiquidity")

        const contractData = await getContract();
        if (!contractData) return null;

        const provider = new ethers.providers.Web3Provider(window?.[user?.["providerName"]], "any");

        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        const nonce = await signer.getTransactionCount();

        const contract = new ethers.Contract(contractData?.address?.toLowerCase(), contractData?.abi, signer);
        console.log("contract", contract)

        // provider.on("error", async (a) =>{
        //     console.log("a", await a)
        // })

        const data = new Promise((resolve, reject) => {

            contract.on("Transfer", async (from, to, amount, event) => {
                console.log("contract on")
                const receipt = await event.getTransactionReceipt();
                const tnx = await event.getTransaction();

                const decodeData = await ethers.utils.defaultAbiCoder.decode([ "address", "uint256" ], receipt.logs[receipt.logs.length - 1].data);

                event.removeListener();

                console.log("tnx", tnx)

                console.log("nonce", nonce)
                console.log("nonce", nonce === tnx.nonce)
                console.log("address", address)
                console.log("address", address?.toLowerCase() === tnx.from?.toLowerCase())

                if (nonce === tnx.nonce && address?.toLowerCase() === tnx.from?.toLowerCase()) resolve({...tnx, tokenID: decodeData[1]});
            });
        })

        contract.mintNFT(address, `https://ipfs.pragmaticdlt.com/ipns/${item?.ipnsLink}`, {
            gasLimit: 210000,
            value: Number(0.00021) * 10 ** 18,
        })

        console.log("data", await data)

        return await data

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