import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from "react-redux";
import { login } from './actions/auth';
import vform from './formvalidation'

function Login({isLoggedIn,message}) {
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const[vemail,setvemail]=useState(false)
  const navigate=useNavigate();
  const dispatch=useDispatch();
  console.log("hello",isLoggedIn,message);
  const verfiyemail=(email)=>{
    vform.vmail(email)?setvemail(true):setvemail(false)
  }
  const handlelogin=(e)=>{
  e.preventDefault();
  dispatch(login(email,password)).then(()=>{
    navigate("/user");
    //window.location.reload();
  })
  }
  return (
    <div>
        <div className='logcontainer'>
            <h3>Login</h3>
        <div className="form">
        <form onSubmit={handlelogin}>
       <div className="input-container">
         <label>Email</label>
         <input type="text" name="email" placeholder="Your Email.." 
         value={email} onChange={(e)=>{setemail(e.target.value);verfiyemail(e.target.value)}} required/>
       </div>
       {vemail?<div className='vform'>This is not a valid email.</div>:""}
       <div className="input-container">
         <label>Password </label>
         <input type="password" name="pass" placeholder="Your Password.."
         value={password} onChange={(e)=>setpassword(e.target.value)} required />
       </div>
       <div className="button-container">
        <button>Login</button>
       </div>
       </form>
       </div>
        </div>
    </div>
  )
}
function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message,
  };
}
export default connect(mapStateToProps)(Login);
