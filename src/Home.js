import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './style/Home.css';
import Cards from './Cards';
import { useEffect } from 'react';
import { ProfileContext } from './Contexts/Context';
import pic02 from './images/pic02.png';


function Home() {

    const {blogs, setBlogs, profile, setProfile} = useContext(ProfileContext);
    const history = useHistory();


    useEffect(() => {
        fetch('http://localhost:8000/blogs',{
            method : 'GET',
        })
        .then(result => {
            if(!result.ok){
                return result.json().then((body) => {
                    throw new Error(body.error);
                })
            }else{
                return result.json();
            }
        })
        .then(_blogs => {
            setBlogs(_blogs);
            console.log(_blogs);
        })
        .catch(err => {
            console.log(err.message);
        })
    },[]);

    const handleSign = () => {
        if(profile){
            history.push('/');
            setProfile(null);
        }else{
            history.push('/signIn');
        }
    }


  return (
  <div className = "home">
      <div className="banner">
          <div className="navbar">
            <div className="navbar__logo">
                Blog.
            </div>
            <div className="navbar__routes">
                <Link to="/" >HOME</Link>
                <Link to="/trending">TRENDING</Link>
                <Link to="/create">WRITE</Link>
                <Link onClick={handleSign}>{profile? "SIGN OUT" : "SIGN IN"}</Link>
                <Link to="/profile">
                    <img className='navbar__image' src="https://userpic.codeforces.org/2018443/title/38fb16c17026a84c.jpg" alt="Image" />
                </Link>
            </div>
        </div>
        <div className='banner__div'>
            <h1>
              Learn, Discover and Share Knowledge through Blogs.  
            </h1>
            <img className='banner__image' src={pic02}/>
        </div>
      </div>
      {/* Main Section  */}
      <div className="blogs">
            {blogs.map((blog) => (
                <Cards author={blog.authorName} likes={blog.likes} comments={blog.comments} authorId = {blog.authorId} body={blog.body} title={blog.title} id={blog._id} />
            ))}
      </div>
  </div>
  );}

export default Home;
