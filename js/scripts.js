// height in meters(m)
let pokemonRepository = (function(){

let pokemonList = [
    {name: 'Bulbasaur', type: ['Grass', 'Poison'], height: 0.7},
    {name: 'Ivysaur', type: ['Grass', 'Poison'], height: 1},
    {name: 'Venusaur', type: ['Grass', 'Poison'], height: 2},
    {name: 'Charmander', type: ['Fire'], height: 0.6},
    {name: 'Charmeleon', type: ['Fire'], height: 1.1},
    {name: 'Charizard', type: ['Fire', 'Flying'], height: 1.7},
    {name: 'Squirtle', type: ['Water'], height: 0.5},
    {name: 'Wartortle', type: ['Water'], height: 1},
    {name: 'Blastoise', type: ['Water'], height: 1.6},
    {name: 'Oshawott', type: ['Water'], height: 0.5}
    ];
function add(pokemon){
    if (typeof pokemon === 'object') {
        pokemonList.push(pokemon);
    }
}
function getAll(){
    return pokemonList;
}
function addListItem(pokemon){
    let pokemonList= document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class')
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    }

function showDetails(pokemon){
    console.log(pokemon);
    }

function getPokemonByName(searchedName){
    return pokemonList.filter((pokemon) => pokemon.name.toLowerCase() === searchedName.toLowerCase());
}
    // returns the functions
return{
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    getPokemonByName: getPokemonByName,
    showDetails: showDetails
    }
})()

pokemonRepository.add({
    name: 'Dewott', height: 0.8, type: ['Water']
});

// prints the list of names from Pokemon List and their height
pokemonRepository.getAll().forEach(function(pokemon){
    // condition for pokemon with a height greater than 1m
    pokemonRepository.addListItem(pokemon);
});

console.log(pokemonRepository.getPokemonByName('oshawott'));
