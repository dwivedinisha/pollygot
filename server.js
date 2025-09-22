
import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
app.use(express.json());

// Serve static frontend
app.use(express.static("public"));

// Translation API
app.post("/translate", async (req, res) => {
  try {
    const { text, language } = req.body;
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash",temperature: 0.3 });
    
    const prompt = `Translate the following text to ${language} in a ** single phrase only, no explanation, no extra sentences, no bullet points, no context**,
    in hindi input also just give a single phrase output only,just give the first probable anserswer, 
    keep the meaning same and do not change it:"${text}"`;
    const result = await model.generateContent(prompt);
    
    res.json({ translation: result.response.text()});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Translation failed" });
  }
});

app.listen(3000, () =>
  console.log("✅ App running on http://localhost:3000")
);

