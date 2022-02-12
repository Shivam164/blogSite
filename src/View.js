import React, { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProfileContext } from './Contexts/Context';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './style/View.css';
import { useHistory } from 'react-router-dom';
import Comment from './Comment';
import Allcomments from './Allcomments';



function View({ socket }) {

    const {blogs, profile, setBlogs} = useContext(ProfileContext);
    const {id} = useParams();
    const history = useHistory();
    const [show,setShow] = useState(false);

    useEffect(() => {
        console.log(profile);
        if(!profile){
            history.push('/signIn');
        }   
    },[]);

    useEffect(() => {
        socket.on('incLike', BlogId => {
                console.log("listening");
                const _blogs = blogs;
                (_blogs).forEach(blog => {
                    if(blog._id == BlogId.id){
                        blog.likes++;
                        return;
                    }
                })
                setBlogs(_blogs);
            })
    },[]);

    const incrementLike = () => {
        const _blogs = blogs;
        (_blogs).forEach(blog => {
            if(blog._id == id){
                blog.likes++;
                return;
            }
        })
        setBlogs(_blogs);   
    }
    
    const handleLike = (id) => {
        if(!profile){
            history.push('/signIn');
        }else{
            console.log("like button clicked");
            fetch(`http://localhost:8000/incrementLike/${id}`,{
                method : 'PUT',
                body : JSON.stringify({
                    user : profile._id
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(result => {
                if(!result.ok){
                    return result.json().then(body => {
                        throw new Error(body.error);
                    })
                }else{
                    console.log("here :|");
                    socket.emit('incLike', { id });
                    // incrementLike();
                }
            })
            .catch(err => {
                console.log(err.message);
            })
        }
    }


    const color = (arr) => {
        console.log("in here");
        const left = arr.filter(obj => obj === profile._id);
        if(left.length === 0)return "black";
        else return "red";
    }

  return (
  <div className = "view">
      {blogs.filter(blog => blog._id === id).map(Blog => (
          <>
            <h1>{Blog.title.toUpperCase()}</h1>
            <p className='blog__body'>{Blog.body}</p>
            <p className='blog__author'>- {Blog.authorName}</p>
            <div className="view__footer">
                <div className="like__section">
                    <FavoriteBorderIcon style={{ color: color(Blog.likedBy)}} className='blog__likeIcon' onClick={() => handleLike(Blog._id) }/>
                    <h2 className='blog__likes'> {Blog.likes}</h2>
                </div>
                <button onClick={() => setShow(true)}>COMMENT</button>
            </div>
            {show && <Comment className='write__comment' setShow={setShow} id={Blog._id}/>}
            <Allcomments comments = {Blog.comments}/>
          </>
          
      ))}
  </div>
  );
}

export default View;
