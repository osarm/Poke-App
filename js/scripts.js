let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
      if (typeof pokemon === "object" && "name" in pokemon) {
          pokemonList.push(pokemon);
      } else {
          console.log("pokemon is not correct");
      }
  }

  function getAll() {
      return pokemonList;
  }

  function addListItem(pokemon) {
      let pokemonList = document.querySelector('.pokemon-list');
      let listpokemon = document.createElement('li');
      let button = document.createElement('button');
      button.addEventListener('click', function () { showDetails(pokemon) });
      button.innerText = pokemon.name;
      button.classList.add('button-class');
      listpokemon.appendChild(button);
      pokemonList.appendChild(listpokemon);
  }

  function loadList() {
      showLoadingMessage();
      return fetch(apiUrl).then(function (response) {
          return response.json();
      }).then(function (json) {
          hideLoadingMessage();
          json.results.forEach(function (item) {
              let pokemon = {
                  name: item.name,
                  detailsUrl: item.url
              };
              add(pokemon);
              console.log(pokemon);
          });
      }).catch(function (e) {
          console.error(e);
      });
  }

  function loadDetails(item) {
      showLoadingMessage();
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
          return response.json();
      }).then(function (details) {
          hideLoadingMessage();
          // Now we add the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
      }).catch(function (e) {
          console.error(e);
      });
  }

  let modalContainer = document.querySelector('#modal-container');
  function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
          openModal(pokemon);
      });
  }

  function openModal(pokemon) {
      modalContainer.innerHTML = '';

      // Create Modal content
      let modal = document.createElement('div');
      modal.classList.add('modal');

      let modalContent = document.createElement('div');
      modalContent.classList.add('modal-content');

      let closeButton = document.createElement('button');
      closeButton.classList.add('modal-close');
      closeButton.innerHTML = 'Close';
      closeButton.addEventListener('click', hideModal);

      let nameElement = document.createElement('h2');
      nameElement.innerText = pokemon.name;

      let heightElement = document.createElement('p');
      heightElement.innerText = `Height: ${pokemon.height} m`;

      let imageElement = document.createElement('img');
      imageElement.src = pokemon.imageUrl;
      imageElement.alt = pokemon.name;

      // append elements to modal content 
      modalContent.appendChild(closeButton);
      modalContent.appendChild(nameElement);
      modalContent.appendChild(heightElement);
      modalContent.appendChild(imageElement);

      // append modal content to modal 
      modal.appendChild(modalContent);

      // append modal to modal container
      modalContainer.appendChild(modal);

      modalContainer.classList.add('is-visible');
  }

  function hideModal() {
      modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();
      }
  });

  modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
          hideModal();
      }
  });

  // returns the functions
  return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
  });
});

function showLoadingMessage() {
  document.getElementById('loadingMessage').style.display = 'block';
}

function hideLoadingMessage() {
  document.getElementById('loadingMessage').style.display = 'none';
}