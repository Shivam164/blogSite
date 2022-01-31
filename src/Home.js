import React from 'react';
import { Link } from 'react-router-dom';
import './style/Home.css';
import Cards from './Cards';

function Home() {
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
                <Link to="/signin">SIGNIN</Link>
                <Link to="/profile">
                    <img className='navbar__image' src="https://userpic.codeforces.org/2018443/title/38fb16c17026a84c.jpg" alt="Image" />
                </Link>
            </div>
        </div>
      </div>
      {/* Main Section  */}
      <div className="blogs">
            <Cards/>
            <Cards/>
            <Cards/>
            <Cards/>
            <Cards/>
      </div>
  </div>
  );}

export default Home;
