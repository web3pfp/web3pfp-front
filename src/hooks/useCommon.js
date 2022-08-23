import React from 'react';

const useCommon = () => {
    const customAddress = (address) => {
        if (address?.length < 40) return address;
        return `${address?.slice(0, 2)}...${address?.slice(-4)}`;
    };

    return {customAddress};
};

export default useCommon;