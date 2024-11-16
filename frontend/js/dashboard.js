import { renderRightBar } from './right-bar.js';
import { renderLeftBar } from './left-bar.js';
import { renderBodyCenter } from './body_center.js';
import { showAlert } from './message-box.js';
import { navigate } from './router.js';

class Dashboard {
	constructor() {}
	render() {
		this.changebackground()
		const page = document.createDocumentFragment();
		const message = document.createElement('div');
		message.id = 'alert-box';
		message.className = 'alert-box';
		page.appendChild(message);
		page.appendChild(renderLeftBar());
		page.appendChild(renderBodyCenter());
		page.appendChild(renderRightBar());
		let image = page.querySelector("#player-image");
		// let imageleft = page.querySelector("#leftBar-userImage");
		// let imageright = page.querySelector("#rightBar-userImage");
		let username = page.querySelector("#user-name");
		const setPlayerImage = async () => {
			try {
				console.log('befor fetch');
				const response = await fetch('http://localhost:8000/api/users/userProfile/', {
					method: 'GET',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					}
				});
				console.log('after fetch');
				const data = await response.json();
				if (response.ok) {
					console.log('after await');
					image.src = data.avatar;
					// imageleft.src = data.avatar;
					// imageright.src = data.avatar;
					username.textContent = data.username;
					console.log(image.src);
				}
				else {
					showAlert(data.error || 'failed to load user image');
					console.log(data.error || 'failed to load user image');
				}
			} catch (error) {
				showAlert(error || 'failed to fetch user profile ==> error: ');
				console.log('failed to fetch user profile ==> error: ',error);
			}
		};
		setPlayerImage();
		return page;
	}
	changebackground() {
		const body = document.body
		body.style.backgroundImage = "";
		body.style.alignItems = 'unset';
	}
}
export function renderDashboard() {
	const page = new Dashboard();
	return page.render();
}