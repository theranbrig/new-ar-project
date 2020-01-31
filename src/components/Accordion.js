import React, { useState } from 'react';
import styled from 'styled-components';

export const AccordionStyles = styled.div`
  max-height: ${({ open }) => (!open ? '0' : '700px')};
  overflow: hidden;
  transition-property: all;
  transition-duration: 0.7s;
  font-family: Montserrat;
  padding: 0 2.5%;
`;

const AccordionButton = styled.button`
  width: 95%;
  margin-left: 2.5%;
  height: 52px;
  font-family: Montserrat, sans-serif;
  background: white;
  border: none;
  border-top: 1px solid #989898;
  border-bottom: ${({ last }) => (last ? '1px solid #989898' : 'none')};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 1.2rem;
`;

const Accordion = ({ children, title, last }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AccordionButton onClick={() => setOpen(!open)} last={last}>
        {title}
        {open ? <i className='fa fa-chevron-up'></i> : <i className='fa fa-chevron-down'></i>}
      </AccordionButton>
      <AccordionStyles open={open}>{children}</AccordionStyles>
    </>
  );
};

export default Accordion;
