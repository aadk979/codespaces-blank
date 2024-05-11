const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const CryptoJS = require('crypto-js');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let encryptionKey; // Store encryption key

app.get('/', (req, res) => {
    const html = fs.readFileSync('/workspaces/codespaces-blank/encyrption/index.html', 'utf8');
    res.send(html);
});

io.on('connection', (socket) => {
    console.log('Client connected');

    // Handle client's initial request for generating encryption key
    socket.on('generateKey', () => {
        encryptionKey = generateKey(); // Generate encryption key
        socket.emit('encryptionKey', encryptionKey); // Send encryption key to client
    });

    // Handle messages sent from client
    socket.on('encryptedMessage', (encryptedData) => {
        const decryptedData = decryptMessage(encryptedData, encryptionKey);
        console.log('Decrypted message:', decryptedData);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

function generateKey() {
    // Generate random key (replace this with your secure key generation method)
    return CryptoJS.lib.WordArray.random(16).toString();
}

function decryptMessage(encryptedData, key) {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, key);
    return decryptedBytes.toString(CryptoJS.enc.Utf8);
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
