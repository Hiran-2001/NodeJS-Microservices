const express = require("express");

const app = express();

const port = process.env.PORT || 5000;


const posts={};
app.get('/post',(req,res)=>{
    
})
app.post('/post',(req,res)=>{

})


app.listen(port, () => `Server running on port ${port} 🔥`);