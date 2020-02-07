const socket = io()

socket.on('load game', res => {
    console.log(res)
    GAME_OBJECTS = res
    // loadImage('static/' + res.player.image.src)
    //     .then(res => {
    //         console.log(res)
    //         painter.image(res)
    //     })
})