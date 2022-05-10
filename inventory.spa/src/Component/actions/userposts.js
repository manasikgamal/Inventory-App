import Postservice from "../Services/Post.service"
import{GET_USER_POSTS,FILTER_ITEMS, ADD_NEW_ITEM, DELETE_ITEM, VERIFY_STORAGE, SET_MESSAGE, CLEAR_MESSAGE, ITEMS_STATISTICS, NUMBER_USER} from './types'
export const GetUserPosts=(id)=>async (dispatch)=>{
return await Postservice.getuserPosts(id).then(res=>{
    dispatch({
        type:GET_USER_POSTS,
        payload:res.data
    })
})
}

export const FilterItems=(items,type,value)=>(dispatch)=>{
    const re = RegExp(`.*${value.toLowerCase().split('').join('.*')}.*`)
    const reg = RegExp(`.*${value.toLowerCase().split('/').join('.*')}.*`)
    const sdate=value.split('-')
   const year=sdate[0];
   const month=sdate[1];
   const day=sdate[2];
    var date = month+'/'+day+'/'+year
    console.log("from dispat",items,type,value)
    dispatch({
        type:FILTER_ITEMS,
        payload:value===""?items:type==="title"?items.filter(x=>x.title.toLowerCase().match(re)):
        type==="type"?items.filter(x=>x.type.toLowerCase()===value.toLowerCase()):
        type==="date"?items.filter(d=> new Date(d.dateAdded) - new Date(date) > 0):
        type==="storage"&&items.filter(x=>x.storageName.toLowerCase().match(reg))
    })
}
export const AddNewItem=(file,id)=> async(dispatch)=>{
return await Postservice.additem(file,id).then(res=>
    dispatch({
        type:ADD_NEW_ITEM,
        payload:res.data
    }))
}

export const DeleteItem=(userid,id)=> async(dispatch)=>{
 return await Postservice.deleteitem(userid,id).then(
    dispatch({
        type:DELETE_ITEM,
        payload:id
    }))
 
}

export const GetAllItems=(newstorage)=>async(dispatch)=>{
    return await Postservice.getallitems().then(res=>{
        //const spl=res.data[0].split('/')
        res.data.find(x=>x.storageName===newstorage)?
        dispatch({
            type:SET_MESSAGE,
            payload:"Storage Space is already fill"
        }):
        dispatch({
            type:CLEAR_MESSAGE,
            payload:""
        })
    })
}

export const GetItemsStatistics=()=>async(dispatch)=>{
    return await Postservice.getallitems().then(res=>{
        const cats = res.data.reduce((catsSoFar, {storageName} ) => {
           const newarr=catsSoFar.find(item=>item.name===storageName.split('/')[0])
            if(newarr)
            catsSoFar.map(x=>x.name===newarr.name?{...x,value:x.value++}:x)
            else
            catsSoFar.push({name:storageName.split('/')[0],value:1})
            return catsSoFar;
          }, []);
          dispatch({
              type:ITEMS_STATISTICS,
              payload:cats
          })
    })
}

export const GetUserStatistics=()=>async(dispatch)=>{
    return await Postservice.getallusers().then(res=>{
        const number=res.data.length
          dispatch({
              type:NUMBER_USER,
              payload:number
          })
    })
}

export const VerfiyEmail=(email)=>async(dispatch)=>{
    return await Postservice.getallusers().then(res=>{
        res.data.find(x=>x.email===email)?
        dispatch({
            type:SET_MESSAGE,
            payload:"Email is already exist"
        }):
        dispatch({
            type:CLEAR_MESSAGE,
            payload:""
        })
    })
}