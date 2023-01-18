document.getElementById('gamePauseIconDiv').onclick = function() {
    window.location.href = "game-pause.html"
    if(localStorage.getItem('globalScore')>localStorage.getItem('globalHighScore')){
        localStorage.setItem('globalHighScore',localStorage.getItem('globalScore'))
    }
}

document.getElementById('gameStopIconDiv').onclick = function() {
    window.location.href = "game-end.html"
    if(localStorage.getItem('globalScore')>localStorage.getItem('globalHighScore')){
        localStorage.setItem('globalHighScore',localStorage.getItem('globalScore'))
    }
}