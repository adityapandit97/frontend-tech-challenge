require('dotenv').config();
const express = require('express')
const path = require('path');
const cors = require("cors");
const fs = require('fs');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'assets')));

app.get('/feed', (req, res) => {
  const { page } = req.query;
  const pageSize = 5; 

  fs.readFile(path.join(__dirname, 'data', 'feed.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading feed data:', err);
      return res.status(500).send('Internal Server Error');
    }

    try {
      const feedData = JSON.parse(data);
      const startIndex = (page - 1) * pageSize;
      const paginatedData = feedData.slice(startIndex, startIndex + pageSize);
      res.json(paginatedData);
    } catch (error) {
      console.error('Error parsing feed data:', error);
      res.status(500).send('Internal Server Error');
    }
  });
});

app.get('/comments/:briefRef', (req, res) => {
  const { briefRef } = req.params;

  // Read data from comments.json file
  fs.readFile(path.join(__dirname, 'data', 'comments.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading comments data:', err);
      return res.status(500).send('Internal Server Error');
    }

    try {
      const commentsData = JSON.parse(data);
      const filteredComments = commentsData.filter(comment => comment.briefref === briefRef);
      // Send the filtered comments as a response
      res.json(filteredComments);
    } catch (error) {
      console.error('Error parsing comments data:', error);
      res.status(500).send('Internal Server Error');
    }
  });
});

app.listen(4000, function (err) {
  if (err) return err
  console.log('(HTTP) App now running on port', 4000)
})
