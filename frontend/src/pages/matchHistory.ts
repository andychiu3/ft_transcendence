interface	Match {
	id: number;
	user1: string;
	user2: string;
	winner: string;
	round: number;
	played_at: string;
}

function	getMatchTableData(data: Match[]) {
	return data.map((match: Match) => `
		<tr class="hover:bg-gray-50">
			<td class="text-center p-3"> ${match.round} </td>
			<td class="text-center p-3"> ${match.user1} </td>
			<td class="text-center p-3"> ${match.user2} </td>
			<td class="text-center p-3 text-blue-700"> ${match.winner} </td>
			<td class="text-center p-3"> ${match.played_at} </td>
		</tr>
		`
	).join('');
}

export function	renderMatchHistory(data: Match[]): void {
	const main = document.getElementById('main-content') as HTMLElement;
	if (!main)
		return ;

	if (data.length === 0) {
		main.innerHTML = '<h2 class="p-8"> No matches found </h2>';
		return ;
	}

	const matchTableData = getMatchTableData(data);

	main.innerHTML = `
	<div class="flex-1 min-h-screen">
		<table class="w-full border-collapse text-sm">
			<thead>
				<tr class="bg-gray-200">
					<th class="w-1/5 p-5 text-center"> Round </th>
					<th class="w-1/5 p-5 text-center"> Player 1 </th>
					<th class="w-1/5 p-5 text-center"> Player 2 </th>
					<th class="w-1/5 p-5 text-center"> Winner </th>
					<th class="w-1/5 p-5 text-center"> Time </th>
				</tr>
			</thead>
			<tbody> ${matchTableData} </tbody>
		</table>
	</div>
	`
}

// export function	renderMatchHistory(data: Match[]): void {
// 	const main = document.getElementById('main-content') as HTMLElement;
// 	const matchItems = data.map((match: Match) => `
// 		<div class="match-item">
// 			<div class="flex flex-col m-10">
// 				<p> 
// 					<span class="border w-30">Round ${match.round}: </span>
// 					<span> ${match.user1} vs ${match.user2} </span>
// 				</p>
// 				<p> Winner: ${match.winner} </p>
// 				<p> Time: ${match.played_at} </p>
// 			</div>
// 		</div>
// 	`).join('');

// 	main.innerHTML = `
// 	<div class="match-history">
// 		<h2> Match History </h2>
// 		${data.length === 0 ? '<p> No matches found </p>' : matchItems}
// 	</div>
// 	`;
// }
