import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { AddNewItem, GetAllItems } from './actions/userposts';

export default function Newitem() {
  const [images, setImages] = React.useState(null);
  const [title, settitle] = React.useState("");
  const [storage, setstorage] = React.useState("");
  const [type, settype] = React.useState("Large");
  const [show, setshow] = React.useState(false);
  const ref = React.useRef();
  const userid=useSelector((state) => state.auth.user.id)
  const message=useSelector((state) => state.message.message)
  const uploadPicture = (e) => {
    setImages(
      e.target.files[0]
  )
  setshow(false)
};
  const dispatch=useDispatch();
  const handelsubmit=(event)=>{
    event.preventDefault();
    if(message==="")
    {
    const formData = new FormData();
    formData.append('file',images);
    formData.append("title",  title)
    formData.append("storagename",storage.split('/').map(x=>x.charAt(0).toUpperCase()+ x.slice(1)).join('/'))
    formData.append("type",  type)
  dispatch(AddNewItem(formData,userid))
  alert("New Item Added");
  settitle("");
  ref.current.value = ""
  setstorage("");
  settype("Large")
    }
  }
  return (
    <div className='formitem'>
      <form onSubmit={handelsubmit}>
        <label>Title:</label>
        <input type="text" name="title" placeholder=" Title.." 
        value={title} onChange={(e)=>settitle(e.target.value)} required/>
        <label>Storage Name:</label>
        <input type="text" name="storage" placeholder="Separate level by  /  from big to small "
        value={storage} onChange={(e)=>{setstorage(e.target.value);dispatch(GetAllItems(e.target.value))}} required/>
        {message?<div className='vform'>{message}</div>:<div>{""}</div>}
        <label>Size</label>
        <select id="size" name="size" onChange={(e)=>{settype(e.target.value)}}>
      <option value="Large">Large</option>
      <option value="Medium">Medium</option>
      <option value="Small">Small</option>
    </select>
        <input type="file"ref={ref} name="image" accept="image/*" onChange={uploadPicture} required/>
      <button className='newsubmit'>Submit</button>
      </form>
    </div>
  )
}
