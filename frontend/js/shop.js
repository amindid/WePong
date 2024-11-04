// import { BodyComponent } from './component.js';
import { renderRightBar } from './right-bar.js';
import { renderLeftBar } from './left-bar.js';
import { BallCardsComponent } from './balls_card_component.js';
import { PadlleCardsComponent } from './padlle_card_component.js';
import { navigate } from './router.js';
class Shop
{
	content = document.createElement('span');
	// test.className = 'shop-ball';
	
	constructor()
	{
	}
	render()
	{
		const page = document.createDocumentFragment();
		page.appendChild(renderLeftBar());
		// const content = document.createElement('span');
		this.content.className = 'section2-2-2';
		this.content.innerHTML = `
		<div id="div1">
			<div id="pong-shop">
				<img src="../images/Vector.svg" alt="Vector" height="100%">
				<div id="pong">
					<h1> PONG </h1>
				</div>
				<div id="shop">
					<h1> SHOP </h1>
				</div>
			</div>
			<div id="img">
				<img src="../images/Rectangle 4.jpg" alt="Rectangle" height="100%" width="70%">
			</div>
		</div>
		<div id="div2">
			<div id="div2-1">
				<div class="right-line">
					<div class="line"></div>
					<div class="circlee"></div>
				</div>
				<div id="balls">
					<h1> BALLS </h1>
				</div>
				<div class="right-line">
					<div class="circlee"></div>
					<div class="line"></div>
				</div>
			</div>
			<ballcards-element>
			</ballcards-element>
		</div>
		<div id="div3">
			<div id="div2-1">
				<div class="right-line">
					<div class="line"></div>
					<div class="circlee"></div>
				</div>
				<div id="balls">
					<h1> PADLLE </h1>
				</div>
				<div class="right-line">
					<div class="circlee"></div>
					<div class="line"></div>
				</div>
			</div>
			<padllelcards-element>
			</padllelcards-element>
		</div>`;
		page.appendChild(this.content)
		page.appendChild(renderRightBar());
		const body = document.body
		body.style.alignItems = 'center';
		return page;
	}
	
}

export function renderShop() {
	const page = new Shop();
	return page.render();
}

// customElements.define("shop-element", Shop);





// <div id="div2-1">
// 				<div class="right-line">
// 					<div class="line"></div>
// 					<div class="circlee"></div>
// 				</div>
// 				<div id="balls">
// 					<h1> BALLS </h1>
// 				</div>
// 				<div class="right-line">
// 					<div class="circlee"></div>
// 					<div class="line"></div>
// 				</div>
// 			</div>
// 			<div id="shop-ball">
// 				<div class="icons_ org">
// 					<div id="img-ball">
// 						<img src="../images/org-ball.png" alt="Mask" width="40%">
// 					</div>
// 					<div id="type-ball">
// 						<div id="type-ball-1">
// 							<div id="fire-ball">
// 								<div id="fire-ball-1">
// 									<h1> FIRE </h1>
// 								</div>
// 								<div id="fire-ball-2">
// 									<h1> BALL </h1>
// 								</div>
// 							</div>
// 							<div id="fire-ball-3">
// 								<h3> ball </h3>
// 							</div>
// 						</div>
// 						<div id="type-ball-2">
// 							<div id="price">
// 								<h3> 200 $</h3>
// 							</div>
// 							<div id="buy">
// 								<div id="buy-fire">
// 									<h3>buy</h3>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 				<div class="icons_ rs">
// 					<div id="img-ball">
// 						<img src="../images/nean-ball.png" alt="Mask" width="50%">
// 					</div>
// 					<div id="type-ball">
// 						<div id="type-ball-1">
// 							<div id="fire-ball">
// 								<div id="neon-ball-1">
// 									<h1> NEON </h1>
// 								</div>
// 								<div id="fire-ball-2">
// 									<h1> BALL </h1>
// 								</div>
// 							</div>
// 							<div id="fire-ball-3">
// 								<h3> ball </h3>
// 							</div>
// 						</div>
// 						<div id="type-ball-2">
// 							<div id="price">
// 								<h3> 300 $</h3>
// 							</div>
// 							<div id="buy">
// 								<div id="buy-neon">
// 									<h3>buy</h3>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 				<div class="icons_ blu">
// 					<div id="img-ball">
// 						<img src="../images/BLUE-BALL.png" alt="Mask" width="40%">
// 					</div>
// 					<div id="type-ball">
// 						<div id="type-ball-1">
// 							<div id="fire-ball">
// 								<div id="water-ball-1">
// 									<h1> WATER </h1>
// 								</div>
// 								<div id="fire-ball-2">
// 									<h1> BALL </h1>
// 								</div>
// 							</div>
// 							<div id="fire-ball-3">
// 								<h3> ball </h3>
// 							</div>
// 						</div>
// 						<div id="type-ball-2">
// 							<div id="price">
// 								<h3> 400 $</h3>
// 							</div>
// 							<div id="buy">
// 								<div id="buy-water">
// 									<h3>buy</h3>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 				<div class="icons_ grn">
// 					<div id="img-ball">
// 						<img src="../images/EARTH-BALL(1).png" alt="Mask" width="40%"> 
// 					</div>
// 					<div id="type-ball">
// 						<div id="type-ball-1">
// 							<div id="fire-ball">
// 								<div id="earth-ball-1">
// 									<h1> EARTH </h1>
// 								</div>
// 								<div id="fire-ball-2">
// 									<h1> BALL </h1>
// 								</div>
// 							</div>
// 							<div id="fire-ball-3">
// 								<h3> ball </h3>
// 							</div>
// 						</div>
// 						<div id="type-ball-2">
// 							<div id="price">
// 								<h3> 500 $</h3>
// 							</div>
// 							<div id="buy">
// 								<div id="buy-earth">
// 									<h3>buy</h3>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>


