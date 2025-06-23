const user = prompt('Enter your name');
const socket = io('http://localhost:3000');

// Send the username to the server
socket.emit('welcome', user);

// Receive messages from the server
socket.on('msg', (data) => {
  const messageList = document.getElementById('dat1'); // chat-messages container
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message');

  // Style based on sender
  if (data.user === user) {
    msgDiv.classList.add('sent');
  } else {
    msgDiv.classList.add('received');
  }

  msgDiv.textContent = `${data.user}: ${data.message}`;
  messageList.appendChild(msgDiv);

  // Auto scroll to bottom
  messageList.scrollTop = messageList.scrollHeight;
});

// Function to send a message
function sendMessage() {
  const input = document.getElementById('hel');
  const message = input.value.trim();

  if (message) {
    socket.emit('msg', { user, message });
    input.value = '';
  }
}
