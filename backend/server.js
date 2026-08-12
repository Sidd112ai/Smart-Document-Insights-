import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// MongoDB Connection
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/smart-document-insights';
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running', timestamp: new Date().toISOString() });
});

// Document Analysis Route (placeholder - integrate your LLM here)
app.post('/api/analyze', async (req, res) => {
  try {
    const { documentText, documentType } = req.body;

    if (!documentText) {
      return res.status(400).json({ error: 'Document text is required' });
    }

    // TODO: Integrate your LLM API here
    // For now, returning a placeholder response
    const analysis = {
      summary: 'Analysis will be generated using your LLM API',
      bulletPoints: [
        'Document analysis in progress',
        'Connect your LLM API key to enable AI analysis'
      ],
      documentType: documentType || 'Unknown',
      timestamp: new Date().toISOString()
    };

    res.json(analysis);
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Analysis failed', details: error.message });
  }
});

// Document Upload Route
app.post('/api/upload', async (req, res) => {
  try {
    // Placeholder for file upload processing
    res.json({
      message: 'File upload endpoint - configure multer for file handling',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
