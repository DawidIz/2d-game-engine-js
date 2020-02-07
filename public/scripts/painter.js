const Canvas = (width = 400, height = 200) => {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    return canvas
}

class Painter{
    constructor(width = 10, height = 10){
        this.canvas = Canvas(width, height)
        this.ctx = this.canvas.getContext('2d')
    }

    resize(width, height){
        this.canvas.width = width
        this.canvas.height = height
    }

    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    line(x,y,x2,y2){
        this.ctx.moveTo(x,y)
        this.ctx.lineTo(x2,y2)
        this.ctx.stroke()
    }

    image(img, x = 0, y = 0){
        // console.log(img)
        this.ctx.drawImage(img, x, y)
    }

    imageSrc(img, sx, sy, sw, sh, dx, dy, dw, dh){
        this.ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)
    }
}