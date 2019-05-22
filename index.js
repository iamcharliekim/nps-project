
// NPS FORM ON-SUBMIT HANDLER
function onSubmitHandler(){
	$('.nps-form').on('submit', (e)=>{
	e.preventDefault();
	
	$('.results').empty();
	

	let state1 = $('.state-1').val()
	let state2 = $('.state-2').val()
	let maxResults = $('#maxResults').val()
	
		const apiKey = 'GKeQS4cWZsUYjxVFQnl1ZW99TmLeRDtR6gazW5wh'
	const npsURL = `https://developer.nps.gov/api/v1/parks?api_key=${apiKey}&stateCode=${state1}&stateCode=${state2}&limit=${maxResults}`
	
	
	fetch(npsURL)
		.then(response => {
			if (response.status === 200){
				return response.json()	
			} else {
				throw new Error(response.statusText)
			}
		}).then(responseJson =>{
			let resultsArr = responseJson.data
			
			for (let i = 0 ; i < resultsArr.length; i++){
								
				let latLong = resultsArr[i].latLong.split(', ')
				let lat = Number(latLong[0].substring(4))
				let long = Number(latLong[1].substring(5))
				
				const googleApiKey = `AIzaSyDOvfuKaaRuYocVQWNl9ICi3wadIephDyc`
				const googleApiURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${googleApiKey}`

				fetch(googleApiURL).then(response => {
					if (response.status === 200){
						return response.json()	
					} else {
						throw new Error(response.statusText)
					}

				}).then(responseJson =>{
					let address = responseJson.results[0].formatted_address
					
					let resultsInnerHTML = `	
						<div class="result" id=${resultsArr[i].url}>
								<header>${resultsArr[i].fullName}</header>

								<span class="description">${resultsArr[i].description}</span>

								<span class="address">${address}</span>

								<span class="url"><a href="${resultsArr[i].url}" target="_blank">${resultsArr[i].url}</a></span>
						</div>`
				
					$('.results').append(resultsInnerHTML)
				})
			}

		}).catch(error => console.log(error))
	})
}


// RESULT CLICK-LISTENER
function resultsClickHandler(){
	$('.results').on('click', '.result', (e)=>{
		if (e.target.parentNode.id !== ''){
			window.open(e.target.parentNode.id, '_blank')
		} 
	})
}

function startApp(){
	onSubmitHandler();
	resultsClickHandler();
}

$(startApp())