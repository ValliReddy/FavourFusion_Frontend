import React, { useState } from 'react';
import axios from 'axios';
import Notification from './Notification';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [notificationKey, setNotificationKey] = useState(0);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/forgot-password`, { email })
      .then(res => {
        setMessage('Check your email for the OTP.');
        setNotificationKey(prevKey => prevKey + 1);
        // Optionally, handle redirection after showing the message
        setTimeout(() => {
          navigate('/reset-password'); // Redirect to reset password page
        }, 3000); // Redirect after 3 seconds (adjust timing as needed)
      })
      .catch(err => {
        console.error(err);
        setMessage('Failed to initiate password reset.');
        setNotificationKey(prevKey => prevKey + 1);
      });
  };

  return (
    <div className="form">
      <h2>Forgot Password?</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={handleInputChange}
          required
        />
        <button className="button button-block" type="submit">Send OTP</button>
      </form>
      {message && (
          <Notification
            key={notificationKey}
            message={message}
          />
        )}
    </div>
  );
};

export default ForgotPasswordForm;
