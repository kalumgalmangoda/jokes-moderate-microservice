const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY;
const SUBMIT_JOKES_URL = process.env.SUBMIT_JOKES_URL;
const DELIVER_JOKES_URL = process.env.DELIVER_JOKES_URL;

let jokes = [];
const jokeTypes = ['general', 'programming', 'knock-knock'];

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    req.userId = decoded.id;
    next();
  });
};

// Get all jokes from Submit Jokes microservice
router.get('/', verifyToken, async (req, res) => {
  try {
    const response = await axios.get(`${SUBMIT_JOKES_URL}/jokes/random`, {
      headers: { 'x-access-token': req.headers['x-access-token'] },
    });
    console.log("------get joke response--------------", response.data);
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send({ message: 'Failed to fetch jokes' });
  }
});

// router.post('/', verifyToken, (req, res) => {
//   const { type, content } = req.body;
//   const newJoke = { id: jokes.length + 1, type, content };
//   jokes.push(newJoke);
//   res.status(201).send(newJoke);
// });

// Edit a joke in Submit Jokes microservice
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { type, content } = req.body;
  try {
    const response = await axios.put(`${SUBMIT_JOKES_URL}/jokes/${id}`, { type, content }, {
      headers: { 'x-access-token': req.headers['x-access-token'] },
    });
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send({ message: 'Failed to update joke' });
  }
});

// Delete a joke from Submit Jokes microservice
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    await axios.delete(`${SUBMIT_JOKES_URL}/jokes/${id}`, {
      headers: { 'x-access-token': req.headers['x-access-token'] },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: 'Failed to delete joke' });
  }
});

// Submit a new joke to Deliver Jokes microservice
router.post('/deliver', verifyToken, async (req, res) => {
  const { type, content } = req.body;
  try {
    const response = await axios.post(`${DELIVER_JOKES_URL}/jokes`, { type, content }, {
      headers: { 'x-access-token': req.headers['x-access-token'] },
    });
    res.status(201).send(response.data);
  } catch (error) {
    res.status(500).send({ message: 'Failed to deliver joke' });
  }
});

// Get joke types from Deliver Jokes microservice
router.get('/types', verifyToken, async (req, res) => {
  try {
    const response = await axios.get(`${DELIVER_JOKES_URL}/jokes/types`, {
      headers: { 'x-access-token': req.headers['x-access-token'] },
    });
    console.log("------get jokeTypes response--------------", response.data);
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send({ message: 'Failed to fetch joke types' });
  }
});

// router.get('/types', verifyToken, (req, res) => {
//   res.status(200).send(jokeTypes);
// });

module.exports = router;
