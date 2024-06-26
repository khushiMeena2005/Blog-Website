import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { authActions } from './../store/index';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Login = () => {
   const dispatch=useDispatch();
  const navigate=useNavigate();
const [inputs , setInputs]=useState({
   email:"",
   password:""
 })
 
 
  const handleChange=(e)=>{
     setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
     }))
  }
  


const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(inputs); 
     axios.post("http://localhost:5000/api/user/login",{
        email:inputs.email,
        password:inputs.password,
     }).then(result => {
            if(result.data.success === true){
                 localStorage.setItem("userId",result.data.user._id);
                  
              dispatch(authActions.login())
              toast.success(result.data.message);
            
             
              //navigate home screen
               navigate("/blogs")  
            }else{
              toast.error(result.data.message);
            }
       
        })
        .catch(err => console.log(err))

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
          <Typography variant='h2' padding={3} textAlign={'center'}  fontFamily={'monospace'}>Login</Typography>
      
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
            <Button sx={{borderRadius:3 , marginTop:3}} onClick={()=>navigate("/signup")}  >Or SignUp</Button>
        </Box>
      </form>
  
    </div>
  )
}

export default Login

