console.log("Hello");


function addTopic(){
	console.log("Adding New Topic");
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
	postTitle.innerHTML = "Sample Post Title";
	var postSubtitle = document.createElement("h6");
	postSubtitle.className = "card-subtitle mb-2 text-muted";
	postSubtitle.innerHTML = "Sample Post subtitle";
	var postDesc = document.createElement("p");
	postDesc.className = "card-text";
	postDesc.innerHTML = "Some quick example text to build on the post title and make up the bulk of the post's content.";
	var postLink1 = document.createElement("a");
	postLink1.className = "card-link";
	postLink1.innerHTML = "Join";
	var postLink2 = document.createElement("a");
	postLink2.className = "card-link";
	postLink2.innerHTML = "Num of joinned users";

	newTopicPostBody.appendChild(postTitle);
	newTopicPostBody.appendChild(postSubtitle);
	newTopicPostBody.appendChild(postDesc);
	newTopicPostBody.appendChild(postLink1);
	newTopicPostBody.appendChild(postLink2);

	topicsHolder.appendChild(newTopicCard);


}