import React, { useState } from 'react'
import './CSS/LoginSignup.css'
const LoginSignup = () => {



  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  })

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }




  const login = async () => {
    console.log("Login Fuction", formData)
    let responseData;
    await fetch('http://localhost:4500/login', {
      method: "POST",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data)

    if (responseData.succes) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    } else {
      alert(responseData.error)
    }

  }


  const signup = async () => {
    console.log("Signup Fuction", signup)
    let responseData;
    await fetch('http://localhost:4500/signup', {
      method: "POST",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data)

    if (responseData.succes) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    } else {
      alert(responseData.error)
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-field">
          {state === "Sign Up" ? <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Enter Your Name' /> : <></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Enter Email' />
          <input type="password" placeholder='Enter Password' name='password' value={formData.password} onChange={changeHandler} />
        </div>
        <button onClick={() => { state == "Login" ? login() : signup() }}>Continue</button>
        {state === "Sign Up" ? <p className='loginsignup-login'>Already have an ac count? <span onClick={() => { setState("Login") }}>Login here</span> </p> :
          <p className='loginsignup-login'>Create an ac count? <span onClick={() => { setState("Sign Up") }}>Click here</span> </p>}


        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By Continuing, i agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup;
