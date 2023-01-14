const screenHeight =  window.innerHeight
const screenWidth = window.innerWidth

const gameWindowWidth = screenHeight/screenWidth<1.5 ? screenHeight/1.5 : screenWidth
const gameWindowHeight = screenHeight/screenWidth<1.5 ? screenHeight : screenWidth*1.5

const gameWindow = document.getElementById('gameWindow')

if(screenHeight<=25 || screenWidth<=25){
    gameWindow.style.width = `100vw`
    gameWindow.style.height = `100vh`
}else{
    gameWindow.style.width = `${gameWindowWidth}px`
    gameWindow.style.height = `${gameWindowHeight}px`
}