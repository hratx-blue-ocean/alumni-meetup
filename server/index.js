const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('../database');
const port = 3001;

console.log('test');

console.log(db.createGroup)

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());

// group routes
// NEED TO HOOK UP USEREMAIL
app.get('/groups', (req, res) => {
  console.log('body', req.body);
  let userEmail = 'email1'
  db.fetchGroups(userEmail, (err, result) => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200).send(result);
    }
  })
});

app.post('/groups', (req, res) => {
  db.createGroup(req.body, (err, results) => {
    if (err) {
      res.status(400).send(err)
    } else {
      console.log(results);
      res.status(201).send();
    }
  })
});

app.post('/login', (req, res) => {
  db.findOne({ "email": req.body.username }).lean()
    .then((response) => {
      console.log(response);
      //if response.pin === password ...
      res.status(200).send('You did it!!!')
    })
    .catch((err) => {
      res.status(400).send(err);
    })
})

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Listening to port ${port}`);
});