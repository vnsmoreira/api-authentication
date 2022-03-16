require('dotenv').config();
const express = require('express');
const cors = require('cors');
const onMongoConnect = require('./database');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', require('./app/routes/auth.routes'));

try {
  onMongoConnect(() => app.listen(5000));
} catch (error) {
  console.log(error);
}
