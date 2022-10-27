import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Context} from "../../store";
import {pathList} from "../../routes/path";
import styles from "./styles.module.scss";
import bitcoinImg from '../../assets/img/bitcoin.png'
import rskImg from '../../assets/img/rsk_rif.svg'
import ethImg from '../../assets/img/eth.png'
import maticImg from '../../assets/img/matic.png'
import bscImg from '../../assets/img/bsc.png'
import avalancheImg from '../../assets/img/avalanche.png'
import girlImg from '../../assets/img/main_girl.png'
import bitcoinIcon from "../../assets/img/tokens/bitcoin.png";
import rskIcon from "../../assets/img/tokens/rsk.png";
import xusdIcon from "../../assets/img/tokens/xusd.png";
import docIcon from "../../assets/img/tokens/doc.png";
import ethIcon from "../../assets/img/tokens/eth.png";
import usdcIcon from "../../assets/img/tokens/usdc.png";
import usdtIcon from "../../assets/img/tokens/usdt.png";
import busdIcon from "../../assets/img/tokens/busd.png";
import daiIcon from "../../assets/img/tokens/dai.png";
import polygonIcon from "../../assets/img/tokens/polygon.png";
import binanceIcon from "../../assets/img/tokens/binance.png";
import avaxIcon from "../../assets/img/tokens/avax.png";
import mainWatermark from "../../assets/img/main_watermark.svg"

import slideOne from "../../assets/img/main_slide_1.png"
import slideTwo from "../../assets/img/main_slide_2.png"
import slideThree from "../../assets/img/main_slide_3.png"
import CreatePFPModal from "../../common/modals/CreatePFPModal";

