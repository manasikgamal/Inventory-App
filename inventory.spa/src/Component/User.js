import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from "react-redux";
import { logout } from './actions/auth';
import { useNavigate,useParams } from 'react-router-dom';
import Posts from './Posts'
import { GetUserPosts } from './actions/userposts';

export default function User({id,name}) {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handlelogout=()=>{
   dispatch(logout())
   navigate("/")
  }
  useEffect(()=>{
   dispatch(GetUserPosts(id))
 },[])
  return (
    <div>
     <div className='userposts'>
       <div className='user'>
         {!name?<p>Loading...</p>:(
           <div className='userimg'>
             <img src='//ssl.gstatic.com/accounts/ui/avatar_2x.png'/>
             <p>{name}</p>
           </div>
         )}
       </div>
       <div className='posts'>
         <Posts/>
       </div>
     </div>
    </div>
  )
}
