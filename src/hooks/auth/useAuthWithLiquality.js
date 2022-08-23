import React, {useContext} from 'react';
import useHandleUser from "../user/useHandleUser";
import AuthApi from "../../utils/api/AuthApi";
import {localStorageSet} from "../../utils/localStorage";
import {Context} from "../../store";


const useAuthWithLiquality = () => {
    const [, ACTION] = useContext(Context);
    const handleUser = useHandleUser();

    const loginLiqulity = async () => {

        if (!window?.bitcoin) return null;

        const bitcoin = window?.bitcoin

        const addresses = await bitcoin.request({ method: 'wallet_getAddresses', params: [0, 2] })

        const nonce = await handleUser.getNonce(addresses[0]?.address).catch(() => null);
        if (!nonce) return null;

        const signature = await bitcoin.request({ method: 'wallet_signMessage', params: [
                `I am signing my one-time nonce: ${nonce}`,
                addresses[0]?.address
            ] })

        const chainId = 9999;


        return new AuthApi()
            .loginLiquality({ account: addresses[0]?.address, signature, provider: chainId })
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

    return {loginLiqulity};
};

export default useAuthWithLiquality;