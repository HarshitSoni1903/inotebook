import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
// import Home_2 from './Components/Home_2';
import About from './Components/About';
import Signup from './Components/Signup';
import Login from './Components/Login';
import NoteState from './context/notes/NoteState';
//import UserState from './context/userVar/UserState';
import Alert from './Components/Alert';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert=(message, type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  }
  return (
    <>
      <NoteState>
        {/* <UserState> */}
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/login" element={<Login showAlert={showAlert} />}>
              </Route>
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}>
              </Route>
              <Route exact path="/" element={<Home showAlert={showAlert} />}>
              </Route>
              {/* <Route exact path="/2" element={<Home_2 showAlert={showAlert} />}> </Route>*/}
            </Routes>
          </div>
        </Router>
        {/* </UserState> */}
      </NoteState>
    </>
  );
}

export default App;
