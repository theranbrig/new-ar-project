import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { FirebaseContext } from '../context/Firebase';
import LoadingSpinner from '../components/LoadingSpinner';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';
import BackButton from '../components/BackButton';
import ChevronLeft from '../assets/icons/icon_chevron_left';
import FilledUpVoteSVG from '../assets/icons/icon_upvote_filled';
import EmptyUpVoteSVG from '../assets/icons/icon_upvote_empty';
import UploadPhotoComment from '../components/UploadPhotoComment';
import CameraSVG from '../assets/icons/icon_camera';
import TextareaAutosize from 'react-textarea-autosize';
import ChevronRight from '../assets/icons/icon_chevron_right';
import CloseSVG from '../assets/icons/icon_close';

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
  const { dbh } = useContext(FirebaseContext);

  return (
    <CreateCommentsStyles>
      <TextareaAutosize
        minRows='1'
        maxRows='5'
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

const CreateReplies = ({ commentId, sendReply }) => {
  const [reply, setReply] = useState('');

  return (
    <CreateCommentsStyles>
      <TextareaAutosize
        type='text'
        name='reply'
        value={reply}
        onChange={e => {
          setReply(e.target.value);
        }}
      />
      {reply.length > 0 && (
        <button
          disabled={!reply.length}
          onClick={() => {
            if (reply.length) {
              sendReply(commentId, reply);
              setReply('');
            }
          }}>
          Reply
          <ChevronRight />
        </button>
      )}
    </CreateCommentsStyles>
  );
};

const CommentStyles = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-family: ${props => props.theme.fonts.main};
  margin: 30px 0;
  .comment-body {
    width: 100%;
    .user {
      color: ${props => props.theme.colors.black};
      text-decoration: none;
      font-weight: 700;
    }
    margin-bottom: 5px;
    p {
      font-size: 0.8rem;
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
  }
`;

const Comment = ({ comment, setSelectedReplies, photoRef, showPhotos, toggleUpvoteComment }) => {
  const [replyCount, setReplyCount] = useState(0);
  const [displayPhoto, setDisplayPhoto] = useState(false);

  const { userLoading } = useContext(FirebaseContext);

  useEffect(() => {
    photoRef
      .collection('comments')
      .doc(comment.id)
      .collection('replies')
      .onSnapshot(querySnapshot => setReplyCount(querySnapshot.docs.length));
    console.log(comment);
  }, []);

  return (
    <CommentStyles showPhotos={showPhotos}>
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
        <div className={comment.photo && showPhotos ? 'comment-photo' : 'comment-no-photo'}>
          {showPhotos && comment.photo && (
            <img
              src={comment.photo}
              alt={`${comment.user.userName}-photo`}
              onClick={() => {
                setDisplayPhoto(true);
              }}
            />
          )}
          <p>
            {comment.photo && (
              <span>
                <CameraSVG fill='#272727' />
              </span>
            )}
            <Link className='user' to={`/user/${comment.user.id}`}>
              @{comment.user.userName}
            </Link>{' '}
            {comment.comment}
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

const RepliesStyles = styled.div`
  font-family: ${props => props.theme.fonts.main};
  button {
    border: none;
    background: none;
    svg {
      height: 16px;
    }
  }
  .reply {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-family: ${props => props.theme.fonts.main};
    margin: 30px 0;
    .reply-body {
      img {
        width: 40px;
        height: 40px;
      }
    }
    p.reply-info {
      width: 100%;
      display: inline;
      min-height: 40px;
      font-weight: 300;
      margin: 0;
      .user {
        color: ${props => props.theme.colors.black};
        text-decoration: none;
        font-weight: 700;
        background: none;
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
      text-align: center;
      width: 80px;
      button.liked {
        position: relative;
        svg {
          height: 25px;
          transition-duration: 0.5s;
        }
      }
      button.notLiked {
        position: relative;
        svg {
          height: 25px;
          position: absolute;
          left: 0;
          top: -25px;
        }
      }
      p {
        margin: 5px 0 0;
        font-weight: 300;
      }
    }
  }
  .reply-actions {
    font-weight: 300;
    color: ${props => props.theme.colors.grey};
    margin-left: 50px;
  }
  h3 {
    font-size: 1.1rem;
  }
  .reply-content {
    display: grid;
    grid-template-columns: 45px 1fr;
    grid-gap: 5px;
    margin: 5px auto;
    max-width: 400px;
  }
  .comment-info {
    display: grid;
    grid-template-columns: 45px 1fr;
    align-items: center;
    grid-gap: 5px;
    p {
      font-weight: 300;
    }
    a {
      font-weight: 700;
      color: ${props => props.theme.colors.black};
      text-decoration: none;
    }
    img {
      width: 45px;
      height: 45px;
    }
  }
`;

const Replies = ({ comment, setSelectedReplies, photoRef, sendReply }) => {
  const [loading, setLoading] = useState(false);
  const [replies, setReplies] = useState([]);
  const { dbh, userData, userLoading, firebase } = useContext(FirebaseContext);

  const toggleLikeReply = (replyId, liked) => {
    setLoading(true);
    if (liked) {
      photoRef
        .collection('comments')
        .doc(comment.id)
        .collection('replies')
        .doc(replyId)
        .update({ upVotes: firebase.firestore.FieldValue.arrayRemove(userData.id) })
        .then(() => {
          checkReplies();
        });
    } else {
      photoRef
        .collection('comments')
        .doc(comment.id)
        .collection('replies')
        .doc(replyId)
        .update({ upVotes: firebase.firestore.FieldValue.arrayUnion(userData.id) })
        .then(() => {
          checkReplies();
        });
    }
  };

  const checkReplies = () => {
    photoRef
      .collection('comments')
      .doc(comment.id)
      .collection('replies')
      .onSnapshot(querySnapshot => {
        let tempReplies = [];
        querySnapshot.forEach(doc => {
          console.log(doc.data());
          let liked = false;
          if (userData.loggedIn) {
            liked = doc.data().upVotes.some(vote => vote === userData.id);
          }
          tempReplies.push({
            id: doc.id,
            ...doc.data(),
            liked,
          });
        });
        setReplies(
          tempReplies.sort((a, b) => {
            return b.addedOn.seconds - a.addedOn.seconds;
          })
        );
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = checkReplies();
    return () => {
      checkReplies();
      setLoading(false);
    };
  }, [userLoading]);

  return (
    <RepliesStyles>
      <button
        onClick={() => {
          setSelectedReplies(null);
        }}>
        <ChevronLeft />
      </button>
      <h3>Replying to:</h3>
      <div className='comment-info'>
        <img src={comment.user.photo} />
        <p>
          <Link>@{comment.user.userName}</Link> {comment.comment}
        </p>
      </div>
      {replies.length ? <h3>Other replies:</h3> : <h3>Nothing here yet...</h3>}
      {replies.map(reply => (
        <div className='reply'>
          <div className='reply-body'>
            <div className='reply-content'>
              <img src={reply.user.photo} alt={reply.user.userName} />
              <p className='reply-info'>
                <span>
                  <Link className='user' to={`/user/${reply.user.id}`}>
                    @{reply.user.userName}
                  </Link>{' '}
                  {reply.reply}
                </span>
              </p>
            </div>
            <div className='reply-actions'>
              <span className='date'>{moment.unix(reply.addedOn.seconds).fromNow()}</span>
            </div>
          </div>
          <div className='upVotes'>
            <button
              aria-label='upvote reply'
              onClick={() => {
                toggleLikeReply(reply.id, reply.liked);
              }}>
              {reply.liked ? (
                <div className='liked'>
                  <FilledUpVoteSVG loading={loading} />
                </div>
              ) : (
                <div className='notLiked'>
                  <EmptyUpVoteSVG loading={loading} />
                </div>
              )}
            </button>
            <p>{reply.upVotes.length}</p>
          </div>
        </div>
      ))}
      {userData.loggedIn && <CreateReplies sendReply={sendReply} commentId={comment.id} />}
    </RepliesStyles>
  );
};

const CommentsStyles = styled.div`
  margin-top: 10vh;
  width: 500px;
  max-width: 95%;
  margin: 12vh auto 0;
  min-height: 88vh;
  padding: 0 10px;
  .comment-inputs {
    display: grid;
    grid-template-columns: 45px 45px 1fr;
    grid-gap: 10px;
    img {
      height: 45px;
      width: 45px;
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
  .top-section {
    font-family: ${props => props.theme.fonts.main};
    display: grid;
    grid-template-columns: 50px 1fr;
    align-items: center;
    h1 {
      margin: 0;
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

const Comments = () => {
  const [uploadPhotoComment, setUploadPhotoComment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [commentLiked, setCommentLiked] = useState(false);
  const [dateSort, setDateSort] = useState(true);
  const [comments, setComments] = useState([]);
  const [showPhotos, setShowPhotos] = useState(true);
  const [selectedReplies, setSelectedReplies] = useState('');
  const { dbh, userData, userLoading, firebase } = useContext(FirebaseContext);

  const { photoId } = useParams();

  const photoRef = dbh.collection('userPhotos').doc(photoId);

  const toggleUpvoteComment = (commentId, commentLiked) => {
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
  };

  const sendComment = comment => {
    photoRef
      .collection('comments')
      .doc()
      .set({
        comment,
        photoId,
        user: { id: userData.id, userName: userData.userName, photo: userData.photo },
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
        user: { id: userData.id, userName: userData.userName, photo: userData.photo },
        addedOn: new Date(),
        upVotes: [],
      });
  };

  const checkComments = () => {
    if (!userLoading) {
      photoRef.collection('comments').onSnapshot(querySnapshot => {
        let tempComments = [];
        querySnapshot.forEach(doc => {
          console.log(doc.data());
          let liked;
          if (userData.loggedIn) {
            liked = doc.data().upVotes.some(vote => vote === userData.id);
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

  useEffect(() => {
    setLoading(true);
    const unsubscribe = checkComments();
    return () => {
      checkComments();
      setLoading(false);
    };
  }, [userLoading]);

  if (loading || userLoading)
    return (
      <CommentsStyles>
        <LoadingSpinner color='black' />
      </CommentsStyles>
    );

  return (
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
            <BackButton />
            <h1>Replies ({comments.length})</h1>
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
              <button className='toggle-button' onClick={() => setShowPhotos(!showPhotos)}>
                <CameraSVG fill='black' />
              </button>
            </div>
          </section>
          {comments.map(comment => (
            <Comment
              key={comment.id}
              comment={comment}
              setSelectedReplies={setSelectedReplies}
              photoRef={photoRef}
              showPhotos={showPhotos}
              toggleUpvoteComment={toggleUpvoteComment}
            />
          ))}
          {userData.loggedIn && (
            <div className='comment-inputs'>
              <img src={userData.photo} alt={userData.userName} />
              <button
                onClick={() => {
                  setUploadPhotoComment(!uploadPhotoComment);
                  console.log(uploadPhotoComment);
                }}>
                <CameraSVG fill='white' />
              </button>
              <CreateComments sendComment={sendComment} />
            </div>
          )}
        </>
      )}
    </CommentsStyles>
  );
};

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
    p {
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
    .upVotes {
      width: 50px;
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
          <p>
            <CameraSVG fill='#fff' />
            <Link to={`/user/${comment.user.id}`}>@{comment.user.userName}</Link>
            {comment.comment}
          </p>
          <div className='bottom-row'>
            <p>
              <span>{moment.unix(comment.addedOn.seconds).fromNow()}</span> repl
              {replies === 1 ? 'y' : 'ies'}({replies})
              <button
                onClick={() => {
                  setDisplayPhoto(false);
                  setSelectedReplies(comment);
                }}>
                reply
              </button>
            </p>
            <div className='upVotes'>
              <button
                onClick={() => {
                  toggleUpvoteComment(comment.id, comment.liked);
                }}>
                {comment.liked ? <FilledUpVoteSVG fill='#fff' /> : <EmptyUpVoteSVG fill='#fff' />}
              </button>
              <p>{comment.upVotes.length}</p>
            </div>
          </div>
        </div>
      </div>
    </ViewPhotoStyles>
  );
};

export default Comments;
