import React,{useState} from 'react'
import { register } from './actions/auth';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch,useSelector } from "react-redux";
import vform from './formvalidation'
import { VerfiyEmail } from './actions/userposts';

export default function Register({whichone}) {
  const [username,setusername]=useState("");
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const [successful,setsuccessful]=useState(false);
  const [show,setshow]=useState(false)
  const [show2,setshow2]=useState(false)
  const [show3,setshow3]=useState(false)
  const message=useSelector((state) => state.message.message)
  const dispatch=useDispatch();
  const handleregister=(e)=>{
    e.preventDefault();
    if(!show&&!show2&&!show3&&message==="")
    dispatch(register(username,email,whichone,password)).then(() => {
        setsuccessful(true);
    })
     setemail("")
     setusername("")
     setpassword("")
    };
    const handleshow=(e)=>{
     if(vform.vusername(e))
     setshow(true)
     else
     setshow(false)
    }
    const handleshow2=(e)=>{
      if(vform.vmail(e))
      setshow2(true)
      else
      setshow2(false)
      dispatch(VerfiyEmail(e))
     }
     const handleshow3=(e)=>{
      if(vform.vpassword(e))
      setshow3(true)
      else
      setshow3(false)
     }
  return (
    <div>
        <div className='logcontainer'>
         {successful?<div className='rgistersucc'><h3>Register Successful</h3>{whichone!=="user"&&<button onClick={()=>setsuccessful(false)}>ok</button>}</div>:
         (<div>{whichone==="user"?<h3>Register</h3>:""}
        <div className="form">
        <form onSubmit={handleregister}>
        <div className="input-container">
         <label>Username </label>
         <input type="text" name="uname" placeholder="Your name.." required
         value={username} onChange={(e)=>{setusername(e.target.value);handleshow(e.target.value)}} />
       </div>
       {show?<div className='vform'>The username must be between 3 and 20 characters.</div>:""}
       <div className="input-container">
         <label>Email</label>
         <input type="text" name="email" placeholder="Your Email.." required 
         value={email} onChange={(e)=>{setemail(e.target.value);handleshow2(e.target.value)}}/>
       </div>
       {show2?<div className='vform'>This is not a valid email.</div>:""}
       {message?<div className='vform'>{message}</div>:""}
       <div className="input-container">
         <label>Password </label>
         <input type="password" name="pass" placeholder="Your Password.." required
         value={password} onChange={(e)=>{setpassword(e.target.value);handleshow3(e.target.value)}} />
       </div>
       {show3?<div className='vform'>The password must be between 6 and 40 characters.</div>:""}
       <div className="button-container">
        <button>Register</button>
       </div>
       </form>
       </div>
       </div>)}
        </div>
    </div>
  )
}
