import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { FirebaseContext } from '../context/Firebase';
import LoadingSpinner from '../components/LoadingSpinner';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';
import BackButton from '../components/BackButton';

const CommentsStyles = styled.div`
  margin-top: 10vh;
  width: 500px;
  max-width: 95%;
  margin: 10vh auto 0;
  min-height: 90vh;
`;

const CommentStyles = styled.div``;

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

const Comment = ({ comment, setSelectedReplies, photoRef }) => {
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
    <CommentStyles>
      <div className='comment-body'>
        <p>
          <Link to={`/user/${comment.user.id}`}>{comment.user.userName}</Link> {comment.comment}
        </p>
        <p>{moment.unix(comment.addedOn.seconds).fromNow()}</p>
        <button
          onClick={() => {
            setSelectedReplies(comment);
          }}>
          Show all {replyCount} {replyCount === 1 ? 'reply' : 'replies'}...
        </button>
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
    <div>
      <button
        onClick={() => {
          setSelectedReplies(null);
        }}>
        X
      </button>
      <h1>{comment.comment}</h1>
      {replies.map(reply => (
        <h2>{reply.reply}</h2>
      ))}
      <CreateReplies sendReply={sendReply} commentId={comment.id} />
    </div>
  );
};

const Comments = () => {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
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
      <BackButton />
      {selectedReplies ? (
        <Replies
          sendReply={sendReply}
          comment={selectedReplies}
          setSelectedReplies={setSelectedReplies}
          photoRef={photoRef}
        />
      ) : (
        <>
          {comments.map(comment => (
            <Comment
              key={comment.id}
              comment={comment}
              setSelectedReplies={setSelectedReplies}
              photoRef={photoRef}
            />
          ))}
          {<CreateComments sendComment={sendComment} />}
        </>
      )}
    </CommentsStyles>
  );
};

export default Comments;
