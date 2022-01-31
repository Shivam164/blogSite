import Cards from './Cards';
import './style/Profile.css';

const Profile = () => {
    return ( 
        <div className="profile">
            <div className="profile__header">
                <div className="profile__headerimage">
                    <img src="https://userpic.codeforces.org/2018443/title/38fb16c17026a84c.jpg" alt="" />
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