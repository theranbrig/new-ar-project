import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';

const FormStyles = styled.div`
  margin: 0 auto;
  width: 500px;
  max-width: 90%;
  font-family: Montserrat, sans-serif;
  .box-area {
    border: 1px solid;
    margin: 50px 0;
    padding: 20px;
    h1 {
      text-align: center;
      font-size: 1.5rem;
    }
  }
  .form-input {
    display: flex;
    margin: 20px 0;
    input,
    select {
      flex: 2;
      margin: 0 5px;
      border: none;
      border-radius: 0px !important;
      border-bottom: 1px solid #c7c7c7;
      background: white;
      box-shadow: none;
      height: 25px;
      font-size: 1.1rem;
      -webkit-appearance: none;
      -webkit-border-radius: 0px;
      margin-left: 10px;
    }
    label {
      height: 25px;
      line-height: 25px;
      font-size: 1.1rem;
    }
  }
`;

const BlackButton = styled.button`
  border: 2px solid black;
  border-radius: 0px;
  height: 52px;
  display: block;
  margin: 0 auto;
  font-size: 1.2rem;
  padding: 5px 80px;
  font-family: Montserrat, sans-serif;
  background: black;
  color: white;
  min-width: 284px;
  margin-bottom: 10px;
`;

const BottomWhiteButton = styled.div`
  width: 200px;
  border: 2px solid black;
  border-radius: 0px;
  height: 50px;
  line-height: 50px;
  display: block;
  margin: 0 auto;
  font-size: 1.2rem;
  padding: 0px 40px;
  font-family: Montserrat, sans-serif;
  margin: 50px auto 50px;
  text-align: center;
  a {
    color: black;
    text-decoration: none;
  }
`;

const SubscriptionForm = () => {
  const [age, setAge] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState(null);

  const history = useHistory();

  const encode = data => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  };

  const handleSubmit = e => {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', age, gender, email, name }),
    })
      .then(() => {
        history.push('/success');
      })
      .catch(error => alert(error));
    history.push('/success');
  };

  return (
    <>
      <FormStyles>
        <form onSubmit={() => handleSubmit()}>
          <div className='box-area'>
            <h1>SUBSCRIBE TO OUR NEWSLETTER</h1>
            <div className='form-input'>
              <label>Name: </label>
              <input
                type='text'
                name='name'
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <div className='form-input'>
              <label>Email:</label>
              <input
                type='email'
                name='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='form-input'>
              <label>Age: </label>
              <input type='number' name='age' value={age} onChange={e => setAge(e.target.value)} />
            </div>
            <div className='form-input'>
              <label>Gender: </label>
              <select name='gender' onChange={e => setGender(e.target.value)} value={gender}>
                <option value=''>-</option>
                <option value='female'>Female</option>
                <option value='male'>Male</option>
              </select>
            </div>
          </div>
          <BlackButton type='submit'>SUBMIT</BlackButton>
        </form>
      </FormStyles>
      <BottomWhiteButton>
        <Link to='/'>BACK TO HOME</Link>
      </BottomWhiteButton>
    </>
  );
};

export default SubscriptionForm;
