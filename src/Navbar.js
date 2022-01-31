import React from 'react';
import { Link } from 'react-router-dom';
import './style/Navbar.css'

function Navbar() {
  return (
    <div className="Nnavbar">
        <div className="Nnavbar__logo">
            Blog.
        </div>
        <div className="Nnavbar__routes">
            <Link to="/" >HOME</Link>
            <Link to="/trending">TRENDING</Link>
            <Link to="/create">WRITE</Link>
            <Link to="/signin">SIGNIN</Link>
            <Link to="/profile">
                <img className='Nnavbar__image' src="https://userpic.codeforces.org/2018443/title/38fb16c17026a84c.jpg" alt="Image" />
            </Link>
        </div>
    </div>  
  );
}

export default Navbar;
