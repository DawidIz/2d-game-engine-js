//(?<=\/.*\/).*(?=\.)

const loadImage = (src) => {
    return new Promise(res =>{
        const img = new Image()
        //get name between / and .
        const name = src.match(/(?<=\/.*\/).*(?=\.)/)[0]
        console.log(name)
        img.onload = () => res(img)
        img.src = src
    })
}