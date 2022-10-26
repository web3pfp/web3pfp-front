import React from 'react';
import styles from "./styles.module.scss";

const ProcessModal = ({title}) => {

    return (
        <div className={styles.upload_modal_loader}>
            <div className={styles.upload_modal_loader_content}>
                <p>{title}</p>
                <p><b>Do not close this tab and do not reload this page <br/>otherwise the progress will be lost.</b></p>
                <p>Users will be prompted to sign two separate approvals.</p>
                <p>Minting process may take up to 3 minutes.</p>
            </div>
        </div>
    );
};

export default ProcessModal;