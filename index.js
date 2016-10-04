express = require('express')
app = express()
port = 8080
const server = app.listen(8080, () => {
  console.log('listening on %d', port)
})
io = require('socket.io')(server)




//serve all content
app.use('/', express.static('public'))
//send controlls to screen
app.get('/controlls', (req, res) => {
  res.sendFile(__dirname + '/public/controlls.html')
})



//sockets stuff
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('input', function(keystroke){
    io.emit('keystroke', keystroke);
  });
})





//Serve content on port
server.listen(port, () => {
  console.log('Now runing on port ' + port)
})
