import React from 'react';
import ModalCustom from "../../ModalCustom";
import UploadPFP from "./UploadPFP";

const UploadPFPModal = ({isOpen, onRequestClose, isReplace, callback}) => {
    return (
        <ModalCustom isOpen={isOpen} onRequestClose={onRequestClose}>
            <UploadPFP
                onRequestClose={onRequestClose}
                isReplace={isReplace}
                callback={callback}
            />
        </ModalCustom>
    );
};

export default UploadPFPModal;