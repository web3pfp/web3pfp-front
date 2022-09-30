import React from 'react';
import ModalCustom from "../../ModalCustom";
import UploadPFP from "./UploadPFP";

const UploadPFPModal = ({isOpen, onRequestClose, isReplace, callback, item}) => {
    return (
        <ModalCustom isOpen={isOpen} onRequestClose={onRequestClose}>
            <UploadPFP
                onRequestClose={onRequestClose}
                isReplace={isReplace}
                callback={callback}
                item={item}
            />
        </ModalCustom>
    );
};

export default UploadPFPModal;