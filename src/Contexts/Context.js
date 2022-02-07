import {useState, createContext} from 'react';

export const ProfileContext = createContext();

function ProfileContextProvider(props) {
    
      const [profile,setProfile] = useState(null);
      const [signedIn,setSignedIn] = useState(false);
      const [blogs,setBlogs] = useState([]);

      return(
          <ProfileContext.Provider value = {{profile, setProfile, signedIn, setSignedIn, blogs, setBlogs}}>
              {props.children}
          </ProfileContext.Provider>
      )
}

export default ProfileContextProvider;
