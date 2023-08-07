const express = require("express");
const bodyParser = require("body-parser");
const {randomBytes} = require("crypto");

const app = express();

app.use(bodyParser.json());

const commentsByPostId = {}
app.get('/post/:id/comments',(req,res)=>{
res.send(commentsByPostId[req.params.id] || [])
})

app.post('/post/:id/comments',(req,res)=>{
   const commentId = randomBytes(4).toString('hex');
   const {comment} = req.body;

   const comments = commentsByPostId[req.params.id] || [];

   comments.push({id:commentId,comment})
   commentsByPostId[req.params.id] = comments;

   res.status(201).send(comments)
})

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Comment service is running on port ${port} 🔥`));