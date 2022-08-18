import React from 'react';
import ModalCustom from "../../ModalCustom";
import UploadPFP from "./UploadPFP";

const UploadPFPModal = ({isOpen, onRequestClose, isReplace}) => {
    return (
        <ModalCustom isOpen={isOpen} onRequestClose={onRequestClose}>
            <UploadPFP
                onRequestClose={onRequestClose}
                isReplace={isReplace}
            />
        </ModalCustom>
    );
};

export default UploadPFPModal;