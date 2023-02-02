// console.log(chrome.windows)

// chrome.windows.update(
//     windowId ,
//     updateInfo: object,
//     callback?: function,
//   )

// document.documentElement.requestFullscreen()

// document.getElementById('goFullscreenButton').addEventListener("click", function() {
//     var
//           el = document.documentElement
//         , rfs =
//                el.requestFullScreen
//             || el.webkitRequestFullScreen
//             || el.mozRequestFullScreen
//     ;
//     rfs.call(el);
// });

const screenHeight =  window.innerHeight
const screenWidth = window.innerWidth

const gameWindowWidth = screenHeight/screenWidth<1.5 ? screenHeight/1.5 : screenWidth
const gameWindowHeight = screenHeight/screenWidth<1.5 ? screenHeight : screenWidth*1.5

const gameWindow = document.getElementsByClassName('gameWindow')
const headingText = document.getElementsByClassName('headingText')
const normalText = document.getElementsByClassName('normalText')

if(screenHeight<=25 || screenWidth<=25){
    console.log("Hello");
    for(let i=0; i<gameWindow.length; i++){
        gameWindow[i].style.width = `100vw`
        gameWindow[i].style.height = `100vh`
    }

    for(let i=0; i<headingText.length; i++){
        headingText[i].style.fontSize = `15vw`
    }
    for(let i=0; i<normalText.length; i++){
        normalText[i].style.fontSize = `12vw`
    }
}else{
    for(let i=0; i<gameWindow.length; i++){
        gameWindow[i].style.width = `${gameWindowWidth}px`
        gameWindow[i].style.height = `${gameWindowHeight}px`
    }

    const headingFontSize = gameWindowWidth*15/100
    const normalFontSize = gameWindowWidth*12/100;

    for(let i=0; i<headingText.length; i++){
        headingText[i].style.fontSize = `${headingFontSize}px`
    }
    for(let i=0; i<normalText.length; i++){
        normalText[i].style.fontSize = `${normalFontSize}px`
    }
}