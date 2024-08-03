require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./routes/auth');
const jokes = require('./routes/jokes');
const cors = require('cors');

const frontendAppUrl = process.env.FRONTEND_APP_URL || 3000;
const port = process.env.PORT || 3002;

const app = express();

// Enable CORS
app.use(cors({
  origin: frontendAppUrl, // Update with your frontend origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(bodyParser.json());
app.use('/auth', auth);
app.use('/jokes', jokes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
