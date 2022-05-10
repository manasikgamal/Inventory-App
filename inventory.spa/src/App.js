import React, { useState } from "react";
import { connect } from "react-redux";
import { Navigate, Route, Routes} from "react-router-dom";
import About from "./Component/About";
import Body from "./Component/Body";
import Contact from "./Component/Contact";
import Header from "./Component/Header";
import User from "./Component/User";

function App({user}) {
  return (
    <div className="appcontainer">
      <Header />
      <Routes>
        <Route path='/' element={user?<User id={user.id} name={user.username}/>:<Body />}/>
        <Route path='/user' element={user?<User id={user.id} name={user.username}/>: <Navigate to='/'/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/*" element={<Navigate to="/"/>}/>
      </Routes>
    </div>
  );
}
function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}
export default connect(mapStateToProps)(App);