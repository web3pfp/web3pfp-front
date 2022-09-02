import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom"
import {Context} from "../../store";
import ItemApi from "../../utils/api/ItemApi";
import UploadPFPModal from "../../common/modals/UploadPFPModal";
import useCommon from "../../hooks/useCommon";
import styles from "./styles.module.scss"
import replaceIcon from "../../assets/img/replace_icon.svg"
import {localStorageGet} from "../../utils/localStorage";

const Gallery = () => {
    const [{user}] = useContext(Context);
    const navigate = useNavigate()

    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
    const [isReplaceModal, setIsReplaceModal] = useState(false)
    const [galleryData, setGalleryData] = useState(null)
    const [selectedItem, setSelectedItem] = useState(null)

    const {getProvidersLogo} = useCommon()

    const openUploadModal = (type, item) => {
        setIsReplaceModal(type)
        setSelectedItem(item)
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

    useEffect(() => {
        const token = localStorageGet("token", null)
        if (!token) navigate("/")
    }, [user])

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
                                        <div className={styles.gallery_grid_item_info_id}>Token ID: {item?.tokenID}</div>
                                    </div>
                                    <div className={styles.gallery_grid_item_img}>
                                        <img src={item?.link} alt=""/>
                                    </div>
                                    <div className={styles.gallery_grid_item_desc}>{item?.description ? item?.description : <br/>}</div>
                                    <div className={`${styles.gallery_grid_item_replace_btn} ${user?.provider !== item?.provider ? styles.disabled : ""}`}
                                         onClick={() => openUploadModal(true, item)}
                                    >
                                        <span>Replace</span>
                                        <img src={replaceIcon} alt=""/>
                                    </div>
                                    <div className={styles.gallery_grid_item_chain_icon}>
                                        <img src={getProvidersLogo(item?.provider)} alt=""/>
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
                item={selectedItem}
            />
        </div>
    );
};

export default Gallery;