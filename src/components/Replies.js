import React, { useContext, useEffect, useState } from 'react';

import ChevronLeft from '../assets/icons/icon_chevron_left';
import ChevronRight from '../assets/icons/icon_chevron_right';
import EmptyUpVoteSVG from '../assets/icons/icon_upvote_empty';
import FilledUpVoteSVG from '../assets/icons/icon_upvote_filled';
import { FirebaseContext } from '../context/Firebase';
import { Link } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import moment from 'moment';
import styled from 'styled-components';

const CreateRepliesStyles = styled.div`
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

const CreateReplies = ({ commentId, sendReply }) => {
  const [reply, setReply] = useState('');

  return (
    <CreateRepliesStyles>
      <TextareaAutosize
        type='text'
        name='reply'
        value={reply}
        placeholder='Tap to write...'
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
    </CreateRepliesStyles>
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
    grid-gap: 20px;
    p {
      font-weight: 300;
      font-size: 0.9rem;
    }
    a {
      font-weight: 700;
      color: ${props => props.theme.colors.black};
      text-decoration: none;
    }
  }
  .comment-photo {
    width: 45px;
  }
  .profile-photo {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
`;

const Replies = ({ comment, setSelectedReplies, photoRef, sendReply }) => {
  const [loading, setLoading] = useState(false);
  const [replies, setReplies] = useState([]);
  const [commentUser, setCommentUser] = useState();
  const { userData, firebase, dbh } = useContext(FirebaseContext);

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
    dbh
      .collection('users')
      .doc(comment.user.id)
      .get()
      .then(doc => {
        setCommentUser({ ...doc.data() });
      });
    checkReplies();
    return () => {
      checkReplies();
      setLoading(false);
    };
  }, []);

  return (
    <RepliesStyles>
      <button
        onClick={() => {
          setSelectedReplies(null);
        }}>
        <ChevronLeft />
      </button>
      <h3>Replying to:</h3>
      {commentUser && (
        <div className='comment-info'>
          <img
            className={comment.photo ? 'comment-photo' : 'profile-photo'}
            src={comment.photo ? comment.photo : commentUser.photo}
            alt={commentUser.userName}
          />
          <p>
            <Link>@{commentUser.userName}</Link> {comment.comment}
          </p>
        </div>
      )}
      {replies.length ? <h3>Other replies:</h3> : <h3>Nothing here yet...</h3>}
      {replies.map(reply => (
        <Reply reply={reply} loading={loading} toggleLikeReply={toggleLikeReply} key={reply.id} />
      ))}
      {userData.loggedIn && <CreateReplies sendReply={sendReply} commentId={comment.id} />}
    </RepliesStyles>
  );
};

const Reply = ({ reply, loading, toggleLikeReply }) => {
  const { dbh } = useContext(FirebaseContext);
  const [user, setUser] = useState();

  useEffect(() => {
    console.log(reply.user);
    dbh
      .collection('users')
      .doc(reply.user.id)
      .get()
      .then(doc => setUser({ ...doc.data() }));
  }, []);
  return (
    <div className='reply'>
      {user && (
        <>
          <div className='reply-body'>
            <div className='reply-content'>
              <img className='profile-photo' src={user.photo} alt={reply.user.userName} />
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
        </>
      )}
    </div>
  );
};
export default Replies;
