const express = require('express')
const app = express()

var fs = require('fs');
const port = 3000

app.use(express.static(__dirname + '/templates'));


app.get('/', (request, response) => {
	res.send("Hello");
	res.sendFile(__dirname + '/index.html')

});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})

