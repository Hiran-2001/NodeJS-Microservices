const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express();

app.use(bodyParser.json());
app.use(cors())

const posts={};

app.get('/posts',(req,res)=>{
res.send(posts)
});

app.post('/events',(req,res)=>{
const { type, data} = req.body;

if(type === 'postCreated'){
    const {id,title} = data;

    posts[id] = {id, title,comments:[]};
}
if(type === 'commentCreated'){

    const {id, comment, postId} = data;
    const post = posts[postId];
    post.comments.push({id, comment})
}
console.log(posts);
res.send({})
});

app.listen(5002,()=>{
    console.log('query Service is running in post 5002');
})