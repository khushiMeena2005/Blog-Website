import Header from "./components/Header";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import {useDispatch, useSelector} from "react-redux";
import { authActions } from "./store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./components/Login";
import SignUp from "./components/SignUp";



function App() {
  const dispatch=useDispatch();
  const isLoggedIn=useSelector((state)=>state.isLoggedIn);
  console.log(isLoggedIn);
  
  useEffect(()=>{
     if(localStorage.getItem("userId")){
       dispatch(authActions.login());
     }
  },[dispatch])


  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
        
       {  !isLoggedIn ? <Route path="/login" element={<Login />} /> :
          <> 
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/myblogs" element={<UserBlogs />} />
          <Route path="/myblogs/:id" element={<BlogDetail />} />
          <Route path="/blogs/add" element={<AddBlog />} />
          </>}
            <Route path="/signup" element={<SignUp/>} />
        </Routes>
        <ToastContainer/>
      </main>
    </React.Fragment>
  );
}

export default App;
