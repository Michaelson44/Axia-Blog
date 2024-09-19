//
const express = require('express');
const app = express();
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const commentRoute = require("./routes/comment");
const authRoute = require('./routes/auth');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

// CREATING DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("mongodb connected"))
.catch(()=> console.log("mongodb error"))

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

// routes

app.use(userRoute);
app.use(postRoute);
app.use(commentRoute);
app.use(authRoute);

app.listen(PORT, () => console.log("api connected from backend."))