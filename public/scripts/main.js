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

const obj = {
    sprite : null,
    sprite2 : null,
}
let ai = 0
let loading = true
const loop = setInterval(() => {
    
    if(GAME_OBJECTS !== null && loading){
        const img = GAME_OBJECTS.player.image
        obj.sprite = new Sprite(img)
        obj.sprite2 = new Sprite(img)
        loading = false
    }



    obj.sprite.render(ai++,3)
    obj.sprite2.render(ai++,4)
    painter.clear()
    painter.image(obj.sprite.currentFrame)
    painter.image(obj.sprite2.currentFrame,80,0)


    // painter.image(obj.sprite.frame)


},200)