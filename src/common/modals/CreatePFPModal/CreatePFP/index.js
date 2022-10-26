import React from 'react';
import FormPhoto from "../../../formParts/FormPhoto";
import FormInfo from "../../../formParts/FormInfo";
import FormTokens from "../../../formParts/FormTokens";
import styles from "./styles.module.scss";
import modalStyles from '../../../../assets/scss/modal.module.scss';
import addPlusIcon from '../../../../assets/img/add_plus_icon.svg'
import useHandleNFTForm from "../../../../hooks/useHandleNFTForm";
import ProcessModal from "../../ProcessModal";

const CreatePFP = ({callback, onRequestClose}) => {

    const handleNFTForm = useHandleNFTForm({callback, onRequestClose})

    return (
        <>
            <div className={styles.create_modal}>
                <div className={modalStyles.modal_head}>Upload a photo and complete your profile</div>
                <FormPhoto
                    uploadedImage={handleNFTForm.formData.image}
                    onSwitcherChange={handleNFTForm.onSwitcherChange}
                    isSwitcherOn={handleNFTForm.formData.switcher}
                    imagePreview={handleNFTForm.imagePreview}
                />
                <FormTokens
                    setSelectedToken={handleNFTForm.setSelectedToken}
                    selectedToken={handleNFTForm.selectedToken}
                />
                <div className={modalStyles.upload_modal_buttons}>
                    <label htmlFor="upload_image"
                           className={modalStyles.upload_modal_buttons_item}><span>Choose a File</span></label>
                    <div className={`
                                ${modalStyles.upload_modal_buttons_item}
                                ${handleNFTForm.isMintDisabled || !handleNFTForm.selectedToken ? modalStyles.disabled : ""} 
                            `} onClick={handleNFTForm.onItemCreate}
                    >
                        <span>Mint Your PFP</span>
                    </div>
                </div>
                <div className={modalStyles.upload_modal_form_info}>
                    <FormInfo
                        formData={handleNFTForm.formData}
                        onLinksChange={handleNFTForm.onLinksChange}
                        onInfoChange={handleNFTForm.onInfoChange}
                    />
                    <div className={modalStyles.upload_modal_bottom}>
                        <div className={modalStyles.upload_modal_add_item_btn_wrap}>
                            <div className={modalStyles.upload_modal_add_item_btn}
                                 onClick={handleNFTForm.addLinkItem}
                            >
                                <img src={addPlusIcon} alt=""/>
                            </div>
                        </div>
                        <div className={modalStyles.upload_modal_update_text}>You can change this file at any time without affecting your NFT’s token ID.</div>
                    </div>
                </div>
                <div className={modalStyles.upload_modal_close}
                     onClick={onRequestClose}
                >X</div>
                <input type="file" id="upload_image"
                       className={modalStyles.upload_modal_image_input}
                       onChange={(event) => handleNFTForm.onImageChanged(event)}
                />
            </div>
            {
                handleNFTForm.isLoader &&
                <ProcessModal title={"Minting NFT in process."}/>
            }
        </>
    );
};

export default CreatePFP;