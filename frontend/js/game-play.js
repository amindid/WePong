import { navigate } from './router.js';


class gamePlay {
    content = document.createElement('div');
    constructor() {
    }

    render() {
        const page = document.createDocumentFragment();
        this.content.className = 'main-div';
        this.content.innerHTML = `
            <div id="overlay">
                <div id="countdown"></div>
            </div> 
            <div class="gameBackground">
            </div>
            <div class="score">
                <div class="player1-container">
                    <div id="img-bg-1">
                        <img id="player1-pic" src="images/player1.png" alt="player1">
                    </div>
                    <span id="player1">0</span>
                </div>
                <div class="rank-div-1">
                    <img src="images/ranks/diamond.svg" alt="rank1" class="rank1">
                </div>
                <div class="time-block">
                    <span id="time"> TIME </span>
                    <span id="timer">0</span>
                </div>
                <div class="rank-div-2">
                    <img src="images/ranks/diamond.svg" alt="rank2" class="rank2">
                </div>
                <div class="player2-container">
                    <span id="player2">0</span>
                    <div id="img-bg-2">
                        <img id="player2-pic" src="images/player2.png" alt="player2">
                    </div>
                </div>
            </div>
            <canvas id="myCanvas"></canvas>
            <div class="buttons">
                <button id="toggleBallMovement">START</button>
            </div>
            <div id="notification" class="notificationPop" style="display: none;">
            </div>
        `;
        page.appendChild(this.content);
    
        setTimeout(() => {
            var keys = {
                paddle1: {
                  up: 'w', 
                  down: 's',
                  maj_up: 'W',
                  maj_down: 'S'
                },
                paddle2: {
                  up: 'ArrowUp',
                  down: 'ArrowDown'
                }
            };
    
            const coefficient = 0.75;
            let canvas = document.getElementById("myCanvas");
            let ctx = canvas.getContext("2d");
            let img = new Image();
            let player1Score = 0;
            let player2Score = 0;
            let player1ScoreElement = document.getElementById("player1");
            let player2ScoreElement = document.getElementById("player2");
            let timer = 0;
            let timerElement = document.getElementById('timer');
            let timerInterval;
    
            // Retrieve selections from localStorage
            const player1PaddleSrc = localStorage.getItem('player1Paddle');
            const player1BallSrc = localStorage.getItem('player1Ball');
            const player2PaddleSrc = localStorage.getItem('player2Paddle');
            const player2BallSrc = localStorage.getItem('player2Ball');
            const selectedMapSrc = localStorage.getItem('selectedMap');

            console.log("selectedItems", {player1PaddleSrc, player1BallSrc, player2PaddleSrc, player2BallSrc, selectedMapSrc});
    
            canvas.width = window.innerWidth * coefficient;
            canvas.height = window.innerHeight * coefficient;
            img.src = selectedMapSrc;
            img.onload = update;
            let gameOver = false;
            function startTimer() {
                timerInterval = setInterval(() => {
                    if (gameOver) {
                        clearInterval(timerInterval);
                        return;
                    }
            
                    timer += 1;
                    timerElement.innerText = timer;
            
                    if (timer % 10 == 0) {
                        paddle1.speed++;
                        paddle2.speed++;
                        console.log("this is the paddle speed", paddle1.speed, paddle2.speed);
                    } else if (timer % 5 == 0) {
                        ball.speed++;
                        console.log("this is the ball speed", ball.speed);
                    }
                }, 1000);
            }
            
    
            function showCountdown(callback) {
                const overlay = document.getElementById('overlay');
                const countdownElement = document.getElementById('countdown');
                let count = 3;
            
                overlay.style.visibility = 'visible';
                countdownElement.innerText = count;
            
                let countdownInterval = setInterval(() => {
                    count--;
                    if (count > 0) {
                        countdownElement.innerText = count;
                    } else {
                        clearInterval(countdownInterval);
                        overlay.style.visibility = 'hidden';
                        callback();  // Start the game
                    }
                }, 1000);
            }
            function resetRound() {
                ball.x = canvas.width / 2 - ball.width / 2;
                ball.y = canvas.height / 2 - ball.height / 2;
                ball.speed = 6;
                paddle1.speed = 5;
                paddle2.speed = 5;
                paddle1.y = canvas.height / 2 - paddle1.height / 2;
                paddle2.y = canvas.height / 2 - paddle2.height / 2;
                isBallMoving = false;
                
                showCountdown(() => {
                    isBallMoving = true;
                });
            }
            function resrtTimer() {
                timer = 0;
                timerElement.innerText = timer;
            }
            function resetGame() {
                // Reset game variables and state
                player1Score = 0;
                player2Score = 0;
                player1ScoreElement.innerText = player1Score;
                player2ScoreElement.innerText = player2Score;
                resrtTimer();
                gameOver = false;
                startTimer();
                // removeChild(paddle1);
        
                // Additional reset logic as needed
            }
        
            startTimer();
            
            function showWinScreen(player, player1Score, player2Score) {
                // Set game over flag
                gameOver = true;
                resrtTimer();
                clearInterval(timerInterval);
                // Create win screen element
                const winScreen = document.createElement('div');
                winScreen.className = 'win-screen';
            
                // Set the inner HTML of the win screen
                winScreen.innerHTML = `
                    <h1><span class="player-name">${player}</span> <span class="win-text">WINS</span></h1>            
                    <div class="stars">
                        <img src="images/stars.svg" alt="Star">
                    </div>
                    <div class="score-players">
                        <span class="player1-score">${player1Score}</span>
                        <span class="hyphen">-</span>
                        <span class="player2-score">${player2Score}</span>
                    </div>
                    <div class="rewards">
                        <div class="reward">
                            <img src="images/icons/xp.svg" alt="XP">
                            <span>+999</span>
                        </div>
                        <div class="reward">
                            <img src="images/icons/diamond.svg" alt="Gems">
                            <span>+1337</span>
                        </div>
                    </div>
                    <div class="buttons">
                        <div class="Exit">
                            <button class="exit-btn">EXIT</button>
                        </div>
                        <div class="Replay">
                            <button class="replay-btn">REPLAY</button>
                        </div>
                    </div>
                `;
            
                // Append win screen to the body
                document.body.appendChild(winScreen);
            
                // Show the win screen
                setTimeout(() => {
                    winScreen.classList.add('show');
                }, 10);
            
                // Add event listeners to buttons
                winScreen.querySelector('.exit-btn').addEventListener('click', () => {
                    document.body.removeChild(winScreen);
                    // Exit the game (you can customize this part as needed)
                    navigate('/');
                });
            
                winScreen.querySelector('.replay-btn').addEventListener('click', () => {
                    document.body.removeChild(winScreen);
                    // resetGame();
                    navigate('/local-game');
                });
            }
        class Paddle {
            constructor(x, y, src) {
                this.x = x;
                this.y = y;
                this.width = 40;
                this.height = 180;
                this.src = src;
                this.dy = 0;
                this.speed = 5;
            }
    
            draw(ctx) {
                let img = new Image();
                img.src = this.src;
                ctx.drawImage(img, this.x, this.y, this.width, this.height);
            }
    
            move() {
                this.y += this.dy * this.speed;
                if (this.y < 25) this.y = 25;
                if (this.y + this.height > Number(canvas.height) - 25) this.y = Number((canvas.height) - 25) - this.height;
            }
        }
        
        class Ball {
            constructor(x, y, src) {
                this.x = x;
                this.y = y;
                this.width = 60;
                this.height = 60;
                this.src = src;
                this.dx = 1;
                this.dy = 1;
                this.speed = 6;
                this.scoreToWin = 3;
            }
    
            draw(ctx) {
                let img = new Image();
                img.src = this.src;
                ctx.drawImage(img, this.x, this.y, this.width, this.height);
            }
    
            move() {
                if (gameOver) return;
    
                this.x += this.dx * this.speed;
                this.y += this.dy * this.speed;
    
                if (this.y <= 0 || this.y + this.height >= canvas.height) {
                    this.dy *= -1;
                }
    
                if (this.x <= 0) {
                    player2Score++;
                    player2ScoreElement.innerText = player2Score;
                    if (player2Score == this.scoreToWin) {
                        // alert("Player 2 wins!")
                        showWinScreen('Player 2', player1Score, player2Score);
                        // resetGame();    
                    } else {
                        resetRound();
                    }
                } else if (this.x + this.width >= canvas.width) {
                    player1Score++;
                    player1ScoreElement.innerText = player1Score;
                    if (player1Score == this.scoreToWin) {
                        // alert("Player 1 wins!");
                        // resetGame();
                        showWinScreen('Player 1', player1Score, player2Score);
                    } else {
                        resetRound();
                    }
                }
    
                this.checkCollisionWithPaddle(paddle1);
                this.checkCollisionWithPaddle(paddle2);
            }
    
            checkCollisionWithPaddle(paddle) {
                if (
                    this.x + this.width >= paddle.x &&
                    this.x <= paddle.x + paddle.width &&
                    this.y + this.height >= paddle.y &&
                    this.y <= paddle.y + paddle.height
                ) {
                    this.dx *= -1;
                    let paddleCenterY = paddle.y + paddle.height / 2;
                    let ballCenterY = this.y + this.height / 2;
                    this.dy = (ballCenterY - paddleCenterY) / (paddle.height / 2);
                }
            }
        }
    
        let paddle1 = new Paddle(30, canvas.height / 2 - 50, player1PaddleSrc);
        let paddle2 = new Paddle(canvas.width - 80, canvas.height / 2 - 50, player2PaddleSrc);
    
        let ball = new Ball((canvas.width / 2) - 30, canvas.height / 2, getRandomBallSrc(player1BallSrc, player2BallSrc));
        function getRandomBallSrc(ballSrc1, ballSrc2) {
            return Math.random() < 0.5 ? ballSrc1 : ballSrc2;
        }
    
    
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth * coefficient;
            canvas.height = window.innerHeight * coefficient;
            paddle2.x = canvas.width - 100;
            paddle2.y = 100;
            paddle1.x = 50;
            paddle1.y = 550;
            update();
        });
    
        window.addEventListener('keydown', function (event) {
            var key = event.key;
    
            if (key === keys.paddle1.up || key === keys.paddle1.maj_up) {
                paddle1.dy = -2;
            } else if (key === keys.paddle1.down || key === keys.paddle1.maj_down) {
                paddle1.dy = 2;
            } else if (key === keys.paddle2.up) {
                paddle2.dy = -2;
            } else if (key === keys.paddle2.down) {
                paddle2.dy = 2;
            }
        });
    
        window.addEventListener('keyup', function (event) {
            var key = event.key;
    
            if ((key === keys.paddle1.up || key === keys.paddle1.down) || (key === keys.paddle1.maj_up || key === keys.paddle1.maj_down)) {
                paddle1.dy = 0;
            } else if (key === keys.paddle2.up || key === keys.paddle2.down) {
                paddle2.dy = 0;
            }
        });
    
        let isBallMoving = false;
    
        document.getElementById('toggleBallMovement').addEventListener('click', function() {
            isBallMoving = false;
            showCountdown(() => {
                isBallMoving = true;
            });
            // isBallMoving = !isBallMoving;
        });
    
        function update() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            paddle1.move();
            paddle1.draw(ctx);
            paddle2.move();
            paddle2.draw(ctx);
            if (isBallMoving) {
                ball.move();
            }
            ball.draw(ctx);
            requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    
        }, 0);  // Delays execution until after DOM is updated
        
      
        return page;
    }
    
    
}

export function renderGamePlay() {
    console.log('renderGamePlay');
    const page = new gamePlay();
    return page.render();
}