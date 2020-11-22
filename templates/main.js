console.log("Dhyey is the best");

window.onload = checkUser();

function checkUser(){
	url = window.location.href;
	email = url.split("=");
	email = email[1];
	email = email.replace("%40","@");
	console.log(email);
}


function addTopic(desc,eventName,tag){
	var topicsHolder = document.getElementById("TopicsHolder");

	var newTopicCard = document.createElement("Div");
	newTopicCard.className = "card";
	newTopicCard.id = "topic";

	var newCardHeader = document.createElement("Div");
	newCardHeader.className = "card-header";
	newCardHeader.innerHTML = "Topic Title";

	newTopicCard.appendChild(newCardHeader);

	var newCardBody = document.createElement("Div");
	newCardBody.className = "card-body";
	newCardBody.id = "cardTopicBody";

	newTopicCard.appendChild(newCardBody);

	var newTopicPost = document.createElement("Div");
	newTopicPost.className = "card";
	newTopicPost.id = "topicPost";

	var newTopicPostBody = document.createElement("Div");
	newTopicPostBody.className = "card-body";
	newTopicPostBody.id = "topicPostBody";

	newCardBody.appendChild(newTopicPost);
	newTopicPost.appendChild(newTopicPostBody);

	var postTitle = document.createElement("h5");
	postTitle.className = "card-title";
	postTitle.innerHTML = eventName;
	var postSubtitle = document.createElement("h6");
	postSubtitle.className = "card-subtitle mb-2 text-muted";
	postSubtitle.innerHTML = "Sample Post subtitle";
	var postDesc = document.createElement("p");
	postDesc.className = "card-text";
	postDesc.innerHTML = desc;
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

	topicsHolder.appendChild(newTopicCard);

	postLink1.addEventListener("click", function(){
  		console.log("Harsh is actually the best");
	});

}

function newTopic(name){
	var topicsHolder = document.getElementById("TopicsHolder");

	var newTopicCard = document.createElement("Div");
	newTopicCard.className = "card";
	newTopicCard.id = "topic";

	var newCardHeader = document.createElement("Div");
	newCardHeader.className = "card-header";
	newCardHeader.innerHTML = name;

	newTopicCard.appendChild(newCardHeader);

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









