const express = require('express');
const app = express();

const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

app.get("/shayari", async (req, res) => {
    const user_prompt = `Write a Shayari about ${req.query.keyword}.Write in hindi using english alphabats`;
    const messages = [];
    messages.push({ role: "user", content: user_prompt });

    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages,
        });

        const completion_data = completion.data.choices[0].message.content;
        res.json({ shayari: completion_data });

    } 
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ "error": "Something went wrong unable to generate Shayari!" });
    }
});


app.listen(process.env.port, () => {
    console.log(`Server listening on port ${process.env.port}`);
});
