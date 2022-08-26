import React from 'react';
import rskLogo from "../assets/img/tokens/rsk.png"
import ethLogo from "../assets/img/tokens/eth.png"
import polygonLogo from "../assets/img/tokens/polygon.png"
import binanceLogo from "../assets/img/tokens/binance.png"
import avaxLogo from "../assets/img/tokens/avax.png"

const useCommon = () => {
    const customAddress = (address) => {
        if (address?.length < 40) return address;
        return `${address?.slice(0, 2)}...${address?.slice(-4)}`;
    };

    const getProvidersLogo = (provider) => {
        switch (provider) {
            case 1:
            case 3:
            case 4:
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

    return {customAddress, getProvidersLogo};
};

export default useCommon;