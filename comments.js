// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const commentsPath = path.join(__dirname, 'comments.json');
const comments = require(commentsPath);

// Use body-parser
app.use(bodyParser.json());

// Route: GET /comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Route: POST /comments
app.post('/comments', (req, res) => {
  const newComment = req.body;
  newComment.id = Date.now();
  comments.push(newComment);
  fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
    if (err) {
      res.status(500).json({ error: 'Could not write to file.' });
    } else {
      res.json(newComment);
    }
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
