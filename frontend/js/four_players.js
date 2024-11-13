import { LeftLine } from "./left_line.js";
import { RightLine } from "./right_line.js";
import { navigate } from './router.js';
import { showAlert } from './message-box.js';

class FourPlayers {
    content = document.createElement('span');
    navigationCancelled = false;

    constructor() {
        // this.state=0;
        // this.timer = null;
        // this.timer = setTimeout(() => {
        //     if(this.state < 3)
        //     {
        //         this.state++;
        //         this.onTimerComplete();
        //     }
        // }, 6000);
    }
    // onTimerComplete() {
    //     navigate('/tournement/test_match');
    // }

    render() {
        const page = document.createDocumentFragment();
        // page.appendChild(renderLeftBar());

        const message = document.createElement('div');
        message.id = 'alert-box';
        message.className = 'alert-box';
        page.appendChild(message);

        // showAlert("the match will start now");

        this.content.className = 'four-players';
        this.content.innerHTML = `
        <div id="TOURNEMENT">
            <div class="line"></div>
            <div class="TOURNEMENT_">
                <h1> TOURNEMENT </h1>
            </div>
            <div class="line"></div>
        </div>
        <div id="tour_4_players">
            <div class="container_left_line" id="container_left_line1"></div>
            <div id="final_img">
                <div id="player_final_left4">
                    <div class="img_player_" id="img_player_semifinal1">
					</div>
                </div>
                <div id="img__player_winner">
                    <div id="img__"> 
                        <img src="../images/Group1452.svg" width="100%" height="100%">
                    </div>
                    <div id="player_winner_star">
                        <img src="../images/star.svg" width="20%" height="20%">
                        <div class="img_player_final" id="img_player_final"></div>
                    </div>
                </div>
                <div id="player_final_right4">
                    <div class="img_player_" id="img_player_semifinal2"></div>
                </div>
            </div>
            <div class="container_left_line" id="container_left_line2"></div>
        </div>
        <div id="winner_quit">
            <div id="winner">
                <h1 id="display_winner"> WINNER </h1>
            </div>
            <div id="quit">
                <button id="quit-button">Quit</button>
            </div>
        </div>
        `;
        page.appendChild(this.content);
        // page.appendChild(renderRightBar());
        const body = document.body;
        body.style.alignItems = 'center';

        const leftLineInstance = new LeftLine(localStorage.getItem('img_player_semifinale1'), localStorage.getItem('img_player_semifinale2'));
        const rightLineInstance = new RightLine(localStorage.getItem('img_player_semifinale3'), localStorage.getItem('img_player_semifinale4'));

        const leftContainer = this.content.querySelector("#container_left_line1");
        if (leftContainer) {
            leftContainer.appendChild(leftLineInstance.content);
        }

        const rightContainer = this.content.querySelector("#container_left_line2");
        if (rightContainer) {
            rightContainer.appendChild(rightLineInstance.content);
        }

        const quit = this.content.querySelector("#quit-button");
        quit.addEventListener('click', event => {
            event.preventDefault();
            this.navigationCancelled = true;
            localStorage.clear();
            localStorage.setItem('playtour', "0");
            navigate('/tournement/create');
        });

        const sleep = (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        };

        const checkAndNavigate = async () => {
            let shouldNavigate = false;
            let msg;
            if (localStorage.getItem('semifinal1') === "0") {
                msg = "play semi final 1";
                shouldNavigate = true;
            } else if (localStorage.getItem('semifinal1') === "1") {
                const img_player_semifinal1 = this.content.querySelector("#img_player_semifinal1");
                const imgElement = document.createElement('img');
                imgElement.src = localStorage.getItem('img_final_1');
                imgElement.className = "img_player_staylee";
                img_player_semifinal1.appendChild(imgElement);
            }

            if (localStorage.getItem('semifinal2') === "0" && localStorage.getItem('semifinal1') === "1") {
                msg = "play semi final 2";
                shouldNavigate = true;
            } else if (localStorage.getItem('semifinal2') === "1") {
                const img_player_semifinal2 = this.content.querySelector("#img_player_semifinal2");
                const imgElement = document.createElement('img');
                imgElement.src = localStorage.getItem('img_final_2');
                imgElement.className = "img_player_staylee";
                img_player_semifinal2.appendChild(imgElement);
            }

            if (localStorage.getItem('end') === "0" && localStorage.getItem('semifinal2') === "1" && localStorage.getItem('semifinal1') === "1") {
                msg = "play final";
                shouldNavigate = true;
            } else if (localStorage.getItem('final') === "1") {
                const img_player_final = this.content.querySelector("#img_player_final");
                const imgElement = document.createElement('img');
                imgElement.src = localStorage.getItem('img_final');
                imgElement.className = "img_player_staylee";
                img_player_final.appendChild(imgElement);
            }

            if (shouldNavigate) {
                await sleep(3000);
                if (!this.navigationCancelled) {
                    alert(msg);
                    navigate('/tournement/test_match');
                }
            }
        };

        if (localStorage.getItem('playtour') === "1") {
            checkAndNavigate();
        }

        return page;
    }
}

