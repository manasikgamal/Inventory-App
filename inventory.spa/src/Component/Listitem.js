import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DeleteItem } from './actions/userposts';

export default function Listitem({x,index}) {
    const userid=useSelector((state) => state.auth.user.id)
    const [hover, setHover] = useState(false);
    const dispatch=useDispatch();
    const onHover = () => {
        setHover(true);
      };
      const onLeave = () => {
        setHover(false);
      };
  return (
    <div className='list' key={index} onMouseOver={onHover} onMouseLeave={onLeave}>
        <li><img src={x.url}/></li>
           <li>{x.title}</li>
           <li>{x.storageName}</li>
           <li>{x.type}</li>
           <li>{x.dateAdded}</li>
           {hover?<div className='deletediv'><button onClick={()=>dispatch(DeleteItem(userid,x.id))} >Delete</button></div>:""}
    </div>
  )
}
