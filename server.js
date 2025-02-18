const express = require('express')
const bodyParser = require('body-parser')
const app = express()

var jsonParser = bodyParser.json()

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

app.get('/featured', (req, res) => {
  res.sendFile(__dirname + '/templates/featured.html')
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/templates/login.html')
});

app.get('/loginsuccess', (req, res) => {
  res.sendFile(__dirname + '/templates/featured.html')
});

app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/templates/signup.html')
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
      topic: topics[i]
    });
  }

  res.send(output);
});

app.get('/users', (req, res) => {
  let output = [];

  for (var i = 0; i < users.length; i++) {
    output.push({
      email: users[i].email,
      //password: users[i].password,
      name: users[i].name,
      skills: users[i].skills,
      eventsCreated: users[i].eventsCreated,
      topicsFollowed: users[i].topicsFollowed
    });
  }

  res.send(output);
});

// app.get('/topics/:event', (req, res) => {
//   let output = [];

//   for (var i = 0; i < topics.length; i++) {
//     for (var j = 0; j < topics[i].events.length; j++) {
//       if (topics[i].events[j].event === req.params.event) {
//         output.push({
//           event: topics[i].events[j].event,
//           tags: topics[i].events[j].tags,
//           description: topics[i].events[j].description,
//           location: topics[i].events[j].location,
//           date: topics[i].events[j].date,
//           orginazer: topics[i].events[j].organizer,
//           members: topics[i].events[j].members
//         });
//       }
//     }
//   }

//   if (output.length == 0) {
//     return res.status(404).send("The event with the given name was not found.");
//   }
  
//   res.send(output);
// });

app.get('/topics/:topicName', (req, res) => {
  let output = [];
  for (var i = 0; i < topics.length; i++) {
      if (topics[i].topicName === req.params.topicName) {
        output.push({
          events: topics[i].events
          // tags: topics[i].events[j].tags,
          // description: topics[i].events[j].description,
          // location: topics[i].events[j].location,
          // date: topics[i].events[j].date,
          // orginazer: topics[i].events[j].organizer,
          // members: topics[i].events[j].members
        });
      }
  }

  if (output.length == 0) {
    return res.status(404).send("The topic with the given name was not found.");
  }

  res.send(output);
});

// app.get('/topics/:event/allPosts', (req, res) => {
//   let output = [];

//   for (var i = 0; i < topics.length; i++) {
//     if (topics[i].event === req.params.event) {
//       for (var j = 0; j < topics[i].posts.length; j++) {
//         output.push({
//           postID: topics[i].posts[j].postID,
//           user: topics[i].posts[j].user,
//           content: topics[i].posts[j].content,
//         });
//       }
//     }
//   }

//   if (output.length == 0) {
//     return res.status(404).send("The course with the given subject code was not found.");
//   }

//   res.send(output);
// });

app.post('/topics/:event', jsonParser, (req, res) => {
  let topicExsists = false;
  let eventExsists = false;

  for (var i = 0; i < topics.length; i++) {
    if (topics[i].topicName == req.body.topicName) {
      topicExsists = true;
    }
    for (var j = 0; j < topics[i].events.length; j++) {
      if (topics[i].events[j].event === req.params.event) {
        eventExsists = true;
      }
    }
  }

  if (topicExsists && eventExsists == true) {
    return res.status(401).send("A event with the given name already exsists in this topic!");
  } else if (topicExsists == true) {
    let newEvent = {
      event: req.body.event,
      tags: req.body.tags,
      location: req.body.location,
      date: req.body.date,
      time: req.body.time,
      description: req.body.description,
      orginazer: req.body.organizer,
      members: req.body.members
    };

    for (var i = 0; i < topics.length; i++) {
      if (topics[i].topicName == req.body.topicName) {
        topics[i].events.push(newEvent);
      }
    }

    let data = JSON.stringify(topics, null, 2);
    fs.writeFile('topicList.json', data, finished);

    function finished(err) {
      console.log('New event added succssfully!');
    }

    res.send(newEvent);
  } else {
    let newEvent = {
      topicName: req.body.topicName,
      event: req.body.event,
      tags: req.body.tags,
      location: req.body.location,
      date: req.body.date,
      time: req.body.time,
      description: req.body.description,
      orginazer: req.body.organizer,
      members: req.body.members
    };

    topics.push(newEvent);

    let data = JSON.stringify(topics, null, 2);
    fs.writeFile('topicList.json', data, finished);

    function finished(err) {
      console.log('New event added succssfully!');
    }

    res.send(newEvent);
  }
});

app.post('/users', jsonParser, (req, res) => {
  let exsists = false;

  for (var i = 0; i < users.length; i++) {
    if (users[i].name === req.body.name) {
      exsists = true;
    }
  }

  if (exsists == true) {
    return res.status(401).send("A user with the given name already exsists!");
  } else {
    let newUser = {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      skills: req.body.skills,
      eventsCreated: req.body.eventsCreated,
      topicsFollowed: req.body.topicsFollowed
    };
    users.push(newUser);

    let mans = JSON.stringify(users, null, 2);
    fs.writeFile('userList.json', mans, finished);

    function finished(err) {
      console.log('New user added succssfully!');
    }

    res.send(newUser);
  }
});

app.delete('/topics/:event', (req, res) => {
  let output = [];
  let exsists = false;
  let index = 0;

  for (var i = 0; i < topics.length; i++) {
    if (topics[i].event === req.params.event) {
      exsists = true;
      index = i;
    }
  }

  if (exsists == false) {
    return res.status(404).send("An event with the given name does not exsist.");
  } else {
    topics.splice(index, 1);

    let data = JSON.stringify(topics, null, 2);
    fs.writeFile('topicList.json', data, finished);

    function finished(err) {
      console.log('Event deleted succussfully!');
    }

    res.send(req.params.event);
  }
});