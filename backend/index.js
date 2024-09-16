const express = require("express");
const app = express();
require('dotenv').config();
require('./Models/db.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;
const AuthRoute = require('./Routes/AuthRoute.js');



// for Test: server is started or not: 
app.listen(PORT,()=>{
    console.log(`Server is running at PORT ${PORT}`);
})

// to Test: server is working or not: 
app.get('/', (req,res)=>{
    res.send("Server is live");
})


app.use(bodyParser.json());
app.use(cors());                // allowing CORS policy


// Routing define
app.use('/auth',AuthRoute);