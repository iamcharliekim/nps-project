

$('.nps-form').on('submit', (e)=>{
	
	e.preventDefault();
	const apiKey = 'GKeQS4cWZsUYjxVFQnl1ZW99TmLeRDtR6gazW5wh'
	
	const options = {
    	headers: new Headers({
			"X-Api-Key": apiKey})
  		};
	
	
	let state1 = $('.state-1').val()
	let state2 = $('.state-2').val()
	
	let maxResults = $('#maxResults').val()
	
	console.log(state1, state2, maxResults)
	
	fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${state1}&stateCode=${state2}&limit=${maxResults}`, options)
		.then(response => response.json())
		.then(responseJson => console.log(responseJson))
	
	
	
})