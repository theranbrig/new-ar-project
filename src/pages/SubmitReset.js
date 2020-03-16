import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import styled from 'styled-components';

export const ResetForm = styled.div`
  margin-top: 10vh;
  min-height: 90vh;
  width: 500px;
  max-width: 90%;
`;

const SubmitReset = () => {
  const location = useLocation();
  console.log(location);
  return (
    <ResetForm>
      <h1></h1>
    </ResetForm>
  );
};

export default SubmitReset;
