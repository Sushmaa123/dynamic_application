import { useEffect, useState } from "react";
import "./signIn.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";

const SignIn=()=>{
    const navigate = useNavigate();
    const [details,setDetails]=useState({
        email:"",
        password:"",
    });
    const [formError,setFormError]=useState({});
    const [login,setlogin]=useState(false);
    function postSignInData(data){
        try{
          axios.post(`${process.env.REACT_APP_API_URL}/api/user/login`,data).then((res)=>{
            const myToken = res.data.token;
            localStorage.setItem("token", myToken);
            window.alert(res.data.Status);
            navigate("/profile");
          }).catch((err)=>{
            console.log(err);
            window.alert(err.response.data.message);
          })
      
        }catch(err){
            console.log(err);
          window.alert(err.message)
        }
      }
    useEffect(()=>{
if(Object.keys(formError).length==0 && login){
    // console.log(details);
    postSignInData(details);
}
},[formError]);
const handleChange=(e)=>{
    const {name,value}=e.target;
    setDetails({...details,[name]:value});
};
const handleSubmit=(e)=>{
    e.preventDefault();
    setFormError(validate(details))
    setlogin(true);
}
function validate(data){
    let error={};
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(!data.email){
        error.email="email is required"
    }
    else if(!filter.test(data.email)){
        error.email="please enter valid email"
    }
    if(!data.password){
        error.password="password is required"
    }
    return error;
};
const handleForgetPassword=()=>{
    navigate("/updatePassword");
}

    return(
        <>
        <div className="container">
            <form method="POST" onSubmit={handleSubmit}>
            <div style={{ textAlign: "center", marginBottom: "25px" }}>
            <h1 className="heading">LogIn</h1>
          </div>
                <div className="input-controll">
                    <label>Email</label>
                    <input type="text" name="email" value={details.email} onChange={handleChange}/>
                    <p className="error-text" style={{ textAlign: "right" }}>
             {formError.email}
            </p>
                </div>
                <div className="input-controll">
                    <label>Password</label>
                    <input type="password" name="password" value={details.password} onChange={handleChange}/>
                    <p className="error-text" style={{ textAlign: "right" }}>
              {formError.password}
            </p>
                     <p className="forget-password" style={{ textAlign: "right",color:"red" }} onClick={handleForgetPassword}>
                         Forget password
                    </p>
                </div>
                <div style={{ textAlign: "center" }}>
            <button className="submit-btn">Log In</button>
            <div style={{marginTop:"10px"}}>
            <p>New user <span className="signin-link" onClick={()=>{
                navigate("/register")
            }}>register</span></p>
            </div>           
                 </div>


            </form>

        </div>
        </>
    )
};

export default SignIn