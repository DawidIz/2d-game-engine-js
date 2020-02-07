const loadImage = (src) => {
    return new Promise(res =>{
        const img = new Image()
        img.onload = () => res(img)
        img.src = src
    })
}