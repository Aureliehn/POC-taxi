import crash from '../../assets/crash.png'

const centerH2 = {
    textAlign: 'center',
    marginTop: '50px'
}

const myImg = {
    display: 'block',
    margin: '10px auto'
}

const ErrorPage = () =>{
    return(
        <div className="welcome-bg">
            <div className="welcome-container">
                <h2 style={centerH2}>Oups, cette page n'existe pas</h2>
                <img style={myImg} src={crash} alt="error page"></img>
            </div>
        </div>
    )
}

export default ErrorPage;