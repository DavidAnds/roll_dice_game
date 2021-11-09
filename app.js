let globalPlayer1 = 0
let globalPlayer2 = 0
let current = 0

let player1Turn = false
let gameOn = false

const player1 = document.getElementById('player-1')
const player2 = document.getElementById('player-2')
const newGameBtn = document.getElementById('btn-new-game')
const rollDiceBtn = document.getElementById('roll-dice-btn')
const holdBtn = document.getElementById('hold-btn')
const diceFace = document.getElementById('dice')
const gameRules = document.getElementById('game-rules')
const continuBtn = document.getElementById('continu-btn')
const gameRulesBtn = document.getElementById('game-rules-btn')
const info = document.getElementById('info')

const startNewGame = () => {
    // Reset
    globalPlayer1 = 0
    globalPlayer2 = 0
    current = 0
    player1.querySelector('.global').innerHTML = globalPlayer1
    player2.querySelector('.global').innerHTML = globalPlayer2
    player1.querySelector('.current').innerText = current
    player2.querySelector('.current').innerText = current
    diceFace.innerHTML = ''
    info.classList.remove('hidden')
    info.innerText = "New game start"
    setTimeout(() => {
        info.classList.add("hidden")
    }, 1000)

    // New game Start
    gameOn = true 
    player1Turn = true
    player1.classList.add('active')
}

// Change turn
const turnChange = () => {
    gameOn = false

    setTimeout (() => {
        diceFace.innerHTML = ""
        info.classList.remove('hidden')
        info.innerText = "Turn Change"
    },500)

    setTimeout( () => {
        gameOn = true
        info.classList.add("hidden")
        if(player1Turn) {
            player1.classList.remove('active')
            player2.classList.add('active')
            player1Turn = false
        } else {
            player1.classList.add('active')
            player2.classList.remove('active')
            player1Turn = true
        }
    },1500)
}

// Game end
const gameEnd = (player) => {
    gameOn = false
     diceFace.innerHTML = `
         <div class="text-center bg-red-500 w-72 px-2 py-8 bg-opacity-60">
            <p class="text-xl">🎉  ${player} you've won  🎉</p>
            <iframe src="https://giphy.com/embed/g9582DNuQppxC" class="w-60 mt-6 mx-auto" allowFullScreen></iframe>
        </div>`
}

// Dice roll
const rollDice = () => {
    if(gameOn){
        const diceNumber = Math.floor(Math.random()*6 + 1 )
        diceFace.innerHTML = `<img src="./img/dice-${diceNumber}.png" alt="icon de la face ${diceNumber} d'un dés" class="w-20 sm:w-28">`


        if(diceNumber !== 1){
            current += diceNumber
            gameOn = false
            if(player1Turn) {
                player1.querySelector('.current').innerText = current
            } else {
                player2.querySelector('.current').innerText = current
            }
            setTimeout(() => {
                gameOn = true
            }, 500)
        } else if (diceNumber === 1) {
            current = 0
            diceFace.innerHTML = `<img src="./img/dice-${diceNumber}.png" alt="icon de la face ${diceNumber} d'un dés" class="w-20 sm:w-28">`
            if(player1Turn) {
                player1.querySelector('.current').innerText = current
            } else {
                player2.querySelector('.current').innerText = current
            }
            turnChange()
        }
    }

}

//  increase the global score
const holdScore = () => {
    // For player 1
    if(gameOn & player1Turn) {
        globalPlayer1 += current
        current = 0
        player1.querySelector('.global').innerHTML = globalPlayer1
        player1.querySelector('.current').innerText = current

        if(globalPlayer1 >= 100) {
            gameEnd("Player 1")

        } else {
            turnChange()
            return
        }

    // For player 2
    } else if (gameOn) {
        globalPlayer2 += current
        current = 0
        player2.querySelector('.global').innerHTML = globalPlayer2
        player2.querySelector('.current').innerText = current
 
        if(globalPlayer2 >= 100) {
            gameEnd('Player 2')
            
        } else {
            turnChange()
        }
    }
}

// Show/Close game's rules
const toggleGameRules = () => {
    gameRules.classList.toggle('hidden')
}

newGameBtn.addEventListener('click', startNewGame)
rollDiceBtn.addEventListener('click', rollDice)
holdBtn.addEventListener('click', holdScore)
continuBtn.addEventListener('click', toggleGameRules)
gameRulesBtn.addEventListener('click', toggleGameRules)
