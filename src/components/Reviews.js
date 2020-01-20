import React from 'react';
import styled from 'styled-components';

export const ReviewStyles = styled.div`
  margin: 20px 2.5%;
  width: 95%;
  font-weight: 300;
`;

const Reviews = ({ reviews }) => {
  const displayStars = stars => {
    let starString = '';
    for (let i = 0; i < stars; i++) {
      starString += '★';
    }
    return starString;
  };
  return (
    <ReviewStyles>
      {reviews.map(review => (
        <div>
          <h3>
            {review.name} - {displayStars(review.stars)}
          </h3>
          <p>{review.text}</p>
        </div>
      ))}
    </ReviewStyles>
  );
};

export default Reviews;
