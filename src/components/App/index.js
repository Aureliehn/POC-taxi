import '../../App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ErrorPage from '../errorPage';
// import Map from '../Map'
import Footer from '../Footer';
import Header from '../Header';
import Landing from '../landing';
import Login from '../login';
import Signup from '../signup';
import Welcome from '../Welcome';
import ForgetPassword from '../forgetPassword';
// import Logout from '../logout';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
          <Routes>
            <Route path='/' element={<Landing />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/welcome' element={<Welcome />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/forgetPassword' element={<ForgetPassword />}></Route>
            {/* <Route path='/map' element={<Map />}></Route>
            <Route path='/logout' element={<Logout />}></Route> */}
            <Route path='*' element={<ErrorPage />}></Route>
          </Routes>
          <Footer />
      </div>
    </Router>
  );
}

export default App;
