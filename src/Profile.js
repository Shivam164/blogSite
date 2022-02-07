import { useEffect, useContext } from 'react';
import { ProfileContext } from './Contexts/Context';
import Cards from './Cards';
import './style/Profile.css';
import { useHistory } from 'react-router-dom';

const Profile = () => {

    const {profile, setProfile, signedIn, setSignedIn} = useContext(ProfileContext);
    const history = useHistory();

    useEffect(() => {
        console.log(profile);
        if(!profile){
            history.push('/signIn');
        }
    },[]);

    return ( 
        <div className="profile">
            <div className="profile__header">
                <div className="profile__headerimage">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg" alt="" />
                </div>
                <div className="profile__headerinfo">
                    <h1 className='profile__name'>Shivam Kumar Pandey</h1>
                    <p>Posts : 20</p>
                    <h3>About</h3>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda, quae rem! Neque ad vero incidunt necessitatibus deserunt aperiam ullam vitae!
                    </p>
                </div>
            </div>

            <div className='profile__blogs'>
                <Cards/>
                <Cards/>
                <Cards/>
                <Cards/>
                <Cards/>
            </div>
        </div>
     );
}
 
export default Profile;