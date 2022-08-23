import React from 'react';
import ModalCustom from "../../ModalCustom";
import Auth from "./Auth";

const AuthModal = ({isOpen, onRequestClose}) => {
    return (
        <ModalCustom isOpen={isOpen} onRequestClose={onRequestClose}>
            <Auth onRequestClose={onRequestClose}/>
        </ModalCustom>
    );
};

export default AuthModal;