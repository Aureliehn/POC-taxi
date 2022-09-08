import Logout from "../logout";
import Map from '../Map';
import { useState, Fragment, useEffect } from "react";
import { auth } from '../Firebase/firebaseConfig';
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Welcome = () =>{

    const navigate = useNavigate();

    const [userSession, setUserSession] = useState(null);

    useEffect(()=>{
        const listener = onAuthStateChanged(auth, user=>{
            user ? setUserSession(user): navigate('/')
        })
        return listener;
    })

    return userSession === null ? (
        <Fragment>
            <div className="loader"></div>
            <p>Loading...</p>
        </Fragment>
    ):(
        <div className="welcome-bg">
            <div className="welcome-container">
                <Logout />
                <Map />
            </div>
        </div>
    )

}

export default Welcome;