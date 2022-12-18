import React from 'react';
import ModalCustom from "../../ModalCustom";
import CreatePFP from "./CreatePFP";

const CreatePFPModal = ({isOpen, onRequestClose, callback}) => {
    return (
        <ModalCustom isOpen={isOpen} onRequestClose={onRequestClose}>
            <CreatePFP
                onRequestClose={onRequestClose}
                callback={callback}
            />
        </ModalCustom>
    );
};

export default CreatePFPModal;