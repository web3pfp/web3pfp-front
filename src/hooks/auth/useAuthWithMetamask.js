import React, {useContext} from 'react';
import useHandleWeb3 from "../web3/useHandleWeb3";
import useHandleUser from "../user/useHandleUser";
import AuthApi from "../../utils/api/AuthApi";
import {localStorageSet} from "../../utils/localStorage";
import {Context} from "../../store";
import {ethers} from 'ethers'


const useAuthWithMetamask = () => {
    const [, ACTION] = useContext(Context);
    const handleWeb3 = useHandleWeb3();
    const handleUser = useHandleUser();

    const loginMetamask = async () => {

        if (!window?.ethereum) return null;

        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        await provider.send("eth_requestAccounts", []);

        const chainId = await handleWeb3.getNetwork();

        const signer = provider.getSigner();

        const account = await signer.getAddress()

        const nonce = await handleUser.getNonce(account?.toLowerCase()).catch(() => null);
        if (!nonce) return null;

        const signature = await signer.signMessage(`I am signing my one-time nonce: ${nonce}`)

        return new AuthApi()
            .loginMetamask({ account: account?.toLowerCase(), signature, provider: chainId, providerName: "ethereum" })
            .then((res) => {
                if (res?.status) {
                    ACTION.SET_USER(res?.data?.user);
                    localStorageSet("token", res?.data?.token);
                } else {
                    if (res?.message) {
                        // ACTION.SET_NOTIFICATION(
                        //     NOTIFICATION_TYPES.ERROR,
                        //     res?.message?.response?.data?.error
                        // );
                    }
                }
            });
    }

    return {loginMetamask};
};

export default useAuthWithMetamask;