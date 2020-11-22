window.onload = checkUser();

function test(){
	window.location.href = "/";
}

function checkUser(){
	url = window.location.href;
	email = url.split("=");
	email = email[1];
	email = email.replace("%40","@");
	console.log(email);

	fetch('/users')
		.then(response => response.json())
		.then(data => {

			console.log(data);
			var check = [];
			for (var i = 0; i < data.length; i++) {
				if (data[i].email == email) {
					check = data[i].topicsFollowed;
					break;
				}
			}

			fetch('/topics/')
			.then(response => response.json())
			.then(data => {
				var eventsToUse = [];
				console.log(data);
				for (var i = 0; i < check.length; i++){
					for (var j = 0; j < data.length; j++){
						if(data[j].topic.topicName == check[i]){
							eventsToUse.push(data[j].topic.events)
						}
					}
				}

				for (var x = 0; x < check.length; x++){
					newTopic(check[x]);
					addEventsToCard(eventsToUse[x]);
				}

			})
			.catch((error) => {
	  			console.log(error);
	  			// newTopic(topicNameGiven);
	  		})

		})
		.catch((error) => {
			console.log(error);
			// newTopic(topicNameGiven);
		})
}

function removeTopic(){
	console.log("hell");
}

function newTopic(name){
	var topicsHolder = document.getElementById("TopicsHolder");

	var newTopicCard = document.createElement("Div");
	newTopicCard.className = "card";
	newTopicCard.id = "topic";

	var newCardHeader = document.createElement("Div");
	newCardHeader.className = "card-header";
	newCardHeader.innerHTML = name;

	var addButton = document.createElement("Button");
	addButton.id = "addEventsButton";
	addButton.innerHTML = "Create Event";

	var unfollow = document.createElement("Button");
	unfollow.id = "unfollowButton";
	unfollow.innerHTML = "Unfollow";
	unfollow.addEventListener("click", function(){
  		newTopicCard.remove();
  		url = window.location.href;
		email = url.split("=");
		email = email[1];
		email = email.replace("%40","@");
		console.log(email);

		//EMAIL AND NAME OF TOPIC ARE GIVEN (VAR EMAIL AND VAR NAME RESPECTIVELY)
		//open the userlist json file, iterate through all users until email matches
		//when email matches access the topics followed list and match the index of
		//the 'name' variable to a value in their list and then remove that index
		//MAKE SURE YOURE REMOVING AND NOT JUST CHANGING THE INDEX TO BE ''

		
	});

	newTopicCard.appendChild(newCardHeader);
	newCardHeader.appendChild(addButton);
	newCardHeader.appendChild(unfollow);

	var newCardBody = document.createElement("Div");
	newCardBody.className = "card-body";
	newCardBody.id = "cardTopicBody";

	newTopicCard.appendChild(newCardBody);

	topicsHolder.appendChild(newTopicCard);

}

function addEventsToCard(events){
	card = document.getElementsByTagName("div");
	myCard = card[card.length-1];
	console.log(myCard);

	for(var i = 0; i < events.length; i++){

		var newTopicPost = document.createElement("Div");
		newTopicPost.className = "card";
		newTopicPost.id = "topicPost";

		var newTopicPostBody = document.createElement("Div");
		newTopicPostBody.className = "card-body";
		newTopicPostBody.id = "topicPostBody";

		myCard.appendChild(newTopicPost);
		newTopicPost.appendChild(newTopicPostBody);

		var postTitle = document.createElement("h5");
		postTitle.className = "card-title";
		postTitle.innerHTML = events[i].event;
		var postSubtitle = document.createElement("h6");
		postSubtitle.className = "card-subtitle mb-2 text-muted";
		postSubtitle.innerHTML = events[i].location;
		var postDesc = document.createElement("p");
		postDesc.className = "card-text";
		postDesc.innerHTML = events[i].description;
		var postLink1 = document.createElement("a");
		postLink1.className = "card-link";
		postLink1.id = "connectUser";
		postLink1.innerHTML = "Join";

		var postLink2 = document.createElement("a");
		postLink2.className = "card-link";
		postLink2.innerHTML = "Followers";

		newTopicPostBody.appendChild(postTitle);
		newTopicPostBody.appendChild(postSubtitle);
		newTopicPostBody.appendChild(postDesc);
		newTopicPostBody.appendChild(postLink1);
		newTopicPostBody.appendChild(postLink2);

		postLink1.addEventListener("click", function(){
			console.log("Harsh is actually the best");
			var yourMessage = "";
			var subject = "";

			subject = "BLM Event Photographer Available";
			yourMessage = "Hello,\n\nI am a freelance photographer in London, Ontario and would be delighted to showcase the spirit and condor of the people around me in the BLM movement.I am a second year student in the FIMS program at Western University and as an advocate of social equality, I would truly appreciate an opportunity to devote my time to photograph this event to raise awareness and do my due diligence as a member of this society.\n\nThank you,\nDhyey Bhavsar";
			document.location.href = "mailto:dhpatel1005@gmail.com?subject="
				+ encodeURIComponent(subject)
				+ "&body=" + encodeURIComponent(yourMessage);
		});
	}
}

function findEvent(eventIn){
	console.log("Let's find this event!");

	let topicNameGiven = eventIn.getElementsByTagName("input")[0].value;

	console.log(topicNameGiven);

	fetch('/topics/')
		.then(response => response.json())
		.then(data => {
			
			console.log(data);
			var check = [];
			for (var i = 0; i < data.length; i++){
				if(data[i].topic.topicName == topicNameGiven){
					check = data[i].topic.events;
					break;
				}
			}

			if (check != []){
				newTopic(topicNameGiven);
				addEventsToCard(check);
			} else {
				newTopic(topicNameGiven);
			}
			// addTopic(data[0].description, data[0].event, data[0].type);

		})
		.catch((error) => {
  			console.log(error);
  			// newTopic(topicNameGiven);
  		})
		
}









