import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

export const FadeContainer = styled.div`
  @keyframes fadeIn {
    0% {
      z-index: 1000;
      opacity: 0;
      margin-top: 0vh;
    }
    100% {
      opacity: 1;
      margin-top: 100vh;
    }
  }
  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const Fade = ({ show, children }) => {
  const [shouldRender, setRender] = useState(show);

  useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) setRender(false);
  };

  return (
    shouldRender && (
      <FadeContainer
        style={{ animation: `${show ? 'fadeIn' : 'fadeOut'} 0.5s` }}
        onAnimationEnd={onAnimationEnd}>
        {children}
      </FadeContainer>
    )
  );
};

export default Fade;
