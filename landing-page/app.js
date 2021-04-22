const socket = io('ws://zach-chat.herokuapp.com');

socket.on('message', text => {
	const el = document.createElement('li');
	el.innerHTML = text;
	document.querySelector('ul').appendChild(el);
});

function ButtonClicked() {
	const text = document.getElementById('input').value;
	console.log(text);
	socket.emit('message', text)	
	
}
