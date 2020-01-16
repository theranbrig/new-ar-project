// Render Prop
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styled from 'styled-components';

export const FormStyles = styled.div`
  width: 30%;
  margin: 0 auto;
  border: 1px solid black;
`;

const SubscriptionForm = () => {
  const [submitting, setSubmitting] = useState(false);
  if (submitting) return <h1>Submitting</h1>;
  return (
    <FormStyles>
      <h1>SUBSCRIBE TO OUR NEWSLETTER</h1>
      <Formik
        initialValues={{ email: '', age: '' }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}>
        {({ isSubmitting }) => (
          <Form>
            <Field type='email' name='email' />
            <ErrorMessage name='email' component='div' />
            <Field type='select' name='gender' />
            <ErrorMessage name='email' component='div' />
            <Field type='number' name='age' />
            <ErrorMessage name='number' component='div' />
            <button type='submit' disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </FormStyles>
  );
};
export default SubscriptionForm;
