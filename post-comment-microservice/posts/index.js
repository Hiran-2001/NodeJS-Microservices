const express = require("express");
const {randomBytes} = require("crypto")
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const cors = require("cors")
const axios = require("axios")
app.use(bodyParser.json())
app.use(cors())
const posts={};
app.get('/post',(req,res)=>{
    res.send(posts)
})
app.post('/post',async (req,res)=>{
   const id = randomBytes(4).toString('hex');
   const {title} = req.body;
 
   posts[id] ={  
    id, title
   };

  await axios.post('http://localhost:5005/events',{
    type:'postCreated',
    data:{
        id,title
    }
   })
   res.status(201).send(posts[id])
})

app.post('/events',(req,res)=>{
    console.log('received events from post', req.body.type);

    res.send({})
})

app.listen(port, () => console.log(`Post service is running on port ${port} 🔥`));