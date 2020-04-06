import React, { useContext } from 'react';

import { ModalContext } from '../context/Modal';
import styled from 'styled-components';

export const ModalStyles = styled.div`
  height: ${({ openOptions }) => (openOptions ? '90vh' : '0px')};
  transform: ${({ openOptions }) => (openOptions ? 'scaleY(100%)' : 'scaleY(0)')}
  opacity: ${({ openOptions }) => (openOptions ? '1' : '0')};
  -webkit-box-shadow: 0px 10px 0px 0px rgba(0, 0, 3, 0.28);
  -moz-box-shadow: 0px 10px 0px 0px rgba(0, 0, 3, 0.28);
  box-shadow: 0px 10px 0px 0px rgba(0, 0, 3, 0.28);
  transition: all 1s ease-in-out;
  transform-origin: left top;
  background: #272727f2;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow-y: scroll;
  z-index: 1005;
  .modal-content {
    height: ${({ openOptions }) => (openOptions ? '60vh' : '0')};
    transition: all 0.5s ease-in-out;
    transform-origin: left top;
    background: ${props => props.theme.colors.white};
    position: fixed;
    background-attachment: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    .buttons {
      width: 500px;
      max-width: 90%;
      margin: 20px auto 0;
      display: block;
      height: 60px;
      button {
        background: ${props => props.theme.colors.white};
        width: 90%;
        height: 45px;
        border-radius: 25px;
        line-height: 42px;
        font-family: ${props => props.theme.fonts.main};
        margin: 10px auto;
        border: 1px solid ${props => props.theme.colors.black};
        font-size: 1.2rem;
      }
        .delete {
          color: tomato;

        }
        .close {
          color: ${props => props.theme.colors.white};
          background:  ${props => props.theme.colors.black};
        }
    }
  }
`;

const OptionsModal = ({ photoId, removePhoto }) => {
  const { openOptions, setOpenOptions, setBodyScroll } = useContext(ModalContext);

  return (
    <ModalStyles openOptions={openOptions}>
      <div className='modal-content'>
        <section className='buttons'>
          <div className='button'>
            <button
              className='delete'
              onClick={() => {
                removePhoto(photoId);
              }}>
              DELETE PHOTO
            </button>
          </div>
          <div className='button'>
            <button
              className='close'
              onClick={() => {
                setOpenOptions(!openOptions);
                setBodyScroll(!openOptions);
              }}>
              CLOSE
            </button>
          </div>
        </section>
      </div>
    </ModalStyles>
  );
};

export default OptionsModal;
