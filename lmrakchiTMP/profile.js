    import { navigate } from "./router.js";
    import { renderRightBar } from './right-bar.js';
    import { renderLeftBar } from './left-bar.js';

    class Profile {
        content = document.createElement('div');
        constructor() {}

        render() {
            
            const profilePicture = "../images/player1.png";
            const username = "EMOHAMEDD";
            const level = 10;
            const rankImage = "../images/ranks/diamond.svg";
            const gamesPlayed = 20;
            const wins = 10;
            const losses = 10;
            const winRate = "50%";
            const matchHistory = [
                {
                    player1Image: "../images/player1.png",
                    player1State: "WIN",
                    player1Score: 10,
                    player2Score: 7,
                    player2State: "LOSE",
                    player2Image: "../images/player2.png"
                },
                {
                    player1Image: "../images/player1.png",
                    player1State: "LOSE",
                    player1Score: 3,
                    player2Score: 10,
                    player2State: "WIN",
                    player2Image: "../images/player3.png"
                }
            ];

            const page = document.createDocumentFragment();
            page.appendChild(renderLeftBar());
            this.content.className = 'profile';
            this.content.innerHTML = `
                <div class="wrapper">
                    <!-- Profile Container in Center -->
                    <div class="profile-card">
                        <div class="profile-container">
                            <div class="banner">
                                <img src="${profilePicture}" alt="Profile Picture" class="profile-picture">
                            </div>
                            <h1 class="username">${username}</h1>
                            <div class="stats">
                                <div class="stat-box1">
                                    <h3>LEVEL</h3>
                                    <span>${level}</span>
                                </div>
                                <div class="stat-box2">
                                    <h3>RANK</h3>
                                    <img src="${rankImage}" class="rank-badge" alt="Rank Badge">
                                </div>
                                <div class="stat-box3">
                                    <h3>SCORE</h3>
                                    <h1 class="game-player">Game Played</h1>
                                    <span class="n-game">${gamesPlayed}</span>
                                    <h1 class="game-win">WIN</h1>
                                    <span class="n-win">${wins}</span>
                                    <h1 class="game-lose">LOSE</h1>
                                    <span class="n-lose">${losses}</span>
                                </div>
                            </div>
                            <div class="win-rate">
                                <h2>WIN RATE</h2>
                                <div class="circle">
                                    <p>${winRate}</p>
                                </div>
                            </div>
                            <div class="match-history">
                                <h2>MATCH HISTORY</h2>
                                <div class="matches">
                                    ${matchHistory.map(match => `
                                        <div class="match">
                                            <img src="${match.player1Image}" alt="Player 1" class="player-icon">
                                            <p class="p1-state ${match.player1State.toLowerCase()}">${match.player1State}</p>
                                            <p class="score1">${match.player1Score}</p>
                                            <p class="vs">vs</p>
                                            <p class="score2">${match.player2Score}</p>
                                            <p class="p2-state ${match.player2State.toLowerCase()}">${match.player2State}</p>
                                            <img src="${match.player2Image}" alt="Player 2" class="player-icon">
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            page.appendChild(this.content);

            // Render right bar
            page.appendChild(renderRightBar());
            const winRateElement = this.content.querySelector('.win-rate .circle p');
            const totalGames = wins + losses;
            const winRateValue =  ((wins / totalGames) * 100).toFixed(1);
            winRateElement.textContent = `${winRateValue}%`;
            return page;
        }
    }

    export function renderProfile() {
        console.log('render Profile page');
        const page = new Profile();
        return page.render();
    }