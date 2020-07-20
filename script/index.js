const inputText = document.getElementById('inputText');
const searchBtn = document.getElementById('search');
const suggestions = document.getElementById('suggestions');

//get array containing IDs of all superheroes which were addded to Favourites
var favList = JSON.parse(localStorage.getItem("favList"));
console.log(favList);
if(favList==null)
	favList = [];
	

//taking input
inputText.onkeyup = function(){

	var name = inputText.value;

	if(name==''){
		suggestions.innerHTML = null;
	}

	//fetch the data from the API 
	else{
		fetch('https://superheroapi.com/api.php/2913692822012773/search/'+name)
		.then(response => response.json())
		.then(data => suggest(data,name))
		.catch(err => console.log(err));
	}
}

//display suggestions
//the user can either search any of the superheroes that appear on the suggestio nbox
//or he can add/remove the superhero to/from the Favourites list directly from the suggestion cards
function suggest(data,name){

	
	
	//fetch a superhero and check if its name matches with the text int he input box
	//if yes, then show him in the suggestions

	if(name!=inputText.value)
		return;

		console.log(data);
	if(data.response==='error'){
		suggestions.innerHTML = '<div style="margin-top:40px; color:white;">Try a different name!</div>';
	}

	else{

		suggestions.innerHTML = null;
		
		for(let i=0; i<data.results.length && i<10; i++){

			//create card for every suggestion
			var item = document.createElement('div');			
			var itemImage = document.createElement('img');
			var itemContainer = document.createElement('div');
			var itemText = document.createElement('div');
			var favButton = document.createElement('div');
			var searchButton = document.createElement('div');
			
			item.classList.add('suggestion-item');
			itemImage.classList.add('suggestion-item-image');
			itemContainer.classList.add('suggestion-item-container');
			favButton.classList.add('favButton');
			searchButton.classList.add('searchButton');

			//display name of character
			itemText.innerHTML = data.results[i].name;
			itemContainer.appendChild(itemText);

			//display image of the character
			itemImage.src = data.results[i].image.url;
			item.appendChild(itemImage);			

			//check if any of the suggested characters are present in the Favourites list
			//according, display the Add to Fav/Remove from Fav button

			searchButton.innerHTML = 'Search';
			itemContainer.appendChild(searchButton);

			let itemId = data.results[i].id;

			if(favList.includes(itemId)){
				favButton.innerHTML = "Remove from Favourites";
				favButton.classList.add('bg-red');
			}else{
				favButton.innerHTML = "Add to Favourites";
				favButton.classList.add('bg-green');
			}
			itemContainer.appendChild(favButton);

			
			item.appendChild(itemContainer);

			//item.setAttribute('superheroId',data.results[i].id);
			favButton.setAttribute('superheroId',data.results[i].id);
			searchButton.setAttribute('superheroId',data.results[i].id);

			favButton.setAttribute('divType','fav-btn');
			searchButton.setAttribute('divType','search-btn');

			suggestions.appendChild(item);
		}

		suggestions.onclick = function(event){

			var id = event.target.getAttribute('superheroId');
			var div = event.target.getAttribute('divType');			

			
			//handling favourites

			if(div==='fav-btn'){

				if(id===null)
					return;

				if(favList.includes(id)){
					var i = favList.indexOf(id);
					favList.splice(i,1);
					event.target.innerHTML = "Add to Favourites";
					event.target.classList.add('bg-green');
					event.target.classList.remove('bg-red');
				}else{
					favList.push(id);
					event.target.innerHTML = "Remove from Favourites";
					event.target.classList.remove('bg-green');
					event.target.classList.add('bg-red');
				}

				localStorage.setItem("favList", JSON.stringify(favList));
			}

			//searching
			else if(div==='search-btn'){
				if(id===null)
				return;
				window.open("superhero.html?id="+id,"_self");
			}

		}
	}

}



