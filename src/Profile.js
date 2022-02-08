import { useEffect, useContext } from 'react';
import { ProfileContext } from './Contexts/Context';
import Cards from './Cards';
import './style/Profile.css';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

const Profile = () => {

    const {profile, setProfile, blogs} = useContext(ProfileContext);
    const history = useHistory();
    const [id,setId] = useState('');

    useEffect(() => {
        console.log(profile);
        if(!profile){
            history.push('/signIn');
        }else{
            setId(profile._id);
        }
    },[]);
    

    return ( 
        <>
        {profile && <div className="profile">
            <div className="profile__header">
                <div className="profile__headerimage">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg" alt="" />
                </div>
                <div className="profile__headerinfo">
                    <h1 className='profile__name'>{profile.name}</h1>
                    <p>Posts : {profile.blogCount}</p>
                    <h3>About</h3>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda, quae rem! Neque ad vero incidunt necessitatibus deserunt aperiam ullam vitae!
                    </p>
                </div>
            </div>

            <div className='profile__blogs'>
                {blogs.filter(blog => blog.authorId === id).map(Blog => (
                    <Cards author={Blog.authorName} likes={Blog.likes} comments={Blog.comments} authorId = {Blog.authorId} body={Blog.body} title={Blog.title} id={Blog._id} />
                ))}
            {/* {blogs.map((blog) => (
                <Cards author={blog.authorName} likes={blog.likes} comments={blog.comments} authorId = {blog.authorId} body={blog.body} title={blog.title} key={blog._id} />
            ))} */}
            </div>
        </div>}
        </>
     );
}
 
export default Profile;