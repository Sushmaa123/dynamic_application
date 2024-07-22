// src/components/SignIn.js
import { useEffect, useState } from "react";
import "./signIn.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import fetchIpAddress from "../utils/fetchIpAddress";

const SignIn = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({});
  const [login, setLogin] = useState(false);
  const [ipAddress, setIpAddress] = useState('');

  useEffect(() => {
    const getIpAddress = async () => {
      const ip = await fetchIpAddress();
      setIpAddress(ip);
    };
    getIpAddress();
  }, []);

  const postSignInData = (data) => {
    try {
      axios.post(`http://${ipAddress}:5000/api/user/login`, data)
        .then((res) => {
          const myToken = res.data.token;
          localStorage.setItem("token", myToken);
          window.alert(res.data.Status);
          navigate("/profile");
        })
        .catch((err) => {
          console.log(err);
          window.alert(err.response.data.message);
        });
    } catch (err) {
      console.log(err);
      window.alert(err.message);
    }
  };

  useEffect(() => {
    if (Object.keys(formError).length === 0 && login) {
      postSignInData(details);
    }
  }, [formError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(validate(details));
    setLogin(true);
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
    }
    return error;
  };

  const handleForgetPassword = () => {
    navigate("/updatePassword");
  };

  return (
    <div className="container">
      <form method="POST" onSubmit={handleSubmit}>
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <h1 className="heading">LogIn</h1>
        </div>
        <div className="input-controll">
          <label>Email</label>
          <input type="text" name="email" value={details.email} onChange={handleChange} />
          <p className="error-text" style={{ textAlign: "right" }}>{formError.email}</p>
        </div>
        <div className="input-controll">
          <label>Password</label>
          <input type="password" name="password" value={details.password} onChange={handleChange} />
          <p className="error-text" style={{ textAlign: "right" }}>{formError.password}</p>
          <p className="forget-password" style={{ textAlign: "right", color: "red" }} onClick={handleForgetPassword}>Forget password</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <button className="submit-btn">Log In</button>
          <div style={{ marginTop: "10px" }}>
            <p>New user <span className="signin-link" onClick={() => navigate("/register")}>register</span></p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
