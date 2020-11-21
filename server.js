const express = require('express')
const app = express()

var fs = require('fs');
let data = fs.readFileSync('topicList.json');
let topics = JSON.parse(data);
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

//JSONObject jsonobj_1 = (JSONObject)jsonarr_1.get(i);