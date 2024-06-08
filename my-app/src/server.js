const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();
const apiKey = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const app = express();
const port = 5000;

app.use(express.json());

// Configure CORS to allow requests from http://localhost:3000
app.use(cors({
  origin: 'http://localhost:3000'
}));

const promptGemini = async (userPrompt) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const prompt = `My goal is to do the following. A user gives input prompt: '${userPrompt ? userPrompt : "Cat on a horse"}'. I create a video for it using an AI. I want you to ONLY give me back a 50 word caption for the video.`;
    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        console.log(text);
        return text;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

app.post('/generate', async (req, res) => {
  const userPrompt = req.body.user_input;

  try {
    const generatedText = await promptGemini(userPrompt);
    res.json({ generated_text: generatedText });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating text');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
