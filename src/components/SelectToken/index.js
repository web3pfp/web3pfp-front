import React from 'react';
import styles from './styles.module.scss'

import bitcoinIcon from '../../assets/img/tokens/bitcoin.png'
import rskIcon from '../../assets/img/tokens/rsk.png'
import xusdIcon from '../../assets/img/tokens/xusd.png'
import docIcon from '../../assets/img/tokens/doc.png'
import ethIcon from '../../assets/img/tokens/eth.png'
import usdcIcon from '../../assets/img/tokens/usdc.png'
import usdtIcon from '../../assets/img/tokens/usdt.png'
import busdIcon from '../../assets/img/tokens/busd.png'
import daiIcon from '../../assets/img/tokens/dai.png'
import polygonIcon from '../../assets/img/tokens/polygon.png'
import binanceIcon from '../../assets/img/tokens/binance.png'
import avaxIcon from '../../assets/img/tokens/avax.png'

const SelectToken = ({type}) => {
    return (
        <div>
            {
                type === "mint" &&
                <div className={styles.orange_badge}>Select which token to mint your Web3PFP with 3 USD stablecoins to mint</div>
            }
            {
                type === "replace" &&
                <div className={`${styles.orange_badge} ${styles.right}`}>Select which token to update your Web3PFP with 0.3 USD stablecoins to replace</div>
            }
            <div className={styles.chains_content}>
                <div className={styles.chains_list}>
                    <div className={`${styles.chain_item} ${styles.rsk}`}>
                        <img src={bitcoinIcon} alt=""/>
                        <img src={rskIcon} alt=""/>
                        <div className={styles.chain_item_title}>Rootstock</div>
                        <img src={xusdIcon} alt=""/>
                        <img src={docIcon} alt=""/>
                    </div>
                    <div className={`${styles.chain_item} ${styles.eth}`}>
                        <img src={ethIcon} alt=""/>
                        <div className={styles.chain_item_title}>Ethereum</div>
                        <img src={usdcIcon} alt=""/>
                        <img src={usdtIcon} alt=""/>
                        <img src={busdIcon} alt=""/>
                        <img src={daiIcon} alt=""/>
                    </div>
                    <div className={`${styles.chain_item} ${styles.polygon}`}>
                        <img src={polygonIcon} alt=""/>
                        <div className={styles.chain_item_title}>Polygon</div>
                        <img src={usdcIcon} alt=""/>
                        <img src={usdtIcon} alt=""/>
                    </div>
                    <div className={`${styles.chain_item} ${styles.binance}`}>
                        <img src={binanceIcon} alt=""/>
                        <div className={styles.chain_item_title}>Binance Smart Chain</div>
                        <img src={usdcIcon} alt=""/>
                        <img src={usdtIcon} alt=""/>
                        <img src={busdIcon} alt=""/>
                    </div>
                    <div className={`${styles.chain_item} ${styles.avax}`}>
                        <img src={avaxIcon} alt=""/>
                        <div className={styles.chain_item_title}>Avalanche</div>
                        <img src={usdcIcon} alt=""/>
                        <img src={usdtIcon} alt=""/>
                    </div>
                </div>
                <div className={styles.currencies_list}>
                    <div className={styles.currency_item}>
                        <span>XUSD</span>
                        <img src={xusdIcon} alt=""/>
                    </div>
                    <div className={styles.currency_item}>
                        <span>DoC</span>
                        <img src={docIcon} alt=""/>
                    </div>
                    <div className={styles.currency_item}>
                        <span>USDC</span>
                        <img src={usdcIcon} alt=""/>
                    </div>
                    <div className={styles.currency_item}>
                        <span>USDT</span>
                        <img src={usdtIcon} alt=""/>
                    </div>
                    <div className={styles.currency_item}>
                        <span>BUSD</span>
                        <img src={busdIcon} alt=""/>
                    </div>
                    <div className={styles.currency_item}>
                        <span>DAI</span>
                        <img src={daiIcon} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectToken;