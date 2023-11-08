import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from "./js/Login";
import Signup from "./js/Signup";
import Home from "./js/Home";
import GroupDetails from "./js/GroupDetails";
import Profile from "./js/Profile";
import EditProfile from "./js/EditProfile";
import CreateGroup from "./js/CreateGroup";
import CreateTask from "./js/CreateTask";
import {BrowserRouter, Routes, Route} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<Login />}></Route>
      <Route path = "/signup" element = {<Signup />}></Route>
      <Route path = "/home" element = {<Home/>}></Route>
      <Route path = "/profile" element = {<Profile />}></Route>
      <Route path = "/profile/edit" element = {<EditProfile />}></Route>
      <Route path = "/groupdetails/:groupID" element = {<GroupDetails/>}></Route>
      <Route path = "/create/task/:groupID" element = {<CreateTask/>}></Route>
      <Route path = "/create/group" element = {<CreateGroup/>}></Route>
    </Routes>
  </BrowserRouter>
);
