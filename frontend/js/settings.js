import { renderRightBar } from './right-bar.js';
import { renderLeftBar } from './left-bar.js';
import { navigate } from './router.js';
import { showAlert } from './message-box.js';


class SettingComponent
{

	content = document.createElement('span');
	// content1 = document.createElement('span');
	// content2 = document.createElement('span');

	constructor()
	{
		this.content.className = 'settings';
		this.content.innerHTML = `
			<div class="settings1 container1" id="container1">
				<div class="img_">
					<div class="div1_">
						<div class="div2_">
							<div class="div3_">
								<img src="../images/image-player.svg" alt="profile" width="100%" height="100%">
							</div>
						</div>
					</div>
				</div>
				<div class="change_profile">
					<img src="../images/Camera.svg" alt="profile" width="70%" height="70%">
				</div>
				<div class="div-account-details">
					<div class="empty"></div>
					<div class="account-details_">
						<div id="plyername">
							<h1 class="display_username_sett"> EMOHAMEDD </h1>
						</div>
						<div id="account-details">
							<div id="print-account-details">
								<h1 > Account details</h1>
							</div>
							<div id="edit">
								<div class="edit_username">
									<h1 class="display_change_username"> change username </h1>
									<input class="input_username" > </input>
								</div>
								<div class="edit_username ">
									<h1 class="display_change_username"> email </h1>
									<input class="input_username"  readonly> </input>
								</div>
								<div class="logout">
									<button class="logout_button">LOG OUT</button>
								</div>
								<div class="delete">
									<button class="logout_button">DELETE ACCOUNT</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="settings1 container2" id="container2">
				<div class="display_setting">
					<h1> SETTINGS </h1>
					<h3> Privacy </h3>
				</div>
				<div class="change_password">
					<div class="password__1 ">
						<h1> Change password </h1>
					</div>
					<div class="password__ ">
						<h1 class="h1_password"> Current password </h1>
						<input class="input_password" > </input>
					</div>
					<div class="password__">
						<h1 class="h1_password"> New password </h1>
						<input class="input_password" > </input>
					</div>
					<div class="password__">
						<h1 class="h1_password"> Confirm password </h1>
						<input class="input_password" > </input>
					</div>
					<div class="password__">
						<button class="button_change_password">CHANGE PASSWORD</button>
					</div>
				</div>
				<div class="twofactory">
					<div class="dispaly_2factory1">
						<h1> Two-Factor authentication</h1>
					</div>
					<div class="dispaly_2factory_">
						<div class="display_secur">
							<h1> Secure your account </h1>
							<h3> Enable 2FA to add an extra layer of security  </h3>
						</div>
						<div class="button_enable2fa">
							<button id="enable2fa" class="button_2fa">ENABLE 2FA </button>
						</div>
					</div>
					
				</div>
			</div>
			`;


	}
	
	render()
	{
		const page = document.createDocumentFragment();
		page.appendChild(renderLeftBar());
		const message = document.createElement('div');
		message.id = 'alert-box';
		message.className = 'alert-box';
		page.appendChild(message);
		const button = document.createElement('div');
		button.className = "dispaly_2factory2";
		button.id = "switch_button";
		button.innerHTML = `
		
		<img src="../images/icon-park-outline_switch.svg" alt="icon" width="100%" height="100%">

		`
		this.content.appendChild(button);
		page.appendChild(this.content)
		page.appendChild(renderRightBar());
		const body = document.body
		body.style.alignItems = 'center';
			
			// if (this.content == this.content1)
			// {
				
			const switc = this.content.querySelector("#switch_button");
			switc.addEventListener('click', event => {
			event.preventDefault();
			// console.log("ttttttttt");
				const container1 = this.content.querySelector("#container1");
				const container2 = this.content.querySelector("#container2");
				if (container1.style.display == 'none')
				{
					container2.style.display = 'none';
					container1.style.display = 'block';
				}
				else
				{
					container2.style.display = 'block';
					container1.style.display = 'none';
				}
			});
			const enable2fa = this.content.querySelector("#enable2fa");
			if (enable2fa) {
				enable2fa.addEventListener('click', async function (event) {
					event.preventDefault();
					const response = await fetch('http://localhost:8000/api/setup_2fa/', {
						method : 'POST',
						credentials: 'include',
					});
					const data = await response.json();
					if (response.ok) {
						showAlert(data.message || 'check check');
					}
					else {
						showAlert(data.error);
					}
				});
			}
			// const switc2 = this.content.querySelector("#switch_button2");
			// if (switc2 !== null)
			// {
			// 	console.log("in condition");
			// 	switc2.addEventListener('click', event => {
			// 		console.log("in condition");
			// 		event.preventDefault();
			// 		this.content.innerHTML = this.content1.innerHTML;
			// 	});
			// }
				
				// if(this.content.innerHTML == this.content2.innerHTML)
				// {
				// }
			// }

			return page;
	}
}


export function renderSettings() {
	const page = new SettingComponent();
	return page.render();
}


// function to_settings2()
// {	
// 	const bodyContent = document.querySelector("setting-component");
// 	fetch('../html/settings2.html')
// 	.then(response => response.text())
// 	.then(data => {
// 		bodyContent.innerHTML = data;
// 	})
// 	.catch(error => {
// 		console.error('Error fetching the HTML file:', error);
// 	});
// }
