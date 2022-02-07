import './style/SignUp.css';
import { Link, useHistory } from 'react-router-dom';
import pic01 from './images/pic01.png';
import { useState, useContext } from 'react';
import { ProfileContext } from './Contexts/Context';

const SignUp = () => {

    const {profile, setProfile, signedIn, setSignedIn} = useContext(ProfileContext);

    const [fname,setFname] = useState('');
    const [lname,setLname] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirm,setConfirm] = useState('');
    const [visible,setVisible] = useState(false);
    const history = useHistory();

    const handleSubmit = e => {
        e.preventDefault();
        if(password === confirm){
            fetch('http://localhost:8000/signup',{
                method : 'POST',
                body : JSON.stringify({
                    name : fname +" "+ lname,
                    email : email,
                    password : password,
                    blogCount : 0,
                    blogs : []
                }),
                headers:{
                    "Content-type" : "application/json; charset=UTF-8"
                }
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
            .then(user => {
                console.log(user);
                setProfile(user);
                setSignedIn(true);
                history.push('/');
            })
            .catch(err => {
                console.log(err.message);
            })
        }else{
            setVisible(true);
        }
    }

    return ( 
        <div className="signUp">
            <div className="signUp__main">
                <div className="signUp__mainLeft">
                    <img src={pic01} alt="image" className='signUp__mainLeft__image'/>
                    <h3>Welcome Aboard</h3>
                    <p>Just a couple of clicks and we start</p>
                </div>
                <div className="signUp__mainRight">
                    <form>
                        <h1>Sign Up</h1>
                        <div className="signUp__mainRight__name">
                            <div className="signUp__mainRight__firstname">
                                <label>First Name</label>
                                <input type="text" value={fname} onChange={e => setFname(e.target.value)} />
                            </div>
                            <div className="signUp__mainRight__lastname">
                                <label>Last Name</label>
                                <input type="text" value={lname} onChange={e => setLname(e.target.value)} />
                            </div>
                        </div>
                            
                        <label>Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />

                        <div className="signUp__mainRight__password">
                            <div className="signUp__mainRight__firstpassword">
                                <label>Password</label>
                                <input type="password" value={password} onChange={e => {setPassword(e.target.value); setVisible(false)}} />
                            </div>
                            <div className="signUp__mainRight__confirmpassword">
                                <label>Confirm Password</label>
                                <input type="password" value={confirm} onChange={e => {setConfirm(e.target.value); setVisible(false)}} />
                            </div>
                        </div>
                        {visible && <p>password and confirm password are not same</p>}
                        <button onClick={handleSubmit}>Sign Up</button>
                    
                    </form>
                    
                </div>
            </div>
        </div>
     );
}
 
export default SignUp;