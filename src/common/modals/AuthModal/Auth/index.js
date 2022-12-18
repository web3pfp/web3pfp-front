import React, {useContext, useEffect, useState} from 'react';
import styles from './styles.module.scss'
import useAuthWithMetamask from "../../../../hooks/auth/useAuthWithMetamask";
import useAuthWithLiquality from "../../../../hooks/auth/useAuthWithLiquality";
import {Context} from "../../../../store";

import metamaskLogo from '../../../../assets/img/metamask.svg'
import liqualityLogo from '../../../../assets/img/liquality.webp'

import rskLogo from '../../../../assets/img/tokens/rsk.png'
import ethLogo from '../../../../assets/img/tokens/eth.png'
import polygonLogo from '../../../../assets/img/tokens/polygon.png'
import binanceLogo from '../../../../assets/img/tokens/binance.png'
import avaxLogo from '../../../../assets/img/tokens/avax.png'

const Auth = ({onRequestClose}) => {
    const [{user}] = useContext(Context);
    const authWithMetamask = useAuthWithMetamask()
    const authWithLiquality = useAuthWithLiquality()

    useEffect(() => {
        if (user?.publicAddress) onRequestClose()
    }, [user?.publicAddress])

    const [isMetaMaskDisabled] = useState(!window?.ethereum?.isMetaMask)
    const [isLiquality] = useState(!!window?.eth)

    return (
        <div className={styles.auth_modal}>
            <div className={styles.auth_modal_title}>Select your Wallet</div>
            <div className={styles.auth_modal_row}>
                <div className={`${styles.auth_modal_wallet_button_item} ${styles.metamask} ${isMetaMaskDisabled ? styles.disabled : ""}`} onClick={authWithMetamask.loginMetamask}>
                    <img src={metamaskLogo} alt=""/>
                    <span>MetaMask</span>
                </div>
                    <div className={styles.auth_modal_wallet}>
                        <img src={liqualityLogo} alt=""/>
                        <div className={styles.auth_modal_wallet_buttons}>
                            <div className={`${styles.auth_modal_wallet_button_item} ${!isLiquality ? styles.disabled : ""}`} onClick={() => authWithLiquality.loginLiquality("rsk")}>
                                <img src={rskLogo} alt=""/>
                                <span>Rootstock</span>
                            </div>
                            <div className={`${styles.auth_modal_wallet_button_item} ${!isLiquality ? styles.disabled : ""}`} onClick={() => authWithLiquality.loginLiquality("eth")}>
                                <img src={ethLogo} alt=""/>
                                <span>Ethereum</span>
                            </div>
                            <div className={`${styles.auth_modal_wallet_button_item} ${!isLiquality ? styles.disabled : ""}`} onClick={() => authWithLiquality.loginLiquality("polygon")}>
                                <img src={polygonLogo} alt=""/>
                                <span>Polygon</span>
                            </div>
                            <div className={`${styles.auth_modal_wallet_button_item} ${!isLiquality ? styles.disabled : ""}`} onClick={() => authWithLiquality.loginLiquality("bsc")}>
                                <img src={binanceLogo} alt=""/>
                                <span>Binance SC</span>
                            </div>
                            <div className={`${styles.auth_modal_wallet_button_item} ${!isLiquality ? styles.disabled : ""}`} onClick={() => authWithLiquality.loginLiquality("avalanche")}>
                                <img src={avaxLogo} alt=""/>
                                <span>Avalanche</span>
                            </div>
                        </div>
                    </div>
            </div>
            <div className={styles.auth_modal_close} onClick={onRequestClose}>X</div>
        </div>
    );
};

export default Auth;