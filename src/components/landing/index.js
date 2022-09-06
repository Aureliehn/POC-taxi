import '../../index.css'
import { Link } from 'react-router-dom';

const Landing = () =>{

    return(
        <main className="welcomePage">
            
            <div className='leftBox'>
                <Link to ='/signup'className='btn-welcome'>Inscription</Link>
            </div>
            <div className='rightBox'>
                <Link to ='/login' className='btn-welcome'>Connexion</Link>
            </div>
        </main>
    )
    
}

export default Landing;