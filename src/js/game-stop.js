const screenHeight =  window.innerHeight
const screenWidth = window.innerWidth

const gameWindowWidth = screenHeight/screenWidth<1.5 ? screenHeight/1.5 : screenWidth
const gameWindowHeight = screenHeight/screenWidth<1.5 ? screenHeight : screenWidth*1.5

const text1 = document.getElementsByClassName('text1')
const text2 = document.getElementsByClassName('text2')
const text3 = document.getElementsByClassName('text3')
const text4 = document.getElementsByClassName('text4')

if(screenHeight<=25 || screenWidth<=25){
    for(let i=0; i<text1.length; i++){
        text1[i].style.fontSize = `6.67vw`
    }
    for(let i=0; i<text2.length; i++){
        text2[i].style.fontSize = `10vw`
    }
    for(let i=0; i<text3.length; i++){
        text3[i].style.fontSize = `15vw`
    }
    for(let i=0; i<text4.length; i++){
        text4[i].style.fontSize = `20vw`
    }
}else{
    for(let i=0; i<text1.length; i++){
        text1[i].style.fontSize = `${gameWindowWidth*6.67/100}px`
    }
    for(let i=0; i<text2.length; i++){
        text2[i].style.fontSize = `${gameWindowWidth/10}px`
    }
    for(let i=0; i<text3.length; i++){
        text3[i].style.fontSize = `${gameWindowWidth*15/100}px`
    }
    for(let i=0; i<text4.length; i++){
        text4[i].style.fontSize = `${gameWindowWidth/5}px`
    }
}

if(document.getElementById('gameScore')){
    document.getElementById('gameScore').innerHTML = localStorage.getItem('globalScore')
}

document.getElementById('gameHighScore').innerHTML = localStorage.getItem('globalHighScore')

document.getElementById('exitButton').onclick = function (){
    window.location.href = "index.html"
}
document.getElementById('playAgainButton').onclick = function (){
    window.location.href = "game.html"
}

if(document.getElementById('resume')){
    document.getElementById('resume').onclick = function (){
        window.location.href = "game.html"
    }
}