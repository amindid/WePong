
import { Card } from './card_component.js';

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
		const fireball = {
			background: 'linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7) , rgba(233, 82, 51, 1))',
			name: 'FIRE ',
			type: 'BALL',
			price: '200 $',
			imgSrc: '../images/org-ball.png',
			width: '75%',
			color:'rgb(174, 50, 28)'
		};
		const neonball = {
			background: 'linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7) , rgba(255, 0, 245, 1))',
			name: 'NEON ',
			type: 'BALL',
			price: '300 $',
			imgSrc: '../images/nean-ball.png',
			width: '100%',
			color:'rgba(162, 9, 158, 1)'
		};
		const waterball = {
			background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.7) 50%, #0CC5FF 100%)',
			name: 'Water ',
			type: 'BALL',
			price: '400 $',
			imgSrc: '../images/BLUE-BALL.png',
			width: '75%',
			color:'rgba(12, 109, 149, 1)'
		};
		const earthball = {
			background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.7) 50%, #00FF38 100%)',
			name: 'EARTH ',
			type: 'BALL',
			price: '500 $',
			imgSrc: '../images/EARTH-BALL(1).png',
			width: '75%',
			color:'rgba(5, 158, 41, 1)'
		};

		function createCard(data) {
			const cardElement = document.createElement('card-element');
			cardElement.style.background = data.background;
			cardElement.set_value(data.name, data.price, data.imgSrc, data.width, data.color, data.type);
			
			document.getElementById('card-ball-container').appendChild(cardElement);
		}
		createCard(fireball);
		createCard(neonball);
		createCard(waterball);
		createCard(earthball);
	}
}

customElements.define("ballcards-element", BallCardsComponent);