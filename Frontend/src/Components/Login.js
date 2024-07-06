import React, { useState, useContext } from 'react';
import axios from 'axios';
import { store } from '../App';
import { useNavigate, Link } from 'react-router-dom';
import Notification from './Notification';

const LoginForm = () => {
  const navigate = useNavigate();
  const [token, setToken] = useContext(store);
  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  });
  const [highlightedFields, setHighlightedFields] = useState({});
  const [error, setError] = useState('');
  const [notificationKey, setNotificationKey] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
    setHighlightedFields((prevFields) => ({
      ...prevFields,
      [name]: value !== '',
    }));
  };

  const handleFocus = (e) => {
    const { name, value } = e.target;
    setHighlightedFields((prevFields) => ({
      ...prevFields,
      [name]: value !== '',
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setHighlightedFields((prevFields) => ({
      ...prevFields,
      [name]: value !== '',
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/login`, formFields)
      .then(res => {
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token); // Store token in local storage
        // Clear form fields
        setFormFields({
          email: '',
          password: '',
        });
        setNotificationKey(prevKey => prevKey + 1);
        // Redirect to myprofile page
        navigate('/myprofile');
      })
      .catch(err => {
        console.error(err);
        // Display error message to the user
        setError("Invalid email or password. Please try again.");
        setNotificationKey(prevKey => prevKey + 1);
      });
  };

  return (
    <div className="form">
      <h1>Welcome Back!</h1>
      <form onSubmit={submitHandler}>
        <div className={`field-wrap ${highlightedFields.email ? 'highlight' : ''}`}>
          <label className={formFields.email ? 'active' : ''}>
            Email Address<span className="req">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formFields.email}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
            autoComplete="off"
          />
        </div>
        <div className={`field-wrap ${highlightedFields.password ? 'highlight' : ''}`}>
          <label className={formFields.password ? 'active' : ''}>
            Password<span className="req">*</span>
          </label>
          <input
            type="password"
            name="password"
            value={formFields.password}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
            autoComplete="off"
          />
        </div>
        {error && (
          <Notification
            key={notificationKey}
            message={error}
          />
        )}
        <p className="forgot"><Link to="/forgot-password">Forgot Password?</Link></p>
        <button type="submit" className="button button-block">Log In</button>
      </form>
    </div>
  );
};

export default LoginForm;
