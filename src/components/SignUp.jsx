import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const SignUp = () => {
 const navigate=useNavigate();

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
  
const sendRequest=async()=>{
     const res=await axios.post("http://localhost:5000/api/user/signup",{
        name:inputs.name,
        email:inputs.email,
        password:inputs.password,
     }).catch(err=>console.log(err));

     const data=await res.data;
    
     if(data.success){
        toast.success(data.message);
     }else{
      toast.error(data.message);
     }
   return data;
}


const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(inputs); 
     
  
    
   /*  sendRequest().then((data)=>localStorage.setItem("userId",data.user._id)).then(()=>navigate("/auth/login")).then((data)=>console.log(data))*/

      axios.post("http://localhost:5000/api/user/signup",{
        name:inputs.name,
        email:inputs.email,
        password:inputs.password,
     }).then(result => {
            console.log(result)
            if(result.data.success === true){
              toast.success(result.data.message);
                localStorage.setItem("userId",result.data.user._id);
              //navigate login page
               navigate("/login")  
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
          <Typography variant='h2' padding={3} textAlign={'center'} fontFamily={'monospace'}>Sign Up</Typography>
            <TextField type={'text'} name="name"  onChange={handleChange} placeholder='Name' margin='normal' 
            value={inputs.name}
           />
           <TextField type={'email'} name="email"  onChange={handleChange} placeholder='Email' margin='normal' 
            value={inputs.email}
           />
            <TextField type={'password'} 
            name="password"
             onChange={handleChange} placeholdermargin='normal' 
            placeholder='Password'
            value={inputs.password}
             />
            <Button type='submit' variant='contained' color='warning' sx={{borderRadius:3 , marginTop:3}}  >SignUp</Button>
            <Button sx={{borderRadius:3 , marginTop:3}} onClick={()=>navigate("/login")}  >Or Login</Button>
        </Box>
      </form>
  
    </div>
  )
}

export default SignUp