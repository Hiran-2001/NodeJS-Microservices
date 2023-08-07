const express = require("express");
const {randomBytes} = require("crypto")
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;

app.use(bodyParser.json())
const posts={};
app.get('/post',(req,res)=>{
    res.send(posts)
})
app.post('/post',(req,res)=>{
   const id = randomBytes(4).toString('hex');
   const {title} = req.body;

   posts[id] ={  
    id, title
   }
   res.status(201).send(posts[id])
})


app.listen(port, () => console.log(`Post service is running on port ${port} 🔥`));