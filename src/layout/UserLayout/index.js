import React, {useEffect, useState} from 'react';
import copyLogo from '../../assets/img/copy_logo.svg'
import {Link} from 'react-router-dom'
import {pathList} from "../../routes/path";
import CautionModal from "../../common/modals/CautionModal";
import {localStorageGet} from "../../utils/localStorage";

const UserLayout = ({children}) => {
    const [isCautionModalOpen, setIsCautionModalOpen] = useState(false)

    const pageName = window.location.pathname.replace('/', '').split('/')[0];

    const openCautionModalOpen = () => setIsCautionModalOpen(true)
    const closeCautionModalOpen = () => setIsCautionModalOpen(false)

    useEffect(() => {
        const isCaution = localStorageGet("isCautionAgreed", false)

        if (!isCaution) {
            setTimeout(() => openCautionModalOpen(), 2000)
        }

    }, [])

    return (
        <div id="layout" className={`page ${pageName}`}>
            <div className="top_buttons">
                <Link className="top_buttons_item"  to={pathList.mainPage.path}>Web3PFP</Link>
                <Link className="top_buttons_item" to={pathList.gallery.path}>My PFPs</Link>
                <div className="top_buttons_item end">Connect Wallet</div>
            </div>
            {children}
            <div className="footer">
                <img src={copyLogo} alt="" className="footer_logo"/>
                <div className="footer_text">Copyright © 2022 Web3PFP. All rights reserved</div>
            </div>
            <CautionModal
                onRequestClose={closeCautionModalOpen}
                isOpen={isCautionModalOpen}
            />
        </div>
    );
};

export default UserLayout;