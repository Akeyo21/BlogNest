const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')
require('dotenv').config();


const app = express();

app.use(cors());
// middleware, json format
app.use(express.json());

// connect to db
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(4000, () => {
            console.log('Connected to db & listening on port 4000')
        });
    })
    .catch((err) => {
        console.log(err)
    })

//routes
app.use('/api/users', userRoutes)
app.use('/api/blogs', blogRoutes)