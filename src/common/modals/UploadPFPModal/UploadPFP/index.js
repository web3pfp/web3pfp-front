import React, {useContext, useState} from 'react';
import styles from './styles.module.scss'
import replaceIcon from "../../../../assets/img/replace_icon_white.svg"
import watermarkIcon from "../../../../assets/img/watermark.svg"
import {Context} from "../../../../store";
import useHandleNft from "../../../../hooks/useHandleNFT";


const UploadPFP = ({onRequestClose, isReplace, callback, item = null}) => {
    const [{user}] = useContext(Context);

    const handleNft = useHandleNft({item, onRequestClose, callback})

    const [imageDescription, setImageDescription] = useState(item?.description ?? "")
    const [isSwitcherOn, setIsSwitcherOn] = useState(false)
    const [uploadedImage, setUploadedImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)

    const [isMintDisabled, setIsMintDisabled] = useState(true)
    const [isMintingInProgress, setIsMintingInProgress] = useState(false)

    const onImageChanged = (event) => {
        if (event.target.files[0]) {
            setUploadedImage(event.target.files[0])
            setImagePreview(URL.createObjectURL(event.target.files[0]))
            setIsMintDisabled(false)
        } else {
            setUploadedImage(null)
            setImagePreview(null)
            setIsMintDisabled(true)
        }
    }

    const onDescriptionChanged = (event) => setImageDescription(event.target.value)

    const onItemCreate = async () => {

        setIsMintingInProgress(true)

        const formData = new FormData()

        formData.append("file", uploadedImage);
        formData.append("desc", imageDescription);
        formData.append("provider", user?.provider);
        formData.append("isWatermark", `${+isSwitcherOn}`);

        await handleNft.mintNFT(formData)
    }

    const onItemUpdate = async () => {

        const formData = new FormData()

        formData.append("file", uploadedImage);
        formData.append("desc", imageDescription);
        formData.append("itemID", item?._id);
        formData.append("isWatermark", `${+isSwitcherOn}`);

        await handleNft.updateNFT(formData)
    }

    return (
        <div className={styles.upload_modal}>
            <div className={styles.upload_modal_head}>
                {
                    isReplace 
                        ? <><span>Replace Your PFP</span> <img src={replaceIcon} alt=""/></>
                        : <>Upload a File for your PFP</>
                }
            </div>
            {
                isReplace && <div className={styles.upload_modal_info}>You can change this file at any time without affecting your NFT’s token ID.</div>
            }
            <div className={styles.upload_modal_content}>
                <div className={styles.upload_modal_content_watermark}>
                    <div className={styles.upload_modal_content_watermark_icon}>
                        <img src={watermarkIcon} alt=""/>
                    </div>
                    <div className={`${styles.upload_modal_content_watermark_switcher} ${isSwitcherOn ? styles.active : ""}`}
                         onClick={() => setIsSwitcherOn(!isSwitcherOn)}
                    />
                </div>
                <div className={`${styles.upload_modal_content_image} ${uploadedImage || item?.link ? styles.filled : ""}`}>
                    {imagePreview && <img src={imagePreview} className={styles.upload_modal_content_image_img} alt=""/>}
                    {item?.link && !imagePreview && <img src={item.link} className={styles.upload_modal_content_image_img} alt=""/>}
                    {(imagePreview || item?.link) && isSwitcherOn && <img src={watermarkIcon} className={styles.upload_modal_content_image_watermark} alt=""/>}
                </div>
                <div className={styles.upload_modal_content_empty}/>
            </div>
            <div className={styles.upload_modal_add_desc}>
                <label htmlFor="" className={styles.upload_modal_add_desc_label}>Add a Description:</label>
                <input type="text"
                       className={styles.upload_modal_add_desc_input}
                       onChange={(event) => onDescriptionChanged(event)}
                       value={imageDescription}
                />
            </div>
            <div className={styles.upload_modal_buttons}>
                <label htmlFor="upload_image" className={styles.upload_modal_buttons_item}><span>Choose a File</span></label>
                {
                    isReplace
                        ? <div className={`${styles.upload_modal_buttons_item}`}
                               onClick={onItemUpdate}
                        ><span>Update PFP</span></div>
                        : <div className={`${styles.upload_modal_buttons_item} 
                        ${isMintDisabled || isMintingInProgress ? styles.disabled : ""}
                        `}
                               onClick={onItemCreate}
                        ><span>Mint Your PFP</span></div>
                }
            </div>
            <input type="file" id="upload_image"
                   className={styles.upload_modal_image_input}
                   onChange={(event) => onImageChanged(event)}
            />
            <div className={styles.upload_modal_close}
                 onClick={onRequestClose}
            >X</div>
        </div>
    );
};

export default UploadPFP;