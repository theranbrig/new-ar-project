import React, { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FirebaseContext } from '../context/Firebase';
import LoadingSpinner from '../components/LoadingSpinner';

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
  height: 52px;
  display: block;
  margin: 0 auto;
  font-size: 1.2rem;
  padding: 5px 80px;
  font-family: ${props => props.theme.fonts.main};
  background: ${props => props.theme.colors.black};
  color: white;
  min-width: 284px;
  margin-bottom: 10px;
  :disabled {
    color: #989898;
  }
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
  font-family: ${props => props.theme.fonts.main};
  margin: 50px auto 50px;
  text-align: center;
  a {
    color: ${props => props.theme.colors.black};
    text-decoration: none;
  }
`;

const SubscriptionForm = () => {
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [age, setAge] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');

  const { dbh } = useContext(FirebaseContext);

  const history = useHistory();

  const validateEmail = email => {
    /* eslint-disable-next-line */
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  const subscribe = () => {
    setLoading(true);
    const emailCheck = dbh.collection('newsletterSubscriptions').where('email', '==', email);
    emailCheck.get().then(async querySnapshot => {
      if (querySnapshot.docs.length) {
        setFormError(
          "You've already registered for our newsletter.  Keep an eye on your inbox for more information coming soon."
        );
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
        <div>
          <div className='box-area'>
            <h1>SUBSCRIBE TO OUR NEWSLETTER</h1>
            <div className='form-input'>
              <label>
                Name: <span>*</span>
              </label>
              <input
                type='text'
                name='name'
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <div className='form-input'>
              <label>
                Email: <span>*</span>
              </label>
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
                <option value='other'>Other</option>
              </select>
            </div>
            <div className='required'>
              <h5>
                <span>*</span> = Required Fields
              </h5>
            </div>
          </div>
          <BlackButton
            disabled={!email && !name}
            onClick={() => {
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
            SUBMIT
          </BlackButton>
        </div>
        {formError && <h3>{formError}</h3>}
      </FormStyles>
      <BottomWhiteButton>
        <Link to='/'>BACK TO HOME</Link>
      </BottomWhiteButton>
    </>
  );
};

export default SubscriptionForm;
