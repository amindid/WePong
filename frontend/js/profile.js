import { navigate } from "./router.js";
import { renderRightBar } from './right-bar.js';
import { renderLeftBar } from './left-bar.js';

class Profile {
    content = document.createElement('div');

    constructor() {}

    async fetchUserName() {
        try {
            const response = await fetch('http://localhost:8000/api/users/userProfile/', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            const data = await response.json();
            return data.username;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            return 'Guest';
        }
    }

    // fetch user profile picture
    async fetchAvatar() {
        try {
            const response = await fetch('http://localhost:8000/api/users/userProfile/', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }

            const data = await response.json();
            return data.avatar;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            return 'images/profile.png';
        }
    }

    // Fetch match history
    async fetchMatchHistory() {
        try {
            const response = await fetch('http://localhost:8000/api/users/UserMatchHistory/', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }

            const data = await response.json();
            console.log("Match History: ", data);
            return data || []; 
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            return [];
        }
    }


        /* UPDATES LI DARO : 
        1 = TBDL UI 
        2 = TZADO APIS DYAL FETCH USERNAME AVATAR W MATCH HISTORY
        3 = GAME PLAYED RAH DYNAMIC HOW W WIN RATE
        --- ACH KHAS YTZAD :
        API LI KAYJIB MATCHHISTORY YTZAD FIH PROFILE PIC DYAL KOLA WAHD + STATS WACH GAME SALAT BWIN WLA LOSES 
        LEVEL DYAL PLAYER WCH HANKHLIWH FIX BHAL MATALAN 1337 WKHOIUHA ELA KLKCHI 
        T UDAPTE WIN W LOSE B DATA I JAYA MN API 
        DOK NAV BAR MAEFTCH KI KADIRO TRENDWIWHOM MACHI RESPONSIVE 
        */
    async render() {
        const level = 10;
        let wins = 10; // fch hatzid dok stats dyal user hatytgado hado
        let losses = 10;

        const page = document.createDocumentFragment();
        page.appendChild(renderLeftBar());

        this.content.className = 'profile';
        this.content.innerHTML = `
            <div class="wrapper">
                <div class="profile-card">
                    <div class="profile-container">
                        <div class="banner">
                            <img src="" alt="Profile Picture" class="profile-picture">
                        </div>
                        <h1 class="username"></h1>
                        <div class="stats">
                            <div class="stat-box1">
                                <h3>LEVEL</h3>
                                <span>${level}</span>
                            </div>
                            <div class="stat-box3">
                                <h3>SCORE</h3>
                                <h1 class="game-player">Game Played</h1>
                                <span class="n-game"></span>
                                <div class="game-win-lose">
                                    <h1 class="game-win">WIN</h1>
                                    <span class="n-win">${wins}</span>
                                    <h1 class="game-lose">LOSE</h1>
                                    <span class="n-lose">${losses}</span>
                                </div>
                            </div>
                        </div>
                        <div class="win-rate">
                            <h2>WIN RATE</h2>
                            <div class="circle">
                                <p>0%</p>
                            </div>
                        </div>
                        <div class="match-history">
                            <h2>MATCH HISTORY</h2>
                            <div class="matches"></div> <!-- Matches will be dynamically added here -->
                        </div>
                    </div>
                </div>
            </div>
        `;

        page.appendChild(this.content);

        const username = await this.fetchUserName();
        const usernameElement = this.content.querySelector('.username');
        usernameElement.textContent = username;

        const avatar = await this.fetchAvatar();
        const avatarElement = this.content.querySelector('.profile-picture');
        avatarElement.src = avatar;

        const matchHistory = await this.fetchMatchHistory();
        const nGame = this.content.querySelector('.n-game');
        nGame.textContent = matchHistory.length;
        const matchesContainer = this.content.querySelector('.matches');
        // hna hta tzid lia fields f api dyal userMatchHistory dyal player1state, player2state, player1image, player2image 
        matchesContainer.innerHTML = matchHistory.map(match => `
            <div class="match">
                <img src="${match.match_data.player1Image}" alt="Player 1" class="player-icon">
                <p class="p1-state ${match.match_data.player1State}">${match.match_data.player1State}</p>
                <p class="score1">${match.match_data.player1score}</p>
                <p class="vss">vs</p>
                <p class="score2">${match.match_data.player2score}</p>
                <p class="p2-state ${match.match_data.player2State}">${match.match_data.player2State}</p>
                <img src="${match.match_data.player2Image}" alt="Player 2" class="player-icon">
            </div>
        `).join('');

        const winRateElement = this.content.querySelector('.win-rate .circle p');
        const totalGames = wins + losses;
        const winRateValue = ((wins / totalGames) * 100).toFixed(1);
        winRateElement.textContent = `${winRateValue}%`;

        page.appendChild(renderRightBar());

        return page;
    }
}

export function renderProfile() {
    console.log('render Profile page');
    const page = new Profile();
    return page.render();
}
