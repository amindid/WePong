// import { BodyComponent } from './component.js';
import { renderRightBar } from './right-bar.js';
import { renderLeftBar } from './left-bar.js';


class Profile
{
	content = document.createElement('span');
	constructor()
	{
	}
	async fetchUsername() {
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
	render()
	{
		const page = document.createDocumentFragment();
		page.appendChild(renderLeftBar());
		this.content.className = 'container';
		this.content.innerHTML = `
			<div id="profile">
				<img id="topimage" src="../images/1808a5d9274422bd26e9cc4cf1204bc0.png">
				<img id="profilePic" src="../images/54f4e3933f3e8fc98452010f6578888a.png">
				<div id="username">
				</div>
				<div id="profileCards">
					<div class="profileCard">
						<div class="profileCardTitle">played</div>
							<div id="playerLevel">10</div>
					</div>
					<div class="profileCard">
						<div class="profileCardTitle">win</div>
						<div id="playerLevel">10</div>
					</div>
					<div class="profileCard">
						<div class="profileCardTitle">lose</div>
						<div id="playerLevel">10</div>
					</div>
				</div>
				<div class="profileTitle">win rate</div>
				<div class="winRate">100%</div>
			</div>
		`;
		page.appendChild(this.content);
		const usernameElement = page.querySelector('#username');
		this.fetchUsername().then(username => {
            if (usernameElement) {
                usernameElement.textContent = username; // Insert fetched username
            }
		});
		page.appendChild(renderRightBar());
		const body = document.body
		body.style.alignItems = 'center';
		return page;
	}
}

export function renderProfile() {
	const page = new Profile();
	return page.render();
}
