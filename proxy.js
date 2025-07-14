const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Allow CORS for API route only (optional, for local dev)
app.use('/live-score', cors());

const API_KEY = process.env.CRICKET_API_KEY; // Use env variable!

app.get('/live-score', async (req, res) => {
  try {
    const apiUrl = `https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}&offset=0`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch live score' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 