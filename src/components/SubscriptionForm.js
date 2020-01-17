import React, { useState } from 'react';
import NetlifyForm from 'react-netlify-form';
import { useHistory } from 'react-router-dom';

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
        alert('success');
        history.push('/success');
      })
      .catch(error => alert(error));
    history.push('/success');
  };

  return (
    <form onSubmit={() => handleSubmit()}>
      <label>
        Name: <input type='text' name='name' value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label>
        Your Age:{' '}
        <input type='number' name='age' value={age} onChange={e => setAge(e.target.value)} />
      </label>
      <label>
        Your Gender:{' '}
        <select name='gender' onChange={e => setGender(e.target.value)} value={gender}>
          <option>Choose</option>
          <option value='female'>Female</option>
          <option value='male'>Male</option>
        </select>
      </label>
      <label>
        Email:{' '}
        <input
          type='email'
          name='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </label>
      <button type='submit'>Send</button>
    </form>
  );
};

export default SubscriptionForm;
