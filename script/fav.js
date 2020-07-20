//get array containing IDs of all superheroes which were addded to Favourites
var favList = JSON.parse(localStorage.getItem("favList"));
const favContainer = document.getElementById('fav-container');
const snackbar = document.getElementById('snackbar');

//Display message if list is empty
if(favList==null)
    favList = [];
    if (favList.length===0)
    favContainer.innerHTML = '<div style="margin-top: 50px">You have not added any Favourites!<div>'


//iterate through each ID in the array, and render the list of favourite superheroes
for(let item of favList){

    fetch('https://superheroapi.com/api.php/2913692822012773/'+item+'/image')
    .then(response => response.json())
    .then(data => renderCard(data))
    .catch(err => console.log(err))

    function renderCard(data){
        
        var card = document.createElement('div');
        card.classList.add('card');
        var cardImage = document.createElement('img');
        cardImage.setAttribute('id','card-image');
        cardImage.classList.add('cardImage');
        var cardTitle = document.createElement('div');
        cardTitle.classList.add('cardTitle');
        var fav = document.createElement('div');
        fav.classList.add('fav');

        card.appendChild(cardImage);
        card.appendChild(cardTitle);
        card.appendChild(fav);

        cardImage.src = data.url;
        cardTitle.innerHTML = data.name;
        fav.innerHTML = '<i id="heart-icon" class="fas fa-heart"></i>';

        favContainer.appendChild(card);
        
        card.setAttribute('id',item);
    }

}

// removing card from favourites

favContainer.onclick = function(event){

    //If image is clicked, redirect to corresponding superhero page
    if(event.target.id==='card-image'){
        var id = event.target.parentNode.getAttribute('id');
        console.log(id);
        window.open("superhero.html?id="+id,"_self");
    }

    //if heart icon is clicked, remove from Favourites 
    if(event.target.id==='heart-icon'){

        var id = event.target.parentNode.parentNode.getAttribute('id');
        event.target.parentNode.parentNode.remove();
        showSnackbar();
    }

    //show notification when item is removed from Favourites
    function showSnackbar(){

        snackbar.classList.add('show');
        snackbar.innerHTML = "Removed from favourites";      
        
        //remove 'id' from array containing ids of Favourite superheroes
        var i = favList.indexOf(id);
        favList.splice(i,1);

        // After 3 seconds, hide the div
        setTimeout(function(){ snackbar.classList.remove("show"); }, 2000);
    }

    //update favList in local storage
    localStorage.setItem("favList", JSON.stringify(favList));

    //If list ever becomes empty after removing an item, display "no favourites added" msg
    if (favList.length===0)
        favContainer.innerHTML = '<div style="margin-top: 50px">You have not added any Favourites!<div>'
}

