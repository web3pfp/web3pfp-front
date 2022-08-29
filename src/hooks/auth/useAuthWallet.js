import React, {useContext} from 'react';
import useHandleWeb3 from "../web3/useHandleWeb3";
import useHandleUser from "../user/useHandleUser";
import AuthApi from "../../utils/api/AuthApi";
import {localStorageSet} from "../../utils/localStorage";
import {Context} from "../../store";

const useAuthWithMetamask = () => {
    const [, ACTION] = useContext(Context);
    const handleWeb3 = useHandleWeb3();
    const handleUser = useHandleUser();

    const loginMetamask = async () => {
        if (!window?.ethereum) return null;
        const web3 = window?.web3;

        const coinbase = await web3?.eth?.getCoinbase();
        if (!coinbase) return null;

        const account = coinbase.toLowerCase();
        if (!account) return null;

        const nonce = await handleUser.getNonce(account).catch(() => null);
        if (!nonce) return null;

        const provider = await handleWeb3.getNetwork();
        if (!provider) return null;

        const signature = await window.web3?.eth.personal
            .sign(`I am signing my one-time nonce: ${nonce}`, account, "")
            .catch(() => null);
        if (!signature) {
            // auth.logout();
            return null;
        }

        return new AuthApi()
            .loginMetamask({ account, signature, provider })
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