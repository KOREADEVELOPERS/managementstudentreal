import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Div from './COMPONENTS/Div';
import Homepage_login from './COMPONENTS/Homepage_login';
import Studentsfeatures from './COMPONENTS/Studentsfeatures';
 import Addstudents from './COMPONENTS/Addstudents';
 import Studentservice from './Service/Studentservice';
 import Viewstudent from './COMPONENTS/Viewstudent'
 import Searchstudent from './COMPONENTS/Searchstudent';
 import Deletestudent from './COMPONENTS/Deletestudent';
 import Registeredpage from './COMPONENTS/Registeredpage';
  // ✅ Fixed import

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Div />} />
          <Route path="/" element={<Div />} />
          <Route path="/login" element={<Homepage_login />} />
          <Route path="/features" element={<Studentsfeatures />} />
          <Route path="/home" element={<Div />} />
          <Route path="/addstudents" element={<Addstudents />} />
          <Route path="/search" element={<Searchstudent />} />
          <Route path="/sulabh" element={<Viewstudent />} />
          <Route path="/delete" element={<Deletestudent />} />
          <Route path="/Register" element={<Registeredpage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
