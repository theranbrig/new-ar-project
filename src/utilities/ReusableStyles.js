import styled from 'styled-components';

export const BlackButton = styled.div`
  width: 200px;
  border: 2px solid ${props => props.theme.colors.black};
  border-radius: 25px;
  height: 50px;
  line-height: 50px;
  display: block;
  margin: 0 auto;
  background: ${props => props.theme.colors.black};
  font-size: 1.2rem;
  padding: 0px 40px;
  font-weight: 600;
  font-family: ${props => props.theme.fonts.main};
  margin: 0 auto 30px;
  a {
    color: ${props => props.theme.colors.white};
    text-decoration: none;
  }
`;

export const RoundARButton = styled.button`
  border: 2px solid ${props => props.theme.colors.white};
  border-radius: 0px;
  height: 75px;
  width: 75px;
  line-height: 75px;
  display: block;
  margin: 30px auto;
  font-size: 1.2rem;
  font-weight: 700;
  border-radius: 50%;
  font-family: ${props => props.theme.fonts.main};
  background: ${props => props.theme.colors.lightGrey};
  color: ${props => props.theme.black};
  margin-bottom: 10px;
  box-shadow: 0 0 0 8px ${props => props.theme.colors.lightGrey};
`;