export function renderFourPlayers() {
    console.log("render Fourplayers");
    const page = new FourPlayers();
    return page.render();
}




// import { LeftLine } from "./left_line.js";
// import { RightLine } from "./right_line.js";
// import { navigate } from './router.js';
// import { showAlert } from './message-box.js';

// class FourPlayers
// {
// 	content = document.createElement('span');
// 	constructor()
// 	{
// 		// this.state=0;
// 		// this.timer = null;
// 		// this.timer = setTimeout(() => {
// 		// 	if(this.state < 3)
// 		// 	{
// 		// 		this.state++;
// 		// 		this.onTimerComplete();
// 		// 	}
//         // }, 6000);
// 	}
// 	// onTimerComplete() {
// 	// 	navigate('/tournement/test_match');
//     // }
// 	render()
// 	{
// 		const page = document.createDocumentFragment();
// 		// page.appendChild(renderLeftBar());
		
// 		const message = document.createElement('div');
// 		message.id = 'alert-box';
// 		message.className = 'alert-box';
// 		page.appendChild(message);
		
// 		// showAlert("the match will start now");


// 		this.content.className = 'four-players';
// 		this.content.innerHTML = `
// 		<div id="TOURNEMENT">
// 			<div class="line">
// 			</div>
// 			<div class="TOURNEMENT_">
// 				<h1> TOURNEMENT </h1>
// 			</div>
// 			<div class="line">
// 			</div>
// 		</div>
// 		<div id="tour_4_players">
// 			<div class="container_left_line" id="container_left_line1">
				
// 			</div>
// 			<div id="final_img">
// 				<div id="player_final_left">
// 					<div class="img_player_" id="img_player_semifinal1">
// 					</div>
// 				</div>
// 				<div id="img__player_winner">
// 					<div id="img__"> 
// 					<img src="../images/Group1452.svg" width="100%" height="100%">
// 					</div>
// 					<div id="player_winner_star">
// 						<img src="../images/star.svg" width="20%" height="20%">
// 						<div class="img_player_final" id="img_player_final">
// 						</div>
// 					</div>
// 				</div>
// 				<div id="player_final_right">
// 					<div class="img_player_" id="img_player_semifinal2">
// 					</div>
// 				</div>
// 			</div>
// 			<div class="container_left_line" id="container_left_line2">

// 			</div>
// 		</div>
// 		<div id="winner_quit">
// 			<div id="winner">
// 				<h1 id="display_winner"> WINNER </h1>
// 			</div>
// 			<div id="quit">
// 				<button id="quit-button">Quit</button>
// 			</div>
// 		</div>
// 				`;
// 		page.appendChild(this.content)
// 		// page.appendChild(renderRightBar());
// 		const body = document.body
// 		body.style.alignItems = 'center';

