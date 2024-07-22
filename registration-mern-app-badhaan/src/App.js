import React, { useEffect, useState } from 'react';
import './App.css';
import SignIn from './Components/signIn/signIn';
import SignUp from './Components/signUp/signUp';
import Profile from './Components/updateForm/updateForm';
import ForgetPasswordForm from './Components/updatePassword/changePassForm';
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
import { getPublicIP } from './utils/getPublicIP';

const App = () => {
  const [publicIP, setPublicIP] = useState(null);

  useEffect(() => {
    const fetchIP = async () => {
      const ip = await getPublicIP();
      setPublicIP(ip);
    };

    fetchIP();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<SignUp publicIP={publicIP} />} />
        <Route path="/" element={<SignIn publicIP={publicIP} />} />
        <Route path="/profile" element={<Profile publicIP={publicIP} />} />
        <Route path="/updatePassword" element={<ForgetPasswordForm publicIP={publicIP} />} />
      </Routes>
    </Router>
  );
};

export default App;