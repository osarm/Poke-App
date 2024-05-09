# My Simple JavaScript Pokedex Application

This project is a Pokedex application that fetches data from the PokeAPI. It displays a list of Pokemon witht their images, and allows the user to view more details about each Pokemon in a modal.

## Features

- **Pokemon Repository:** A local repository is maintained to store the details of each Pokemon fetched from the PokeAPI.
- **Infinite Scroll Pagination:** The application fetches and displays 50 Pokemon at a time as the user scrolls down the webpage.
- **Pokemon Details:** Clicking on a Pokemon displays a modal with detailed information about the Pokemon such as: image, height, weight, types, and abilities.
- **Search Functionality:** A search bar allows users to filter the Pokemon list by name. The search is case-insensitive and will filter Pokemon as you type.
- **Back-to-top Button:** A back-to-top button is provided at the bottom right as you begin to scroll down the Pokemon list. When clicked, it scrolls the page back to the top.

## Technologies and Dependencies

This project is built using a variety of modern web development technologies and dependencies to ensure a high-quality and user-friendly application and experience.


### JavaScript ES6

The core functionality of the application is written in JavaScript ES6.

### jQuery

jQuery is user to simplify the DOM manipulation and event handling. It provides a powerful, easy-to-use API for interacting with HTML documents. 

### Bootstrap

Bootstrap is used to allow for the application to have a responsive layout, pre-designed components, and modal dialogs. It ensures that the application will display well on all screen sizes, provide a consistent user experience, and allow for an interactive modal dialog to display information about each Pokemon. 

### PokeAPI

The PokeAPI is used to fetch the data about each Pokemon. It provides data about all known Pokemon, including their names, types, abilities, and images.

### ESLint

ESLint is used to catch potential bugs and enforce best practices.

### Other Dependencies

Other dependencies include the Fetch API for making HTTP requests, and the Immediately Invoked Function Expression (IIFE) pattern for encapsulating the Pokemon repository.