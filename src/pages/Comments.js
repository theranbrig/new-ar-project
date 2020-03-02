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
import Comments from '../components/Comments';

const CommentsPage = () => {
  return (
    <div>
      <Comments />
    </div>
  );
};

export default CommentsPage;
