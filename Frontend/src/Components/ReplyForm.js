import React, { useState, useContext } from 'react';
import axios from 'axios';
import { store } from '../App';

const ReplyForm = ({ commentId, recipeID, setReplyingCommentId }) => {
  const [reply, setReply] = useState('');
  const [token] = useContext(store);

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    try {
      let storedToken = token || localStorage.getItem('token');
      if (!storedToken) {
        // Handle user not logged in
        return;
      }

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/comments/${commentId}/replies`, {
        content: reply,
      }, {
        headers: {
          'x-token': storedToken,
        },
      });

      // Optionally handle success

      setReply('');
      setReplyingCommentId(null); // Close reply form
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
  };

  return (
    <form onSubmit={handleSubmitReply}>
      <div className="form-group">
        {/* <label>Reply:</label> */}
        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit" className="submit-reply">Post Reply</button>
    </form>
  );
};

export default ReplyForm;
