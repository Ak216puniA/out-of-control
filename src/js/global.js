localStorage.setItem('globalScore', 0)
localStorage.setItem('globalHighScore', 0)

const defaultControlKeys = [
    ['a','ArrowLeft'],
    ['w','ArrowUp'],
    ['d','ArrowRight'],
    ['s','ArrowDown']
]
localStorage.setItem('controlKeys', JSON.stringify(defaultControlKeys))
localStorage.setItem('gameEnd', JSON.stringify(true))
localStorage.setItem('pauseGame', JSON.stringify(false))