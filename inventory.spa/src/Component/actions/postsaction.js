import Postservice from '../Services/Post.service'
import {GET_POSTS,GET_POSTS_FAIL,SET_MESSAGE} from './types'
export const getallposts=()=>async (dispatch)=>{
return await Postservice.getValues().then((res)=>{
    console.log("action",res.data)
    dispatch({
        type:GET_POSTS,
        payload:res.data
    })
    return Promise.resolve();
},
(error) => {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({
      type: GET_POSTS_FAIL,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });
    return Promise.reject();
  })
}