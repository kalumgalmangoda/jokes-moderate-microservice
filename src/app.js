require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./routes/auth');
const jokes = require('./routes/jokes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/auth', auth);
app.use('/jokes', jokes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