// 		const leftLineInstance = new LeftLine(localStorage.getItem('img_player1'), localStorage.getItem('img_player2'));
//         const rightLineInstance = new RightLine(localStorage.getItem('img_player3'), localStorage.getItem('img_player4'));

// 		const leftContainer = this.content.querySelector("#container_left_line1");
//         if (leftContainer) {
//             leftContainer.appendChild(leftLineInstance.content);
//         }

// 		console.log(rightLineInstance);
//         const rightContainer = this.content.querySelector("#container_left_line2");
//         if (rightContainer) {
//             rightContainer.appendChild(rightLineInstance.content);
//         }



// 		const quit = this.content.querySelector("#quit-button");
// 		quit.addEventListener('click', event =>
// 		{
// 			event.preventDefault();
// 			localStorage.clear();
// 			localStorage.setItem('playtour', "0")
// 			navigate('/tournement/create');
// 		});

// 		// alert("play match semifinal 1");
// 		// this.content.innerHTML = `
// 		// 	<div class="test_match"> 
// 		// 		<div class="player_local1">
// 		// 			<img src="${localStorage.getItem('img_player1')}">
// 		// 			<button class="button" >winner</button>
// 		// 		</div>
// 		// 		<div class="player_local1">
// 		// 			<img src="${localStorage.getItem('img_player2')}">
// 		// 			<button class="button" >winner</button>
// 		// 		</div>
// 		// 	<div>
// 		// `;


// 		function sleep(ms) {
//             return new Promise(resolve => setTimeout(resolve, ms));
//         }


// 		const checkAndNavigate = async () => {
			
//             let shouldNavigate = false;
// 			let msg;
//             if (localStorage.getItem('semifinal1') === "0") {
// 				// await sleep(9000);
// 				msg = "play semi final 1";
//                 // alert("play semi final 1");
//                 shouldNavigate = true;
//             } else if (localStorage.getItem('semifinal1') === "1") {
//                 const img_player_semifinal1 = this.content.querySelector("#img_player_semifinal1");
//                 const imgElement = document.createElement('img');
//                 imgElement.src = localStorage.getItem('img_final_1');
//                 imgElement.className = "img_player_staylee";
//                 img_player_semifinal1.appendChild(imgElement);
//             }

//             if (localStorage.getItem('semifinal2') === "0" && localStorage.getItem('semifinal1') === "1") {
// 				// await sleep(9000);
// 				msg = "play semi final 2";
//                 // alert("play semi final 2");
//                 shouldNavigate = true;
//             } else if (localStorage.getItem('semifinal2') === "1") {
//                 const img_player_semifinal2 = this.content.querySelector("#img_player_semifinal2");
//                 const imgElement = document.createElement('img');
//                 imgElement.src = localStorage.getItem('img_final_2');
//                 imgElement.className = "img_player_staylee";
//                 img_player_semifinal2.appendChild(imgElement);
//             }
//             if (localStorage.getItem('end') === "0" && localStorage.getItem('semifinal2') === "1" && localStorage.getItem('semifinal1') === "1") {
// 				// await sleep(9000);
// 				msg = "play final";
//                 shouldNavigate = true;
//             } else if (localStorage.getItem('final') === "1") {
//                 const img_player_final = this.content.querySelector("#img_player_final");
//                 const imgElement = document.createElement('img');
//                 imgElement.src = localStorage.getItem('img_final');
//                 imgElement.className = "img_player_staylee";
//                 img_player_final.appendChild(imgElement);
//             }

//             if (shouldNavigate) {
//                 await sleep(3000); // Wait for 9 seconds
// 				alert(msg);
//                 navigate('/tournement/test_match');
//             }
//         };

// 		if(localStorage.getItem('playtour') === "1")
//         	checkAndNavigate();
// 		// if (localStorage.getItem('semifinal1') === "0" || localStorage.getItem('semifinal2') === "0")
// 		// 	navigate('/tournement/test_match');



// 		return page;
// 	}
// }

// export function renderFourPlayers() {
// 	console.log("render Fourplayers");
// 	const page = new FourPlayers();
// 	return page.render();
// }

