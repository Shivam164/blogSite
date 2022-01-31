import React from 'react';
import './style/Cards.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';

function Cards() {
  return (
  <div className = "card">
      {/* card header  */}
      <div className="card__header">
          <img src="https://userpic.codeforces.org/2018443/title/38fb16c17026a84c.jpg" alt="" />
          <div className="card__headerInfo">
              <h3>Shivam Kumar Pandey</h3>
              <p>{Date()}</p>
          </div>
      </div>

      {/* card image  */}
      <div className="card__image">
        <img src="https://cdn.pixabay.com/photo/2022/01/19/00/36/sea-6948569__340.jpg" alt="" />
      </div>

      {/* card comments and likes  */}
      <div className="card__reaction">
        <FavoriteBorderIcon/>
         <p>50</p>
        <CommentIcon/>
        <p>3</p>
      </div>
  </div>
  
  );}

export default Cards;
