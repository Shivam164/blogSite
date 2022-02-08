import React from 'react';
import './style/Create.css';
import {useState, useContext, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { ProfileContext } from './Contexts/Context';

function Create() {

  const {profile, setProfile, signedIn, setSignedIn} = useContext(ProfileContext);
  const history = useHistory();
  const [head,setHead] = useState("");
  const [body,setBody] = useState("");

    useEffect(() => {
        console.log(profile);
        if(!profile){
            history.push('/signIn');
        }
    },[]);

    const handleSubmit = e => {
      e.preventDefault();
      fetch('http://localhost:8000/create',{
        method : 'POST',
        body : JSON.stringify({
          title : head,
          body : body,
          authorId : profile._id,
          authorName : profile.name,
          comments : [],
          likes : 0,
          likedBy : [],
          timestamp : `${new Date()}`
        }),
        headers : {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(result => {
        console.log(result);
        if(!result.ok){
            return result.json().then(body => {
              throw new Error(body.error);
            })
        }
      })
      .catch(err => {
        console.log(err.message);
      })

      fetch(`http://localhost:8000/incBlogCount/${profile._id}`,{
            method : 'PUT'
          })
          .then(result => {
            if(result.ok){
              history.push('/');
            }else{
              return result.json().then(body => {
                throw new Error(body.error);
              })
            }
          })
          .catch(err => {
            console.log(err.message);
          })
    }

  return (
  <div className="writeBlog">
   
      <form className="blogForm">
         <div className="writeBlog__header">
          Add a Blog
        </div>
        
        <label>Blog Heading</label>
        <input type="text" className='writeBlog__heading' value={head} onChange={e=> setHead(e.target.value)} placeholder="Blog Heading" required/>
        <label>Blog body</label>
        <textarea className='blogForm__body' type="text" value={body} onChange={e=> setBody(e.target.value)} placeholder="body of blog" required/>
        <button onClick={handleSubmit}>POST</button>
      </form>
  </div>
  );}

export default Create;
