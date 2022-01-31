import './style/SignIn.css';
import { Link } from 'react-router-dom';
import pic01 from './images/pic01.png';

const SignIn = () => {


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
                        <input type="email" />
                        <label>Password</label>
                        <input type="password" id="myInput" />
                        
                        <button>Sign In</button>
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