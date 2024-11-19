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
            <div class="game_online">
                <div class="chrono">
                    <h1> 32 </h1>
                </div>
                <div class="img_vs_img">
                    <div class="vs">
                        <img id="player-imag-1"  alt="Player Image" >
                    </div>
                    <div class="vs">
                        <h1> vs </h1>
                    </div>
                    <div class="vs" >
						<img id="player-imag-2"  alt="Player Image" >
					</div>
                </div>
                <div class="quit_play">
                    <button class="buuton_quit_play" id="quit-play-online">QUIT</button>
                </div>
            </div>
        `;
        page.appendChild(this.content);
        const body = document.body;
        body.style.alignItems = 'center';

        // let image = this.content.querySelector("#player-imag-1");
        // let username;
        

        
	
		this.setPlayerImage().then(data => {
			if (data) {
				let image = this.content.querySelector("#player-imag-1");
				image.src = data.avatar;
				this.create_socket(data.id);
				
			} else {
				console.log('Failed to retrieve user ID');
			}
		});
		


        const quit = this.content.querySelector("#quit-play-online");
        quit.addEventListener('click', event => {
            event.preventDefault();
            if (this.socket) {
				console.log("disconect socket");
                this.socket.close();
            }
            navigate('/dashboard');  
        });

        return page;
    }
}

export function rendergameonline() {
    const page = new GameOnline();
    return page.render();
}