// <div id="div2-1">
// 				<div class="right-line">
// 					<div class="line"></div>
// 					<div class="circlee"></div>
// 				</div>
// 				<div id="balls">
// 					<h1> PADLLE </h1>
// 				</div>
// 				<div class="right-line">
// 					<div class="circlee"></div>
// 					<div class="line"></div>
// 				</div>
// 			</div>
// 			<div id="shop-ball">
// 				<div class="icons_ org">
// 					<div id="img-ball">
// 						<img src="../images/Rectangle 6.png" alt="Mask" width="80%">
// 					</div>
// 					<div id="type-ball">
// 						<div id="type-ball-1">
// 							<div id="fire-ball">
// 								<div id="fire-ball-1">
// 									<h1> FIRE </h1>
// 								</div>
// 								<div id="fire-ball-2">
// 									<h1> PAD </h1>
// 								</div>
// 							</div>
// 							<div id="fire-ball-3">
// 								<h3> padlle </h3>
// 							</div>
// 						</div>
// 						<div id="type-ball-2">
// 							<div id="price">
// 								<h3> 200 $</h3>
// 							</div>
// 							<div id="buy">
// 								<div id="buy-fire">
// 									<h3>buy</h3>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 				<div class="icons_ rs">
// 					<div id="img-ball">
// 						<img src="../images/Rectangle 6(1).png" alt="Mask" width="65%">
// 					</div>
// 					<div id="type-ball">
// 						<div id="type-ball-1">
// 							<div id="fire-ball">
// 								<div id="neon-ball-1">
// 									<h1> NEON </h1>
// 								</div>
// 								<div id="fire-ball-2">
// 									<h1> PAD </h1>
// 								</div>
// 							</div>
// 							<div id="fire-ball-3">
// 								<h3> padlle </h3>
// 							</div>
// 						</div>
// 						<div id="type-ball-2">
// 							<div id="price">
// 								<h3> 300 $</h3>
// 							</div>
// 							<div id="buy">
// 								<div id="buy-neon">
// 									<h3>buy</h3>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 				<div class="icons_ blu">
// 					<div id="img-ball">
// 						<img src="../images/Rectangle 6(2).png" alt="Mask" width="65%">
// 					</div>
// 					<div id="type-ball">
// 						<div id="type-ball-1">
// 							<div id="fire-ball">
// 								<div id="water-ball-1">
// 									<h1> WATER </h1>
// 								</div>
// 								<div id="fire-ball-2">
// 									<h1> PAD </h1>
// 								</div>
// 							</div>
// 							<div id="fire-ball-3">
// 								<h3> padlle </h3>
// 							</div>
// 						</div>
// 						<div id="type-ball-2">
// 							<div id="price">
// 								<h3> 400 $</h3>
// 							</div>
// 							<div id="buy">
// 								<div id="buy-water">
// 									<h3>buy</h3>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 				<div class="icons_ grn">
// 					<div id="img-ball">
// 						<img src="../images/Rectangle 6(3).png" alt="Mask" width="80%">
// 					</div>
// 					<div id="type-ball">
// 						<div id="type-ball-1">
// 							<div id="fire-ball">
// 								<div id="earth-ball-1">
// 									<h1> EARTH </h1>
// 								</div>
// 								<div id="fire-ball-2">
// 									<h1> PAD </h1>
// 								</div>
// 							</div>
// 							<div id="fire-ball-3">
// 								<h3> padlle </h3>
// 							</div>
// 						</div>
// 						<div id="type-ball-2">
// 							<div id="price">
// 								<h3> 500 $</h3>
// 							</div>
// 							<div id="buy">
// 								<div id="buy-earth">
// 									<h3>buy</h3>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>