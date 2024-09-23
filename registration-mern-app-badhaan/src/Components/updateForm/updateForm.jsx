import { useEffect, useState } from "react";
import axios from "axios";
import "./updateForm.css";
import { useNavigate } from "react-router-dom";
import React from "react";
const Profile = () => {
    const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [updateDetails, setUpdateDetails] = useState({
    name: "",
    place: "",
    mobileNumber: "",
  });
  const [formError, setFormError] = useState({});
  const [click, setClick] = useState(false);
  const [updateClick,setUpdateClick]=useState(false);
  const config = {
    headers: {
      token: localStorage.getItem("token"),
    },
  };
//   console.log(localStorage.getItem("token"));

  useEffect( () => {
  axios
      .get(`${process.env.REACT_APP_API_URL}/api/user`, config)
      .then((res) => {
        console.log(res.data.data);
        setProfile(res.data.data);
        setUpdateDetails({
          name: res.data.data.name,
          place: res.data.data.place,
          mobileNumber: res.data.data.mobileNumber,
        });
      })
      .catch((err) => console.log(err));
  }, []);


useEffect( ()=>{
if(Object.keys(formError).length==0 && updateClick ){
    console.log(updateDetails);
   axios
    .post(`${process.env.REACT_APP_API_URL}/api/user/update`,updateDetails,config)
    .then((res) => {
     console.log(res);
     window.alert(res.data.message);
     document.location.reload()
    })
    .catch((err) => console.log(err));
}
},[formError])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateDetails({ ...updateDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(validate(updateDetails));
    setUpdateClick(true);
    // console.log(updateDetails);
  };

  const handleLogout=()=>{
    localStorage.setItem("token","");
    navigate("/");
    // document.location.reload();
  }
  
function validate(data){
    let error={};
    if(!data.name){
        error.name="please enter the name"
    }
    if(!data.place){
        error.place="please enter the place"
    }
    if(!data.mobileNumber){
        error.mobileNumber="please enter the phone number"
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
      <div className="card">
        <h2>My Profile</h2>
        <div>
            <label>Name:</label>
            <span>{profile.name}</span>
        </div>
        <div>
            <label>Email:</label>
            <span>{profile.email}</span>
        </div>
        <div>
            <label>Place:</label>
            <span>{profile.place}</span>
        </div>
        <div>
            <label>Phone Number:</label>
            <span>{profile.mobileNumber}</span>
        </div>
      </div>
      <button className="update-btn-toggle" onClick={()=>setClick(!click)}>update profile</button>
      <button className="logout-btn" onClick={handleLogout}>logout</button>
     {
        (click)?
        <div className="form-container">
            <h1>Update profile</h1>
        <form method="POST" onSubmit={handleSubmit}>
       <div className="input-controll">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={updateDetails.name}
          onChange={handleChange}
        />
        <p className="error-text" style={{ textAlign: "right" }}>
              {formError.name}
            </p>
       </div>
       
       <div className="input-controll">
        <label>Place</label>
        <input
          type="text"
          name="place"
          value={updateDetails.place}
          onChange={handleChange}
        />
         <p className="error-text" style={{ textAlign: "right" }}>
              {formError.place}
            </p>
       </div>
       <div className="input-controll">
        <label>Phone Number</label>
        <input
          type="text"
          name="mobileNumber"
          value={updateDetails.mobileNumber}
          onChange={handleChange}
        />
         <p className="error-text" style={{ textAlign: "right" }}>
              {formError.mobileNumber}
            </p>
       </div>
       <div style={{textAlign:"center"}}>
       <button className="update-btn">update</button>
       </div>
        
      </form> 
      </div>
        :""
     }
        
     
    </>
  );
};

export default Profile;
