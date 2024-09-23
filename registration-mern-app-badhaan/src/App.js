
import './App.css';
import SignIn from './Components/signIn/signIn';
import SignUp from './Components/signUp/signUp';
import Profile from './Components/updateForm/updateForm';
import ForgetPasswordForm from './Components/updatePassword/changePassForm';
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
import React from "react";

function App() {
  const token = localStorage.getItem("token");
  return (
    <>
    {/* <SignUp/> */}
    {/* <SignIn/> */}
    {/* <ForgetPasswordForm/> */}
    {/* <Profile/> */}
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<SignIn/>}/>
      <Route path='/register' element={<SignUp/>}/>
      <Route path="/updatePassword" element={<ForgetPasswordForm/>}/>
      <Route path='/profile' element={
            (token!=="") ? (<Profile />) : (<Navigate replace to={"/"} />)} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
