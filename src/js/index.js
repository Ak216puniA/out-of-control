const screenHeight =  window.innerHeight
const screenWidth = window.innerWidth

console.log(screenHeight)
console.log(screenWidth)

if(true){
    console.log("Entered")
    const gameWindowWidth = screenHeight/screenWidth<1.5 ? screenHeight/1.5 : screenWidth
    const gameWindowHeight = screenHeight/screenWidth<1.5 ? screenHeight : screenWidth*1.5
    // document.body.style.width = gameWindowWidth
    // document.body.style.height = gameWindowHeight
    console.log(gameWindowWidth)
    console.log(gameWindowHeight)
    document.getElementById('gameWindow').style.width = `${gameWindowWidth}px`
    document.getElementById('gameWindow').style.height = `${gameWindowHeight}px`
}

if(screenHeight<=25 || screenWidth<=25){
    // console.log(document.body.width)
    document.getElementById('gameWindow').style.width = `100%`
    document.getElementById('gameWindow').style.height = `100vh`
}