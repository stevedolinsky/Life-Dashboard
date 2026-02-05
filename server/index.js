import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import webhookRoutes from './routes/webhook.js';
import dataRoutes from './routes/data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/webhook', webhookRoutes);
app.use('/api/data', dataRoutes);

// Serve static files from '../dist' in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../dist');
  app.use(express.static(distPath));

  // Serve index.html for all non-API routes (SPA support)
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Life Dashboard server running on port ${PORT}`);
});
