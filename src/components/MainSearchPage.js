import { BlackButton, BlackLink } from '../utilities/ReusableStyles';
import { Link, useHistory, useParams } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';

import { FirebaseContext } from '../context/Firebase';
import styled from 'styled-components';

export const SearchStyles = styled.div`
  font-family: Montserrat, sans-serif;
  width: 500px;
  text-align: center;
  max-width: 95%;
  margin: 0 auto;
  margin-top: 50px;
  min-height: calc(90vh - 50px);
  margin-top: calc(10vh + 50px);
  li {
    padding: 10px;
    list-style: none;
    background: transparent;
    display: grid;
    grid-template-columns: 65px 1fr;
    align-items: center;
    justify-content: center;
    width: 90%:
    margin: 0 auto;
    grid-gap: 10px;
    img {
      width: 65px;
      height: 100px;
      display: block;

    }
    h3 {
      font-size: 1.2rem;
      color:${props => props.theme.colors.black};
      font-weight: 300;
      text-align: left;
      margin: 0;
      span {
        font-weight: 700;
      }
    }
  }
  ul {
    padding: 0;
  }
  input {
    background: transparent;
    color: black;
    width: 80%;
    margin: 0 10%;
    border: none;
    border-bottom: 1px solid black;
    border-radius: 0px;
    -webkit-border-radius:0px;
    height: 30px;
    line-height: 30px;
    font-size: 20px;
    &:focus {
      outline: 0;
    }
  }
  .browse {
    margin: 30px auto;
    width: 250px !important;
    a {
      margin: 0 auto;
      text-decoration: none;
      text-align: center;
      font-size: 1.2rem;
      letter-spacing: 0.1rem;
      font-weight: 700;
    }
  }
`;

const DownshiftScreenSearch = ({ setOpenSearch }) => {
  return <h1>Hi</h1>;
};

export default DownshiftScreenSearch;
