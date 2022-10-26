import React from 'react';
import ModalCustom from "../../ModalCustom";
import UpdatePhoto from "./UpdatePhoto";

const UpdatePhotoModal = ({isOpen, onRequestClose, callback, item}) => {
    return (
        <ModalCustom isOpen={isOpen} onRequestClose={onRequestClose}>
            <UpdatePhoto
                onRequestClose={onRequestClose}
                callback={callback}
                item={item}
            />
        </ModalCustom>
    );
};

export default UpdatePhotoModal;