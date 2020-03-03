import CameraSVG from '../assets/icons/icon_camera';
import CloseSVG from '../assets/icons/icon_close';
import EmptyUpVoteSVG from '../assets/icons/icon_upvote_empty';
import FilledUpVoteSVG from '../assets/icons/icon_upvote_filled';
import { FirebaseContext } from '../context/Firebase';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import UploadPhotoComment from '../components/UploadPhotoComment';
import moment from 'moment';
import styled from 'styled-components';

const ViewPhotoStyles = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  background: #272727f8;
  width: 100%;
  height: 100vh;
  z-index: 800;
  color: ${props => props.theme.colors.white};
  font-family: ${props => props.theme.fonts.main};
  .photo-modal {
    width: 400px;
    height: 600px;
    max-width: 95%;
    margin-top: 10vh;
    margin: 0 auto;
    img {
      width: 90%;
      display: block;
      margin: 0 auto 20px;
    }
    .photo-info {
      width: 90%;
      margin: 0 auto;
      svg {
        height: 16px;
        vertical-align: middle;
      }
      a {
        color: ${props => props.theme.colors.white};
        text-decoration: none;
        margin: 0 10px;
        font-weight: 700;
      }
      p {
        font-weight: 300;
        font-size: 0.9rem;
      }
    }
    .top {
      width: 90%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 5vh auto 0;
      button {
        border: none;
        background: none;
        svg {
          height: 16px;
        }
      }
    }
  }
  .bottom-row {
    margin: 10px auto 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    p,
    h5 {
      font-weight: 300;
      align-self: center;
      font-size: 0.9rem;
      span {
        margin-right: 5px;
      }
      button {
        color: ${props => props.theme.colors.white};
        font-weight: 600;
        font-size: 0.9rem;
      }
    }
    h5 {
      margin: 0;
    }
    .upVotes {
      width: 50px;
    }
    button {
      background: transparent;
      border: none;
    }
    p.comment {
      overflow: hidden;
      text-overflow: ellipsis;
      max-height: 82px;
    }
  }
`;

const ViewPhoto = ({
  comment,
  setDisplayPhoto,
  toggleUpvoteComment,
  replies,
  setSelectedReplies,
}) => {
  return (
    <ViewPhotoStyles>
      <div className='photo-modal'>
        <section className='top'>
          <h1>Picture Reply</h1>
          <button
            onClick={() => {
              setDisplayPhoto(false);
            }}
            aria-label='close modal'>
            <CloseSVG fill='#fff' />
          </button>
        </section>
        <img src={comment.photo} alt={comment.comment} />
        <div className='photo-info'>
          <p className='comment'>
            <CameraSVG fill='#fff' />
            <Link to={`/user/${comment.user.id}`}>@{comment.user.userName}</Link>
            {comment.comment}
          </p>
          <div className='bottom-row'>
            <h5>
              <span>{moment.unix(comment.addedOn.seconds).fromNow()}</span> repl
              {replies === 1 ? 'y' : 'ies'}({replies})
              <button
                onClick={() => {
                  setDisplayPhoto(false);
                  setSelectedReplies(comment);
                }}>
                reply
              </button>
            </h5>
            <div className='upVotes'>
              <button
                onClick={() => {
                  toggleUpvoteComment(comment.id, comment.liked);
                }}>
                {comment.liked ? <FilledUpVoteSVG fill='#fff' /> : <EmptyUpVoteSVG fill='#fff' />}
              </button>
              <h5>{comment.upVotes.length}</h5>
            </div>
          </div>
        </div>
      </div>
    </ViewPhotoStyles>
  );
};

export default ViewPhoto;
