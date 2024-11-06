

import { showAlert } from './message-box.js';
export class BallCardsComponent extends HTMLElement
{
	constructor()
	{
		super();
		this.innerHTML = `
			<div id="card-ball-container" class="shop-ball">

			</div>
		`;
	}
	connectedCallback()
	{
		const message = document.createElement('div');
		message.id = 'alert-box';
		message.className = 'alert-box';
		this.appendChild(message);


		const fireball = {
			background: 'linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7) , rgba(233, 82, 51, 1))',
			name: 'FIRE ',
			type: 'BALL',
			price: '200',
			imgSrc: '../images/org-ball.png',
			width: '75%',
			color:'rgb(174, 50, 28)'
		};
		const neonball = {
			background: 'linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7) , rgba(255, 0, 245, 1))',
			name: 'NEON ',
			type: 'BALL',
			price: '300',
			imgSrc: '../images/nean-ball.png',
			width: '100%',
			color:'rgba(162, 9, 158, 1)'
		};
		const waterball = {
			background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.7) 50%, #0CC5FF 100%)',
			name: 'Water ',
			type: 'BALL',
			price: '400',
			imgSrc: '../images/BLUE-BALL.png',
			width: '75%',
			color:'rgba(12, 109, 149, 1)'
		};
		const earthball = {
			background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.7) 50%, #00FF38 100%)',
			name: 'EARTH ',
			type: 'BALL',
			price: '500',
			imgSrc: '../images/EARTH-BALL(1).png',
			width: '75%',
			color:'rgba(5, 158, 41, 1)'
		};
		let wallet = 0;
		const fetch_data = async () => {
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
				wallet = data.wallet;
				console.log("###############");
				console.log("wallet:" , data.wallet);
				console.log("###############");
				// wallet += amount
				return data;
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

	async function updateWallet(amount) {
		const response = await fetch('http://localhost:8000/api/users/UpdateWallet/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify({ amount: amount })
		});
	
		const data = await response.json();
		if (response.ok) {
			console.log('Wallet updated:', data);
		} else {
			console.error('Error updating wallet:', data);
		}
	}
	


	function createCard(data) {
		const cardElement = document.createElement('card-element');
		cardElement.style.background = data.background;
		cardElement.set_value(data.name, data.price, data.imgSrc, data.width, data.color, data.type);
		
		document.getElementById('card-ball-container').appendChild(cardElement);
		
		let btn = cardElement.querySelector("#button_price");
			btn.addEventListener('click', async (event) => {
				event.preventDefault();
				console.log("price",data.price);
				fetch_data().then(walletData=>{
					if (walletData.wallet < data.price)
						showAlert("ssiirr t9awedd tal3ebbb HHHHHHH");
					else
					{
						showAlert("safi rak chrity 9aweeddd HHHHHHH");
						updateWallet(-data.price);
					}
				}).catch(err=>console.log(err))
				// console.log("end fetch");
				// console.log("wallet:" , wallet);
				// console.log("data.price:" , data.price);
			});
	}
	createCard(fireball);
	createCard(neonball);
	createCard(waterball);
	createCard(earthball);
	}
}

customElements.define("ballcards-element", BallCardsComponent);