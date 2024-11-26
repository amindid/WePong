// import { HomePage } from './homePage.js';
// import { LoginPage } from './login.js';
// import { RegistrationPage } from './registration.js';
// import { Dashboard } from './dashboard.js';
// import { Test } from './test.js'

import { renderDashboard } from './dashboard.js';
import { renderHomePage } from './homePage.js';
import { renderLoginPage } from './login.js';
import { renderPlayMods } from './play-mods.js';
import { renderRegistrationPage } from './registration.js';
import { renderResetPasswordPage } from './reset_password.js';
import { renderShop } from './shop.js';
import { rendertournamant } from './tournament.js';
import { renderCreateTournament } from './create_tou.js';
import { renderFourPlayers } from './four_players.js';
import { renderEightPlayers } from './eight_players.js';
import { renderJoinTournament } from './list_tou.js';
import { renderSettings } from './settings.js';
import { renderTwoFaConfirmationPage } from './2fa_confirmation.js'
import { renderProfile } from './profile.js'
import { renderFriendList } from './friend_list.js'

import { rendergameonline } from './game_online.js';
import { renderFournames } from './four_names.js';
import { rendertestmatch } from './test_match.js';
import { renderEightnames } from './eight_names.js';
import { renderLocalGame } from './local-game.js';
import { renderGamePlay } from './game-play.js';
import { renderNotFoundPage } from './not-found.js'; // Import the Not Found component
// import { renderProfile } from './profile.js';
// import { renderFriends } from './friends.js';
// export function router() {
//     const routes = {
//         '/': HomePage,
//         '/login': LoginPage,
//         '/register': RegistrationPage,
//         '/dashboard': Dashboard,
//     };

//     const path = window.location.pathname;
//     const PageComponent = routes[path] || HomePage;

//     // Clear the current page content
//     document.body.innerHTML = '';

//     // Append the new page component
//     const page = new PageComponent();
//     document.body.appendChild(page);
// }

// // Listen for changes in the URL
// window.addEventListener('popstate', router);

// // Initial page load
// document.addEventListener('DOMContentLoaded', router);


// import { HomePage } from './homePage.js';
// import { LoginPage } from './login.js';
// import { RegistrationPage } from './registration.js';
// import { Dashboard } from './dashboard.js';
// import { Test } from './test.js';

// export function router() {
//     const routes = {
//         '/': HomePage,
//         '/login': LoginPage,
//         '/register': RegistrationPage,
//         '/dashboard': Dashboard,
//         '/test': Test,
//     };

//     const path = window.location.pathname;
//     const PageComponent = routes[path] || HomePage;

//     // Clear existing content
//     document.getElementById('body-center').innerHTML = '';

//     // Append the new page component
//     const page = new PageComponent();
//     document.getElementById('body-center').appendChild(page);
// }

// // Listen for changes in the URL
// window.addEventListener('popstate', router);

// // Initial page load
// document.addEventListener('DOMContentLoaded', () => {
//     // Setup initial navigation link listeners
//     document.querySelectorAll('a[data-link]').forEach(link => {
//         link.addEventListener('click', (event) => {
//             event.preventDefault(); // Prevent default anchor behavior
//             const path = link.getAttribute('href');
//             window.history.pushState({}, '', path); // Update the URL
//             router(); // Call the router to update the view
//         });
//     });

//     router(); // Initial page load
// });


// const Router = {
//     init: () => {
//         document.querySelectorAll("a.link").forEach(a => {
//             a.addEventListener("click", event => {
//                 event.preventDefault();
//                 console.log("link clicked");
//                 const url = event.target.getAttribute("href");
//                 Router.go(url);
//             });
//         })
//         window.addEventListener("popstate", event => {
//             Router.go(event.state.route, false);
//         })
//         Router.go(location.pathname);
//     },

//     go: (route, addToHistory=true) => {
//         console.log(`going to ${route}`);
//         if (addToHistory) {
//             history.pushState({route}, '',route);
//         }
//         let pageElement = null;
//         switch (route) {
//             case "/":
//                 pageElement = document.createElement("h1");
//                 pageElement.textContent = "menu";
//                 break;
//             case "order":
//                 pageElement = document.createElement("h1");
//                 pageElement.textContent = "order";
//                 break;
//             default:
//                 if (route.startsWith("/product-")) {
//                     pageElement = document.createElement("h1");
//                     pageElement.textContent = "Details";
//                     const paramId = route.substring(route.lastIndexOf("-")+1);
//                     pageElement.dataset.id = paramId;
//                 }
//         }
//         if (pageElement) {
//             document.querySelector("main").innerHTML = "";
//             document.querySelector("main").appendChild(pageElement);
//             window.scrollX = 0;
//             window.scrollY = 0;
//         }
//     }
// }
// export default Router;
export { renderHomePage } from './homePage.js';
export { renderDashboard } from './dashboard.js';
export { renderRegistrationPage } from './registration.js';
export { renderLoginPage } from './login.js';
export { renderResetPasswordPage } from './reset_password.js';
export { renderShop } from './shop.js'
import { renderChat } from './chat.js';
export { rendertournamant } from './tournament.js'
export { renderCreateTournament } from './create_tou.js'
export { renderFourPlayers } from './four_players.js'
export { renderEightPlayers } from './eight_players.js'
export { renderJoinTournament } from './list_tou.js'
export { renderSettings } from './settings.js'
import { showAlert } from './message-box.js';
export { renderProfile } from './profile.js';
export { rendergameonline } from './game_online.js';
export { renderFournames } from './four_names.js';
export { rendertestmatch } from './test_match.js';
export { renderEightnames } from './eight_names.js';
export { renderLocalGame } from './local-game.js';
export { renderGamePlay } from './game-play.js';
// export {renderProfile} from './profile.js';
// export {renderFriends} from './friends.js';

