const express = require('express');
const path = require('path');
const connectDB = require('./bd.cjs');

const app = express();

async function start() {
  try {
    await connectDB();
    app.use(express.static(path.join(__dirname, 'dist')));

    app.get('/api/ping', (req, res) => {
      res.json({ ok: true });
    });

    // serve SPA
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
