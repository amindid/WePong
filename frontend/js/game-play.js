import { navigate } from './router.js';

let winnerPlayer = '';
let player1Name;
let player2Name;
let player1img;
let player2img;

class gamePlay {
    content = document.createElement('div');
    constructor() {
		
		if (localStorage.getItem("local-game") === "1")
		{
			player1Name = "Player1";
			player2Name = "Player2";
			player1img = "images/player1.png";
			player2img = "images/player2.png";
		}
		else if (localStorage.getItem('tournement8') === "1")
		{

			if (localStorage.getItem('quarterfinal1') === "0")
			{
				player1img = localStorage.getItem('img_player1');
				player2img = localStorage.getItem('img_player2');
				player1Name = localStorage.getItem('Player_Name1');
				player2Name = localStorage.getItem('Player_Name2');
			}
			else if (localStorage.getItem('quarterfinal2') === "0")
			{
				player1img = localStorage.getItem('img_player3');
				player2img = localStorage.getItem('img_player4');
				player1Name = localStorage.getItem('Player_Name3');
				player2Name = localStorage.getItem('Player_Name4');
			}
			else if (localStorage.getItem('quarterfinal3') === "0")
			{
				player1img = localStorage.getItem('img_player5');
				player2img = localStorage.getItem('img_player6');
				player1Name = localStorage.getItem('Player_Name5');
				player2Name = localStorage.getItem('Player_Name6');
			}
			else if (localStorage.getItem('quarterfinal4') === "0")
			{
				player1img = localStorage.getItem('img_player7');
				player2img = localStorage.getItem('img_player8');
				player1Name = localStorage.getItem('Player_Name7');
				player2Name = localStorage.getItem('Player_Name8');
			}
			else if (localStorage.getItem('semifinal1') === "0")
			{
				player1img = localStorage.getItem('img_player_semifinale1');
				player2img = localStorage.getItem('img_player_semifinale2');
				player1Name = localStorage.getItem('player_semifinale1');
				player2Name = localStorage.getItem('player_semifinale2');
			}
			else if (localStorage.getItem('semifinal2') === "0")
			{
				
				player1img = localStorage.getItem('img_player_semifinale3');
				player2img = localStorage.getItem('img_player_semifinale4');
				player1Name = localStorage.getItem('player_semifinale3');
				player2Name = localStorage.getItem('player_semifinale4');
			}
			else
			{
				player1img = localStorage.getItem('img_final_1');
				player2img = localStorage.getItem('img_final_2');
				player1Name = localStorage.getItem('Player_final_1');
				player2Name = localStorage.getItem('Player_final_2');
			}
		}
		else if (localStorage.getItem('tournement4') === "1")
		{
			if (localStorage.getItem('semifinal1') === "0")
			{
				player1img = localStorage.getItem('img_player_semifinale1');
				player2img = localStorage.getItem('img_player_semifinale2');
				player1Name = localStorage.getItem('player_semifinale1');
				player2Name = localStorage.getItem('player_semifinale2');
			}
			else if (localStorage.getItem('semifinal2') === "0")
			{
				
				player1img = localStorage.getItem('img_player_semifinale3');
				player2img = localStorage.getItem('img_player_semifinale4');
				player1Name = localStorage.getItem('player_semifinale3');
				player2Name = localStorage.getItem('player_semifinale4');
			}
			else
			{
				player1img = localStorage.getItem('img_final_1');
				player2img = localStorage.getItem('img_final_2');
				player1Name = localStorage.getItem('Player_final_1');
				player2Name = localStorage.getItem('Player_final_2');
			}
		}

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
                        <img id="player1-pic" src="${player1img}" alt="player1">
                    </div>
                    <span id="player1">0</span>
                </div>
                <div class="rank-div-1">
                    <img src="images/runk_diamond.svg" alt="rank1" class="rank1">
                </div>
                <div class="time-block">
                    <span id="time"> TIME </span>
                    <span id="timer">0</span>
                </div>
                <div class="rank-div-2">
                    <img src="images/runk_diamond.svg" alt="rank2" class="rank2">
                </div>
                <div class="player2-container">
                    <span id="player2">0</span>
                    <div id="img-bg-2">
                        <img id="player2-pic" src="${player2img}" alt="player2">
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
    
            
            const player1PaddleSrc = localStorage.getItem('player1Paddle');
            const player1BallSrc = localStorage.getItem('player1Ball');
            const player2PaddleSrc = localStorage.getItem('player2Paddle');
            const player2BallSrc = localStorage.getItem('player2Ball');
            const selectedMapSrc = localStorage.getItem('selectedMap');
            // player1Name = localStorage.getItem('player1Name') || 'Player 1';
            // player2Name = localStorage.getItem('player2Name') || 'Player 2';

            // console.log("selectedItems", {player1PaddleSrc, player1BallSrc, player2PaddleSrc, player2BallSrc, selectedMapSrc});
    
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
                        callback();  
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
                
                player1Score = 0;
                player2Score = 0;
                player1ScoreElement.innerText = player1Score;
                player2ScoreElement.innerText = player2Score;
                resrtTimer();
                gameOver = false;
                startTimer();
                
        
                
            }
        
            startTimer();
            
