import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useDispatch,useSelector } from 'react-redux';
import Newitem from "./Newitem";
import { FilterItems, GetAllItems, GetItemsStatistics, GetUserStatistics, VerfiyEmail } from "./actions/userposts";
import Allitems from "./Allitems";
import Statistics from "./Statistics";
import Admin from "./Admin";
import Register from "./Register";
import { clearMessage } from "./actions/message";

export default function Posts() {
const dispatch=useDispatch();
const items=useSelector((state) => state.posts.items)
const role=useSelector((state)=>state.auth.user.role)
  return (
    <div>
      <Tabs>
        <TabList>
          <Tab onClick={()=>dispatch(FilterItems(items,"title",""))}>ALL Items</Tab>
          <Tab onClick={()=>dispatch(GetAllItems(""))}>Add Items</Tab>
         {role==="admin"&&<Tab onClick={()=>{dispatch(GetItemsStatistics());dispatch(GetUserStatistics())}} >Statistics</Tab>}
          {role==="admin"&&<Tab onClick={()=>dispatch(clearMessage())} >Add Admin</Tab>}
        </TabList>

        <TabPanel>
          <Allitems/>
        </TabPanel>
        <TabPanel>
          <Newitem/>
        </TabPanel>
        <TabPanel>
         <Statistics/>
        </TabPanel>
        <TabPanel>
       <Register whichone={"admin"}/>
        </TabPanel>
      </Tabs>
    </div>
  );
}
