class Sprite{
    //sprite = {image: {src,cols,rows}, animation: [[x,y,t]]}
    constructor(sprite){
        console.log(sprite)
        this.image = sprite.image

        this.painter = new Painter()
        this.currentFrame = this.painter.canvas

        this.find = GAME_IMAGES.find(image => image.id === this.image.src)
        this.img = this.find.img

        this.tile = {
            width : this.img.width / this.image.cols,
            height : this.img.height / this.image.rows
        }

        this.painter.resize(this.tile.width, this.tile.height)    

        //render default frame
        this.render(0,0)
    }

    // index x, index y
    render(ix,iy){
        this.painter.clear()
        const img = this.img
        const sx = (ix % this.image.cols ) * this.tile.width
        const sy = (iy % this.image.rows ) * this.tile.height
        const sw = this.tile.width
        const sh = this.tile.height
        const dx = 0
        const dy = 0
        const dw = this.tile.width
        const dh = this.tile.height
        this.painter.imageSrc(img, sx, sy, sw, sh, dx, dy, dw, dh)
    }

}

class Animation extends Sprite{
    constructor(sprite){
        super(sprite)
        this.animations = sprite.animations //aniamtions

        //check if need redraw after new render
        this.redraw = false
        //check if animation stopped
        this.stopped = false

        this.counter = 0
        this.currentAnimation = this.animations['idle']

        this.start()
    }

    start(){
        [this.ix, this.iy, this.t] = this.currentAnimation[this.counter]
        this.lastTime = 0
        this.stopped = false

        this.loop = (time) => {
            if(!this.lastTime || time - this.lastTime > this.t) {
                [this.ix, this.iy, this.t] = this.currentAnimation[this.counter]
                this.counter = (this.counter + 1) % this.currentAnimation.length
                this.render(this.ix, this.iy)
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