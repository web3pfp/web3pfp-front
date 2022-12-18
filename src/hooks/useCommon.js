import React, {useContext} from 'react';
import rskLogo from "../assets/img/tokens/rsk.png"
import ethLogo from "../assets/img/tokens/eth.png"
import polygonLogo from "../assets/img/tokens/polygon.png"
import binanceLogo from "../assets/img/tokens/binance.png"
import avaxLogo from "../assets/img/tokens/avax.png"
import {Context} from "../store";

const useCommon = () => {
    const [{user}] = useContext(Context);

    const customAddress = (address) => {
        if (address?.length < 40) return address;
        return `${address?.slice(0, 2)}...${address?.slice(-4)}`;
    };

    const getProvidersLogo = (provider) => {
        switch (provider) {
            case 1:
            case 3:
            case 4:
            case 5:
                return ethLogo;

            case 30:
            case 31:
                return rskLogo;

            case 137:
            case 80001:
                return polygonLogo;

            case 56:
            case 97:
                return binanceLogo;

            case 43114:
            case 43113:
                return avaxLogo;
        }
    }

    const getChainName = () => {
        switch (user?.provider) {
            case 1: return "eth";
            case 3: return "ropsten";
            case 4: return "rinkeby"
            case 5: return "goerli";

            case 30: return "rsk";
            case 31: return "rsk test";

            case 137: return "polygon";
            case 80001: return "mumbai";

            case 56: return "bsc";
            case 97: return "bsc test";

            case 43114: return "avax"
            case 43113: return "avax test";
        }
    }

    return {customAddress, getProvidersLogo, getChainName};
};

export default useCommon;