import React from 'react';
import styles from './styles.module.scss'
import {localStorageSet} from "../../../../utils/localStorage";


const Caution = ({onRequestClose}) => {

    const onModalClose = () => {
        localStorageSet("isCautionAgreed", true)

        onRequestClose()
    }

    return (
        <div className={styles.caution_modal}>
            <div className={styles.caution_modal_title}>Caution</div>
            <div className={styles.caution_modal_text}>
                <p>Web3PFP is an experimental project featuring non-fungible tokens (NFTs) utilizing the mutable IPNS (InterPlanetary Name System) protocol within the IPFS (InterPlanetary File System) Peer-to-Peer (P2P) public file sharing network. </p>
                <p>There is a minimum donation to mint and recieve a Mutable PFP NFT into your Web3.0 wallet. Always double check the amount input in your transaction while minting. <b>Only you are responsible for any loss of funds.</b></p>
                <p>We strongly suggest you visit and review our Github before making any financial decisions/donations. </p>
                <p>Any and every blockchain interaction and/or any interaction on this website (especially with te image uploader) and thereby the InterPlanetary File System is intended to and will be considered public. <b>Anything uploaded and shared on IPFS is publicly accessible and has the potential to become permanent.</b></p>
                <p><b>No rights are assumed by or granted to any user.</b></p>
                <p><b>Under no circumstances have the owners of this website or it’s developers any liability to any person or entity for any loss or damages caused by operations on this website.</b></p>
            </div>
            <div className={styles.caution_modal_warning}>
                By continuing to use this website I acknowledge the risks associated with experimental technologies and recognize the public nature and implications of my continued interaction with this domain, the InterPlanetary File System, and distributed ledger technology.
            </div>
            <div className={styles.caution_modal_close_btn} onClick={onModalClose}>I Understand</div>
        </div>
    );
};

export default Caution;