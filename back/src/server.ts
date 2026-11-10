import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { searchBooks } from './book-search.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba (Healthcheck)
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    message: 'Servidor Express + TypeScript corriendo correctamente' 
  });
});

app.get('/api/books/search', searchBooks);

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend escuchando en http://localhost:${PORT}`);
});
