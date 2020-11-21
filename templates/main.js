console.log("Hello");


function addTopic(){
	console.log("Adding New Topic");
	var topicsHolder = document.getElementById("TopicsHolder");
	var newTopic = document.createElement("Div");
	newTopic.id = "topic";
	newTopic.className = "col-sm-6";
	var newTopicText = document.createElement("H3");
	newTopicText.innerHTML = "Hello World Again";
	topicsHolder.appendChild(newTopic);
	newTopic.appendChild(newTopicText);
}