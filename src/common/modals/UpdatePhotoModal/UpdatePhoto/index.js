import React from 'react';
import styles from './styles.module.scss'
import replaceIcon from "../../../../assets/img/replace_icon_white.svg"
import FormPhoto from "../../../formParts/FormPhoto";
import useHandleNFTForm from "../../../../hooks/useHandleNFTForm";
import FormTokens from "../../../formParts/FormTokens";
import modalStyles from "../../../../assets/scss/modal.module.scss";
import ProcessModal from "../../ProcessModal";

const UpdatePhoto = ({onRequestClose, callback, item}) => {

    const handleNFTForm = useHandleNFTForm({item, callback, onRequestClose})

    return (
        <>
            <div className={styles.upload_modal}>
                <div className={styles.upload_modal_head}>
                    <span>Update Your Photo</span> <img src={replaceIcon} alt=""/>
                </div>
                {
                    handleNFTForm.isUploadError && <div className={styles.upload_modal_error}>IPNS timeout. Please reload file again</div>
                }
                <FormPhoto
                    imagePreview={handleNFTForm.imagePreview}
                    isSwitcherOn={handleNFTForm.formData.switcher}
                    onSwitcherChange={handleNFTForm.onSwitcherChange}
                    item={item}
                    uploadedImage={handleNFTForm.formData.image}
                />
                {
                    item?.profileName && <div className={styles.upload_modal_profile_name}>{item?.profileName}</div>
                }
                <FormTokens
                    selectedToken={handleNFTForm.selectedToken}
                    setSelectedToken={handleNFTForm.setSelectedToken}
                />
                <div className={styles.upload_modal_buttons}>
                    <label htmlFor="upload_image" className={styles.upload_modal_buttons_item}><span>Choose a File</span></label>
                    <div className={`${styles.upload_modal_buttons_item} ${handleNFTForm.isMintDisabled || !handleNFTForm.selectedToken ? styles.disabled : ""} `}
                                   onClick={handleNFTForm.onPhotoUpdate}
                            >
                                <span>Update PFP</span>
                        </div>
                </div>
                <div className={modalStyles.upload_modal_update_text}>You can change this file at any time without affecting your NFT’s token ID.</div>
                {
                    !handleNFTForm.isLoader && <div className={styles.upload_modal_close}
                                       onClick={onRequestClose}
                    >X</div>
                }
                <input type="file" id="upload_image"
                       className={modalStyles.upload_modal_image_input}
                       onChange={(event) => handleNFTForm.onImageChanged(event)}
                />
            </div>
            {
                handleNFTForm.isLoader &&
                <ProcessModal title={"Updating Photo in process."}/>
            }
        </>
    );
};

export default UpdatePhoto;