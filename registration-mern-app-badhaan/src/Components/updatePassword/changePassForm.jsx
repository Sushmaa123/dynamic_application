// src/components/ChangePassword.js
import "./changePassForm.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import fetchIpAddress from "../utils/fetchIpAddress";

const ChangePasswordForm = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [formError, setFormError] = useState({});
  const [click, setClick] = useState(false);
  const [ipAddress, setIpAddress] = useState('');

  useEffect(() => {
    const getIpAddress = async () => {
      const ip = await fetchIpAddress();
      setIpAddress(ip);
    };
    getIpAddress();
  }, []);

  const postData = (data) => {
    try {
      axios.post(`http://${ipAddress}:5000/api/user/updatePassword`, data)
        .then((res) => {
          window.alert(res.data.message);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          window.alert(err.response.data.message);
        });
    } catch (err) {
      window.alert(err.message);
    }
  };

  useEffect(() => {
    if (Object.keys(formError).length === 0 && click) {
      postData(details);
    }
  }, [formError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(validate(details));
    setClick(true);
  };

  const validate = (data) => {
    let error = {};
    const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!data.email) {
      error.email = "Email is required";
    } else if (!filter.test(data.email)) {
      error.email = "Please enter a valid email";
    }
    if (!data.password) {
      error.password = "Password is required";
    } else if (data.password.length < 8) {
      error.password = "Password must contain 8 characters";
    }
    if (data.password !== data.confirmPassword) {
      error.confirmPassword = "Passwords do not match";
    }
    return error;
  };

  return (
    <div className="container">
      <form method="POST" onSubmit={handleSubmit}>
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <h1 className="heading">Change Password</h1>
        </div>
        <div className="input-controll">
          <label>Email</label>
          <input type="text" name="email" value={details.email} onChange={handleChange} />
          <p className="error-text" style={{ textAlign: "right" }}>{formError.email}</p>
        </div>
        <div className="input-controll">
          <label>New Password</label>
          <input type="password" name="password" value={details.password} onChange={handleChange} />
          <p className="error-text" style={{ textAlign: "right" }}>{formError.password}</p>
        </div>
        <div className="input-controll">
          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" value={details.confirmPassword} onChange={handleChange} />
          <p className="error-text" style={{ textAlign: "right" }}>{formError.confirmPassword}</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <button className="submit-btn">Change Password</button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
