import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase/firebaseConfig';

const Login = () =>{

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [btn, setBtn] = useState(false);
    const [error, setError] = useState('');

    useEffect(()=>{
        if(password.length > 5 && email !== ''){
            setBtn(true)
        } else if(btn === true){
            setBtn(false)
        }
    }, [password, email, btn])

    const handleSubmit = e =>{
        e.preventDefault();
        console.log(email, password)
        signInWithEmailAndPassword(auth, email, password)
        .then(user => {
            setEmail('');
            setPassword('');
            navigate('/welcome', { replace: true});
        })
        .catch(error => {
            setError(error);
            setEmail('');
            setPassword('');
        })

    }
    return(
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftLogin"></div>
                    <div className="formBoxRight">
                        <div className="formContent">
                        {error !== '' && <span>{error.message}</span>}
                        <h2>Connexion</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="inputBox">
                                    <input onChange={e => setEmail(e.target.value)} value={email} type='email' autoComplete="off" required />
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div className="inputBox">
                                    <input onChange={e => setPassword(e.target.value)} value={password} type='password' autoComplete="off" required />
                                    <label htmlFor="password">Mot de passe</label>
                                </div>

                                {btn ? <button>Connexion</button> : <button disabled>Connexion</button>}
                            </form>
                            <div className='linkContainer'>
                                <Link className='simpleLink' to="/signup">Nouveau sur TAXI service? Inscrivez-vous.</Link><br></br>
                                <Link className='simpleLink' to="/forgetPassword">Mot de passe oubli??? Cliquez ici.</Link>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Login;