import React,{useState,useEffect} from 'react'
import { useDispatch,connect,useSelector } from 'react-redux';
import { FilterItems } from './actions/userposts';
import { GetUserPosts } from './actions/userposts';
import Filter from './Filter';
import Listitem from './Listitem';

export default function Allitems() {
 const items = useSelector((state) => state.posts.filteritems)
  return (
    <div>
       <Filter></Filter>
    <div >
     {!items?<p>Loading...</p>:(
         <ul className='item'>
         {items.map((x,index)=>(
          <Listitem key={index} x={x}/>))}
         </ul>
     )}
       </div>
    </div>
  )
}

