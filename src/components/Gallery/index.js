import React, {useEffect, useState} from 'react';
import styles from "./styles.module.scss"
import replaceIcon from "../../assets/img/replace_icon.svg"
import rskChainImg from "../../assets/img/rsk_chain.png"
import UploadPFPModal from "../../common/modals/UploadPFPModal";
import ItemApi from "../../utils/api/ItemApi";

const Gallery = () => {

    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
    const [isReplaceModal, setIsReplaceModal] = useState(false)
    const [galleryData, setGalleryData] = useState(null)

    const openUploadModal = (type) => {
        setIsReplaceModal(type)
        setIsUploadModalOpen(true)
    }

    const closeUploadModal = () => setIsUploadModalOpen(false)

    const getAll = () => {
        new ItemApi()
            .getAll()
            .then(res => {
                if (res?.status) {
                    setGalleryData(res?.data)
                }
            })
    }

    useEffect(() => {
        getAll()
    }, [])

    const onImageUploaded = () => {
        getAll()
    }

    return (
        <div>
            <div className={styles.orange_badge}>Your Gallery</div>
            <div className={styles.gallery_content_wrap}>
                <div className={styles.gallery_mint_btn}
                     onClick={() => openUploadModal(false)}
                ><span>Mint New PFP</span></div>
                <div className={styles.gallery_grid}>
                    {
                        galleryData && galleryData?.map((item, idx) => {
                            return (
                                <div key={idx} className={styles.gallery_grid_item}>
                                    <div className={styles.gallery_grid_item_info}>
                                        <div className={styles.gallery_grid_item_info_name}>PFP #1</div>
                                        <div className={styles.gallery_grid_item_info_id}>Token ID: 15,675</div>
                                    </div>
                                    <div className={styles.gallery_grid_item_img}>
                                        <img src={item?.link} alt=""/>
                                    </div>
                                    <div className={styles.gallery_grid_item_desc}>{item?.description ? item?.description : <br/>}</div>
                                    <div className={styles.gallery_grid_item_replace_btn}
                                         onClick={() => openUploadModal(true)}
                                    >
                                        <span>Replace</span>
                                        <img src={replaceIcon} alt=""/>
                                    </div>
                                    <div className={styles.gallery_grid_item_chain_icon}>
                                        <img src={rskChainImg} alt=""/>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <UploadPFPModal
                isOpen={isUploadModalOpen}
                onRequestClose={closeUploadModal}
                isReplace={isReplaceModal}
                callback={onImageUploaded}
            />
        </div>
    );
};

export default Gallery;