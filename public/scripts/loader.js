// const name = src.match(/(?<=\/.*\/).*(?=\.)/)[0]

const loadImage = (src) => {
    return new Promise(res =>{
        const img = new Image()
        img.onload = () => res({id : src, img})
        img.src = src
    })
}