import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { authActions } from './../store/index';
import { useNavigate } from 'react-router-dom';


const Auth = () => {
   const navigate=useNavigate();
  const dispatch=useDispatch();

 const [isSignup , setIsSignUp]=useState(false);
 const [isLogin,setIsLogin]=useState(false);
 const [inputs , setInputs]=useState({
   name:"",
   email:"",
   password:""
 })

  const handleChange=(e)=>{
     setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
     }))
  }
  



  const handleSubmit= async(e)=>{
    e.preventDefault();
    console.log(inputs);
    
      const res = await axios.post("http://localhost:5000/api/user/login",{
        email:inputs.email,
        password:inputs.password
       }).then((data)=>localStorage.setItem("userId",data.user._id))
       .then(()=>dispatch(authActions.login())).then(data=>console.log(data));

    const data=res.data;
    console.log("data is:",data);
    if(data.success){
       toast.success(data.message);
    }
    else{
       toast.error(data.message);
    }
    return data;
    
  }

  return (
    <div>
   <form onSubmit={handleSubmit}>
        <Box 
        maxWidth={400}
        display={'flex'} flexDirection={'column'} alignItems={'center'}
        justifyContent={'center'}
        boxShadow={'10px 10px 20px #ccc'}
        padding={3}
        margin={'auto'}
        marginTop={5}
        borderRadius={5}
        >
          <Typography variant='h2' padding={3} textAlign={'center'}>Login</Typography>
      
           <TextField type={'email'} name="email"  onChange={handleChange} placeholder='Email' margin='normal' 
            value={inputs.email}
           />
            <TextField type={'password'} 
            name="password"
             onChange={handleChange} placeholdermargin='normal' 
            placeholder='Password'
            value={inputs.password}
             />
            <Button type='submit' variant='contained' color='warning' sx={{borderRadius:3 , marginTop:3}}  >Login</Button>
            <Button sx={{borderRadius:3 , marginTop:3}} onClick={()=>setIsSignUp(!isSignup)}  >Or SignUp</Button>
        </Box>
      </form>
  
    </div>
  )
}

export default Auth
