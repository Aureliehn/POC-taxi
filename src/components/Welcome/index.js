import Logout from "../logout";
import Map from '../Map';
import { useState, Fragment, useEffect } from "react";
import { auth, user } from '../Firebase/firebaseConfig';
import { getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Welcome = () =>{

    const navigate = useNavigate();
    const [userData, setUserData] = useState({});

    const [userSession, setUserSession] = useState(null);

    useEffect(()=>{
        const listener = onAuthStateChanged(auth, user=>{
            user ? setUserSession(user): navigate('/')
        })
        if (!!userSession) {

            const colRef = user(userSession.uid);

            getDoc(colRef)
            .then( snapshot => {
                if (snapshot.exists()) {
                    const docData = snapshot.data(); // objet
                    console.log(docData);
                    console.log(snapshot.id);
                    setUserData(docData);
                }
            })
            .catch( error => {
                console.log(error);
            })
        }

        return listener();
    }, [userSession])

    return userSession === null ? (
        <Fragment>
            <div className="loader"></div>
            <p>Loading...</p>
        </Fragment>
    ):(
        <div className="welcome-bg">
            <div className="welcome-container">
                <Logout />
                <Map userData={userData}/>
            </div>
        </div>
    )

}

export default Welcome;