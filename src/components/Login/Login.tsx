import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { loginUser } from "../../features/authSlice";
import { RootState } from "../../redux/store";

interface LoginValues {
  email: string;
  password: string;
}
const alphanumericRegex = /^[a-zA-Z0-9_]*$/;

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("email is required"),

  password: Yup.string()
    .min(6, "Too short, no password will match")
    .required("Password is required"),
});

const Login: React.FC = () => {
  const dispatch = useAppDispatch();

  const auth = useAppSelector((state: RootState) => state.auth);
  console.log(auth);

  const initialValues: LoginValues = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();
  const handleSubmit = async (
    values: LoginValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      console.log(`Email: ${values.email}, Password: ${values.password}`);
      const res = await dispatch(loginUser(values)).unwrap();
      if (res.accessToken) {
        // successful login so navigate user here
        navigate("/app");
      } else {
        // set errors here
        console.log(res);
      }
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      // set generic error here "Something went wrong with logging in"
      setSubmitting(false);
    }
    console.log("testing!")
  };

  
  return (
    <div className="background">
      <div className="container">
        <div className="card">
          <h2>Gambler Login</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <label>
                  Username:
                  <Field type="text" name="email" required />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="error"
                  />
                </label>
                <label>
                  Password:
                  <Field type="password" name="password" required />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </label>
                <button type="submit" className="login-button">
                  Login
                </button>
                <div>
                  <Link to="/Registration">
                    {" "}
                    Don't have an account? Click here{" "}
                  </Link>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