            function showWinScreen(playerName, img_winner, player1Score, player2Score) {
                
                gameOver = true;
                resrtTimer();
                clearInterval(timerInterval);
                
                const winScreen = document.createElement('div');
                winScreen.className = 'win-screen';
            
                
                winScreen.innerHTML = `
                    <h1><span class="player-name">${playerName}</span> <span class="win-text">WINS</span></h1>            
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
                            <img src="images/xp.svg" alt="XP">
                            <span>+999</span>
                        </div>
                        <div class="reward">
                            <img src="images/diamond1.svg" alt="Gems">
                            <span>+1337</span>
                        </div>
                    </div>
                    <div class="buttons">
                        <div class="Exit">
                            <button class="exit-btn">EXIT</button>
                        </div>
                        
                    </div>
                `;
				
                
                document.body.appendChild(winScreen);
				if (localStorage.getItem('tournement8') === "1")
			{
				if(localStorage.getItem('quarterfinal1') === "0")
				{
					console.log("quarterfinal1");
					localStorage.setItem('quarterfinal1', "1");
					localStorage.setItem('img_player_semifinale1', img_winner);
					localStorage.setItem('player_semifinale1', playerName);
				}
				else if (localStorage.getItem('quarterfinal2') === "0" && localStorage.getItem('quarterfinal1') === "1")
				{
					console.log("quarterfinal2");
					localStorage.setItem('quarterfinal2', "1");
					localStorage.setItem('img_player_semifinale2', img_winner);
					localStorage.setItem('player_semifinale2', playerName);
				}
				else if (localStorage.getItem('quarterfinal3') === "0" && localStorage.getItem('quarterfinal2') === "1")
				{
					console.log("quarterfinal3");
					localStorage.setItem('quarterfinal3', "1");
					localStorage.setItem('img_player_semifinale3', img_winner);
					localStorage.setItem('player_semifinale3', playerName);
				}
				else if (localStorage.getItem('quarterfinal4') === "0" && localStorage.getItem('quarterfinal3') === "1")
				{
					console.log("quarterfinal4");
					localStorage.setItem('quarterfinal4', "1");
					localStorage.setItem('img_player_semifinale4', img_winner);
					localStorage.setItem('player_semifinale4', playerName);
				}
				else if (localStorage.getItem('semifinal1') === "0" && localStorage.getItem('quarterfinal4') === "1")
				{
					console.log("semifinal1");
					localStorage.setItem('semifinal1', "1");
					localStorage.setItem('img_final_1', img_winner);
					localStorage.setItem('Player_final_1', playerName);
				}
				else if (localStorage.getItem('semifinal2') === "0" && localStorage.getItem('semifinal1') === "1")
				{
					console.log("semifinal2");
					localStorage.setItem('semifinal2', "1");
					localStorage.setItem('img_final_2', img_winner);
					localStorage.setItem('Player_final_2', playerName);
				}
				else if (localStorage.getItem('semifinal2') === "1" && localStorage.getItem('semifinal1') === "1")
				{
					localStorage.setItem('final', "1");
					localStorage.setItem('end', "1");
					localStorage.setItem('img_final', img_winner);
					localStorage.setItem('Player_final', playerName);
				}
			}
				else if (localStorage.getItem('tournement4') === "1")
				{
					if (localStorage.getItem('semifinal1') === "0")
					{
						localStorage.setItem('semifinal1', "1");
						localStorage.setItem('img_final_1', img_winner);
						localStorage.setItem('Player_final_1', playerName);
					}
					else if (localStorage.getItem('semifinal2') === "0" && localStorage.getItem('semifinal1') === "1")
					{
						console.log("semifinal2");
						localStorage.setItem('semifinal2', "1");
						localStorage.setItem('img_final_2', img_winner);
						localStorage.setItem('Player_final_2', playerName);
					}
					else if (localStorage.getItem('semifinal2') === "1" && localStorage.getItem('semifinal1') === "1")
					{
						localStorage.setItem('final', "1");
						localStorage.setItem('end', "1");
						localStorage.setItem('img_final', img_winner);
						localStorage.setItem('Player_final', playerName);
					}

				}
                
                setTimeout(() => {
                    winScreen.classList.add('show');
                }, 10);
            
                
                winScreen.querySelector('.exit-btn').addEventListener('click', () => {

                    document.body.removeChild(winScreen);
                    if(localStorage.getItem('tournement8') === "1")
						navigate('/tournement/Eightplayers');
					else if(localStorage.getItem('tournement4') === "1")
						navigate('/tournement/Fourplayers');
					else
					{
						localStorage.clear();
                    	navigate('/');
					}
                });
            
                // winScreen.querySelector('.replay-btn').addEventListener('click', () => {
                //     document.body.removeChild(winScreen);
                    
                //     navigate('/local-game');
                // });
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
                        showWinScreen(player2Name, player2img, player1Score, player2Score);
                    } else {
                        resetRound();
                    }
                } else if (this.x + this.width >= canvas.width) {
                    player1Score++;
                    player1ScoreElement.innerText = player1Score;
                    if (player1Score == this.scoreToWin) {
                        showWinScreen(player1Name, player1img, player1Score, player2Score);
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
    
        }, 0);  
        
      
        return page;
    }
    
    
}

export function renderGamePlay() {
    console.log('renderGamePlay');
    const page = new gamePlay();
    return page.render();
}