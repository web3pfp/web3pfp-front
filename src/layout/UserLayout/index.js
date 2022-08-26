import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import {Context} from "../../store";
import useAuth from "../../hooks/auth/useAuth";
import useInitFirstLoad from "../../hooks/useInitFirstLoad";
import useCommon from "../../hooks/useCommon";
import AuthModal from "../../common/modals/AuthModal";
import CautionModal from "../../common/modals/CautionModal";
import {pathList} from "../../routes/path";
import {localStorageGet} from "../../utils/localStorage";

const UserLayout = ({children}) => {
    useInitFirstLoad();
    const [{user, loginModal}, ACTION] = useContext(Context);

    const {customAddress, getProvidersLogo} = useCommon()
    const auth = useAuth()

    const [isCautionModalOpen, setIsCautionModalOpen] = useState(false)

    const pageName = window.location.pathname.replace('/', '').split('/')[0];

    const openCautionModalOpen = () => setIsCautionModalOpen(true)
    const closeCautionModalOpen = () => setIsCautionModalOpen(false)
    const closeAuthModal = () => ACTION.SET_LOGIN_MODAL(false)

    useEffect(() => {
        const isCaution = localStorageGet("isCautionAgreed", false)

        if (!isCaution) {
            setTimeout(() => openCautionModalOpen(), 2000)
        }

    }, [])


    const [isWallets] = useState(!!window?.ethereum || !!window?.eth)

    return (
        <div id="layout" className={`page ${pageName?.length > 0 ? pageName : "main_page"}`}>
            <div className="top_buttons">
                <Link className="top_buttons_item top_buttons_item_main"  to={pathList.mainPage.path}>Web3PFP</Link>
                {
                    user?.publicAddress && <Link className="top_buttons_item top_buttons_item_gallery" to={pathList.gallery.path}>My PFPs</Link>
                }
                {
                    user?.publicAddress
                        ? <div className="top_buttons_item top_buttons_item_wallet end" onClick={auth.logout}>
                            <img src={getProvidersLogo(user?.provider)} alt=""/>
                            {customAddress(user?.publicAddress)}
                    </div>
                        : <>
                            {
                                isWallets &&
                                <div className="top_buttons_item top_buttons_item_wallet end"
                                     onClick={() => ACTION.SET_LOGIN_MODAL(true)}
                                >Connect Wallet</div>
                            }
                        </>
                }
            </div>
            {children}
            <div className="footer">
                <div className="footer_logo"/>
                <div className="footer_text">Copyright © 2022 Web3PFP. All rights reserved</div>
            </div>
            <CautionModal
                onRequestClose={closeCautionModalOpen}
                isOpen={isCautionModalOpen}
            />
            <AuthModal
                isOpen={loginModal}
                onRequestClose={closeAuthModal}
            />
        </div>
    );
};

export default UserLayout;