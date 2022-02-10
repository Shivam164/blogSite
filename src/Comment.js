import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { ProfileContext } from './Contexts/Context';
import './style/Comment.css';

function Comment(props) {

    const [text,setText] = useState('');
    const {profile} = useContext(ProfileContext);

    const handlePost = () => {
        fetch(`http://localhost:8000/addComment/${props.id}`,{
            method : 'PUT',
            body : JSON.stringify({
                text : text,
                user : profile.name
            }),
            headers : {
                "Content-type" : "application/json; charset=UTF-8"
            }
        })
        .then(result => {
            if(!result.ok){
                return result.json().then(body => {
                    throw new Error(body.error);
                })
            }else{
                return result.json();
            }
        })
        .catch(err => {
            console.log(err.message);
        })
        props.setShow(false);
    }

  return (
  <div className='comment'>
      <textarea className='comment__body' value={text} onChange={(e) => setText(e.target.value)} placeholder='Write your comment in here'/>
      <div className="buttons">
          <button className='post__btn' onClick={handlePost}>POST</button>
            <button onClick={() => props.setShow(false)}>CLOSE</button>
      </div>
  </div>
  );
}

export default Comment;
