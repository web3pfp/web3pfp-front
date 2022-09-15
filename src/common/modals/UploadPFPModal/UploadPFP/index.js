import React, {useContext, useState} from 'react';
import styles from './styles.module.scss'
import replaceIcon from "../../../../assets/img/replace_icon_white.svg"
import watermarkIcon from "../../../../assets/img/watermark.svg"
import {Context} from "../../../../store";
import useHandleNft from "../../../../hooks/useHandleNFT";

import usdcImg from "../../../../assets/img/tokens/usdc.png"
import usdtImg from "../../../../assets/img/tokens/usdt.png"
import busdImg from "../../../../assets/img/tokens/busd.png"
import daiImg from "../../../../assets/img/tokens/dai.png"
import xusdImg from "../../../../assets/img/tokens/xusd.png"
import docImg from "../../../../assets/img/tokens/doc.png"


const UploadPFP = ({onRequestClose, isReplace, callback, item = null}) => {
    const [{user}] = useContext(Context);
    const [isUploadError, setIsUploadError] = useState(false)
    const [isLoader, setIsLoader] = useState(false)


    const handleUploadError = () => {
        setIsLoader(false);
        setIsUploadError(true);
    }

    const handleLoader = (status) => setIsLoader(status)
    const handleNft = useHandleNft({item, onRequestClose, callback, handleLoader, handleUploadError})


    const [imageDescription, setImageDescription] = useState(item?.description ?? "")
    const [isSwitcherOn, setIsSwitcherOn] = useState(false)
    const [uploadedImage, setUploadedImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [selectedToken, setSelectedToken] = useState(null)

    const [isMintDisabled, setIsMintDisabled] = useState(true)
    const [isMintingInProgress, setIsMintingInProgress] = useState(false)

    const onImageChanged = (event) => {
        if (event.target.files[0]) {
            setIsUploadError(false);
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
        setIsUploadError(false);

        setIsMintingInProgress(true)

        const formData = new FormData()

        formData.append("file", uploadedImage);
        formData.append("desc", imageDescription);
        formData.append("provider", user?.provider);
        formData.append("isWatermark", `${+isSwitcherOn}`);

        await handleNft.mintNFT(formData, selectedToken)
    }

    const onItemUpdate = async () => {
        setIsUploadError(false);

        const formData = new FormData()

        formData.append("file", uploadedImage);
        formData.append("desc", imageDescription);
        formData.append("itemID", item?._id);
        formData.append("isWatermark", `${+isSwitcherOn}`);

        await handleNft.updateNFT(formData, selectedToken)
    }

    const availableTokens = () => {
        switch (user?.provider) {
            case 1:
            case 3:
            case 4:
                return [
                    {
                        img: usdcImg,
                        name: "USDC"
                    },
                    {
                        img: usdtImg,
                        name: "USDT"
                    },
                    {
                        img: busdImg,
                        name: "BUSD"
                    },
                    {
                        img: daiImg,
                        name: "DAI"
                    },
                ];

            case 137:
            case 80001:
                return [
                    {
                        img: usdcImg,
                        name: "USDC"
                    },
                    {
                        img: usdtImg,
                        name: "USDT"
                    },
                ];

            case 30:
            case 31:
                return [
                    {
                        img: xusdImg,
                        name: "XUSD"
                    },
                    {
                        img: docImg,
                        name: "DOC"
                    },
                ];

            case 56:
            case 97:
                return [
                    {
                        img: usdcImg,
                        name: "USDC"
                    },
                    {
                        img: usdtImg,
                        name: "USDT"
                    },
                    {
                        img: busdImg,
                        name: "BUSD"
                    },
                ];

            case 43114:
            case 43113:
                return [
                    {
                        img: usdcImg,
                        name: "USDC"
                    },
                    {
                        img: usdtImg,
                        name: "USDT"
                    },
                ];

            default:
                return [];
        }
    }

    return (
        <>
            <div className={styles.upload_modal}>
                <div className={styles.upload_modal_head}>
                    {
                        isReplace
                            ? <><span>Replace Your PFP</span> <img src={replaceIcon} alt=""/></>
                            : <>Upload a File for your PFP</>
                    }
                </div>
                {
                    isUploadError && <div className={styles.upload_modal_error}>IPNS timeout. Please reload file again</div>
                }
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
                <div className={styles.upload_modal_choose_token}>
                    <span>Choose Token: </span>
                    <div className={styles.upload_modal_choose_token_list}>
                        {
                            availableTokens()?.map((token, key) => {
                                return (
                                    <div className={`${styles.upload_modal_choose_token_list_item} ${selectedToken === token?.name ? styles.active : ""}`}
                                         onClick={() => setSelectedToken(token?.name)}
                                         key={key}
                                    >
                                        <img src={token?.img} alt=""/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={styles.upload_modal_buttons}>
                    <label htmlFor="upload_image" className={styles.upload_modal_buttons_item}><span>Choose a File</span></label>
                    {
                        isReplace
                            ? <div className={`${styles.upload_modal_buttons_item}`}
                                   onClick={onItemUpdate}
                            ><span>Update PFP</span></div>
                            : <div className={`${styles.upload_modal_buttons_item} 
                             ${isMintDisabled || isMintingInProgress || !selectedToken ? styles.disabled : ""}
                        `}
                                   onClick={onItemCreate}
                            ><span>Mint Your PFP</span></div>
                    }
                </div>
                <input type="file" id="upload_image"
                       className={styles.upload_modal_image_input}
                       onChange={(event) => onImageChanged(event)}
                />
                {
                    !isLoader && < div className={styles.upload_modal_close}
                                       onClick={onRequestClose}
                    >X</div>
                }
            </div>
            {
                isLoader &&
                <div className={styles.upload_modal_loader}>
                    <div className={styles.upload_modal_loader_content}>
                        <p>Minting NFT in process.</p>
                        <p><b>Do not close this tab and do not reload this page <br/>otherwise the progress will be lost.</b></p>
                        <p>Users will be prompted to sign two separate approvals.</p>
                        <p>Minting process may take up to 3 minutes.</p>
                    </div>
                </div>
            }
        </>
    );
};

export default UploadPFP;