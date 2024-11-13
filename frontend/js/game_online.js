import { showAlert } from './message-box.js';
import { navigate } from './router.js';

class GameOnline {
    content = document.createElement('span');
    socket = null;
    constructor() {}

    create_socket(user_idd) {
        this.socket = new WebSocket(`ws://127.0.0.1:2100/ws/game_online/`);
        console.log("create socket");


        this.socket.addEventListener('open', () => {
            console.log('WebSocket is connected.');
            // console.log(user_idd);
			
            const message = {
                'type': 'play_online',
                'user_id': user_idd
            };
            this.socket.send(JSON.stringify(message));
        });

        this.socket.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
			console.log("message from server >> " , data);
   			showAlert('Message from server: ' + data.message);
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
                    <div class="vs"> </div>
                </div>
                <div class="quit_play">
                    <button class="buuton_quit_play" id="quit-play-online">QUIT</button>
                </div>
            </div>
        `;
        page.appendChild(this.content);
        const body = document.body;
        body.style.alignItems = 'center';

        let image = this.content.querySelector("#player-imag-1");
        let username;
        let user_id;

        const setPlayerImage = async () => {
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
                    // console.log('after await');
                    image.src = data.avatar;
                    user_id = data.id;
                    username = data.username;
                    // console.log("end fetch");
                    this.create_socket(user_id);
                } else {
                    showAlert(data.error || 'failed to load user image');
                    console.log(data.error || 'failed to load user image');
                }
            } catch (error) {
                showAlert(error || 'failed to fetch user profile ==> error: ');
                console.log('failed to fetch user profile ==> error: ', error);
            }
        };
        setPlayerImage();

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
