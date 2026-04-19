require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));

// Schema
const ChatSchema = new mongoose.Schema({
  question: String,
  answer: String
});

const Chat = mongoose.model("Chat", ChatSchema);

// Route
app.post('/ask', async (req, res) => {
  const { question } = req.body;

  try {
    // Call Groq API
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: question }]
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const answer = response.data.choices[0].message.content;

    // Save to DB
    const newChat = new Chat({ question, answer });
    await newChat.save();

    res.json({ answer });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));