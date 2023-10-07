const express = require("express");
const  axios = require("axios");;
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express();

app.use(bodyParser.json());
app.use(cors())

const posts = {};

const handleEvent =(type,data)=>{
    if (type === 'postCreated') {
        const { id, title } = data;

        posts[id] = { id, title, comments: [] };
    }
    if (type === 'commentCreated') {

        const { id, comment, postId, status } = data;
        const post = posts[postId];
        // console.log(posts[postId]);
        post.comments.push({ id, comment, status })
    }

    if (type === 'commentUpdated') {
        const { id, comment, status, postId } = data;

        const post = posts[postId];
        console.log('line number 36' ,status);
        const updateComment = post.comments.find(comment => {
            return comment.id === id
        });

        updateComment.status = status;
        updateComment.comment = comment;
    }
}


app.get('/posts', (req, res) => {
    res.send(posts)
});

app.post('/events', (req, res) => {
    console.log("received in query service " , req.body);
    const { type, data } = req.body;

    handleEvent(type,data)
   

   
    res.send({})
});

// in req.body we ill get data from event.

app.listen(5002, async() => {
    console.log('query Service is running in post 5002');

    const res = await axios.get("http://localhost:5005/events")
      
    for( let event of res.data){
        console.log('process event:', event.type);

        handleEvent(event.type, event.data)
    }
})