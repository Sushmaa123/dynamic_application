import "./signUp.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import React from "react";
const SignUp = () => {
  const navigate = useNavigate();
  const [details,setDetails]=useState({
    email:"",
    password:"",
    mobileNumber:"",
    name:"",
    place:""
});
function postSignUpData(data){
  try{
    axios.post(`${process.env.REACT_APP_API_URL}/api/user/register`,data).then((res)=>{
      // console.log(res);
      window.alert(res.data.message);
      navigate("/")
    }).catch((err)=>{
      // console.log(err);
      window.alert(err.response.data.message);
    })

  }catch(err){
    window.alert(err.message)
  }
}
const [formError,setFormError]=useState({});
const [login,setlogin]=useState(false);
useEffect( ()=>{
if(Object.keys(formError).length==0 && login){
// console.log(details);
postSignUpData(details);

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
  else if(data.password.length<8){
    error.password="password must contain 8 characters"
  }
  if(!data.name){
    error.name="name is required"
  }
  if(!data.place){
    error.place="place is required"
  }
  if(!data.mobileNumber){
    error.mobileNumber="Phone number is required"
  }
  else if(isNaN(data.mobileNumber)){
    error.mobileNumber="Phone number must be a number"
  }
  else if(data.mobileNumber.length<10 || data.mobileNumber.length>10){
    error.mobileNumber="Phone number must contain 10 numbers"
  }
  return error;
}
  return (
    <>
      <div className="container">
        <form method="POST" onSubmit={handleSubmit}>
          <div style={{ textAlign: "center", marginBottom: "25px" }}>
            <h1 className="heading">Registration Form</h1>
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
          </div>
          <div className="input-controll">
            <label>Mobile Number</label>
            <input type="text" name="mobileNumber" value={details.mobileNumber} onChange={handleChange} />
            <p className="error-text" style={{ textAlign: "right" }}>
              {formError.mobileNumber}
            </p>
          </div>
          <div className="input-controll">
            <label>Name</label>
            <input type="text" name="name" value={details.name} onChange={handleChange}/>
            <p className="error-text" style={{ textAlign: "right" }}>
              {formError.name}
            </p>
          </div>
          <div className="input-controll">
            <label>Place</label>
            <input type="text" name="place" value={details.place} onChange={handleChange}/>
            <p className="error-text" style={{ textAlign: "right" }}>
              {formError.place}
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <button className="submit-btn">Register</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
