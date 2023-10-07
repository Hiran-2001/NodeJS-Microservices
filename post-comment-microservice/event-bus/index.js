const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");


const app = express();
app.use(bodyParser.json());

const events = []; //temp db for event

app.post('/events',(req,res)=>{
    const event = req.body; 

    events.push(event)  //setting the event from req.body to temp post storage
    axios.post('http://localhost:5000/events',event).catch(err=>{console.log(err)})  //posting an event to post handler from eventbus req.body 
    axios.post('http://localhost:5001/events',event).catch(err=>{console.log(err)})  // comment handler
    axios.post('http://localhost:5002/events',event).catch(err=>{console.log(err)})  //query service
    axios.post('http://localhost:5003/events',event).catch(err=>{console.log(err)})  //moderation service 

    res.send({status:'OK'})
}); 

app.get('/events',(req,res)=>{    //get all events from temp events storages
    res.send(events)
})

app.listen(5005,()=>{
    console.log(`Event bus is running on port ${5005}`);
})