/*
    data = {
        page: html,
        unregister: () => {}
    }

    let prevData = null

    renderPage(data) {

        if (prevData) prevData.unregister()
        prevData = data
    }
*/


export const logedUser = {
    id: null,
    username: null,
    email: null,
    avatar: null,
    notificationSocket: null,
    wallet: null,
    statusSocket: null, // Add this
    activeUsers : null,
}

// Add connection setup function
async function setupUserStatusSocket() {
    if (logedUser.id && !logedUser.statusSocket) {
        console.log('Setting up user status socket');
        logedUser.statusSocket = new WebSocket(`ws://localhost:8000/ws/status/`);

        logedUser.statusSocket.onopen = () => {
            console.log("==============>Status connection established");
        };

        logedUser.statusSocket.onclose = () => {
            console.log("==============>Status connection closed");
            logedUser.statusSocket = null;
        };

        logedUser.statusSocket.onmessage = async (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'active_users_list')
                logedUser.activeUsers = new Set(data.active_users);
        };
    }
}

function renderPage(page) {
    document.body.innerHTML = '';
    document.body.appendChild(page);
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('message')) {
        const message_text = urlParams.get('message');
        showAlert(message_text);
    }
}

export function navigate(route, param = null) {
    if (param !== null)
        history.pushState({}, '', route + '?user='+param);
    else
        history.pushState({}, '', route);
    loadPage(route).then(() => {
        console.log('Navigation to', route, 'was successful.');
    }).catch((error) => {
        console.error('Error during navigation:',error);
    });
}

async function ask_refreshing_token() {
    try {
        const response = await fetch('http://localhost:8000/api/users/refresh/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.ok) {
            console.log('refresh token successful');
            return true;
        }
        else {
            console.log('refresh token failed');
            return false;
        }

    } catch (error) {
        console.log('erroooooooor',error);
        return false;
    }
}

async function loadPage(route) {
    const startRoutes = {   '/': renderHomePage,
                            '/login': renderLoginPage,
                            '/register': renderRegistrationPage,
                            '/password_reset': renderResetPasswordPage,
                            '/2fa_confirmation': renderTwoFaConfirmationPage,
                            // '/local-game' : renderLocalGame,
                            // '/game-play' : renderGamePlay
                            };

    const secretRoutes = {  '/dashboard': renderDashboard,
                            '/shop' : renderShop,
                            '/chat': renderChat,
                            '/tournement' : rendertournamant,
                            '/tournement/fournames' : renderFournames,
                            '/tournement/eightnames' : renderEightnames,
                            '/tournement/create' : renderCreateTournament,
                            '/tournement/Fourplayers' : renderFourPlayers,
							'/tournement/Eightplayers' : renderEightPlayers,
                            '/tournement/join' : renderJoinTournament,
							'/settings' : renderSettings,
							'/profile' : renderProfile,
							'/friendList' : renderFriendList,
							'/game-online' : rendergameonline,
							'/tournement/test_match' : rendertestmatch ,
                            '/local-game' : renderLocalGame,
                            '/game-play' : renderGamePlay,
                            // '/profile' : renderProfile , 
                            // '/friends' : renderFriends ,
						};
    let isAuthenticated = false;
    try {
        const response = await fetch('http://localhost:8000/api/users/checkAuthentication/', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.ok) {
            isAuthenticated = true;
            await fetchLoggedUser();
            await setupUserStatusSocket();
            console.log("active users list: ", logedUser.activeUsers);
        } else {
            const data = await response.json();
            if (data.error === 'token expired')
                isAuthenticated = await ask_refreshing_token();
            console.log('eeeeeeeeerror: ' , data.detail);
        }
    } catch(error) {
        console.log('Authentication check error:',error);
        isAuthenticated = false;
    }

    if (startRoutes[route]) {
        if (isAuthenticated) {
            history.pushState({}, '', '/dashboard');
            return renderPage(secretRoutes['/dashboard']());
        }
        return renderPage(startRoutes[route]());
    }
    else if (secretRoutes[route]) {
        if (isAuthenticated){
            const page = await secretRoutes[route]();
            return renderPage(page);
        }
        history.pushState({}, '', '/login');
        return renderPage(startRoutes['/login']());
    }
    else {
        return renderPage(renderNotFoundPage());
    }
}

async function fetchLoggedUser() {
    try {
        const response = await fetch('http://localhost:8000/api/users/userProfile/', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.ok) {
            const data = await response.json();
            logedUser.id = data.id;
            logedUser.username = data.username;
            logedUser.email = data.email;
            logedUser.avatar = data.avatar;
            logedUser.wallet = data.wallet;
        } else {
            console.log('Error fetching logged user:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching logged user:', error);
    }
}

// Add cleanup function for logout
export function cleanupUserSockets() {
    if (logedUser.statusSocket) {
        logedUser.statusSocket.close();
        logedUser.statusSocket = null;
    }
    // Clear user data
    logedUser.id = null;
    logedUser.username = null;
    logedUser.email = null;
    logedUser.avatar = null;
    logedUser.wallet = null;
    logedUser.activeUsers = null;
}

window.onpopstate = async () => {
   await loadPage(location.pathname);
}

window.onload = async () => {
    await loadPage(location.pathname || '/');
};

