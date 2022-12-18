import React from 'react';
import ModalCustom from "../../ModalCustom";
import UpdateInfo from "./UpdateInfo";

const UpdateInfoModal = ({isOpen, onRequestClose, callback, item}) => {
    return (
        <ModalCustom isOpen={isOpen} onRequestClose={onRequestClose}>
            <UpdateInfo
                onRequestClose={onRequestClose}
                callback={callback}
                item={item}
            />
        </ModalCustom>
    );
};

export default UpdateInfoModal;