import { JoinTournament } from './join_tour.js' ;
import { renderRightBar } from './right-bar.js';
import { renderLeftBar } from './left-bar.js';
import { navigate } from './router.js';

class ListTournament
{
	content = document.createElement('span');
	constructor()
	{
		// setTimeout(() => this.fetchTournaments(), 0);
	}
	
	render()
	{	
		const page = document.createDocumentFragment();
		page.appendChild(renderLeftBar());
		this.content.className = 'create-tournament';
		this.content.innerHTML = `
		<div id="TOURNEMENT">
			<div class="line">
			</div>
			<div class="JOIN_">
				<h1> LIST  TOURNEMENT </h1>
			</div>
			<div class="line">
			</div>
		</div>
		<div id="container-tour">
		</div>
		`

		page.appendChild(this.content)
		page.appendChild(renderRightBar());
		const body = document.body
		body.style.alignItems = 'center';
		// setTimeout(() => this.fetchTournaments(), 0);
		return page;
	}


	// async fetchTournaments() {
	// 	const response = await fetch('http://localhost:8000/chat/tournemnent/');
	// 	const tournaments = await response.json();
		
	// 	const tournamentList = document.getElementById('container-tour');
	// 	// const tournamentList = this.querySelector('#container-tour');
	// 	console.log(tournamentList);
	// 	// tournamentList.innerHTML = '';

	// 	if (tournaments.length === 0) {
	// 		alert("No tournaments available.");
	// 	} else {
	// 		tournaments.forEach(tournament => {
	// 			const joinTournamentElement = new JoinTournament();
    //             joinTournamentElement.setAttribute('name', tournament.name);
    //             tournamentList.appendChild(joinTournamentElement);
	// 		});
	// 	}
	// };
}

export function renderJoinTournament() {
	const page = new ListTournament();
	return page.render();
}