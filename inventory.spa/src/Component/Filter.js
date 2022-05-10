import React,{useState,useEffect} from 'react'
import { connect,useDispatch,useSelector } from 'react-redux';
import { FilterItems,GetUserPosts } from './actions/userposts';

export default function Filter() {
  const [select,setselect]=useState("title");
  const [value,setvalue]=useState("");
  const [date,setdate]=useState("");
  const items = useSelector((state) => state.posts.items)
  console.log("fil",items)
//   useEffect(()=>{
//       if(items===undefined)
//     dispatch(GetUserPosts(1))
//   },[items])
  const dispatch=useDispatch();
   const handleonchange=()=>{
    setvalue("")
    setdate("")
   }
   const handlefun=(e)=>{
    dispatch(FilterItems(items,select,e))
   }
  return (
    <div>
        <div className='search'>
      <form>
    <label id="searchby">Search by</label>
    <select id="searchby" name="searchby" onChange={(e)=>{setselect(e.target.value);handleonchange();handlefun("")}}>
      <option value="title">Title</option>
      <option value="date">Date</option>
      <option value="storage">Storage</option>
      <option value="type" onClick={()=>handlefun("Large")}>Size</option>
    </select>
    {select==="type"?(<select name="size" onChange={(e)=>{handlefun(e.target.value)}}>
      <option value="Large">Large</option>
      <option value="Medium">Medium</option>
      <option value="Small">Small</option>
    </select>):select==="date"?(<span><input type="date" value={date} onChange={(e)=>{handlefun(e.target.value);setdate(e.target.value)}}/>
        </span>):(<span><input type="text" value={value} onChange={(e)=>{handlefun(e.target.value);setvalue(e.target.value)}}/>
        </span>)}
        </form>
      </div>
    </div>
  )
}
  