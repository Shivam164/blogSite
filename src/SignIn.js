import './style/SignIn.css';
import { Link } from 'react-router-dom';
import pic01 from './images/pic01.png';
import {useContext, useState} from 'react';
import { ProfileContext } from './Contexts/Context';
import { useHistory } from 'react-router-dom';

const SignIn = () => {

    const {profile, setProfile, signedIn, setSignedIn} = useContext(ProfileContext);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const history = useHistory();

    const handleSubmit = e => {
        e.preventDefault();
        fetch('http://localhost:8000/signin',{
            method : "POST",
            body : JSON.stringify({
                email : email,
                password : password
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }})
            .then(result => {
                console.log(result);
                if(!result.ok){
                    return result.json().then((body) => {
                        throw new Error(body.error);
                      })
                }else{
                    return result.json();
                }
            })
            .then(user => {
                console.log(user);
                setSignedIn(true);
                setProfile(user);
                history.push('/');
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    return ( 
        <div className="login">
            <div className="login__main">
                <div className="login__mainLeft">
                    <img src={pic01} alt="image" className='login__mainLeft__image'/>
                    <h3>Welcome Back</h3>
                    <p>Just a couple of clicks and we start</p>
                </div>
                <div className="login__mainRight">
                    <form>
                        <h1>Sign In</h1>
                        <label>Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                        <label>Password</label>
                        <input type="password" id="myInput" value = {password} onChange = {e => {setPassword(e.target.value)}} />
                        
                        <button onClick={handleSubmit}>Sign In</button>
                        <div className='signup'>
                        <p>Don't have an account?</p>
                        <Link to="/signup">Sign Up</Link>
                    </div>
                    </form>
                    
                </div>
            </div>
        </div>
     );
}
 
export default SignIn;