//IIFE to create a Pokemon repository
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
    let offset = 0; // Start at Beginning
    let limit = 151; // Fetch 151 Pokemon at a time
  
    // Capitalize Pokemon Names
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  
    // Add Pokemon to the list
    function add(pokemon) {
      if (
        typeof pokemon === "object" &&
       "name" in pokemon &&
        "detailsUrl" in pokemon
    ) {
        pokemonList.push(pokemon);
      } else {
        console.error("Pokemon is not correct");
      }
    }
  
    // Gets all Pokemon in the list 
    function getAll() {
      return pokemonList;
    }
  
    // Loads the Pokemon list from the API
    function loadList() {
      return fetch(`${apiUrl}?offset=${offset}&limit=${limit}`).then(function(response) {
        return response.json();
      }).then(function (json) {
        let promises = json.results.map(function (item) {
          return fetch(item.url).then(function (response) {
            return response.json();
          }).then(function (details) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url,
              imageUrl: details.sprites.other.dream_world.front_default,
              type: details.types[0].type.name, // for button color; set the type to the first type
            };
            if (details.types.length > 1 && pokemon.type === 'normal') { // for button color; set the type to the second type if first type is normal
              pokemon.type = details.types[1].type.name;
            }
            add(pokemon);
          });
        });
        return Promise.all(promises);
      });
    }

    // Load the Pokemon details from the API
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) { // Now we add the details to the item
        item.imgUrl = details.sprites.other.dream_world.front_default; // URL diff
        item.height = details.height / 10;
        item.weight = details.weight / 10;
        item.types = details.types;
        item.abilities = details.abilities;
      }).catch(function (e) {
        console.error(e);
      });
    }

//   show the Pokemon's details in the modal
    function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
        showModal(pokemon);
      });
    }
  
    // add Pokemon to the list as a button
    function addListItem(pokemon) {
      //Create list item element
      let listPokemon = $('<div>').addClass('pokemon-div col-9 col-md-4 col-lg-3 border m-1 rounded-lg' + pokemon.type);
  
      // Create button element
      let button = $('<button>').addClass('pokemon-button btn d-flex justify-content-between align-items-center')
                                .attr('data-toggle', 'modal')
                                .attr('data-target', '#pokemonModal');
  
      // Create an image element
      let image = $('<img>').attr('src', pokemon.imageUrl)
                            .attr('alt', `Image of ${pokemon.name}`)
                            .addClass('pokemon-image img-fluid');
      button.append(image);
  
      // Create textNode for pokemon name; span element for styling
      let span = $('<span>').addClass('text-white').text(capitalizeFirstLetter(pokemon.name));
      button.append(span);
  
      // Append the button to the list item and the list item to the Pokemon List
      listPokemon.append(button);
      $('.row').append(listPokemon)
        .addClass('justify-content-center');
  
      // Show Pokemon's details when Pokemon button is clicked
      button.click(function () {
        showDetails(pokemon);
      });
    }
  
    // Show the modal with the Pokemon's details
    function showModal(item) {
      $('.image-background').attr('class', 'image-background').addClass(item.type);
  
      // Set the modal elements
      $('#pokemonModalTitle').text(capitalizeFirstLetter(item.name));
      $('#pokemonModalImage').attr('src', item.imgUrl).addClass('modal-image img-fluid');
      $('#pokemonModalHeight').text(`Height: ${item.height} m`).addClass('pt-3');
      $('#pokemonModalWeight').text(`Weight: ${item.weight} kg`);
      $('#pokemonModalTypes').text(`Types: ${item.types.map(type => capitalizeFirstLetter(type.type.name)).join(', ')}`);
      $('#pokemonModalAbilities').text(`Abilities: ${item.abilities.map(ability => capitalizeFirstLetter(ability.ability.name)).join(', ')}`);
    }
  
    // Search bar to filter Pokemon by name
    function searchBar() {
      let $searchBar = $('#search-bar');
  
      $searchBar.on('input', function () {
        let searchValue = $searchBar.val().toLowerCase();
        let filteredPokemon = pokemonList.filter(pokemon => pokemon.name.toLowerCase().startsWith(searchValue));
  
        // Clear Pokemon List -
        let $pokemonListElement = $('.row');
        $pokemonListElement.empty();
  
        // Display message if the search value does not match any Pokemon
        if (filteredPokemon.length === 0) {
          let message = "Pokemon not Found";
          $pokemonListElement.text(`\n\n\n\n\n\n${message}`);
        } else {
          filteredPokemon.forEach(pokemon => {
            addListItem(pokemon);
          });
        }
      });
    }
    searchBar();
  
    // Search icon and searchBar Toggle
    let searchIcon = document.querySelector('#search-icon');
    let searchBarContainer = document.querySelector('#search-bar-container');
    searchIcon.addEventListener('click', function () {
      searchBarContainer.classList.toggle('d-none');
    });
  
// Load more Pokemon as the user scrolls to the bottom of the page
$(window).on('scroll', function () {
    if ($(window).innerHeight() + $(window).scrollTop() >= $(document).height()) {// if user has scrolled to the bottom of the page
      offset += limit; // Increase the offset limit
      loadList().then(function () {
        pokemonRepository.getAll().slice(-limit).forEach(function(pokemon) {
            pokemonRepository.addListItem(pokemon);
        });
      });
    }
});

    // Scroll to top button
    let $myButton = $("#scrollToTopButton");
  
    // When the user scrolls down 20px from the top of the document, show the button
    $(window).scroll(function () {
      if ($(window).scrollTop() > 20) {
        $myButton.show();
      } else {
        $myButton.hide();
      }
    });
  
    // When the user clicks the button, scroll to the top of the document
    $myButton.click(function () {
      $('html, body').animate({ scrollTop: 0 }, 'slow');
    });
  
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails,
    };
  })();
  
//Fetch and Load Pokemon List
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});