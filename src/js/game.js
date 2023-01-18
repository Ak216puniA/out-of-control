document.getElementById('gamePauseIconDiv').onclick = function() {
    window.location.href = "game-pause.html"
    if(localStorage.getItem('globalScore')>localStorage.getItem('globalHighScore')){
        localStorage.setItem('globalHighScore',localStorage.getItem('globalScore'))
    }
    // localStorage.setItem('gameEnd', JSON.stringify(false))
}

document.getElementById('gameStopIconDiv').onclick = function() {
    window.location.href = "game-end.html"
    if(localStorage.getItem('globalScore')>localStorage.getItem('globalHighScore')){
        localStorage.setItem('globalHighScore',localStorage.getItem('globalScore'))
    }
    localStorage.setItem('gameEnd', JSON.stringify(true))
}