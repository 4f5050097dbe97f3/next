const express = require('express');
const http = require('http');
const socket = require('socket.io');


const app = express()
const server = http.createServer(app)
const io = new socket.Server()
io.attach(server)



io.on('connection', require('./game'))

app.use(express.json())
app.use('/login', require('./login'))





module.exports = { app, server }
