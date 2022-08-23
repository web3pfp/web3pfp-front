import React, {useContext, useEffect} from 'react';
import styles from './styles.module.scss'
import useAuthWithMetamask from "../../../../hooks/auth/useAuthWithMetamask";
import useAuthWithLiquality from "../../../../hooks/auth/useAuthWithLiquality";
import metamaskLogo from '../../../../assets/img/metamask.svg'
import liqualityLogo from '../../../../assets/img/liquality.webp'
import {Context} from "../../../../store";

const Auth = ({onRequestClose}) => {
    const [{user}] = useContext(Context);
    const authWithMetamask = useAuthWithMetamask()
    const authWithLiquality = useAuthWithLiquality()

    useEffect(() => {
        if (user?.publicAddress) onRequestClose()
    }, [user?.publicAddress])

    return (
        <div className={styles.auth_modal}>
            <div className={styles.auth_modal_title}>Select your Wallet</div>
            <div className={styles.auth_modal_row}>
                <div className={styles.auth_modal_wallet} onClick={authWithMetamask.loginMetamask}>
                    <img src={metamaskLogo} alt=""/>
                </div>
                <div className={styles.auth_modal_wallet} onClick={authWithLiquality.loginLiqulity}>
                    <img src={liqualityLogo} alt=""/>
                </div>
            </div>
            <div className={styles.auth_modal_close} onClick={onRequestClose}>X</div>
        </div>
    );
};

export default Auth;