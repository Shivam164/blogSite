import './style/SignUp.css';
import { Link } from 'react-router-dom';
import pic01 from './images/pic01.png';

const SignUp = () => {


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
                                <input type="text" />
                            </div>
                            <div className="signUp__mainRight__lastname">
                                <label>Last Name</label>
                                <input type="text" />
                            </div>
                        </div>
                            
                        <label>Email</label>
                        <input type="email" />

                        <div className="signUp__mainRight__password">
                            <div className="signUp__mainRight__firstpassword">
                                <label>Password</label>
                                <input type="password" />
                            </div>
                            <div className="signUp__mainRight__confirmpassword">
                                <label>Confirm Password</label>
                                <input type="password" />
                            </div>
                        </div>
                        
                        <button>Sign Up</button>
                    
                    </form>
                    
                </div>
            </div>
        </div>
     );
}
 
export default SignUp;