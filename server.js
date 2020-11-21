const express = require('express')
const app = express()

var fs = require('fs');
let data = fs.readFileSync('topicList.json');
let topics = JSON.parse(data);
let mans = fs.readFileSync('userList.json');
let users = JSON.parse(mans);
const port = 3000

app.use(express.static(__dirname + '/templates'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')

});

app.listen(port, (err) => {
  if (err) {
    return console.log('Something bad happened...', err)
  }

  console.log(`Server is listening on ${port}`)
})

app.get('/topics', (req, res) => {
  let output = [];

  for (var i = 0; i < topics.length; i++) {
    output.push({
      event: topics[i].event,
      category: topics[i].category,
      description: topics[i].description,
    });
  }

  res.send(output);
});

app.get('/users', (req, res) => {
  let output = [];

  for (var i = 0; i < users.length; i++) {
    output.push({
      email: users[i].email,
      password: users[i].password,
      name: users[i].name
    });
  }

  res.send(output);
});

app.get('/topics/:event', (req, res) => {
  let output = [];

  for (var i = 0; i < topics.length; i++) {
    if (topics[i].event === req.params.event) {
      output.push({
        event: topics[i].event,
        category: topics[i].category,
        description: topics[i].description,
      });
    }
  }

  if (output.length == 0) {
    return res.status(404).send("The course with the given subject code was not found.");
  }
  
  res.send(output);
});

app.get('/topics/:event/posts', (req, res) => {
  let output = [];

  for (var i = 0; i < topics.length; i++) {
    if (topics[i].event === req.params.event) {
      output.push({
        event: topics[i].event,
        category: topics[i].category,
        description: topics[i].description,
      });
    }
  }

  if (output.length == 0) {
    return res.status(404).send("The course with the given subject code was not found.");
  }

  res.send(output);
});