

export class Card extends HTMLElement {
    constructor() {
        super();
		this.name = "";
		this.imgSrc = "";
		this.price = "";
		this.width = "";
		this.color = "";
		this.type = "";
		this.color22 = "";
		

		// this.attachShadow({ mode: 'open' });
    }
	set_value(new_name, new_price, new_imgSrc, new_widtht, new_color, new_type) {
        this.name = new_name;
		this.price = new_price;
		this.imgSrc = new_imgSrc;
		this.width = new_widtht;
		this.color = new_color;
		this.type = new_type;
		if (this.name == 'FIRE ')
		{
			this.color22 = 'color1'
			this.color1 = 'rgb(174, 50, 28)';
		}
		else if (this.name == 'NEON ')
		{
			this.color22 = 'color2'
			this.color2 = 'rgba(162, 9, 158, 1)';
		}
		else if (this.name == 'Water ')
		{
			this.color22 = 'color3'
			this.color3 = 'rgba(12, 109, 149, 1)'
		}
		else if (this.name == 'EARTH ')
		{
			this.color22 = 'color4'
			this.color4 = 'rgba(5, 158, 41, 1)'
		}
		this.render();
    }
	// min-height: 200px;
	// min-width: 150px;
	render()
	{
		this.innerHTML = `
		<style>
			.card {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				width: 80%;
				height: 80%;
				border-radius: 20px;
				
			}
			.img_class {
				width: 100%;
				height: 40%;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.h_class {
				width: 100%;
				height: 15%;
				font-size: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.color {
				color: white;
				font-size: 100%;
			}
			.style_button
			{
				display: flex;
				justify-content: center;
				align-items: center;
				width: 40%;
				height: 60%;
				border-radius: 20px;
				color: white;
				front-size:100%;
			}
			.color1
			{
				
				background:${this.color1};
			}
			.color2
			{
				background:${this.color2};
			}
			.color3
			{
				background:${this.color3};
			}
			.color4
			{
				background:${this.color4};
			}
		</style>
		<div class="card">
			<div class="img_class">
				<img src="${this.imgSrc}" width="${this.width}" >
			</div>
			<div class="h_class">
				<h1 class="color name">${this.name} ${this.type}</h1>
			</div>
			
			<div class="h_class">
				<h3 class="color price">${this.price}</h3>
			</div>
			<div class="h_class ">
				<button class="style_button ${this.color22}">buy</button>
			</div>
		</div>
	`;
	}
}
customElements.define("card-element", Card);
