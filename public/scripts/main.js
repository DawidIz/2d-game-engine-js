let GAME_OBJECTS = null
const root = document.getElementById('root')
// const canvas = Canvas()
// const painter = new Painter(canvas)

const painter = new Painter(400,200)

root.appendChild(painter.canvas)

socket.emit('load game')

// move new painter to top and then in promise resolved set new size ?
class Sprite{
    //{src: "static/img/bandit.png", cols: 10, rows: 7}
    constructor(data){
        this.loaded = false
        console.log(data)
        this.src = data.src
        this.cols = data.cols
        this.rows = data.rows
        this.painter = new Painter()
        this.currentFrame = this.painter.canvas

        loadImage(this.src).then(img => {
            this.img = img
            // console.log(this.img)
            this.tile = {
                width : this.img.width / this.cols,
                height : this.img.height / this.rows
            }
            
            this.painter.resize(this.tile.width, this.tile.height)    
            this.loaded = true

            this.render(0,0)
        })
    }

    // index x, index y
    render(ix,iy){
        //dont render if not loaded
        if(!this.loaded) return

        this.painter.clear()
        const img = this.img
        const sx = (ix % this.cols ) * this.tile.width
        const sy = (iy % this.rows ) * this.tile.height
        const sw = this.tile.width
        const sh = this.tile.height
        const dx = 0
        const dy = 0
        const dw = this.tile.width
        const dh = this.tile.height
        this.painter.imageSrc(img, sx, sy, sw, sh, dx, dy, dw, dh)
    }

}

class Animation{
    constructor(sprite, animation){
        //check if need redraw after new render
        this.redraw = false
        //check if animation stopped
        this.stopped = false

        this.sprite = sprite
        this.animation = animation

        this.counter = 0
        this.currentAnimation = animation['idle']
        
        this.currentFrame = this.sprite.currentFrame

        this.start()
    }

    set(){
        this.counter = 0
    }

    start(){
        [this.ix, this.iy, this.t] = this.currentAnimation[this.counter]
        this.lastTime = 0
        this.stopped = false

        this.loop = (time) => {
            if(!this.lastTime || time - this.lastTime > this.t) {
                [this.ix, this.iy, this.t] = this.currentAnimation[this.counter]
                this.counter = (this.counter + 1) % this.currentAnimation.length
                this.sprite.render(this.ix, this.iy)
                this.lastTime = time
                this.redraw = true
            }
            this.loopID = requestAnimationFrame(this.loop)
        }

        this.loop()
    }

    stop(){
        this.stopped = true 
        cancelAnimationFrame(this.loopID)
    }
}


const obj = {
    sprite : null,
    sprite2 : null,
}

let loading = true
const loop = setInterval(() => {
    
    //if loaded data from server create objects
    if(GAME_OBJECTS !== null && loading){
        const img = GAME_OBJECTS.player.image
        const animation = GAME_OBJECTS.player.animation
        obj.sprite = new Animation(new Sprite(img), animation)
        obj.sprite2 = new Animation(new Sprite(img), animation)
        loading = false
    }

    //after loading files start game loop
    if(!loading){
        painter.clear()
        painter.image(obj.sprite.currentFrame)
        painter.image(obj.sprite2.currentFrame,80,0)
    }



    // painter.image(obj.sprite.frame)


},17)



window.addEventListener('keypress',event => {
    if(event.keyCode === 32){
        obj.sprite.stopped ? obj.sprite.start() : obj.sprite.stop()
    }
})