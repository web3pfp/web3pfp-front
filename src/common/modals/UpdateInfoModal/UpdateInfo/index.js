import React from 'react';
import styles from './styles.module.scss'
import modalStyles from '../../../../assets/scss/modal.module.scss'
import replaceIcon from "../../../../assets/img/replace_icon_white.svg";
import FormInfo from "../../../formParts/FormInfo";
import FormTokens from "../../../formParts/FormTokens";
import addPlusIcon from "../../../../assets/img/add_plus_icon.svg";
import useHandleNFTForm from "../../../../hooks/useHandleNFTForm";
import ProcessModal from "../../ProcessModal";

const UpdateInfo = ({onRequestClose, callback, item}) => {

    const handleNFTForm = useHandleNFTForm({callback, onRequestClose, item})

    return (
        <>
            <div className={styles.update_info_modal}>
                <div className={modalStyles.modal_head}><span>Fill out form completely to update profile</span> <img src={replaceIcon} alt=""/></div>
                <FormTokens
                    selectedToken={handleNFTForm.selectedToken}
                    setSelectedToken={handleNFTForm.setSelectedToken}
                />
                <div className={modalStyles.upload_modal_form_info}>
                    <FormInfo
                        isUpdate={true}
                        onInfoChange={handleNFTForm.onInfoChange}
                        formData={handleNFTForm.formData}
                        onLinksChange={handleNFTForm.onLinksChange}
                        item={item}
                    />
                    <div className={modalStyles.upload_modal_bottom}>
                        <div className={modalStyles.upload_modal_add_item_btn_wrap}>
                            <div className={modalStyles.upload_modal_add_item_btn}
                                 onClick={handleNFTForm.addLinkItem}
                            >
                                <img src={addPlusIcon} alt=""/>
                            </div>
                        </div>
                        <div className={`${styles.update_info_modal_update_btn} ${!handleNFTForm.selectedToken ? styles.disabled : ""}`}
                             onClick={handleNFTForm.onInfoUpdate}
                        ><span>Update Profile</span></div>
                    </div>
                    <div className={modalStyles.upload_modal_update_text}>You can change this file at any time without affecting your NFT’s token ID.</div>
                </div>
                <div className={modalStyles.upload_modal_close}
                     onClick={onRequestClose}
                >X</div>
            </div>
            {
                handleNFTForm.isLoader &&
                <ProcessModal title={"Updating Info in process."}/>
            }
        </>
    );
};

export default UpdateInfo;