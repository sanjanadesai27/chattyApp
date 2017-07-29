// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuid = require('node-uuid');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
// Make the express server serve static assets (html, javascript, css) from the /public folder
.use(express.static('public'))
.listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  
  
  let numUsers = wss.clients.size;
  console.log('Number of clients ' + numUsers);
  wss.broadcast(JSON.stringify(numUsers));
  
  ws.on('message',(message) => {
    const newMessage = JSON.parse(message);
    newMessage.id = newMessage.id = uuid();
    if(newMessage.content.charAt(0) === '/'){
      newMessage.content = newMessage.content.split(' ').shift().replace('/','');
      newMessage.type = 'incomingImage';
    } else { 
      if(newMessage.type === 'postMessage') { 
        newMessage.type = 'incomingMessage';  
      } else if (newMessage.type === 'postNotification'){ 
        newMessage.type = 'incomingNotification';
      }
    }
    wss.broadcast(JSON.stringify(newMessage));
  }); 
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    numUsers = wss.clients.size;
    wss.broadcast(JSON.stringify(numUsers));
  });
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};


