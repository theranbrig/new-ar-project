import React, { useState } from 'react';
import styled from 'styled-components';
import ChevronUp from '../assets/icons/icon_chevron_up.js';
import ChevronDown from '../assets/icons/icon_chevron_down';

export const AccordionStyles = styled.div`
  max-height: ${({ open }) => (!open ? '0' : '700px')};
  overflow: hidden;
  transition-property: all;
  transition-duration: 0.7s;
  font-family: ${props => props.theme.fonts.main};
  padding: 0 2.5%;
`;

const AccordionButton = styled.button`
  width: 95%;
  margin-left: 2.5%;
  height: 52px;
  font-family: ${props => props.theme.fonts.main};
  background: ${props => props.theme.colors.white};
  border: none;
  border-bottom: ${({ last }) => (last ? '1px solid #989898' : 'none')};
  text-align: center;
  font-size: 1.5rem;
  font-weight: 300;
  strong {
    font-weight: 600;
  }
  svg {
    margin-left: 10px;
    height: 10px;
  }
`;

const Accordion = ({ children, titleStrong, titleRegular, last }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AccordionButton onClick={() => setOpen(!open)} last={last}>
        {titleRegular} <strong>{titleStrong}</strong>
        {open ? <ChevronUp /> : <ChevronDown />}
      </AccordionButton>
      <AccordionStyles open={open}>{children}</AccordionStyles>
    </>
  );
};

export default Accordion;
