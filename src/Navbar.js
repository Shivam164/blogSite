import React, {useContext, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './style/Navbar.css'
import {ProfileContext} from './Contexts/Context';
import { useState } from 'react';

function Navbar() {

  const {profile, setProfile} = useContext(ProfileContext);
  const history = useHistory();

  const handleSign = () => {
    if(profile){
        history.push('/');
        setProfile(null);
    }else{
        history.push('/signIn');
    }
  }

  return (
    <div className="Nnavbar">
        <div className="Nnavbar__logo">
            Blog.
        </div>
        <div className="Nnavbar__routes">
            <Link to="/" >HOME</Link>
            <Link to="/trending">TRENDING</Link>
            <Link to="/create">WRITE</Link>
            <Link onClick={handleSign}>{profile? "SIGN OUT" : "SIGN IN"}</Link>
            <Link to="/profile">
                <img className='Nnavbar__image' src="https://userpic.codeforces.org/2018443/title/38fb16c17026a84c.jpg" alt="Image" />
            </Link>
        </div>
    </div>  
  );
}

export default Navbar;
