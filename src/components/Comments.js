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
import ViewPhoto from './ViewPhoto';
import Replies from './Replies';
import PictureSVG from '../assets/icons/icon_picture';
import TextSVG from '../assets/icons/icon_text';

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

const Comments = () => {
  const [uploadPhotoComment, setUploadPhotoComment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [commentLiked, setCommentLiked] = useState(false);
  const [dateSort, setDateSort] = useState(true);
  const [comments, setComments] = useState([]);
  const [showPhotos, setShowPhotos] = useState(true);
  const [selectedReplies, setSelectedReplies] = useState('');
  const [showCommentOnlyPosts, setShowCommentOnlyPosts] = useState(true);

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

  const sortCommentOnly = () => {
    if (showCommentOnlyPosts) {
      setComments([...comments.filter(comment => comment.photo === '')]);
    } else {
      checkComments();
    }
    setShowCommentOnlyPosts(!showCommentOnlyPosts);
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
                <PictureSVG fill={!showPhotos && '#c7c7c7'} />
              </button>
              <button className='toggle-button' onClick={() => sortCommentOnly()}>
                <TextSVG fill={!showCommentOnlyPosts && '#c7c7c7'} />
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

export default Comments;
