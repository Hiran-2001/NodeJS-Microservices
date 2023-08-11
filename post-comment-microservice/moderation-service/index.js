const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json())
app.post('/events', async (req, res) => {
    const { type, data } = req.body;
    console.log(data);
    if (type === "commentCreated") {
        const status = data.comment.includes('Fuck' && 'fuck') ? 'Rejected' : 'Approved'

        await axios.post("http://localhost:5005/events", {
            type: 'commentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                status,
                comment: data.comment 
            }
        })
    }

    res.send({})
})

app.listen(5003, () => {
    console.log("moderation service is running at port 5003");
})