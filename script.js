import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/generate-idea', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ success: false, error: 'يرجى إدخال النص أولاً' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ success: true, result: text });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'حدث خطأ أثناء الاتصال بالذكاء الاصطناعي' });
  }
});

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});