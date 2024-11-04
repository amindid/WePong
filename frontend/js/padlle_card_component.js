
import { Card } from './card_component.js';

export class PadlleCardsComponent extends HTMLElement
{
	constructor()
	{
		super();
		this.innerHTML = `
			<div id="card-padlle-container" class="shop-ball">

			</div>
		`;
	}
	connectedCallback()
	{
		const fireball = {
			background: 'linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7) , rgba(233, 82, 51, 1))',
			name: 'FIRE ',
			type: 'PADDLE',
			price: '200 $',
			imgSrc: '../images/Rectangle 6.png',
			width: '100%',
			color:'rgb(174, 50, 28)'
		};
		const neonball = {
			background: 'linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7) , rgba(255, 0, 245, 1))',
			name: 'NEON ',
			type: 'PADDLE',
			price: '300 $',
			imgSrc: '../images/Rectangle 6(1).png',
			width: '80%',
			color:'rgba(162, 9, 158, 1)'
		};
		const waterball = {
			background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.7) 50%, #0CC5FF 100%)',
			name: 'Water ',
			type: 'PADDLE',
			price: '400 $',
			imgSrc: '../images/Rectangle 6(2).png',
			width: '80%',
			color:'rgba(12, 109, 149, 1)'
		};
		const earthball = {
			background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.7) 50%, #00FF38 100%)',
			name: 'EARTH ',
			type: 'PADDLE',
			price: '500 $',
			imgSrc: '../images/Rectangle 6(3).png',
			width: '100%',
			color:'rgba(5, 158, 41, 1)'
		};

		function createCard(data) {
			const cardElement = document.createElement('card-element');
			cardElement.style.background = data.background;
			cardElement.set_value(data.name, data.price, data.imgSrc, data.width, data.color, data.type);
			
			document.getElementById('card-padlle-container').appendChild(cardElement);
		}
		createCard(fireball);
		createCard(neonball);
		createCard(waterball);
		createCard(earthball);
	}
}

customElements.define("padllelcards-element", PadlleCardsComponent);