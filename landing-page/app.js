const socket = io('ws://zach-chat.herokuapp.com:8080');

socket.on('message', text => {
	const el = document.createElement('li');
	el.innerHTML = text;
	document.querySelector('ul').appendChild(el);
});

document.querySelector('button').onClick = () => {
	const text = document.querySelector('input').value;
	socket.emit('message',text)
}