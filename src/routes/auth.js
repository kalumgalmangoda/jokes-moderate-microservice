const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@admin.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

const users = [
  {
    email: ADMIN_EMAIL,
    password: bcrypt.hashSync(ADMIN_PASSWORD, 8),
  },
];

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email);

  if (!user) {
    return res.status(404).send('User not found');
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).send({ auth: false, token: null });
  }

  const token = jwt.sign({ id: user.email }, 'supersecret', { expiresIn: 86400 }); // 24 hours
  res.status(200).send({ auth: true, token });
});

module.exports = router;
