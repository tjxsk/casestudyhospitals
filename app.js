const express = require('express');
const router = require('./route/router');
const morgan = require('morgan');

const app = new express();

app.use(morgan('dev')); 
app.use('/basic',router);   //redirecting  to router



const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})