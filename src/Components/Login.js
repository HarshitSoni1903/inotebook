import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const host = "http://localhost:5000";

const Login = (props) => {

  const [login, setLogin] = useState({email:"", password:""});
  let navigate = useNavigate();

  const handleSubmit=async (e)=>{
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email:login.email, password:login.password}),
    });
    const jsonres = await response.json();
    console.log(jsonres);
    if(jsonres.success){
      //redirect
      localStorage.setItem('token',jsonres.authtoken);
      props.showAlert("Logged In!","success");
      navigate('/');
    }
    else{
      props.showAlert(jsonres.error,"danger");
    }
  }
  const handleOnChange = (e)=>{
    setLogin({...login, [e.target.name]:e.target.value});
  }
  return (
    <>
    <h2 className="my-4">Login to MyNotely</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={handleOnChange} aria-describedby="emailHelp" value={login.email}/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" value={login.password} onChange={handleOnChange} name="password" id="password"/>
        </div>
        
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </>
  )
}

export default Login