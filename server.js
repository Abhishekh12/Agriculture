// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(cors()); 

app.get('/agriculture-data', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync('Agricultural.json', 'utf8'));
    res.json(data);
  } catch (error) {
    console.error('Error fetching agriculture data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
