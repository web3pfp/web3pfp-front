import React from 'react';
import styles from './styles.module.scss'

const Info = () => {
    return (
        <div>
            <div className={styles.orange_badge}>Learn More</div>
            <div className={styles.info_content}>
                <p>Users can donate (minimum 3 USD stable coin) and receive a Web3PFP for their personal use.</p>
                <p>Users can elect at any time to revisit this website, connect their web 3 wallet containing the Web3PFP NFT, and replace the Web3PFP image for an access fee (0.3 USD stable coin)</p>
                <p>Users and online communities can utilize the public nature of the blockchain to apply a layer of security to their platform use through token contract and token ID verification.</p>
                <p>Communities and their members can check that a user’s unique token ID on one platform matches the token ID the same apparent user has connected to a second platform, verifying the alternate platform user is actually the same user as the primary platform. </p>
                <p>Web3PFP allows for more sophisticated tools to be used in community security and intends to pursue development of further security options for community managers and individual users. </p>
                <p>Bedtime Labs believes cross-platform verification and curation (following, filtering, or blocking individual user’s token IDs on a personal basis across a variety of different platforms) will help provide a safer Web3 experience and assist in blockchain adoption.</p>
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