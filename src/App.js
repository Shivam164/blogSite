import './App.css';
import Home from './Home';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";import Navbar from './Navbar';
import Create from './Create';
import Trending from './Trending';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Profile from './Profile';
import ProfileContextProvider from './Contexts/Context'; 
import View from './View';
import io from 'socket.io-client';
const ENDPOINT = "http://localhost:8000";
const socket = io.connect(ENDPOINT);

function App() {

  return (
    <div className="app">
      <ProfileContextProvider>
          <Router>
            <Switch>

              <Route exact path = "/">
                <Home socket = {socket}/>
              </Route>

              <Route exact path = "/create">
                <Navbar/>
                <Create socket = {socket}/>
              </Route>

              <Route exact path = "/trending">
                <Navbar/>
                <Trending socket = {socket}/>
              </Route>

              <Route exact path = "/signIn">
                <SignIn socket = {socket}/>
              </Route>

              <Route exact path = "/signUp">
                <SignUp socket = {socket}/>
              </Route>
              
              <Route exact path = "/profile">
                <Navbar/>
                <Profile socket = {socket}/>
              </Route>

              <Route exact path = "/view/:id">
                <Navbar/>
                <View socket = {socket}/>
              </Route>

            </Switch>
          </Router>
        </ProfileContextProvider>
    </div>
  );
}

export default App;
