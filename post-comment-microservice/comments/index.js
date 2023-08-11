const express = require("express");
const axios = require('axios');
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors")
const app = express();

app.use(bodyParser.json());
app.use(cors())
const commentsByPostId = {}
app.get('/post/:id/comments', (req, res) => {
   res.send(commentsByPostId[req.params.id] || [])
})

app.post('/post/:id/comments', async (req, res) => {
   const commentId = randomBytes(4).toString('hex');
   const { comment } = req.body;

   const comments = commentsByPostId[req.params.id] || [];

   comments.push({ id: commentId, comment, status: 'pending' })
   commentsByPostId[req.params.id] = comments;

   await axios.post("http://localhost:5005/events", {
      type: "commentCreated",
      data: {
         id: commentId,
         comment,
         postId: req.params.id,
         status: 'pending'
      }
   })
   res.status(201).send(comments)
})

app.post('/events', async (req, res) => {
   console.log('event triggerd from comment', req.body);
   const { type, data  } = req.body;
   if (type === 'commentModerated') {
      const { postId, id, status,comment } = data;

      const allComments = commentsByPostId[postId];
      const comments = allComments.find(comments => {
         return comments.id === id;
      })
      comments.status = status

      await axios.post("http://localhost:5005/events", {
         type: "commentUpdated",
         data: {
            id,
            postId,
            status,
            comment
         }
      }).catch(err=>{
         console.log(err);
      })
   }
})

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Comment service is running on port ${port} 🔥`));