const pausePauseIcon = '<i class="fa-solid fa-pause" id="gamePauseIcon"></i>'
const pausePlayIcon = '<i class="fa-solid fa-play" id="gamePauseIcon"></i>'

document.getElementById('gamePauseIconDiv').onclick = function() {
    localStorage.setItem('pauseGame', JSON.stringify(!(JSON.parse(localStorage.getItem('pauseGame')))))
    document.getElementById('gamePauseIconDiv').innerHTML = JSON.parse(localStorage.getItem('pauseGame')) ? pausePlayIcon : pausePauseIcon
}

document.getElementById('gameStopIconDiv').onclick = function() {
    if(parseInt(localStorage.getItem('globalScore'))>parseInt(localStorage.getItem('globalHighScore'))){
        localStorage.setItem('globalHighScore',localStorage.getItem('globalScore'))
    }
    localStorage.setItem('gameEnd', JSON.stringify(true))
    localStorage.setItem('pauseGame', JSON.stringify(false))
    window.location.href = "game-end.html"
}