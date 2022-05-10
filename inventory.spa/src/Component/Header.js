import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from './actions/auth';
export default function Header() {
  const isLoggedIn=useSelector((state) => state.auth.isLoggedIn)
  const dispatch=useDispatch();
  const navigate=useNavigate();
  return (
    <div>
        <div className='hcontainer'>
            <div className='hiconname'>
            <div className='hicon'>
            <img src='icon.jpg'/>
            </div>
            <div className='hname'>
            <p>Inventory System</p>
            </div>
            </div>
            <div className='hlist'>
                <ul>
                    {!isLoggedIn&&(<ul><li onClick={()=>navigate("/")}>Home</li>
                    <li onClick={()=>navigate("/about")}>About</li>
                    <li onClick={()=>navigate("/contact")}>Contact</li></ul>)}
                    {isLoggedIn&&<li onClick={()=>dispatch(logout())}>Logout</li>}
                </ul>
            </div>
        </div>

    </div>
  )
}
