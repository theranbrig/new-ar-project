import React, { useContext, useEffect, useState } from 'react';

import CopyLinkSVG from '../assets/icons/icon_copy_link';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styled from 'styled-components';

export const ShareStyles = styled.div`
  height: 100vh;
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background: #272727f9;
  z-index: 2000;
  font-family: ${props => props.theme.fonts.main};
  .content {
    /* transform: translate(-50%, -50%); */
    width: 400px;
    max-width: 95%;
    height: 45vh;
    background: ${props => props.theme.colors.white};
    margin: 20% auto;
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
      grid-template-columns: repeat(4, 1fr);
      justify-items: center;
      align-items: center;
      margin: 0 auto;
      grid-gap: 5px;
      a {
        height: 45px;
        width: 45px;
        border-radius: 50%;
        border: 1px solid black;
        text-align: center;
        line-height: 45px;
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

const Share = ({ product }) => {
  const [link, setLink] = useState(`yzed-ar-v2.netlify.com/product/${product.id}`);
  const [copied, setCopied] = useState(false);
  console.log(product);
  return (
    <ShareStyles>
      <section className='content'>
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
          <a href={`https://www.facebook.com/sharer/sharer.php?u=http://${link}#`} target='_blank'>
            F
          </a>

          <a href='https://facebook.com/page' class='large-screen'>
            Clicky
          </a>
          <a href='fb://page/mypage' class='small-screen'>
            Clicky
          </a>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=http://${link}#`} target='_blank'>
            Share on Facebook
          </a>
          <a href='#'>T</a>
          <a href='#'>W</a>
          <a href='#'>T</a>
        </div>
      </section>
    </ShareStyles>
  );
};

export default Share;
