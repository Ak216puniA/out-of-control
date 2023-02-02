const screenHeight =  window.innerHeight
const screenWidth = window.innerWidth

const gameWindowWidth = screenHeight/screenWidth<1.5 ? screenHeight/1.5 : screenWidth
const gameWindowHeight = screenHeight/screenWidth<1.5 ? screenHeight : screenWidth*1.5

const gotFullscreenButtonDiv = document.getElementById('goFullscreenButtonDiv')
const goFullscreenButton = document.getElementById('goFullscreenButton')
const startPageImage = document.getElementById('startPageImage')

if(screenHeight<=25 || screenWidth<=25){
    goFullscreenButton.style.fontSize = `7.5vw`
}else{
    const goFullscreenButtonFontSize = gameWindowWidth*7.5/100;
    goFullscreenButton.style.fontSize = `${goFullscreenButtonFontSize}px`
    gotFullscreenButtonDiv.style.display = 'none'
    startPageImage.style.width = '70%'
}

document.getElementById("playButton").onclick = function() {
    window.location.href = "game.html"
}

// document.getElementById('goFullscreenButton').onclick = function() {
//     console.log("button clicked!!")
//     alert("Button clicked!!")
//     document.documentElement.requestFullscreen()
//     document.body.requestFullscreen()
// }

// document.getElementById('goFullscreenButton').addEventListener('click', () => {
//     // alert("Button clicked!!!")
//     // console.log(document.requestFullscreen());
//     console.log(document.documentElement.fullscreenElement)
//     // alert(document.fullscreenElement)
//     // if(!document.fullscreenElement){
//     //     document.documentElement.requestFullscreen()
//     // }
//     // alert(document.fullscreenEnabled)
// })

// document.addEventListener('fullscreenerror', (event) => {
//     alert("Error occured babe!!")
//     alert(event)
//     console.log(event)
// });

// document.getElementById('goFullscreenButton').addEventListener("click", function() {
//     alert("Button clicked agaun!!")
//     var el = document.documentElement;
//     console.log(el)
//     var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen;
//     console.log(rfs)
//     rfs.call(el);
// });