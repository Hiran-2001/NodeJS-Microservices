const express = require("express");
const  axios  = require('axios');
const bodyParser = require("body-parser");
const {randomBytes} = require("crypto");
const cors = require("cors")
const app = express();

app.use(bodyParser.json());
app.use(cors())
const commentsByPostId = {}
app.get('/post/:id/comments',(req,res)=>{
res.send(commentsByPostId[req.params.id] || [])
})

app.post('/post/:id/comments',async(req,res)=>{
   const commentId = randomBytes(4).toString('hex');
   const {comment} = req.body;

   const comments = commentsByPostId[req.params.id] || [];

   comments.push({id:commentId,comment})
   commentsByPostId[req.params.id] = comments;

  await axios.post("http://localhost:5005/events",{
      type:"commentCreated",
      data:{
         id:commentId,
         comment,
         postId:req.params.id
      }
   })
   res.status(201).send(comments)
})

app.post('/events',(req,res)=>{
   console.log('event triggerd from comment' , req.body);
})

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Comment service is running on port ${port} 🔥`));