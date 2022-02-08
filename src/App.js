import './App.css';
import Home from './Home';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";import Navbar from './Navbar';
import Create from './Create';
import Trending from './Trending';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Profile from './Profile';
import {useState} from 'react';
import ProfileContextProvider from './Contexts/Context'; 
import View from './View';

function App() {

  return (
    <div className="app">
      <ProfileContextProvider>
          <Router>
            <Switch>

              <Route exact path = "/">
                <Home/>
              </Route>

              <Route exact path = "/create">
                <Navbar/>
                <Create/>
              </Route>

              <Route exact path = "/trending">
                <Navbar/>
                <Trending/>
              </Route>

              <Route exact path = "/signIn">
                <SignIn/>
              </Route>

              <Route exact path = "/signUp">
                <SignUp/>
              </Route>
              
              <Route exact path = "/profile">
                <Navbar/>
                <Profile/>
              </Route>

              <Route exact path = "/view/:id">
                <Navbar/>
                <View/>
              </Route>

            </Switch>
          </Router>
        </ProfileContextProvider>
    </div>
  );
}

export default App;
