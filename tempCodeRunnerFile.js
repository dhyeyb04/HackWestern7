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