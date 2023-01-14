const screenHeight =  window.innerHeight
const screenWidth = window.innerWidth

const gameWindowWidth = screenHeight/screenWidth<1.5 ? screenHeight/1.5 : screenWidth
const gameWindowHeight = screenHeight/screenWidth<1.5 ? screenHeight : screenWidth*1.5

const gameWindow = document.getElementById('gameWindow')
const headingText = document.getElementsByClassName('headingText')
const normalText = document.getElementsByClassName('normalText')
const playButton = document.getElementById('playButton')

if(screenHeight<=25 || screenWidth<=25){
    gameWindow.style.width = `100vw`
    gameWindow.style.height = `100vh`

    for(let i=0; i<headingText.length; i++){
        headingText[i].style.fontSize = `17.4vw`
    }
    for(let i=0; i<normalText.length; i++){
        normalText[i].style.fontSize = `13.9vw`
    }
}else{
    gameWindow.style.width = `${gameWindowWidth}px`
    gameWindow.style.height = `${gameWindowHeight}px`

    const headingFontSize = gameWindowWidth*17.4/100
    const normalFontSize = gameWindowWidth*13.9/100;

    for(let i=0; i<headingText.length; i++){
        headingText[i].style.fontSize = `${headingFontSize}px`
    }
    for(let i=0; i<normalText.length; i++){
        normalText[i].style.fontSize = `${normalFontSize}px`
    }
}