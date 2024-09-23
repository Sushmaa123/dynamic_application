import "./changePassForm.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";

const ForgetPasswordForm=()=>{
    const navigate = useNavigate();
    const [details,setDetails]=useState({
        email:"",
        password:"",
        confirmPassword:""
    });
    const [formError,setFormError]=useState({});
    const [click,setClick]=useState(false);
    function postdata(data){
        try{
            axios.post(`${process.env.REACT_APP_API_URL}/api/user/updatePassword`,data).then((res)=>{
              console.log(res);
              window.alert(res.data.message)
              navigate("/")
            }).catch((err)=>{
              console.log(err);
              window.alert(err.response.data.message);
            })
        
          }catch(err){
            window.alert(err.message)
          }
    }
    useEffect(()=>{
        if(Object.keys(formError).length==0 && click){
            console.log(details);
            postdata(details);
        }
        },[formError]);
        const handleChange=(e)=>{
            const {name,value}=e.target;
            setDetails({...details,[name]:value});
        };
        const handleSubmit=(e)=>{
            e.preventDefault();
            setFormError(validate(details))
            setClick(true);
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
            if(data.password!==data.confirmPassword){
                error.confirmPassword="password does not match"
            }
            return error;
        }


    return(
        <>
         <div className="container">
            <form method="POST" onSubmit={handleSubmit}>
            <div style={{ textAlign: "center", marginBottom: "25px" }}>
            <h1 className="heading">Change Paassword</h1>
          </div>
                <div className="input-controll">
                    <label>Email</label>
                    <input type="text" name="email" value={details.email} onChange={handleChange}/>
                    <p className="error-text" style={{ textAlign: "right" }}>
             {formError.email}
            </p>
                </div>
                <div className="input-controll">
                    <label>New Password</label>
                    <input type="password" name="password" value={details.password} onChange={handleChange}/>
                    <p className="error-text" style={{ textAlign: "right" }}>
              {formError.password}
            </p>
                </div>
                <div className="input-controll">
                    <label>Confirm Password</label>
                    <input type="password" name="confirmPassword" value={details.confirmPassword} onChange={handleChange}/>
                    <p className="error-text" style={{ textAlign: "right" }}>
              {formError.confirmPassword}
            </p>
                </div>
                <div style={{ textAlign: "center" }}>
            <button className="submit-btn">change Password</button>          
                 </div>


            </form>

        </div>
        </>
    )
};
export default ForgetPasswordForm;