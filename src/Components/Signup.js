import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const host = "http://localhost:5000";
const Signup = (props) => {
  const [cred, setCred] = useState({ name: "", email: "", password: "", cpassword: "" })
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: cred.name, email: cred.email, password: cred.password }),
      });
      const jsonres = await response.json();
      if (jsonres.success) {
        //redirect
        localStorage.setItem('token', jsonres.authtoken);
        navigate('/');
        props.showAlert("Signed Up!", "success");
      }
      else {
        props.showAlert(jsonres.error, "danger");
      }
    } catch (error) {
      props.showAlert("Internal error", "danger");

    }
  }
  const handleChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  }
  return (
    <>
      <h2 className="my-4">Get started with MyNotely</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="Text" className="form-control" id="name" name="name" value={cred.name} onChange={handleChange} aria-describedby="nameHelp" required minLength={5} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={handleChange} value={cred.email} aria-describedby="emailHelp" required minLength={5} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" value={cred.password} className="form-control" id="password" name="password" onChange={handleChange} required minLength={8} />

          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" value={cred.cpassword} className="form-control" id="cpassword" name="cpassword" onChange={handleChange} required minLength={8} />
            {
              ((cred.password !== cred.cpassword)) &&
              <div id="passwordHelp" className="form-text text-danger">Passwords do not match. Min length 8 characters.</div>
            }
          </div>
        </div>

        <button type="submit" disabled={(cred.password !== cred.cpassword)} className="btn btn-primary">Submit</button>
      </form>
    </>
  )
}

export default Signup