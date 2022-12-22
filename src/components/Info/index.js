import React, {useEffect} from 'react';
import styles from './styles.module.scss'

const Info = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div>
            <div className={styles.orange_badge}>Learn More</div>
            <div className={styles.info_content}>
                <h3>Web3PFP</h3>
                <p>Users can donate (minimum 3 USD stable coin) and receive a Web3PFP for their personal use.</p>
                <p>Users can elect at any time to revisit this website, connect their web 3 wallet containing the Web3PFP NFT, and replace their Web3PFP image or profile information for an access fee (0.3 or 0.5 USD stable coins, respectively.)</p>
                <p>Users and online communities can utilize the public nature of the blockchain to apply a layer of security to their platform use through token contract and token ID verification.</p>
                <p>Communities and their members can check that a user’s unique token ID on one platform matches the token ID the same apparent user has connected to a second platform, verifying the alternate platform user is actually the same user as the primary platform. </p>
                <p>Web3PFP allows for more sophisticated tools to be used in community security and intends to pursue development of further security options for community managers and individual users. </p>
                <p>Bedtime Labs believes cross-platform verification and curation (following, filtering, or blocking individual user’s token IDs on a personal basis across a variety of different platforms) will help provide a safer Web3 experience and assist in blockchain adoption.</p>
                <h3>Content distributed through the InterPlanetary File System:</h3>
                <p><a href="https://ipfs.tech/" target="_blank" rel="noreferrer">IPFS</a> (the InterPlanetary File System) is a peer-to-peer hypermedia protocol for content addressing. An alternative to the HTTP protocol, IPFS builds on the principles of peer-to-peer networking and content-based addressing to create a decentralized, distributed, and trustless data storage and delivery network.</p>
                <p>With IPFS, users ask for a file and the system finds and delivers the closest copy without the need to trust a centralized delivery source. In addition to more efficient content distribution, IPFS offers improved security, content integrity, and resistance to third-party tampering. </p>
                <h3>Content linked through NFT token URI using InterPlanetary Name System:</h3>
                <p> The InterPlanetary Name System (<a href="https://docs.ipfs.tech/concepts/ipns/" target="_blank" rel="noreferrer">IPNS</a>) is a system for creating such mutable pointers to CIDs (IPFS content/uploads) known as names or IPNS names. IPNS names can be thought of as links that can be updated over time, while retaining the verifiability of content addressing. </p>
                <h3>User content uploaded to IPFS and stored on Filecoin with Web3.storage: </h3>
                <p><a href="https://web3.storage/" target="_blank" rel="noreferrer">Web3.storage</a> is a service provided by Protocol Labs that allows scalable IPFS uploads and ensures data redundancy of user content. Web3.storage is backed by Filecoin and makes content available via IPFS leveraging the unique properties of each network. </p>
                <p> Users can verify their token's content (as well as filecoin backup status) after uploads or updates by inputting their IPNS name found in their token URI into the w3.name api "GET name" function. The <a
                    href="https://web3.storage/docs/reference/w3name-http-api/" target="_blank" rel="noreferrer">w3.name api</a> will return an IPFS CID. Users may input this CID into the <a
                    href="https://web3.storage/docs/reference/http-api/" target="_blank" rel="noreferrer">web3.storage api</a> "GET status" function.</p>
                <p>The IPFS CID returned by the w3.name api can be reached through any public IPFS gateway of the users choice to verify it's availability.</p>
                <h3>Token contract addresses are:</h3>
                <ul>
                    <li>Rootstock: <b>0xb3E3c947f1f85A973Da1985E4d11672542257714</b></li>
                    <li>Ethereum: <b>0x075cD95749e4Ac186D72734A211162e4E127b9E1</b></li>
                    <li>Polygon: <b>0x075cD95749e4Ac186D72734A211162e4E127b9E1</b></li>
                    <li>Binance Smart Chain: <b>0xB3e3C947f1F85a973dA1985e4D11672542257714</b></li>
                    <li>Avalanche C-chain: <b>0x075cD95749e4Ac186D72734A211162e4E127b9E1</b></li>
                </ul>
                <h3>Donation address: </h3>
                <ul>
                    <li>
                        <b>EVM (multichain):</b>
                        <ul>
                            <li>bedtimelabs.rsk  /  bedtimelabs.eth</li>
                            <li>0x19a1ebd311d6cabab6d04f51d420e60982ef9525</li>
                        </ul>
                    </li>
                    <li style={{marginTop: 20}}>
                        <b>BTC:</b>
                        <ul>
                            <li>bc1q4zpt8rl4wmf0l8kpx8mv94yanf652xk6t524au</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Info;