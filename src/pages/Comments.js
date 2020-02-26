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

const CommentsStyles = styled.div`
  margin-top: 10vh;
  width: 500px;
  max-width: 95%;
  margin: 10vh auto 0;
  min-height: 90vh;
  padding: 10px;
`;

const RepliesStyles = styled.div`
  button {
    border: none;
    background: none;
    padding: 0;
    svg {
      height: 16px;
    }
  }
`;

const CreateCommentsStyles = styled.div``;

const CreateComments = ({ sendComment }) => {
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
  display: grid;
  grid-template-columns: 4fr 1fr;
  .back-button button {
    border: none;
    background: none;
    padding: 0;
  }
  .upVotes {
    svg {
      height: 20px;
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
            <Link to={`/user/${comment.user.id}`}>@{comment.user.userName}</Link> {comment.comment}
          </span>
        </p>
        <p className='date'>{moment.unix(comment.addedOn.seconds).fromNow()}</p>
        <button
          className='back-button'
          onClick={() => {
            setSelectedReplies(comment);
          }}>
          {replyCount === 0
            ? 'Start the conversation...'
            : replyCount === 1
            ? 'View the reply...'
            : `View all ${replyCount} replies...`}
        </button>
      </div>
      <div className='upVotes'>
        {comment.upVotes > 0 ? <FilledUpVoteSVG /> : <EmptyUpVoteSVG />}
        <p>{comment.upVotes}</p>
      </div>
    </CommentStyles>
  );
};

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
        setReplies(tempReplies);
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
      <h1>Replying to:</h1>
      <p>
        <Link>@{comment.user.userName}</Link> {comment.comment}
      </p>
      {replies.map(reply => (
        <h2>{reply.reply}</h2>
      ))}
      <CreateReplies sendReply={sendReply} commentId={comment.id} />
    </RepliesStyles>
  );
};

const Comments = () => {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [showPhotos, setShowPhotos] = useState(false);
  const [selectedReplies, setSelectedReplies] = useState(null);
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
      setComments(tempComments);
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
      {selectedReplies ? (
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
          {<CreateComments sendComment={sendComment} />}
        </>
      )}
    </CommentsStyles>
  );
};

export default Comments;
