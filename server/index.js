require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_DIR = path.join(__dirname, 'data');
const PAGE_SIZE = 5;

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'assets')));

// Error handler middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).send('Internal Server Error');
});

// Route to fetch paginated feed data
app.get('/feed', async (req, res) => {
  try {
    const { page } = req.query;
    const startIndex = (page - 1) * PAGE_SIZE;
    const data = await fs.readFile(path.join(DATA_DIR, 'feed.json'), 'utf8');
    const feedData = JSON.parse(data);
    const paginatedData = feedData.slice(startIndex, startIndex + PAGE_SIZE);
    res.json(paginatedData);
  } catch (error) {
    next(error);
  }
});

// Route to fetch comments for a specific briefRef
app.get('/comments/:briefRef', async (req, res) => {
  try {
    const { briefRef } = req.params;
    const data = await fs.readFile(path.join(DATA_DIR, 'comments.json'), 'utf8');
    const commentsData = JSON.parse(data);
    const filteredComments = commentsData.filter(comment => comment.briefref === briefRef);
    res.json(filteredComments);
  } catch (error) {
    next(error);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log('(HTTP) App now running on port', PORT);
});
