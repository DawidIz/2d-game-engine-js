const express = require('express')
// import express, { static } from 'express'
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const PORT = 4000
let PLAYERS = []
let IMAGES = ['static/img/bandit.png', 'static/img/davis.png', 'static/img/deep.png']

let MONSTERS = [
    {
        id : null,
        sprite : {
            image : {
                src : 'static/img/bandit.png',
                cols : 10,
                rows : 7
            },
            animations : {
                idle : [[0,1,200], [1,1,200], [2,1,200], [3,1,200]],
                walk : [],
                run : [],
            }
        }
    },
    {
        id : null,
        sprite : {
            image : {
                src : 'static/img/deep.png',
                cols : 10,
                rows : 7
            },
            animations : {
                idle : [[0,1,200], [1,1,200], [2,1,200], [3,1,200]],
                walk : [],
                run : [],
            }
        }
    },    
    {
        id : null,
        sprite : {
            image : {
                src : 'static/img/davis.png',
                cols : 10,
                rows : 7
            },
            animations : {
                idle : [[0,1,200], [1,1,200], [2,1,200], [3,1,200]],
                walk : [],
                run : [],
            }
        }
    },
]

const addPlayer = (id) => {
    const player = {
        id,
        sprite : {
            image : {
                src : 'static/img/bandit.png',
                cols : 10,
                rows : 7
            },
            animations : {
                idle : [[0,1,200], [1,1,200], [2,1,200], [3,1,200]],
                walk : [],
                run : [],
            }
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
            images : IMAGES,
            player : PLAYERS.find(player => player.id === socket.id),
            players : PLAYERS.filter(player => player.id !== socket.id),
            monsters : MONSTERS,
            map : []
        })
    })

    socket.on('disconnect', () => {
        console.log(`disconected id: ${socket.id}`)
        removePlayer(socket.id)
    })
})

http.listen(PORT, () => console.log(`listening at port ${PORT}`))

