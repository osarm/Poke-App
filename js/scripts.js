// height in meters(m)
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
    {name: 'Oshawott', type: ['Water'], height: 0.5},
]

// prints the list of names from Pokemon List and their height
pokemonList.forEach(function(pokemon){
    // condition for pokemon with a height greater than 1m
    if (pokemon.height > 1) {
        document.write('<p>', pokemon.name + ', ' + ' Height:' + ' ' + pokemon.height + ' - Woah, that is a big Pokemon!;</p>')
    } else {
        document.write('<p>', pokemon.name + ', ' + ' Height:' + pokemon.height + '; </p>')
    }
});

