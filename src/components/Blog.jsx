import React from "react";
import {
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Blog = ({ title, description, imageURL, userName, isUser, id }) => {

  const navigate = useNavigate();

  const handleEdit = (e) => {

    navigate(`/myblogs/${id}`);
  };
  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:5000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = res.data;
    return data;
  };

  const handleDelete = () => {

           axios.delete(`http://localhost:5000/api/blog/${id}`).then(result => {
          
            if(result.data.success === true){
             toast.success(result.data.message);
              window.location.reload();
               navigate("/blogs");
              
            }else{
              toast.error(result.data.message);
            }
       
        })
        .catch(err => console.log(err))

  };

  return (
    <Card
      sx={{
        width: "50%",
        margin: "auto",
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      {isUser && (
        <Box display={"flex"}>
          <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
            <ModeEditOutlineIcon color="warning" />
          </IconButton>
          <IconButton onClick={handleDelete}>
            {" "}
            <DeleteIcon color="error" />{" "}
          </IconButton>
        </Box>
      )}

      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#1976d2" }} aria-label="recipe">
            {userName ? userName.charAt(0).toUpperCase() : ""}
          </Avatar>
        }
        title={title.charAt(0).toUpperCase() + title.slice(1)}
  
      />
      <CardMedia component="img" height="194" image={imageURL} alt="image"   
      sx={{   objectFit: 'contain',
           
         }} />

      <CardContent>
        <hr />
        <br />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ wordWrap: "break-word" }}
        >
          <b sx={{fontWeight:'bold'}}>{userName.charAt(0).toUpperCase() + userName.slice(1)}</b>
          {": "}
          {description}
        </Typography>
      </CardContent>

 

    </Card>
  );
};

export default Blog;
