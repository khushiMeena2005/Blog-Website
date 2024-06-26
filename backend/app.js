import express from "express"
import mongoose from "mongoose"
import router from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";
import cors from "cors";

import dotenv from 'dotenv';
dotenv.config();

const port=process.env.PORT || 5000;

const app=express();
app.use(cors());
app.use(express.json());
app.use("/api/user",router);
app.use("/api/blog",blogRouter);
mongoose.connect(`${process.env.MONGO_URL}`)

.then(()=>app.listen(port))
.then(()=>console.log("Connected to database and listening to port 5000"))
.catch((err)=>console.log(err));


//rfbHkD31tbW95yFK




