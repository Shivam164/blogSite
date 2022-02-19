import React from 'react';
import './style/Cards.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import { useHistory } from 'react-router-dom';
import { ProfileContext } from './Contexts/Context';
import { useContext } from 'react';

function Cards({ author, likes, comments, authorId, body, title, id }) {
 
  const {profile} = useContext(ProfileContext);
  const history = useHistory();

  const handleView = (e) => {
    e.preventDefault();
    console.log(id);
    if(profile){
      history.push(`/view/${id}`);
    }else{
      history.push('/signIn');
    } 
  }

  return (
  <div className = "card">
      {/* card header  */}
      <div className="card__header">
          <img src="https://userpic.codeforces.org/2018443/title/38fb16c17026a84c.jpg" alt="" />
          <div className="card__headerInfo">
              <h3>{author}</h3>
              <p>{Date()}</p>
          </div>
      </div>

      {/* card image  */}
      <div className="card__image">
        <p>{title.toUpperCase()}</p>
        <img src="https://cdn.pixabay.com/photo/2022/01/19/00/36/sea-6948569__340.jpg" alt="" />
      </div>

      {/* card comments and likes  */}
      <div className='card__footer'>
        <div className="card__reaction">
        <FavoriteBorderIcon/>
         <p>{likes}</p>
        <CommentIcon/>
        <p>{comments.length}</p>
      </div>
        <button onClick={handleView}>VIEW</button>
      </div>
      
  </div>
  
  );}

export default Cards;
