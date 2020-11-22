function loginUser(eventIn){

	let username = eventIn.getElementsByTagName("input")[0].value;

	console.log(username);

	fetch('/loginsuccess')
		.then(response => {
			window.location.replace("localhost:3000/featured");
		})
		
		.catch((error) => {
  			console.log("error");
  		})
		
}