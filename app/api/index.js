const express = require('express');
const app = express();

app.use(express.json());

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ besked: 'Hej fra Express på Vercel!' });
});

// Vercel kræver at vi eksporterer app'en
module.exports = app;

// Start serveren på den angivne port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server kører på port ${port}`);
});