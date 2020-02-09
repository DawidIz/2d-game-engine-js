let GAME_OBJECTS = null
const root = document.getElementById('root')

const painter = new Painter(400,200)

root.appendChild(painter.canvas)

socket.emit('load game')

let loading = true
let GAME_IMAGES = []
let OBJ = []

const loop = setInterval(() => {
    
    //if loaded data from server create objects
    if(GAME_OBJECTS !== null && loading){

        
        (async() => {
            const x = await Promise.all(GAME_OBJECTS.images.map(image => loadImage(image)))

            GAME_IMAGES = [...x]

            GAME_OBJECTS.monsters.map(m => {
                const game_object = {
                    // if animated else new Sprite
                    // sprite : new Sprite(m.sprite)
                    sprite : new Animation(m.sprite)
                }
                OBJ.push(game_object)
            })
        })()

        loading = false
    }

    //after loading files start game loop
    if(!loading){
        painter.clear()
        OBJ.forEach((obj,i) => {
            painter.image(obj.sprite.currentFrame,80 * i,0)
        })

    }

},17)



window.addEventListener('keypress',event => {
    if(event.keyCode === 32){

    }
})