import { Link, useHistory } from 'react-router-dom';
import React, { useContext, useState } from 'react';

import Error from '../components/Error';
import { FirebaseContext } from '../context/Firebase';
import LoadingSpinner from '../components/LoadingSpinner';
import styled from 'styled-components';

const FormStyles = styled.div`
  margin: 0 auto;
  width: 500px;
  max-width: 90%;
  font-family: ${props => props.theme.fonts.main};
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
    input,
    select {
      height: 45px;
      width: 80%;
      display: block;
      margin: 20px auto;
      padding-left: 10px;
      border: 1px solid ${props => props.theme.colors.black};
      border-radius: 25px;
      font-size: 1.1rem;
      background: ${props => props.theme.colors.white};
      -webkit-appearance: none;
    }
    select {
      width: calc(80% + 10px);
      height: 49px;
    }
  }
  h3 {
    text-align: center;
  }
  .required {
    h5 {
      font-weight: 300;
    }
    span {
      font-weight: 500;
    }
  }
  span {
    color: tomato;
  }
`;

const BlackButton = styled.button`
  border: 2px solid black;
  border-radius: 0px;
  height: 45px;
  display: block;
  margin: 0 auto;
  border-radius: 25px;
  font-size: 1.1rem;
  font-family: ${props => props.theme.fonts.main};
  background: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
  width: 200px;
  margin-bottom: 10px;
  :disabled {
    color: #989898;
  }
`;

const SubscriptionForm = () => {
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [age, setAge] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');

  const { dbh, firebaseError } = useContext(FirebaseContext);

  const history = useHistory();

  const validateEmail = email => {
    /* eslint-disable-next-line */
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  const subscribe = () => {
    setLoading(true);
    console.log('CLICK');
    const emailCheck = dbh.collection('newsletterSubscriptions').where('email', '==', email);
    emailCheck.get().then(async querySnapshot => {
      if (querySnapshot.docs.length) {
        setFormError(
          "You've already registered for our newsletter.  Keep an eye on your inbox for more information coming soon."
        );
        setLoading(false);
      } else {
        await dbh
          .collection('newsletterSubscriptions')
          .doc()
          .set({ age, name, email, gender })
          .then(() => {
            setLoading(false);
            history.push('/success');
          });
      }
    });
  };

  if (loading)
    return (
      <FormStyles>
        <LoadingSpinner color='black' />
      </FormStyles>
    );

  return (
    <>
      <FormStyles>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!validateEmail(email)) {
              setFormError('Ooops. You need to enter a proper email address');
            } else {
              if (name.length <= 2) {
                setFormError(
                  'Ooops. Please make sure your name is at least three characters long.'
                );
              } else {
                subscribe();
              }
            }
          }}>
          <div className='form-input'>
            <input
              type='text'
              name='name'
              value={name}
              onChange={e => setName(e.target.value)}
              required
              placeholder='Name - Required'
              aria-label='Name'
              minLength='3'
            />
          </div>
          <div className='form-input'>
            <input
              type='email'
              name='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder='Email Address - Required'
              aria-label='Email Address'
            />
          </div>
          <div className='form-input'>
            <input
              type='number'
              name='age'
              value={age}
              onChange={e => setAge(e.target.value)}
              placeholder='Age'
              aria-label='Age'
            />
          </div>
          <div className='form-input'>
            <select
              name='gender'
              onChange={e => setGender(e.target.value)}
              value={gender}
              aria-label='Gender'
              placeholder='Gender'>
              <option className='gender' value=''>
                Gender
              </option>
              <option value='female'>Female</option>
              <option value='male'>Male</option>
              <option value='other'>Other</option>
            </select>
          </div>
          <BlackButton disabled={!email && !name} type='submit'>
            SUBMIT
          </BlackButton>
        </form>
        {(formError || firebaseError) && (
          <Error error={firebaseError || formError} clearFunction={setFormError} />
        )}
      </FormStyles>
    </>
  );
};

export default SubscriptionForm;
