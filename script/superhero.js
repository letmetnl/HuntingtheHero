//get value of 'id' of the superhero from query parameters
const params = new URLSearchParams(window.location.search);
var id = params.get('id');


//get array containing IDs of all superheroes which were addded to Favourites
var favList = JSON.parse(localStorage.getItem("favList"));
console.log(favList);
if(favList==null)
    favList = [];


//fetch all required DOM elements
const title = document.getElementById('superhero-title');
const image = document.getElementById('superhero-image');
const fav = document.getElementById('favourite');
const snackbar = document.getElementById('snackbar');


//fetch the JSON file from the Superhero API
fetch('https://superheroapi.com/api.php/2913692822012773/'+id)
    .then(response => response.json())
    .then(data => renderInfo(data))
    .catch(err => console.log(err));


//render all relevant information related to the superhero from the JSON that was fetched
function renderInfo(data){

    console.log(data);

    //display title
    title.innerHTML = data.name;

    //display image
    image.src = data.image.url;
    image.alt="Image not found";
    
    //display favourite
    if(favList!==null && favList.includes(id)){
        fav.innerHTML = '<i id="heart-icon" class="fas fa-heart"></i>';
    }
    else{
        fav.innerHTML = '<i id="heart-icon" class="far fa-heart"></i>';
    }

    //display powerstats
    for(var i in data.powerstats){
        document.getElementById(i).innerHTML = data.powerstats[i];
    }

    //display biography
    for(var i in data.biography){
        document.getElementById(i).innerHTML = data.biography[i];
    }

    //display appearance
    for(var i in data.appearance){
        document.getElementById(i).innerHTML = data.appearance[i];
    }

    //display work
    for(var i in data.work){
        document.getElementById(i).innerHTML = data.work[i];
    }

    //display connections
    for(var i in data.connections){
        document.getElementById(i).innerHTML = data.connections[i];
    }
}

// Favourites functionality
fav.onclick = function(){

    //if item is not present in array of Favourites, clicking the heart icon adds
    //the item to the array
    if(!favList.includes(id)){
        favList.push(id);

        //change the heart icon to 'filled'
        fav.innerHTML = '<i id="heart-icon" class="fas fa-heart"></i>';

        showSnackbar(true);

    }

    //if item is present in array of Favourites, clicking the heart icon removes
    //the item from the array
    else{
        //remove from favourites
        var i = favList.indexOf(id);
        favList.splice(i,1);

        //change the heart icon to 'outline'
        fav.innerHTML = '<i id="heart-icon" class="far fa-heart"></i>';

        showSnackbar(false);
    }

    //update favList in local storage
    localStorage.setItem("favList", JSON.stringify(favList));

    //show notification when item is added to/removed from favourites
    function showSnackbar(state){

        // 'show' class makes the snackbar visible
        snackbar.classList.add('show');

        if(state===true){
            snackbar.innerHTML = "Added to favourites";
        }
        else{
            snackbar.innerHTML = "Removed from favourites";
        }

        // After 3 seconds, hide the snackbar
        setTimeout(function(){ snackbar.classList.remove("show"); }, 2000);
    }

}





