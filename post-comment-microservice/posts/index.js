const express = require("express");
const {randomBytes} = require("crypto")
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const cors = require("cors")
const axios = require("axios")
app.use(bodyParser.json())
app.use(cors())


const posts={}; // temp db


app.get('/post',(req,res)=>{  // get all post from post db and sending to client
    res.send(posts)
})


app.post('/post',async (req,res)=>{
   const id = randomBytes(4).toString('hex');
   const {title} = req.body;
 
   posts[id] ={  
    id, title
   };

  await axios.post('http://localhost:5005/events',{  //calling api from event bus
    type:'postCreated',
    data:{ 
        id,title
    }
   })
   res.status(201).send(posts[id])
})

//we get a post req for upload a new post, so we take the post data and store it in a temp db. After we ll post the id and title of the post
// to event bus


app.post('/events',(req,res)=>{   //localhost:5000/events
    console.log('line no 42 from post service: received events from post', req.body);

    res.send({})
})

//  here we ll get the response from event bus.

app.listen(port, () =>{
    console.log("new deployment update in another way");
    console.log(`Post service is running on port ${port} 🔥`)
})
    