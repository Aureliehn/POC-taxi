import '../../index.css';
import { useEffect, useState } from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../Firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Logout = () =>{
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false)

    useEffect(()=>{
        if(checked){
            signOut(auth).then(() => {
                console.log("Vous êtes déconnecté");
                setTimeout(() => {
                    navigate('/')
                }, 1000);
            }).catch((error) => {
                console.log("Oups, nous avons une erreur!")
            });
        }
    }, [checked])

    const handleChange = (e)=>{
        setChecked(e.target.checked);
    }

    return(
        <div className="logoutContainer">
            <div className='switch'>
                <label>
                    <input 
                    onChange={handleChange}
                    type="checkbox"
                    checked= {checked}/>
                    <span className='lever'></span>
                </label>
        </div>
      </div>
    )
}

export default Logout;