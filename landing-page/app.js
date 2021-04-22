const socket = io('ws://zach-chat.herokuapp.com');

socket.on('message', text => {
	const el = document.createElement('li');
	el.innerHTML = text;
	document.querySelector('ul').appendChild(el);
});

function ButtonClicked() {
	const text = document.getElementById('input').value;
	const username = document.getElementById('username').value;
	console.log(usernam, text);
	const fullMessage = {
	'user' = username,
	'message' = text
	};
	socket.emit('message', fullMessage);
	document.getElementById('input').value = "";
	
}
function ClearScreen() {
	document.querySelector('ul').innerHTML = "";
	console.log("Screen Cleared");
}
