import { GET_POSTS,GET_POSTS_FAIL,GET_USER_POSTS,FILTER_ITEMS, ADD_NEW_ITEM, DELETE_ITEM, VERIFY_STORAGE, ITEMS_STATISTICS, NUMBER_USER } from "../actions/types";
export const postsReducer=(state={},action)=>{
    const {type,payload}=action;
    console.log("pay", state,payload,type)
     switch(type){
          case GET_USER_POSTS:
        return{
          items:payload.items,
          filteritems:payload.items
        }
        case FILTER_ITEMS:
        return{
          ...state,
          filteritems:payload
        }
        case ADD_NEW_ITEM:
          return{
            ...state,filteritems:[...state.filteritems,payload],
            items:[...state.items,payload]
          }
          case DELETE_ITEM:
            return{
              ...state,filteritems:[...state.filteritems.filter(x=>x.id!==payload)],
              items:[...state.items.filter(x=>x.id!==payload)]
            }
            case ITEMS_STATISTICS:
              return{
                ...state,itemstat:payload
              }
              case NUMBER_USER:
                return{
                  ...state,number:payload
                }
        default:
            return state;
    }
}