document.getElementById('gamePauseIconDiv').onclick = function() {
    if(localStorage.getItem('globalScore')>localStorage.getItem('globalHighScore')){
        localStorage.setItem('globalHighScore',localStorage.getItem('globalScore'))
    }
    // localStorage.setItem('gameEnd', JSON.stringify(false))
    window.location.href = "game-pause.html"
}

document.getElementById('gameStopIconDiv').onclick = function() {
    if(parseInt(localStorage.getItem('globalScore'))>parseInt(localStorage.getItem('globalHighScore'))){
        localStorage.setItem('globalHighScore',localStorage.getItem('globalScore'))
    }
    localStorage.setItem('gameEnd', JSON.stringify(true))
    window.location.href = "game-end.html"
}