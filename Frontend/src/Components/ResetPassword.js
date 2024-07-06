import React, { useState } from 'react';
import axios from 'axios';
import Notification from './Notification';

const ResetPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [notificationKey, setNotificationKey] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    else if (name === 'otp') setOtp(value);
    else if (name === 'newPassword') setNewPassword(value);
    else if (name === 'confirmNewPassword') setConfirmPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Password validation checks
    if (newPassword.length < 8) {
      setMessage('Password must be at least 8 characters long.');
      setNotificationKey(prevKey => prevKey + 1);
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setMessage('Passwords do not match.');
      setNotificationKey(prevKey => prevKey + 1);
      return;
    }
    // Additional password complexity rules can be added here (e.g., uppercase, lowercase, digits, special characters)

    axios.post(`${process.env.REACT_APP_API_URL}/reset-password`, { email, otp, newPassword, confirmNewPassword })
      .then(res => {
        setMessage('Password reset successful. You can now log in with your new password.');
        setNotificationKey(prevKey => prevKey + 1);
        setOtp('');
        setNewPassword('');
        setConfirmPassword('');
      })
      .catch(err => {
        console.error(err);
        setMessage('Failed to reset password. Please try again.');
        setNotificationKey(prevKey => prevKey + 1);
      });
  };

  return (
    <div className="form">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleInputChange}
          required
        />
        <label>OTP:</label>
        <input
          type="text"
          name="otp"
          value={otp}
          onChange={handleInputChange}
          required
        />
        <label>New Password:</label>
        <input
          type="password"
          name="newPassword"
          value={newPassword}
          onChange={handleInputChange}
          required
        />
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmNewPassword"
          value={confirmNewPassword}
          onChange={handleInputChange}
          required
        />
        <button className="button button-block" type="submit">Reset Password</button>
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

export default ResetPasswordForm;
