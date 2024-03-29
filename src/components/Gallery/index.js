import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom"
import {Context} from "../../store";
import UpdatePhotoModal from "../../common/modals/UpdatePhotoModal";
import useCommon from "../../hooks/useCommon";
import styles from "./styles.module.scss"
import replaceIcon from "../../assets/img/replace_icon.svg"
import {localStorageGet} from "../../utils/localStorage";
import useHandleNft from "../../hooks/useHandleNFT";
import CreatePFPModal from "../../common/modals/CreatePFPModal";
import UpdateInfoModal from "../../common/modals/UpdateInfoModal";
import LoadNFTModal from "../../common/modals/LoadNFTModal";

const Gallery = () => {
    const [{user}] = useContext(Context);
    const navigate = useNavigate()
    const handleNft = useHandleNft({})

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isLoadNFTModalOpen, setIsLoadNFTModalOpen] = useState(false)
    const [isUpdatePhotoModalOpen, setIsUpdatePhotoModalOpen] = useState(false)
    const [isUpdateInfoModalOpen, setIsUpdateInfoModalOpen] = useState(false)
    const [galleryData, setGalleryData] = useState(null)
    const [selectedItem, setSelectedItem] = useState(null)

    const {getProvidersLogo} = useCommon()

    const openCreateModal = () => setIsCreateModalOpen(true)
    const openLoadNFTModal = () => setIsLoadNFTModalOpen(true)
    const openUpdatePhotoModal = (item = null) => {
        setSelectedItem(item)
        setIsUpdatePhotoModalOpen(true)
    }
    const openUpdateInfoModal = (item = null) => {
        setSelectedItem(item)
        setIsUpdateInfoModalOpen(true)
    }

    const closeUpdatePhotoModal = () => setIsUpdatePhotoModalOpen(false)
    const closeCreateModal = () => setIsCreateModalOpen(false)
    const closeUpdateInfoModal = () => setIsUpdateInfoModalOpen(false)
    const closeLoadNFTModal = () => setIsLoadNFTModalOpen(false)

    useEffect(() => {
        const init = async () => {
            if (user) setGalleryData(await handleNft.getAll())
        }

        init()
    }, [user])

    useEffect(() => {
        const token = localStorageGet("token", null)
        if (!token) navigate("/")
    }, [user])

    const onImageUploaded = async () => {
        setGalleryData(await handleNft.getAll())
    }

    const onTokenLoaded = async () => {
        setGalleryData(await handleNft.getAll())
        closeLoadNFTModal()
    }

    return (
        <div>
            <div className={styles.orange_badge}>Your Gallery</div>
            <div className={styles.gallery_content_wrap}>
                <div className={styles.gallery_btns_row}>
                    <div className={styles.gallery_mint_btn}
                         onClick={openLoadNFTModal}
                    ><span>Load NFT</span></div>
                    <div className={styles.gallery_mint_btn}
                         onClick={openCreateModal}
                    ><span>Mint New PFP</span></div>
                </div>
                <div className={styles.gallery_grid}>
                    {
                        galleryData && galleryData?.map((item, idx) => {
                            return (
                                <div key={idx} className={styles.gallery_grid_item}>
                                    <div className={styles.gallery_grid_item_info}>
                                        <div className={styles.gallery_grid_item_info_id}>Token ID: {item?.tokenID}</div>
                                    </div>
                                    <div className={styles.gallery_grid_item_img}>
                                        <img src={item?.link} alt=""/>
                                    </div>
                                    <div className={styles.gallery_grid_item_desc}>{item?.profileName ? item?.profileName : <br/>}</div>
                                    <div className={styles.gallery_grid_item_buttons_row}>
                                        <div className={styles.gallery_grid_item_chain_icon}>
                                            <img src={getProvidersLogo(item?.provider)} alt=""/>
                                        </div>
                                        <div className={`${styles.gallery_grid_item_replace_btn} ${user?.provider !== item?.provider ? styles.disabled : ""}`}
                                             onClick={() => openUpdatePhotoModal(item)}
                                        >
                                            <span>Photo</span>
                                            <img src={replaceIcon} alt=""/>
                                        </div>
                                        <div className={`${styles.gallery_grid_item_replace_btn} ${user?.provider !== item?.provider ? styles.disabled : ""}`}
                                             onClick={() => openUpdateInfoModal(item)}
                                        >
                                            <span>Info</span>
                                            <img src={replaceIcon} alt=""/>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <UpdatePhotoModal
                isOpen={isUpdatePhotoModalOpen}
                onRequestClose={closeUpdatePhotoModal}
                callback={onImageUploaded}
                item={selectedItem}
            />
            <CreatePFPModal
                isOpen={isCreateModalOpen}
                onRequestClose={closeCreateModal}
                callback={onImageUploaded}
            />
            <UpdateInfoModal
                isOpen={isUpdateInfoModalOpen}
                item={selectedItem}
                onRequestClose={closeUpdateInfoModal}
                callback={onImageUploaded}
            />
            <LoadNFTModal
                isOpen={isLoadNFTModalOpen}
                onRequestClose={closeLoadNFTModal}
                callback={onTokenLoaded}
            />
        </div>
    );
};

export default Gallery;