const express = require('express');
const path = require('path');
const db = require('./bd.cjs');

const app = express();

async function start() {
    try {
    await db.connectDB();
    app.use(express.static(path.join(__dirname, 'dist')));

    app.use(express.json());

    app.get('/api/ping', (req, res) => {
      res.json({ ok: true });
    });

    // Signup endpoint — saves to MongoDB when available, otherwise returns 503
    app.post('/api/signup', async (req, res) => {
      const { email, username, password } = req.body || {};
      if (!email || !username || !password) {
        return res.status(400).json({ error: 'email, username and password are required' });
      }

      const database = db.getDb();
      if (!database) {
        return res.status(503).json({ error: 'Database unavailable — signup not persisted' });
      }

      try {
        const users = database.collection('users');
        const result = await users.insertOne({ email, username, password, createdAt: new Date() });
        return res.status(201).json({ ok: true, id: result.insertedId });
      } catch (err) {
        console.error('Error inserting user', err);
        return res.status(500).json({ error: 'Failed to create user' });
      }
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
