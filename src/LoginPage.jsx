import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function LoginPage() {

    const [ user, setUser ] = useState({});
    const [profile,setprofile]=useState({});

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });


    useEffect(
        () => {
            if (user) {
              axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                       if(res.status == 401)
                       {setprofile(null)
                       }
                       else
                       {
                        setprofile(res.data)
                       }
  
  
  
  
  
  
  
  
  
                       
                    })
                    .catch((err) => {
                     
                    });
            }
        },
        [user]);
  
    const logOut = () => {
     googleLogout();
     setprofile({})
  };



  return (
    <div>

    <div>
                <h2>React Google Login</h2>
                <br />
                <br />
                {profile && profile?.email  ? (
                    <div>
                        <img src={profile?.picture} alt="user image" />
                        <h3>User Logged in</h3>
                        <p>Name: {profile?.name}</p>
                        <p>Email Address: {profile?.email}</p>
                        <br />
                        <br />
                        <button onClick={logOut}>Log out</button>
                    </div>
                ) : (
                    <button onClick={() => login()}>Sign in with Google 🚀 </button>
                )}
            </div>
    
        </div>
  )
}
