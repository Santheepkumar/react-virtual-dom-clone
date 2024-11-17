import {createElement, hydrate} from './hydrate.js';

// Define the app
const App = createElement(
    "div",
    null,
    createElement(
        "button",
        {onClick: () => alert("Button clicked!")},
        "Click Me!"
    ),
    createElement("p", null, "Hello, World!")
);

// Hydrate the app into the root element
const rootElement = document.getElementById("root");

hydrate(App, rootElement);
