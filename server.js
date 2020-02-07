const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const PORT = 4000
let PLAYERS = []

const addPlayer = (id) => {
    const player = {
        id,
        image : {
            src : 'static/img/bandit.png',
            cols : 10,
            rows : 7
        },
        animations : {
            idle : [],
            walk : [],
            run : [],
        }
    }
    PLAYERS.push(player)
}

const removePlayer = (id) => {
    PLAYERS = PLAYERS.filter(player => player.id !== id)
}

app.use('/static', express.static('public'))

app.get('/', ( _ , res) => {
    res.sendFile(__dirname + '/public/index.html')
})

io.on('connection', socket => {
    console.log(`connection id: ${socket.id}`)
    addPlayer(socket.id)
    console.log(PLAYERS)

    socket.on('load game', () => {
        socket.emit('load game', {
            //maybe this is not the best option we gonna refactor this later
            player : PLAYERS.find(player => player.id === socket.id),
            players : PLAYERS.filter(player => player.id !== socket.id),
            monsters : [],
            map : []
        })
    })

    socket.on('disconnect', () => {
        console.log(`disconected id: ${socket.id}`)
        removePlayer(socket.id)
    })
})

http.listen(PORT, () => console.log(`listening at port ${PORT}`))

