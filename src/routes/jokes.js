const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

let jokes = [];
const jokeTypes = ['general', 'programming', 'knock-knock'];

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  jwt.verify(token, 'supersecret', (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    req.userId = decoded.id;
    next();
  });
};

router.get('/', verifyToken, (req, res) => {
  res.status(200).send(jokes);
});

router.post('/', verifyToken, (req, res) => {
  const { type, content } = req.body;
  const newJoke = { id: jokes.length + 1, type, content };
  jokes.push(newJoke);
  res.status(201).send(newJoke);
});

router.put('/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const { type, content } = req.body;
  const jokeIndex = jokes.findIndex(joke => joke.id == id);

  if (jokeIndex === -1) {
    return res.status(404).send('Joke not found');
  }

  jokes[jokeIndex] = { id: parseInt(id), type, content };
  res.status(200).send(jokes[jokeIndex]);
});

router.delete('/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  jokes = jokes.filter(joke => joke.id != id);
  res.status(204).send();
});

router.get('/types', verifyToken, (req, res) => {
  res.status(200).send(jokeTypes);
});

module.exports = router;
