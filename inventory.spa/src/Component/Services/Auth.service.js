import axios from "axios";

const API_Url='http://localhost:5000/api/auth';

const login= (email,password)=>{
    return axios.post(API_Url+'/login',{
        email,
        password
    }).then((response)=>{
        if(response.data.token){
            localStorage.setItem("user",JSON.stringify(response.data))
        }
        return response.data;
    })
}

const logout=()=> {
    localStorage.removeItem("user");
  }

 const register=(username, email,role, password)=> {
    return axios.post(API_Url+'/register', {
      username,
      email,
      role,
      password,
    })
  }

const authservice={
    login,
    logout,
    register
}

export default authservice;