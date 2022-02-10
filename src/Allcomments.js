import React from 'react';
import './style/Allcomments.css';

function Allcomments({ comments }) {
  return (
  <div className='allComments'>
      <h3>Comments</h3>
      {comments.map(comment => (
          <div className='Comment'>
              <p className='Comment__user'>{comment.user}</p>
              <p>{comment.text}</p>
          </div>
      ))}
  </div>
  );
}

export default Allcomments;
