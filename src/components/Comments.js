import 'react-lazy-load-image-component/src/effects/blur.css';

import { Link, useParams } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';

import BackButton from '../components/BackButton';
import CameraSVG from '../assets/icons/icon_camera';
import ChevronRight from '../assets/icons/icon_chevron_right';
import Div100vh from 'react-div-100vh';
import EmptyUpVoteSVG from '../assets/icons/icon_upvote_empty';
import FilledUpVoteSVG from '../assets/icons/icon_upvote_filled';
import { FirebaseContext } from '../context/Firebase';
import FollowButton from '../components/FollowButton';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LoadingSpinner from '../components/LoadingSpinner';
import { ModalContext } from '../context/Modal';
import PictureSVG from '../assets/icons/icon_picture';
import Replies from './Replies';
import TextSVG from '../assets/icons/icon_text';
import TextareaAutosize from 'react-textarea-autosize';
import UploadPhotoComment from '../components/UploadPhotoComment';
import ViewPhoto from './ViewPhoto';
import moment from 'moment';
import styled from 'styled-components';

const CreateCommentsStyles = styled.div`
  border: 1px solid ${props => props.theme.colors.lightGrey};
  padding: 5px;
  border-radius: 25px;
  margin-bottom: 50px;
  textarea {
    display: block;
    margin: 0 auto;
    font-size: 16px;
    width: 90%;
    resize: none;
    border: none;
    padding: 5px;
    background: transparent;
    font-family: ${props => props.theme.fonts.main};
    font-weight: 300;
    white-space: pre-line;
  }
  button {
    font-family: ${props => props.theme.fonts.main};
    background: transparent !important;
    margin: 10px 5%;
    font-weight: 700 !important;
    width: 90% !important;
    text-align: left;
    padding: 0;
    font-size: 16px;
    display: flex;
    flex-direction: row;
    font-weight: 300;
    justify-content: space-between;
    svg {
      align-self: center;
      height: 16px !important;
    }
  }
`;

export const CreateComments = ({ sendComment }) => {
  const [comment, setComment] = useState('');

  return (
    <CreateCommentsStyles>
      <TextareaAutosize
        minRows='1'
        maxRows='2'
        aria-label='comment'
        placeholder='Tap to write...'
        name='comment'
        value={comment}
        onChange={e => {
          setComment(e.target.value);
        }}
      />
      {comment.length > 0 && (
        <button
          disabled={!comment.length}
          onClick={() => {
            if (comment.length) {
              sendComment(comment);
              setComment('');
            }
          }}>
          Add Comment
          <ChevronRight />
        </button>
      )}
    </CreateCommentsStyles>
  );
};

const CommentStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 40px;
  align-items: center;
  justify-content: space-between;
  font-family: ${props => props.theme.fonts.main};
  margin: 30px auto;
  width: 500px;
  max-width: 95%;
  .comment-body {
    max-width: 350px;
    .user {
      color: ${props => props.theme.colors.black};
      text-decoration: none;
      font-weight: 700;
    }
    margin-bottom: 5px;
    p {
      font-size: 0.9rem;
      margin: 0;
      font-weight: 300;
      span {
        margin: 5px 5px 0 0;
        svg {
          vertical-align: middle;
          display: inline-block;
          height: 16px;
        }
      }
    }
  }
  .replies-button {
    border: none;
    background: none;
    padding: 0;
    font-family: ${props => props.theme.fonts.main};
    font-size: 0.9rem;
    color: ${props => props.theme.colors.grey};
    span {
      margin-right: 10px;
    }
  }
  .upVotes {
    align-self: center;
    justify-self: center;
    text-align: center;
    width: 80px;
    button {
      background: none;
      border: none;
      svg {
        height: 20px;
      }
    }
    p {
      margin: 5px 0 0;
    }
  }
  .comment-photo {
    display: grid;
    grid-template-columns: 40px 1fr;
    grid-gap: 20px;
    img {
      width: 40px;
    }
  }
  .comment-photo,
  .comment-no-photo {
    margin-bottom: 8px;
    /* white-space: nowrap; */
  }
  p.comment-paragraph {
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }
`;

const Comment = ({ comment, setSelectedReplies, photoRef, toggleUpvoteComment }) => {
  const [replyCount, setReplyCount] = useState(0);
  const [displayPhoto, setDisplayPhoto] = useState(false);

  const { userData } = useContext(FirebaseContext);

  const { setBodyScroll } = useContext(ModalContext);

  useEffect(() => {
    photoRef
      .collection('comments')
      .doc(comment.id)
      .collection('replies')
      .onSnapshot(querySnapshot => setReplyCount(querySnapshot.docs.length));
  }, []);

  return (
    <CommentStyles>
      <div className='comment-body'>
        {displayPhoto && (
          <ViewPhoto
            toggleUpvoteComment={toggleUpvoteComment}
            comment={comment}
            setDisplayPhoto={setDisplayPhoto}
            replies={replyCount}
            setSelectedReplies={setSelectedReplies}
          />
        )}
        <div className={comment.photo ? 'comment-photo' : 'comment-no-photo'}>
          {comment.photo && (
            <LazyLoadImage
              effect='blur'
              src={comment.photo}
              alt={`${comment.user.userName}`}
              onClick={() => {
                setDisplayPhoto(true);
                setBodyScroll(false);
              }}
            />
          )}
          <p className='comment-paragraph'>
            {comment.photo && (
              <span>
                <CameraSVG fill='#272727' />
              </span>
            )}
            <Link className='user' to={`/user/${comment.user.id}`}>
              @{comment.user.userName}
            </Link>{' '}
            {comment.comment.split('\n').map((item, key) => {
              return (
                <span key={key}>
                  {item}
                  <br />
                </span>
              );
            })}
          </p>
        </div>
        <div className='comment-actions'>
          <button
            className='replies-button'
            onClick={() => {
              setSelectedReplies(comment);
            }}>
            <span className='date'>{moment.unix(comment.addedOn.seconds).fromNow()}</span>
            reply({replyCount})
          </button>
        </div>
      </div>
      <div className='upVotes'>
        <button
          disabled={!userData.loggedIn}
          onClick={() => {
            toggleUpvoteComment(comment.id, comment.liked);
          }}>
          {comment.liked ? <FilledUpVoteSVG /> : <EmptyUpVoteSVG />}
        </button>
        <p>{comment.upVotes.length}</p>
      </div>
    </CommentStyles>
  );
};

const Comments = () => {
  const [uploadPhotoComment, setUploadPhotoComment] = useState(false);
  const [loading, setLoading] = useState(false);

  const [dateSort, setDateSort] = useState(true);
  const [comments, setComments] = useState([]);
  const [hidePhotos, setHidePhotos] = useState(false);
  const [hideCommentOnlyPosts, setHideCommentOnlyPosts] = useState(false);
  const [selectedReplies, setSelectedReplies] = useState('');

  const { dbh, userData, userLoading, firebase } = useContext(FirebaseContext);

  const { photoId } = useParams();

  const photoRef = dbh.collection('userPhotos').doc(photoId);

  const toggleUpvoteComment = (commentId, commentLiked) => {
    if (userData.loggedIn) {
      if (commentLiked) {
        dbh
          .collection('userPhotos')
          .doc(photoId)
          .collection('comments')
          .doc(commentId)
          .update({ upVotes: firebase.firestore.FieldValue.arrayRemove(userData.id) })
          .then(() => {
            checkComments();
          });
      } else {
        dbh
          .collection('userPhotos')
          .doc(photoId)
          .collection('comments')
          .doc(commentId)
          .update({ upVotes: firebase.firestore.FieldValue.arrayUnion(userData.id) })
          .then(() => {
            checkComments();
          });
      }
    }
  };

  const sendComment = (comment, callback) => {
    photoRef
      .collection('comments')
      .doc()
      .set({
        comment,
        photoId,
        user: { id: userData.id, userName: userData.userName, photo: userData.photo || '' },
        addedOn: new Date(),
        upVotes: [],
        photo: '',
      });
  };

  const sendReply = (commentId, reply) => {
    photoRef
      .collection('comments')
      .doc(commentId)
      .collection('replies')
      .doc()
      .set({
        reply,
        commentId,
        user: { id: userData.id, userName: userData.userName, photo: userData.photo || '' },
        addedOn: new Date(),
        upVotes: [],
      });
  };

  const checkComments = () => {
    if (!userLoading) {
      photoRef.collection('comments').onSnapshot(querySnapshot => {
        let tempComments = [];
        querySnapshot.forEach(doc => {
          let liked;
          let followed;
          if (userData.loggedIn) {
            liked = doc.data().upVotes.some(vote => vote === userData.id);
            if (doc.data().followers) {
              followed = doc.data().followers(follower => follower.userId === userData.id);
            }
          }
          tempComments.push({ id: doc.id, liked, ...doc.data() });
        });
        setComments(
          tempComments.sort((a, b) => {
            return b.addedOn.seconds - a.addedOn.seconds;
          })
        );
        setLoading(false);
      });
    }
  };

  const sortByDate = () => {
    setDateSort(true);
    setComments([...comments.sort((a, b) => b.addedOn.seconds - a.addedOn.seconds)]);
  };

  const sortByPopularity = () => {
    setDateSort(false);
    setComments([...comments.sort((a, b) => b.upVotes.length - a.upVotes.length)]);
  };

  const togglePhotoPosts = () => {
    if (hidePhotos) {
      checkComments();
    } else {
      setComments([...comments.filter(comment => comment.photo === '')]);
    }
    setHidePhotos(!hidePhotos);
  };

  const toggleCommentPosts = () => {
    if (hideCommentOnlyPosts) {
      checkComments();
    } else {
      setComments([...comments.filter(comment => comment.photo !== '')]);
    }
    setHideCommentOnlyPosts(!hideCommentOnlyPosts);
  };

  useEffect(() => {
    setLoading(true);
    checkComments();
    return () => {
      checkComments();
    };
  }, [userLoading]);

  if (loading || userLoading)
    return (
      <CommentsStyles>
        <LoadingSpinner color='black' />
      </CommentsStyles>
    );

  return (
    <Div100vh>
      <CommentsStyles>
        {uploadPhotoComment ? (
          <UploadPhotoComment
            photoRef={photoRef}
            photoId={photoId}
            setUploadPhotoComment={setUploadPhotoComment}
          />
        ) : selectedReplies ? (
          <Replies
            sendReply={sendReply}
            comment={selectedReplies}
            setSelectedReplies={setSelectedReplies}
            photoRef={photoRef}
          />
        ) : (
          <>
            <section className='top-section'>
              <div className='left'>
                <BackButton />
                <h1>Replies ({comments.length})</h1>
              </div>
              <div className='right'>{userData.loggedIn && <FollowButton photoId={photoId} />}</div>
            </section>
            <section className='buttons'>
              <div className='left-buttons'>
                <button
                  className='sort-button'
                  disabled={!dateSort}
                  onClick={() => sortByPopularity()}>
                  BEST
                </button>
                <button className='sort-button' disabled={dateSort} onClick={() => sortByDate()}>
                  NEWEST
                </button>
              </div>
              <div className='right-buttons'>
                <button
                  disabled={hideCommentOnlyPosts}
                  className='toggle-button'
                  onClick={() => togglePhotoPosts()}>
                  <PictureSVG fill={hidePhotos && '#c7c7c7'} />
                </button>
                <button
                  disabled={hidePhotos}
                  className='toggle-button'
                  onClick={() => toggleCommentPosts()}>
                  <TextSVG fill={hideCommentOnlyPosts && '#c7c7c7'} />
                </button>
              </div>
            </section>
            {comments.map(comment => (
              <Comment
                key={comment.id}
                comment={comment}
                setSelectedReplies={setSelectedReplies}
                photoRef={photoRef}
                toggleUpvoteComment={toggleUpvoteComment}
              />
            ))}
            {userData.loggedIn && (
              <section className='bottom'>
                <div className='comment-inputs'>
                  <LazyLoadImage src={userData.photo} alt={userData.userName} effect='blur' />
                  <button
                    onClick={() => {
                      setUploadPhotoComment(!uploadPhotoComment);
                    }}>
                    <CameraSVG fill='white' />
                  </button>
                  {userData.loggedIn && <CreateComments sendComment={sendComment} />}
                </div>
              </section>
            )}
          </>
        )}
      </CommentsStyles>
    </Div100vh>
  );
};

const CommentsStyles = styled.div`
  padding-top: 10vh;
  width: 500px;
  max-width: 95%;
  background: ${props => props.theme.colors.white};
  .bottom {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 15vh;
    position: fixed;
    background: ${props => props.theme.colors.white};
    .comment-inputs {
      display: grid;
      grid-template-columns: 45px 45px 1fr;
      grid-gap: 10px;
      width: 500px;
      max-width: 90%;
      margin: 0 auto;
      padding-top: 20px;
      img {
        height: 45px;
        width: 45px;
        border-radius: 50%;
      }
      button {
        background: ${props => props.theme.colors.black};
        border: none;
        height: 45px;
        width: 45px;
        border-radius: 50%;
        svg {
          height: 20px;
        }
      }
    }
  }
  .top-section {
    font-family: ${props => props.theme.fonts.main};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .left div,
    .left h1 {
      display: inline-block;
    }
    .left h1 {
      margin-left: 20px;
    }
    .right {
      align-self: center;
      button {
      }
    }
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 95%;
    margin: 10px auto;
    font-family: ${props => props.theme.fonts.main};
    .sort-button {
      height: 30px;
      width: 100px;
      border-radius: 15px;
      border: 2px solid ${props => props.theme.colors.lightGrey};
      color: ${props => props.theme.colors.lightGrey};
      margin: 5px;
      background: transparent;
      &:disabled {
        border: 1px solid ${props => props.theme.colors.black};
        color: ${props => props.theme.colors.black};
      }
    }
    .toggle-button {
      margin: 5px 20px 5px 0;
      height: 32px;
      width: 32px;
      padding: 0;
      background: none;
      border: none;
      svg {
        height: 30px;
        vertical-align: center;
      }
    }
  }
`;

export default Comments;
