import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';



const labelStyles =  {mb:1,mt:2,fontSize:"24px",fontWeight:"bold"};


const BlogDetail = () => {
 const navigate= useNavigate();

 const [blog,setBlog]=useState();

    const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };



  const id=useParams().id;
  console.log(id);

  const fetchDetails=async()=>{
    const res=await axios.get(`http://localhost:5000/api/blog/${id}`).catch(err=>console.log(err))
    const data= await res.data;
    return data;
  }
     
   
  useEffect(()=>{
    fetchDetails().then(data=>{
      setBlog(data.blog)
     setInputs({title:data.blog.title,description:data.blog.description,
      imageURL:data.blog.image
     })
    }
    );
   
  },[id]);
 console.log(blog);
  
 const sendRequest=async ()=>{
    const res=axios.put(`http://localhost:5000/api/blog/update/${id}`,{
      title:inputs.title,
      description:inputs.description
    }).catch(err=>console.log(err));

    const data = await res.data;
    return data;
 }



    const handleSubmit=(e)=>{
       e.preventDefault();
       console.log(inputs);
       sendRequest().then(()=>navigate("/myblogs")).then(data=>console.log(data))
    }


  return (
    <div> 
    {inputs && 
       <form onSubmit={handleSubmit}>
      <Box
        border={3}
        borderColor={"pink"}
        borderRadius={10}
        boxShadow={"10px 10px 20px #ccc"}
        padding={3}
        margin={"auto"}
        marginTop={3}
        display={"flex"}
        flexDirection={"column"}
        width={"80%"}
      >
        <Typography
          fontWeight={"bold"}
          padding={3}
          color={"grey"}
          variant="h2"
          textAlign={"center"}
        >
          Post Your Blog
        </Typography>
        <InputLabel sx={labelStyles}>Title</InputLabel>
        <TextField
          margin="normal"
          variant="outlined"
          name="title"
          value={inputs.title}
          onChange={handleChange}
        />
        <InputLabel sx={labelStyles}>Description</InputLabel>
        <TextField
          margin="normal"
          variant="outlined"
          name="description"
          value={inputs.description}
          onChange={handleChange}
        />
 
        <Button type="submit" sx={{mt:2,borderRadius:4}} variant="contained" color="warning">Post</Button>
      </Box>
    </form> }
    </div>
  )
}

export default BlogDetail
