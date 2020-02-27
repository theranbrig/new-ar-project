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
import CameraSVG from '../assets/icons/icon_photo';

const CreateCommentsStyles = styled.div``;

export const CreateComments = ({ sendComment }) => {
  const [comment, setComment] = useState('');
  const { dbh } = useContext(FirebaseContext);

  return (
    <CreateCommentsStyles>
      <input
        type='text'
        name='comment'
        value={comment}
        onChange={e => {
          setComment(e.target.value);
        }}
      />
      <button
        disabled={!comment.length}
        onClick={() => {
          if (comment.length) {
            sendComment(comment);
            setComment('');
          }
        }}>
        Send
      </button>
    </CreateCommentsStyles>
  );
};

const CreateReplies = ({ commentId, sendReply }) => {
  const [reply, setReply] = useState('');

  return (
    <CreateCommentsStyles>
      <input
        type='text'
        name='reply'
        value={reply}
        onChange={e => {
          setReply(e.target.value);
        }}
      />
      <button
        disabled={!reply.length}
        onClick={() => {
          if (reply.length) {
            sendReply(commentId, reply);
            setReply('');
          }
        }}>
        Reply
      </button>
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
    p {
      margin: 5px 0;
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
`;

const Comment = ({ comment, setSelectedReplies, photoRef, showPhotos }) => {
  const [replyCount, setReplyCount] = useState(0);

  const { userLoading } = useContext(FirebaseContext);

  useEffect(() => {
    photoRef
      .collection('comments')
      .doc(comment.id)
      .collection('replies')
      .onSnapshot(querySnapshot => setReplyCount(querySnapshot.docs.length));
  }, []);

  return (
    <CommentStyles showPhotos={showPhotos}>
      <div className='comment-body'>
        <p className='comment'>
          <span>
            <Link className='user' to={`/user/${comment.user.id}`}>
              @{comment.user.userName}
            </Link>{' '}
            {comment.comment}
          </span>
        </p>
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
        <button>{comment.upVotes > 0 ? <FilledUpVoteSVG /> : <EmptyUpVoteSVG />}</button>
        <p>{comment.upVotes}</p>
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
      button {
        background: none;
        border: none;
        svg {
          height: 20px;
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
  const { dbh, userData, userLoading } = useContext(FirebaseContext);

  const checkReplies = () => {
    photoRef
      .collection('comments')
      .doc(comment.id)
      .collection('replies')
      .onSnapshot(querySnapshot => {
        let tempReplies = [];
        querySnapshot.forEach(doc => {
          console.log(doc.data());
          tempReplies.push({ id: doc.id, ...doc.data() });
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
      <div className='comment-info'>
        <img src={comment.user.photo} />
        <p>
          <Link>@{comment.user.userName}</Link> {comment.comment}
        </p>
      </div>
      <h3>Other replies:</h3>
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
            <button>{reply.upVotes > 0 ? <FilledUpVoteSVG /> : <EmptyUpVoteSVG />}</button>
            <p>{reply.upVotes}</p>
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
    button {
      height: 32px;
      width: 32px;
      border-radius: 50%;
      background: ${props => props.theme.colors.black};
      border: none;
      svg {
        height: 12px;
      }
    }
  }
`;

const Comments = () => {
  const [uploadPhotoComment, setUploadPhotoComment] = useState(true);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [showPhotos, setShowPhotos] = useState(false);
  const [selectedReplies, setSelectedReplies] = useState('');
  const { dbh, userData, userLoading } = useContext(FirebaseContext);

  const { photoId } = useParams();

  const photoRef = dbh.collection('userPhotos').doc(photoId);

  const sendComment = comment => {
    photoRef
      .collection('comments')
      .doc()
      .set({
        comment,
        photoId,
        user: { id: userData.id, userName: userData.userName, photo: userData.photo },
        addedOn: new Date(),
        upVotes: 0,
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
        upVotes: 0,
      });
  };

  const checkComments = () => {
    photoRef.collection('comments').onSnapshot(querySnapshot => {
      let tempComments = [];
      querySnapshot.forEach(doc => {
        tempComments.push({ id: doc.id, ...doc.data() });
      });
      setComments(
        tempComments.sort((a, b) => {
          return b.addedOn.seconds - a.addedOn.seconds;
        })
      );
      setLoading(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = checkComments();
    return () => {
      checkComments();
      setLoading(false);
    };
  }, []);

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
          <BackButton />
          {comments.map(comment => (
            <Comment
              key={comment.id}
              comment={comment}
              setSelectedReplies={setSelectedReplies}
              photoRef={photoRef}
              showPhotos={showPhotos}
            />
          ))}
          {userData.loggedIn && (
            <div className='comment-inputs'>
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

export default Comments;
