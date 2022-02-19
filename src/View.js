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
import DeleteIcon from '@mui/icons-material/Delete';
import { useRef } from 'react';



function View({ socket }) {

    const {blogs, profile, setBlogs} = useContext(ProfileContext);
    const {id} = useParams();
    const history = useHistory();
    const [show,setShow] = useState(false);
    const [text,setText] = useState('');
    const messagesEndRef = useRef(null)

     
    useEffect(() => {
      // FOR INCREMENTING LIKES IN REAL TIME  
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

    // FOR ADDING COMMENT IN REAL TIME
            socket.on('increaseComment', ({user, text}) => {
                console.log("not listening");
                    const _blogs = blogs;
                    (_blogs).forEach(blog => {
                        if(blog._id == id){
                            blog.comments.push({
                                user : user,
                                text : text
                            });
                            return;
                        }
                    })
                    setBlogs(_blogs);
            })
    },[]);

    const handleLike = (id) => {

        var can = true;
        blogs.forEach(blog => {
            if(blog._id === id){
                blog.likedBy.forEach(element => {
                    if(element === profile._id){
                        can = false;
                        return;
                    }
                });
                return;
            }
        })

        if(!can)return;

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
        const left = arr.filter(obj => obj === profile._id);
        if(left.length === 0)return "black";
        else return "red";
    }

    const scrollToBottom = () => {
        console.log("down")
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
      }

    const handleComment = () => {
        fetch(`http://localhost:8000/addComment/${id}`,{
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
                socket.emit('increaseComment',{ user : profile.name, text : text })
            }
        })
        .catch(err => {
            console.log(err.message);
        })
        setShow(false);
        setText("");
        scrollToBottom();
    }

    const handleDelete = () => {
        fetch(`http://localhost:8000/deleteBlog/${id}`, {
            method : 'DELETE'
        })
        .then(result => {
            if(!result.ok){
                return result.json().then(body => {
                    throw new Error(body.error);
                })
            }else{
                history.push('/');
            }
        })
        .catch(err => {
            console.log(err.message);
        })
    }

  return (
  <div className = "view">
      {blogs.filter(blog => blog._id === id).map(Blog => (
          <>
            <div className='view__heading'>
                <h1>{Blog.title.toUpperCase()}</h1>
                {profile._id === Blog.authorId && <div className='delete__icon' onClick={ handleDelete }>
                    <DeleteIcon style={{ color : 'grey'}} /> 
                </div>}
                
            </div>
            <p className='blog__body'>{Blog.body}</p>
            <p className='blog__author'>- {Blog.authorName}</p>
            <div className="view__footer">
                <div className="like__section">
                    <FavoriteBorderIcon style={{ color: color(Blog.likedBy)}} className='blog__likeIcon' id='blog__likeIcon' onClick={() => handleLike(Blog._id) }/>
                    <h2 className='blog__likes'> {Blog.likes}</h2>
                </div>
            </div>

            <div className='comment'>
                <textarea className='comment__body' value={text} onChange={(e) => setText(e.target.value)} placeholder='Write your comment here'/>
                <div className="buttons">
                    <button className='post__btn' onClick={handleComment}>POST</button>
                </div>
            </div>
            <Allcomments comments = {Blog.comments} socket={socket} id={id} blogs={blogs} setBlogs={setBlogs}/>
            <div ref={messagesEndRef} />
          </>
          
      ))}
  </div>
  );
}

export default View;
