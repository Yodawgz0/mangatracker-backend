const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/Users');
const bcrypt = require('bcrypt');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Yodawgz0:Ashley97@cluster0.vkft2.mongodb.net/Mangatracker-Auth?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("Mangatracker-Auth").collection("Users");
  //routes
  app.post('/register', (req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    const newUser = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    })
    newUser.save(err => {
      if (err) {
        return res.status(400).json({
          title: err,
          error: 'email in use'
        })
      }
      return res.status(200).json({
        title: 'signup success'
      })
    })
  })

  const port = process.env.PORT || 8000;

  app.listen(port, (err) => {
    if (err) return console.log(err);
    console.log('server is running on port ' + port);
  })
  client.close();
});

