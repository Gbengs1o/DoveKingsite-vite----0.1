import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import nodemailer from 'nodemailer'; // Import Nodemailer
import { fileURLToPath } from 'url';

// Initialize dotenv to use environment variables
dotenv.config();

// Initialize the Express app
const app = express();

// Define the port
const port = process.env.PORT || 3000;

// Use CORS to allow requests from the frontend
const allowedOrigins = ['http://localhost:5173', 'https://dovekings.com'];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Use express.json() to parse JSON bodies
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let personality = '';
const roleFilePath = path.join(__dirname, 'role1.txt');
if (fs.existsSync(roleFilePath)) {
  personality = fs.readFileSync(roleFilePath, 'utf-8').trim();
  console.log("Personality loaded from role1.txt:", personality);
} else {
  console.error('Personality file role1.txt not found. The chatbot may not function as intended.');
}

let chatHistory = [];

function scanForKeywords(text) {
  const keywords = [
    'home*',
    'dark*',
    'dark',
    'Dark',
    'landing*',
    'askai*',
    'light*',
    'light',
    'Light',
    'about*',
    'contact*',
    'services*',
    'store*',
    'blog*',
    'FAQPage*',
    'CommunityPage*',
    'SupportUsPage*',
    'ai-code-store*',
    'app-shop*'
  ];
  
  const foundKeywords = keywords.filter(keyword => text.toLowerCase().includes(keyword));
  return foundKeywords.length > 0 ? foundKeywords : null;
}

// Nodemailer setup
;

// Contact page endpoint
// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // This disables strict TLS certificate validation
  },
});


// Contact page endpoint
// Contact page endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email, // Sender's email
    to: 'firewole8@gmail.com', // Your email address
    subject: `New Contact Message from ${name}`, // Subject of the email
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${req.body.subject}\n\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send message', error: error.message });
  }
});
  

  

// Inside the /api/chat endpoint
app.post('/api/chat', upload.single('audio'), async (req, res) => {
  try {
    const { mode, text } = req.body;

    let userMessage = text;
    let transcription = null;

    if (mode === 'SpeechMode' && req.file) {
      const filePath = req.file.path;
      const fileExtension = path.extname(req.file.originalname).toLowerCase();
      const supportedFormats = ['.flac', '.m4a', '.mp3', '.mp4', '.mpeg', '.mpga', '.oga', '.ogg', '.wav', '.webm'];

      if (!supportedFormats.includes(fileExtension)) {
        fs.unlinkSync(filePath);
        return res.status(400).json({ error: 'Unsupported file format' });
      }

      transcription = await openai.audio.translations.create({
        file: fs.createReadStream(filePath),
        model: 'whisper-1',
      });

      userMessage = transcription.text;
      chatHistory.push({ role: 'user', content: userMessage });
    }

    if (mode === 'ChatMode') {
      chatHistory.push({ role: 'user', content: userMessage });
    }

    const messages = [
      { role: 'system', content: personality },
      ...chatHistory,
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
    });

    const botMessage = completion.choices[0].message.content;
    chatHistory.push({ role: 'assistant', content: botMessage });

    // Scan for specific keywords in the bot message
    const foundKeywords = scanForKeywords(botMessage);

    let audioResponse = null;
    if (mode === 'SpeechMode') {
      const response = await openai.audio.speech.create({
        model: "tts-1",
        voice: "alloy",
        input: botMessage,
      });

      const audioBuffer = await response.arrayBuffer();
      audioResponse = Buffer.from(audioBuffer).toString('base64');
    }

    res.json({
      message: botMessage,
      audio: audioResponse,
      transcription: transcription ? userMessage : null, // Send the transcription as 'user input'
      userInput: transcription ? userMessage : null, // Label the transcription as 'user input'
      keywords: foundKeywords // Return the found keywords to the frontend
    });

  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing your request.', details: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
