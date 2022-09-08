import Logout from "../logout";
import Map from '../Map'

const Welcome = () =>{
    return(
        <div className="welcome-bg">
            <div className="welcome-container">
                <Logout />
                <Map />
            </div>

        </div>
    )
}

export default Welcome;