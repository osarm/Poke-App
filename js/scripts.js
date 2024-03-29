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
]

// prints the list of names from Pokemon List and their height
for (let i = 0; i < pokemonList.length; i++) {
    document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')');
    // prints a message if the height is greater than 1m
    if (pokemonList[i].height > 1.0) {
        document.write(' - Woah, that is a big Pokemon!<br>')
    }
    else {
        document.write('<br>')
    }
}
