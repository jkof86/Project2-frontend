import React, { useState } from 'react';
import './Registration.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { StringLiteral } from 'typescript';
import { Link } from 'react-router-dom';

 interface RegistrationValues { 
    email: string; 
    username: string; 
    password: string; 
  
 }

const alphanumericRegex = /^[a-zA-Z0-9_]*$/;

//Yup validation schema to be applied to our formik form 
const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('email is required'),

    username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .max(15, 'Must be no more than 15 characters')
        .matches(alphanumericRegex, 'Only alphanumeric characters and underscores are allowed')
        .required('Username is required'),

    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
        .required('Password is required'),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match'),
        
});

const Registration: React.FC = () => {
    const initialValues: RegistrationValues = {
        email: '',
        username: '',
        password: '', 
    };

    const handleSubmit = async (values: RegistrationValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
        console.log(`Email: ${values.email}, Username: ${values.username}, Password: ${values.password}`);

        setSubmitting(false);
    }catch(error) {
        console.error(error);
        setSubmitting(false);
    }

    //Fill w code to send data to the server for adding a new user somewhere in this function 
};

    return (
        <div className="background">
        <div className="container">
        <div className="card">
            <h2>Gambler Signup</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ errors, touched, isSubmitting }) => (
                
                <form>
                <label>
                    Email: 
                    <Field type="email" name="email" required />
                    <ErrorMessage name="email" component="div" className="error" /> 
                </label>
                <label>
                    Username:
                    <Field type="text" name="username" required />
                    <ErrorMessage name="username" component="div" className="error" /> 
                </label>
                <label>
                    Password:
                    <Field type="password" name="password" required/>
                    <ErrorMessage name="password" component="div" className="error" /> 
                </label>
                <label>
                    Confirm Password:
                    <Field type="passwordConfirmation" name="passwordConfirmation" required/>
                    <ErrorMessage name="passwordConfirmation" component="div" className="error" /> 
                </label>

                <Link to="/Login" className="button-link">
              <button className="registration-button">Login</button>
                </Link>

                <div>
                <Link to="/Login"> Don't have an account? Click here </Link>
                </div>
            </form>
            )}
            </Formik>
        </div>
        </div>
        </div>
    );
}

export default Registration;