const Main = () => {
    const [{user}, ACTION] = useContext(Context);

    let navigate = useNavigate();

    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
    const [activeSlide, setActiveSlide] = useState(0)
    const [isWallets] = useState(!!window?.ethereum || !!window?.eth)

    const openUploadModal = () => {
        if (user?.publicAddress) {
            setIsUploadModalOpen(true)
        } else {
            ACTION.SET_LOGIN_MODAL(true)
        }
    }

    const onOpenGallery = () => {
        if (user?.publicAddress) {
            navigate(pathList.gallery.path)
        } else if (isWallets) {
            ACTION.SET_LOGIN_MODAL(true)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide(activeSlide === slides?.length - 1 ? 0 : activeSlide + 1)
        }, 3000)

        return () => clearInterval(interval)
    }, [activeSlide])

    const closeUploadModal = () => setIsUploadModalOpen(false)

    const slides = [
        slideOne,
        slideTwo,
        slideThree
    ]

    const afterMinting = () => {
        navigate(pathList.gallery.path)
    }

    return (
        <div>
            <div className={styles.orange_badge_main}>
                <div className={styles.orange_badge_main_img}>
                    {
                        slides.map((slide, idx) => <img className={`${idx === activeSlide ? styles.active : ""}`} src={slide} key={idx} alt=""/>)
                    }
                </div>
                <div className={styles.orange_badge_main_text}>
                    Introducing
                    <br/>
                    <span>Web3PFP</span>
                    alpha
                </div>
                <img src={mainWatermark} className={styles.orange_badge_main_watermark} alt=""/>
            </div>
            <div className={styles.controls}>
                <div className={styles.icons_row}>
                    <img src={bitcoinImg} alt=""/>
                    <img src={rskImg} alt=""/>
                    <img src={ethImg} alt=""/>
                    <img src={maticImg} alt=""/>
                    <img src={bscImg} alt=""/>
                    <img src={avalancheImg} alt=""/>
                </div>

                <div className={styles.controls_buttons}>
                    <div className={styles.controls_buttons_item_wrap}>
                        <div className={styles.controls_buttons_item}
                             onClick={() => isWallets && openUploadModal(false)}
                        >
                            <span>Mint Your PFP</span>
                        </div>
                    </div>
                    <div className={styles.controls_buttons_item_wrap}>
                        <div onClick={onOpenGallery} className={styles.controls_buttons_item}>
                            <span>Manage <span>Your</span> PFPs</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.main_chains}>
                <div className={`${styles.orange_badge} ${styles.right}`}>
                    <img src={mainWatermark} className={styles.main_chains_watermark} alt=""/>
                    <span className={styles.pc}>3 usd stablecoin minimum donation to mint
                    <br/>0.3 usd to update photo
                    <br/>0.5 usd to update profile</span>
                    <span className={styles.mob}>3 usd stablecoin minimum donation to mint
                    <br/>0.3 usd to update photo
                    <br/>0.5 usd to update profile</span>
                </div>
                <div className={styles.chains_desc}>-supported chains and tokens-</div>
                <div className={styles.chains_content}>
                    <div className={styles.chains_list}>
                        <div className={`${styles.chain_item} ${styles.rsk}`}>
                            <img src={bitcoinIcon} alt=""/>
                            <img src={rskIcon} alt=""/>
                            <div className={styles.chain_item_title}>Rootstock</div>
                            <img src={xusdIcon} alt=""/>
                            <img src={docIcon} alt=""/>
                        </div>
                        <div className={`${styles.chain_item} ${styles.eth}`}>
                            <img src={ethIcon} alt=""/>
                            <div className={styles.chain_item_title}>Ethereum</div>
                            <img src={usdcIcon} alt=""/>
                            <img src={usdtIcon} alt=""/>
                            <img src={busdIcon} alt=""/>
                            <img src={daiIcon} alt=""/>
                        </div>
                        <div className={`${styles.chain_item} ${styles.polygon}`}>
                            <img src={polygonIcon} alt=""/>
                            <div className={styles.chain_item_title}>Polygon</div>
                            <img src={usdcIcon} alt=""/>
                            <img src={usdtIcon} alt=""/>
                        </div>
                        <div className={`${styles.chain_item} ${styles.binance}`}>
                            <img src={binanceIcon} alt=""/>
                            <div className={styles.chain_item_title}>Binance Smart Chain</div>
                            <img src={usdcIcon} alt=""/>
                            <img src={usdtIcon} alt=""/>
                            <img src={busdIcon} alt=""/>
                        </div>
                        <div className={`${styles.chain_item} ${styles.avax}`}>
                            <img src={avaxIcon} alt=""/>
                            <div className={styles.chain_item_title}>Avalanche</div>
                            <img src={usdcIcon} alt=""/>
                            <img src={usdtIcon} alt=""/>
                        </div>
                    </div>
                    <div className={styles.currencies_list}>
                        <div className={styles.currency_item}>
                            <span>XUSD</span>
                            <img src={xusdIcon} alt=""/>
                        </div>
                        <div className={styles.currency_item}>
                            <span>DoC</span>
                            <img src={docIcon} alt=""/>
                        </div>
                        <div className={styles.currency_item}>
                            <span>USDC</span>
                            <img src={usdcIcon} alt=""/>
                        </div>
                        <div className={styles.currency_item}>
                            <span>USDT</span>
                            <img src={usdtIcon} alt=""/>
                        </div>
                        <div className={styles.currency_item}>
                            <span>BUSD</span>
                            <img src={busdIcon} alt=""/>
                        </div>
                        <div className={styles.currency_item}>
                            <span>DAI</span>
                            <img src={daiIcon} alt=""/>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.main_info_wrap}>
                <div className={styles.main_info_text}>
                    <p>An opt-in forward facing identity for yourself or your pseudonyms intended to encourage the establishment of an open security framework for online communities. </p>
                    <p>Web3PFPs are ERC721 NFTs paired with IPNS keys held in a private IPFS server accessible by the NFT holder.</p>
                    <p>These access key tokens allow users to change the final destination (image) each IPNS address in the NFT metadata points to.</p>
                    <p>Each Web3PFP NFT displays a user-uploaded profile picture that can be changed whenever by the token holder.</p>
                    <p>Online communities can utilize the blockchain security behind the Web3PFP to apply an initial layer of security across an increasing number of social media platforms to help keep their community members safe.</p>
                    <Link to={pathList.info.path} className={styles.main_info_text_more}><span>Learn More</span></Link>
                </div>
                <div className={styles.main_info_img}>
                    <img src={girlImg} alt=""/>
                </div>
            </div>
            <CreatePFPModal
                isOpen={isUploadModalOpen}
                onRequestClose={closeUploadModal}
                callback={afterMinting}
            />
        </div>
    );
};

export default Main;
