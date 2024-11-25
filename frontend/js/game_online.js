import { showAlert } from './message-box.js';
import { navigate } from './router.js';

class GameOnline {
    content = document.createElement('span');
    socket = null;
	user_id;
    constructor() {}
	setPlayerImage = async () => {
		try {
			const response = await fetch('http://localhost:8000/api/users/userProfile/', {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				}
			});
			const data = await response.json();
			if (response.ok) {
				
				console.log("current id >>", data.id);
				// username = data.username;
				return data;
			} else {
				showAlert(data.error || 'failed to load user image');
				console.log(data.error || 'failed to load user image');
				return null;
			}
		} catch (error) {
			showAlert(error || 'failed to fetch user profile ==> error: ');
			console.log('failed to fetch user profile ==> error: ', error);
			return null;
		}
	};

    create_socket(user_idd) {
        this.socket = new WebSocket(`ws://127.0.0.1:2100/ws/game_online/`);


        this.socket.addEventListener('open', () => {
            console.log('WebSocket is connected.');
            // console.log(user_idd);
			
            const message = {
                'type': 'play_online',
                'user_id': user_idd
            };
            this.socket.send(JSON.stringify(message));
        });

        this.socket.addEventListener('message', async (event) => {
            const data = JSON.parse(event.data);
			console.log("message from server >> " , data);
   			showAlert('Message from server: ' + data.message);
			console.log("userid to fetch =====>>>> ", data.user_id);
			   if (data.user_id != null) {
				try {
					const response = await fetch(`http://localhost:8000/api/users/ProfileById/?friend=${data.user_id}`, {
						method: 'GET',
						credentials: 'include',
						headers: {
							'Content-Type': 'application/json',
						}
					});
		
					const userData = await response.json();
		
					if (response.ok) {
						let imgage = this.content.querySelector('#player-imag-2');
						console.log("imageeee2 >" , userData.avatar);
						console.log("name2 >" , userData);
						imgage.src = userData.avatar;
						
					} else {
						showAlert(userData.error || 'Failed to load second user data');
						console.log(userData.error || 'Failed to load second user data');
					}
				} catch (error) {
					showAlert(error || 'Failed to fetch second user profile ==> error: ');
					console.log('Failed to fetch second user profile ==> error: ', error);
				}
			}
        });

        this.socket.addEventListener('close', () => {
            console.log('WebSocket is closed.');
        });

        this.socket.addEventListener('error', (error) => {
            console.error('WebSocket error:', error);
        });
    }

	render() {
		const page = document.createDocumentFragment();
		const message = document.createElement('div');
		message.id = 'alert-box';
		message.className = 'alert-box';
		page.appendChild(message);
	
		this.content.className = 'game_online';
		this.content.innerHTML = `
			<div class="coming-soon-wrapper">
			<div class="overlay"></div>
				<video autoplay muted loop id="bg-video">
        			<source src="../images/bg.mp4" type="video/mp4">
        		Your browser does not support the video tag.
    				</video>
					<audio autoplay loop id="bg-music">
						<source src="../images/music/bg.mp3" type="audio/mp3">
						Your browser does not support the audio tag.
					</audio>
				<div class="coming-soon-content">
					<h1 class="coming-soon-title">Comming Soon ..</h1>
					<p class="coming-soon-subtitle">makaynch hdchi db</p>
					<div class="loader">
						<div class="dot"></div>
						<div class="dot"></div>
						<div class="dot"></div>
					</div>
					</div>
					<btn class="btn-return" id="btn-return">Go Back</btn>
			</div>
		`;

	
		page.appendChild(this.content);
		const btnReturn = this.content.querySelector('#btn-return');
		btnReturn.addEventListener('click', () => {
			navigate('/');
		});
		return page;
	}
	
}

export function rendergameonline() {
    const page = new GameOnline();
    return page.render();
}
