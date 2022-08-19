import React from 'react';
import styles from './styles.module.scss'

const Info = () => {
    return (
        <div>
            <div className={styles.orange_badge}>Learn More</div>
            <div className={styles.info_content}>
                <p>Users can donate (minimum 3 USD stable coin) and receive a Web3PFP for their personal use.</p>
                <p>Users can elect at any time to revisit this website, connect their web 3 wallet containing the Web3PFP NFT, and replace the Web3PFP image for an access fee (0.3 USD stable coin)</p>
                <p>Web3PFP uses the IPNS protocol within the IPFS peer-to-peer (p2p) network: https://docs.ipfs.io/concepts/ipns/</p>
                <p>Please feel free to review our code at: <a href="#">github.io/////</a></p>
                <p>Token contract addresses are:</p>
                <p>
                    Rootstock: <br/>
                    Ethereum : <br/>
                    Polygon : <br/>
                    Binance Smart Chain : <br/>
                    Avalanche C-chain:
                </p>
                <p>Donation addresses are:</p>
                <p>
                    RSK: <br/>
                    ETH: <br/>
                    MATIC: <br/>
                    BSC: <br/>
                    AVAX:
                </p>
            </div>
        </div>
    );
};

export default Info;