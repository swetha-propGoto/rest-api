const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
require('dotenv').config();
const  Boom = require('@hapi/boom');


const app =express();
app.use(express.json());

app.use('/api/users', userRoutes);

app.use((err, req,res,next)=>{
    if(Boom.isBoom(err)){
        return res.status(err.output.statusCode).json(err.output.payload);
        }
    res.status(500).json({message:"internal server error"});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});