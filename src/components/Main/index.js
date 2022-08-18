import React from "react";
import styles from "./styles.module.scss";
import rosaImg from "../../assets/img/main_rosa.png"
import bitcoinImg from '../../assets/img/bitcoin.png'
import rskImg from '../../assets/img/rsk_rif.svg'
import ethImg from '../../assets/img/eth.png'
import maticImg from '../../assets/img/matic.png'
import bscImg from '../../assets/img/bsc.png'
import avalancheImg from '../../assets/img/avalanche.png'
import girlImg from '../../assets/img/main_girl.png'

const Main = () => {
  return (
      <div>
          <div className={styles.orange_badge}>
              <div className={styles.orange_badge_img}>
                  <img src={rosaImg} alt=""/>
              </div>
              <div className={styles.orange_badge_text}>
                  Introducing
                  <br/>
                  <span>Web3PFP</span>
              </div>
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
                      <div className={styles.controls_buttons_item}><span>Mint Your PFP</span></div>
                      <div className={styles.controls_buttons_item_text}>3 usd stablecoin minimum donation to mint 0.3 usd stablecoin access fee to update </div>
                  </div>
                  <div className={styles.controls_buttons_item_wrap}>
                    <div className={styles.controls_buttons_item}><span>Manage Your PFPs</span></div>
                  </div>
              </div>
          </div>

          <div className={styles.main_info_wrap}>
              <div className={styles.main_info_text}>
                  <p>An opt-in forward facing identity for yourself or your pseudonyms intended to encourage the establishment of an open security framework for online communities. </p>
                  <p>Web3PFPs are ERC721 NFTs paired with IPNS keys held in a private IPFS server accesible by the NFT holder.</p>
                  <p>These access key tokens allow users to change the final destination (image) each IPNS address in the NFT metadata points to.</p>
                  <p>Each Web3PFP NFT displays a user-uploaded profile picture that can be changed whenever by the token holder.</p>
                  <p>Online communities can utilize the blockchain security behind the Web3PFP to apply an initial layer of security across an increasing amount of social media platforms to help keep their communities safe.</p>
                  <div className={styles.main_info_text_more}>Learn More</div>
              </div>
              <div className={styles.main_info_img}>
                  <img src={girlImg} alt=""/>
              </div>
          </div>
      </div>
  );
};

export default Main;
