let globalPlayer1 = 0
let globalPlayer2 = 0
let current = 0

let player1Turn = false
let player2Turn = false
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

const startNewGame = () => {
    // Remise des scores à 0
    globalPlayer1 = 0
    globalPlayer2 = 0
    current = 0
    player1.querySelector('.global').innerHTML = globalPlayer1
    player2.querySelector('.global').innerHTML = globalPlayer2
    player1.querySelector('.current').innerText = current
    player2.querySelector('.current').innerText = current
    diceFace.innerHTML = ''

    // Début nouvelle partie 
    gameOn = true 
    player1Turn = true
    player2Turn = false
    player1.classList.add('active')
}

// Lancer de dés
const rollDice = () => {
    // Lancer de dès au tour du joueur 1
    if(gameOn & player1Turn) {
        const diceNumber = Math.floor(Math.random()*6 + 1 )
       
    
        if(diceNumber !== 1) {
            current += diceNumber
            diceFace.innerHTML = `<img src="./img/dice-${diceNumber}.png" alt="icon de la face ${diceNumber} d'un dés" class="w-20 sm:w-28">`
            player1.querySelector('.current').innerText = current

            gameOn = false
            setTimeout(() => {
                gameOn = true
            }, 500)

        } else if ( diceNumber === 1) {
            current = 0
            diceFace.innerHTML = `<img src="./img/dice-${diceNumber}.png" alt="icon de la face ${diceNumber} d'un dés" class="w-20 sm:w-28">`
            player1.querySelector('.current').innerText = current

            gameOn = false
                setTimeout( () => {
            gameOn = true
                player1.classList.remove('active')
                player2.classList.add('active')
            }
            ,1000)
           

            player1Turn = false
            player2Turn = true
        }
    }

    // Lancer de dès au tour du joueur 2
    if(gameOn & player2Turn) {
        const diceNumber = Math.floor(Math.random()*6 + 1 )
    
        if(diceNumber !== 1) {
            current += diceNumber
            diceFace.innerHTML = `<img src="./img/dice-${diceNumber}.png" alt="icon de la face ${diceNumber} d'un dés" class="w-20 sm:w-28">`
            player2.querySelector('.current').innerText = current

            gameOn = false
            setTimeout(() => {
                gameOn = true
            }, 500)

        } else if (diceNumber === 1 ){
            current = 0
            diceFace.innerHTML = `<img src="./img/dice-${diceNumber}.png" alt="icon de la face ${diceNumber} d'un dés" class="w-20 sm:w-28">`
            player2.querySelector('.current').innerText = current
            
            gameOn = false
            setTimeout( () => {
            gameOn = true
                player1.classList.add('active')
                player2.classList.remove('active')
            }
            ,1000)

            player1Turn = true
            player2Turn = false
        }
    }
}

// Augmenter le score global 
const holdScore = () => {
    // Pour le joueur 1
    if(gameOn & player1Turn) {
        globalPlayer1 += current
        player1.querySelector('.global').innerHTML = globalPlayer1
        current = 0
        player1.querySelector('.current').innerText = current

        // Verifition global
        if(globalPlayer1 >= 2) {
            diceFace.innerHTML = `
            <div class="text-center bg-red-500 w-72 px-2 py-8 transform bg-opacity-60">
                <p class="text-xl">🎉  Player 1 you've won  🎉</p>
                <iframe src="https://giphy.com/embed/g9582DNuQppxC" class="w-60 mt-6 mx-auto" allowFullScreen></iframe>
            </div>`
            gameOn = false
        } else {
            player2Turn = true
            player1Turn = false
            player1.classList.remove('active')
            player2.classList.add('active')

            return
        }

    // Pour le joueur 2
    } else if (gameOn & player2Turn) {
        globalPlayer2 += current
        player2.querySelector('.global').innerHTML = globalPlayer2
        current = 0
        player2.querySelector('.current').innerText = current
        
        player2Turn = false
        player1Turn = true

        // Verification global
        if(globalPlayer2 >= 100) {
            gameOn = false
            diceFace.innerHTML = `
            <div class="text-center bg-red-500 w-72 px-2 py-8 transform bg-opacity-60">
                <p class="text-xl">🎉  Player 2 you've won  🎉</p>
                <iframe src="https://giphy.com/embed/g9582DNuQppxC" class="w-60 mt-6 mx-auto" allowFullScreen></iframe>
            </div>`
        } else {
            player2Turn = false
            player1Turn = true
            player1.classList.add('active')
            player2.classList.remove('active')
        }
    }
}

// Game's rules
const continu = () => {
    gameRules.classList.add('hidden')
}

// Show game's rules
const showGameRules = () => {
    gameRules.classList.remove('hidden')
}

newGameBtn.addEventListener('click', startNewGame)
rollDiceBtn.addEventListener('click', rollDice)
holdBtn.addEventListener('click', holdScore)
continuBtn.addEventListener('click', continu)
gameRulesBtn.addEventListener('click', showGameRules)



