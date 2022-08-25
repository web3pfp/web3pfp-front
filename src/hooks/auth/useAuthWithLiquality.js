import React, {useContext} from 'react';
import useHandleUser from "../user/useHandleUser";
import AuthApi from "../../utils/api/AuthApi";
import {localStorageSet} from "../../utils/localStorage";
import {Context} from "../../store";
import {ethers} from "ethers";


const useAuthWithLiquality = () => {
    const [, ACTION] = useContext(Context);
    const handleUser = useHandleUser();

    const loginLiquality = async (chain) => {

        if (!window?.[chain]) return null;

        const provider = new ethers.providers.Web3Provider(window?.[chain], "any");

        // const chainId = await handleWeb3.getNetwork();

        const signer = provider.getSigner();

        const account = await signer.getAddress()

        const nonce = await handleUser.getNonce(account).catch(() => null);
        if (!nonce) return null;

        const signature = await signer.signMessage(`I am signing my one-time nonce: ${nonce}`)

        const chainId = 9999;


        return new AuthApi()
            .loginLiquality({ account: account, signature, provider: chainId })
            .then((res) => {
                console.log("loginMetamask api", res)
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

    return {loginLiquality};
};

export default useAuthWithLiquality;