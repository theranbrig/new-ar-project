import React, { useContext, useEffect, useState } from 'react';

import CopyLinkSVG from '../assets/icons/icon_copy_link';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FacebookSVG from '../assets/icons/icon_facebook';
import KakaoSVG from '../assets/icons/icon_kakao';
import { ModalContext } from '../context/Modal';
import PinterestSVG from '../assets/icons/icon_pinterest';
import TwitterSVG from '../assets/icons/icon_twitter';
import WhatsAppSVG from '../assets/icons/icon_whatsapp';
import styled from 'styled-components';

export const ShareStyles = styled.div`
  height: 100vh;
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background: #272727f9;
  z-index: 1010;
  font-family: ${props => props.theme.fonts.main};
  .content {
    /* transform: translate(-50%, -50%); */
    width: 400px;
    max-width: 90%;
    background: ${props => props.theme.colors.white};
    margin: 0 auto;
    margin-top: 100px;
    border-radius: 25px;
    h1 {
      text-transform: none;
      font-weight: 600;
      text-align: center;
      padding-top: 30px;
    }
    .copy {
      display: grid;
      grid-template-columns: 3fr 45px;
      grid-gap: 10px;
      justify-content: center;
      align-items: center;
      width: 90%;
      margin: 0 auto;
      p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 45px;
        border: 2px solid ${props => props.theme.colors.lightGrey};
        border-radius: 25px;
        line-height: 45px;
        padding-left: 10px;
        font-weight: 300;
        margin: 0;
      }
      button {
        background: ${props => props.theme.colors.black};
        height: 45px;
        width: 45px;
        margin: 0;
        border-radius: 50%;
        border: 2px solid ${props => props.theme.colors.black};
        text-align: center;
        svg {
          height: 20px;
          vertical-align: middle;
        }
      }
    }
    .links {
      width: 90%;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      justify-items: center;
      align-items: center;
      margin: 0 auto;
      grid-gap: 5px;
      padding-bottom: 30px;
      a {
        height: 45px;
        width: 45px;
        border-radius: 50%;
        text-align: center;
        line-height: 45px;
        svg {
          margin-top: -2px;
          height: 24px;
          vertical-align: middle;
        }
      }
      .facebook {
        background: #4267b2;
        svg {
          margin-left: 0px;
          margin-top: -3px;
        }
      }
      .twitter {
        background: #00acee;
        svg {
          margin-left: 2px;
        }
      }
      .whatsapp {
        background: #25d366;
        svg {
          margin-left: 2px;
          margin-top: -5px;
        }
      }
      .kakao {
        background: #ffe812;
        svg {
          margin-left: 2px;
          margin-top: -2px;
        }
      }
      .pinterest {
        background: #e60023;
      }
    }
    p.copied,
    p.nothing {
      margin: 5px 0;
      text-align: center;
      color: tomato;
      font-family: ${props => props.theme.fonts.main};
      font-size: 0.9rem;
      height: 0.9rem;
    }
    p.share {
      width: 90%;
      margin: 20px auto;
      padding-left: 10px;
    }
  }
`;

const Share = ({ product, setShareOpen }) => {
  const [link, setLink] = useState(`yzed.101.global/item/${product.id}`);
  const [copied, setCopied] = useState(false);
  const { setOpenShareLinks, openShareLinks } = useContext(ModalContext);
  console.log(product);
  return (
    <ShareStyles onClick={() => setOpenShareLinks(false)}>
      <section
        className='content'
        onClick={e => {
          //stop clicks getting to the overlay
          e.stopPropagation();
        }}>
        <h1>Share item</h1>
        <div className='copy'>
          <p>{link}</p>
          <CopyToClipboard text={link} onCopy={() => setCopied(true)}>
            <button>
              <CopyLinkSVG fill='#fff' />
            </button>
          </CopyToClipboard>
        </div>
        {copied ? <p className='copied'>Link copied to clipboard.</p> : <p className='nothing'></p>}
        <p className='share'>Or share on social media...</p>
        <div className='links'>
          <a
            className='facebook'
            href={`https://www.facebook.com/sharer/sharer.php?u=https://${link}&text=Check%20out%20this%20look%20on%20YZED.%0A%0A&hashtag=%23YZED#`}
            target='_blank'>
            <FacebookSVG fill='#fff' />
          </a>
          <a
            className='twitter'
            href={`http://twitter.com/share?text=Check%20out%20this%20look%20on%20YZED.%0A%0A&url=https://${link}&hashtags=YZED,YZEDAR`}
            target='_blank'>
            <TwitterSVG fill='#fff' />
          </a>
          <a
            className='whatsapp'
            href={`https://wa.me/?text=Check%20out%20this%20look%20on%20YZED.%0A%0Ahttps://${link}&source=&data=`}
            target='_blank'>
            <WhatsAppSVG fill='#fff' />
          </a>
          <a
            className='kakao'
            href={`https://story.kakao.com/s/share?url=https://${link}&text=Check%20out%20this%20look%20on%20YZED.%0A%0A`}
            target='_blank'>
            <KakaoSVG />
          </a>
          <a
            className='pinterest'
            href={`http://pinterest.com/pin/create/button/?url=https://${link}&description=Check%20out%20this%20look%20on%20YZED.%0A%0A`}
            target='_blank'>
            <PinterestSVG fill='#fff' />
          </a>
        </div>
      </section>
    </ShareStyles>
  );
};

export default Share;