import React, {useState} from 'react';
import styles from "./styles.module.scss"
import tokenImg from "../../assets/img/token_preview.jpg"
import replaceIcon from "../../assets/img/replace_icon.svg"
import rskChainImg from "../../assets/img/rsk_chain.png"
import UploadPFPModal from "../../common/modals/UploadPFPModal";

const Gallery = () => {

    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
    const [isReplaceModal, setIsReplaceModal] = useState(false)

    const openUploadModal = (type) => {
        setIsReplaceModal(type)
        setIsUploadModalOpen(true)
    }

    const closeUploadModal = () => setIsUploadModalOpen(false)

    return (
        <div>
            <div className={styles.orange_badge}>Your Gallery</div>
            <div className={styles.gallery_content_wrap}>
                <div className={styles.gallery_mint_btn}
                     onClick={() => openUploadModal(false)}
                ><span>Mint New PFP</span></div>
                <div className={styles.gallery_grid}>
                    <div className={styles.gallery_grid_item}>
                        <div className={styles.gallery_grid_item_info}>
                            <div className={styles.gallery_grid_item_info_name}>PFP #1</div>
                            <div className={styles.gallery_grid_item_info_id}>Token ID: 15,675</div>
                        </div>
                        <div className={styles.gallery_grid_item_img}>
                            <img src={tokenImg} alt=""/>
                        </div>
                        <div className={styles.gallery_grid_item_desc}>Beach Trip 2022</div>
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
                    <div className={styles.gallery_grid_item}>
                        <div className={styles.gallery_grid_item_info}>
                            <div className={styles.gallery_grid_item_info_name}>PFP #1</div>
                            <div className={styles.gallery_grid_item_info_id}>Token ID: 15,675</div>
                        </div>
                        <div className={styles.gallery_grid_item_img}>
                            <img src={tokenImg} alt=""/>
                        </div>
                        <div className={styles.gallery_grid_item_desc}>Beach Trip 2022</div>
                        <div className={styles.gallery_grid_item_replace_btn}>
                            <span>Replace</span>
                            <img src={replaceIcon} alt=""/>
                        </div>
                        <div className={styles.gallery_grid_item_chain_icon}>
                            <img src={rskChainImg} alt=""/>
                        </div>
                    </div>
                    <div className={styles.gallery_grid_item}>
                        <div className={styles.gallery_grid_item_info}>
                            <div className={styles.gallery_grid_item_info_name}>PFP #1</div>
                            <div className={styles.gallery_grid_item_info_id}>Token ID: 15,675</div>
                        </div>
                        <div className={styles.gallery_grid_item_img}>
                            <img src={tokenImg} alt=""/>
                        </div>
                        <div className={styles.gallery_grid_item_desc}>Beach Trip 2022</div>
                        <div className={styles.gallery_grid_item_replace_btn}>
                            <span>Replace</span>
                            <img src={replaceIcon} alt=""/>
                        </div>
                        <div className={styles.gallery_grid_item_chain_icon}>
                            <img src={rskChainImg} alt=""/>
                        </div>
                    </div>
                    <div className={styles.gallery_grid_item}>
                        <div className={styles.gallery_grid_item_info}>
                            <div className={styles.gallery_grid_item_info_name}>PFP #1</div>
                            <div className={styles.gallery_grid_item_info_id}>Token ID: 15,675</div>
                        </div>
                        <div className={styles.gallery_grid_item_img}>
                            <img src={tokenImg} alt=""/>
                        </div>
                        <div className={styles.gallery_grid_item_desc}>Beach Trip 2022</div>
                        <div className={styles.gallery_grid_item_replace_btn}>
                            <span>Replace</span>
                            <img src={replaceIcon} alt=""/>
                        </div>
                        <div className={styles.gallery_grid_item_chain_icon}>
                            <img src={rskChainImg} alt=""/>
                        </div>
                    </div>
                    <div className={styles.gallery_grid_item}>
                        <div className={styles.gallery_grid_item_info}>
                            <div className={styles.gallery_grid_item_info_name}>PFP #1</div>
                            <div className={styles.gallery_grid_item_info_id}>Token ID: 15,675</div>
                        </div>
                        <div className={styles.gallery_grid_item_img}>
                            <img src={tokenImg} alt=""/>
                        </div>
                        <div className={styles.gallery_grid_item_desc}>Beach Trip 2022</div>
                        <div className={styles.gallery_grid_item_replace_btn}>
                            <span>Replace</span>
                            <img src={replaceIcon} alt=""/>
                        </div>
                        <div className={styles.gallery_grid_item_chain_icon}>
                            <img src={rskChainImg} alt=""/>
                        </div>
                    </div>
                    <div className={styles.gallery_grid_item}>
                        <div className={styles.gallery_grid_item_info}>
                            <div className={styles.gallery_grid_item_info_name}>PFP #1</div>
                            <div className={styles.gallery_grid_item_info_id}>Token ID: 15,675</div>
                        </div>
                        <div className={styles.gallery_grid_item_img}>
                            <img src={tokenImg} alt=""/>
                        </div>
                        <div className={styles.gallery_grid_item_desc}>Beach Trip 2022</div>
                        <div className={styles.gallery_grid_item_replace_btn}>
                            <span>Replace</span>
                            <img src={replaceIcon} alt=""/>
                        </div>
                        <div className={styles.gallery_grid_item_chain_icon}>
                            <img src={rskChainImg} alt=""/>
                        </div>
                    </div>
                    <div className={styles.gallery_grid_item}>
                        <div className={styles.gallery_grid_item_info}>
                            <div className={styles.gallery_grid_item_info_name}>PFP #1</div>
                            <div className={styles.gallery_grid_item_info_id}>Token ID: 15,675</div>
                        </div>
                        <div className={styles.gallery_grid_item_img}>
                            <img src={tokenImg} alt=""/>
                        </div>
                        <div className={styles.gallery_grid_item_desc}>Beach Trip 2022</div>
                        <div className={styles.gallery_grid_item_replace_btn}>
                            <span>Replace</span>
                            <img src={replaceIcon} alt=""/>
                        </div>
                        <div className={styles.gallery_grid_item_chain_icon}>
                            <img src={rskChainImg} alt=""/>
                        </div>
                    </div>
                    <div className={styles.gallery_grid_item}>
                        <div className={styles.gallery_grid_item_info}>
                            <div className={styles.gallery_grid_item_info_name}>PFP #1</div>
                            <div className={styles.gallery_grid_item_info_id}>Token ID: 15,675</div>
                        </div>
                        <div className={styles.gallery_grid_item_img}>
                            <img src={tokenImg} alt=""/>
                        </div>
                        <div className={styles.gallery_grid_item_desc}>Beach Trip 2022</div>
                        <div className={styles.gallery_grid_item_replace_btn}>
                            <span>Replace</span>
                            <img src={replaceIcon} alt=""/>
                        </div>
                        <div className={styles.gallery_grid_item_chain_icon}>
                            <img src={rskChainImg} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
            <UploadPFPModal
                isOpen={isUploadModalOpen}
                onRequestClose={closeUploadModal}
                isReplace={isReplaceModal}
            />
        </div>
    );
};

export default Gallery;