import React, {useState} from 'react';
import styles from './styles.module.scss'
import replaceIcon from "../../../../assets/img/replace_icon_white.svg"
import watermarkIcon from "../../../../assets/img/watermark.svg"
import nftPreview from "../../../../assets/img/token_preview.jpg"


const UploadPFP = ({onRequestClose, isReplace}) => {

    const [isImageUploaded, setIsImageUploaded] = useState(false)
    const [isSwitcherOn, setIsSwitcherOn] = useState(false)

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
                <div className={`${styles.upload_modal_content_image} ${isImageUploaded ? styles.filled : ""}`}
                     onClick={() => setIsImageUploaded(!isImageUploaded)}
                >
                    {isImageUploaded && <img src={nftPreview} alt=""/>}
                </div>
                <div className={styles.upload_modal_content_empty}/>
            </div>
            <div className={styles.upload_modal_add_desc}>
                <label htmlFor="" className={styles.upload_modal_add_desc_label}>Add a Description:</label>
                <input type="text" className={styles.upload_modal_add_desc_input}/>
            </div>
            <div className={styles.upload_modal_buttons}>
                <div className={styles.upload_modal_buttons_item}><span>Choose a File</span></div>
                {
                    isReplace
                        ? <div className={styles.upload_modal_buttons_item}><span>Update PFP</span></div>
                        : <div className={styles.upload_modal_buttons_item}><span>Mint Your PFP</span></div>
                }
            </div>
            <div className={styles.upload_modal_close}
                 onClick={onRequestClose}
            >X</div>
        </div>
    );
};

export default UploadPFP;