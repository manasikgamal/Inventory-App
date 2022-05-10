import axios from "axios"
import Authheader from "./Auth-header"
const API_Url='http://localhost:5000/api'
const getValues= async()=>{
    return await axios.get(API_Url+'/value',{headers:Authheader()})
}
const getallusers= async()=>{
    return await axios.get(API_Url+'/users/',{headers:Authheader()})
}
const getuserPosts= async(id)=>{
    return await axios.get(API_Url+'/users/'+id,{headers:Authheader()})
}
const additem= async(file,id)=> {
    return await axios.post(API_Url+'/users/'+id+'/item',file,{headers:Authheader()
    });
  }
const deleteitem=async(userid,id)=>{
return await axios.delete(API_Url+'/users/'+userid+'/item/'+id,{headers:Authheader()})
}
const getallitems= async()=>{
    return await axios.get(API_Url+'/items',{headers:Authheader()})
}
const Postservice={
    getValues,
    getuserPosts,
    additem,
    deleteitem,
    getallitems,
    getallusers
}

export default Postservice;