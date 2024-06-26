import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import  axios  from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const labelStyles =  {mb:1,mt:2,fontSize:"24px",fontWeight:"bold",fontFamily:'monospace'};

const AddBlog = () => {
 const navigate=useNavigate();

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const url=inputs.imageURL ? inputs.imageURL :"https://cdn.wallpapersafari.com/48/50/2YgsRc.jpg";
    
  const sendRequest=async()=>{
      const res= await axios.post("http://localhost:5000/api/blog/add",{
        title:inputs.title,
        description:inputs.description,
        image:url,
        user:localStorage.getItem('userId')
      }).catch(err=>console.log(err));

      const data=await res.data;
     
       return data;
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if(!inputs.title || !inputs.description ){
         toast.error("Fill required data");
    }else{
     /*  sendRequest().then(()=>navigate("/blogs")).then((data)=>console.log(data));*/
    
       axios.post("http://localhost:5000/api/blog/add",{
       title:inputs.title,
        description:inputs.description,
        image:url,
        user:localStorage.getItem('userId')
     }).then(result => {
           console.log("addblog result",result);
            if(result.data.success === true){
            
              toast.success(result.data.message);
              navigate("/myblogs");
             
            }else{
              toast.error(result.data.message);
            }
       
        })
        .catch(err => console.log(err))
      }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        border={3}
        borderColor={"whitesmoke"}
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
        fontFamily={'monospace'}
          fontWeight={""}
          padding={3}
          color={"black"}
          variant="h3"
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
        <InputLabel sx={labelStyles}>ImageURL</InputLabel>
        <TextField
      
          margin="normal"
          variant="outlined"
          name="imageURL"
          value={inputs.imageURL}
          onChange={handleChange}
        />
        <Button type="submit" sx={{mt:2,borderRadius:4}} variant="contained" color="warning">Post</Button>
      </Box>
    </form>
  );
};

export default AddBlog;
