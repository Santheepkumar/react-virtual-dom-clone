import {createElement, hydrate} from './hydrate.js';
import {render} from './render';

// hydrateApp()
renderApp()

function hydrateApp() {
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
}

function renderApp() {
    function MyButton(props) {
        return createElement(
            "button",
            {onClick: props.onClick, style: {color: "white", backgroundColor: "blue"}},
            props.label
        );
    }

// Create a virtual DOM
    const App = createElement(
        "div",
        {className: "app-container"},
        createElement("h1", null, "Welcome to My App!"),
        createElement(MyButton, {label: "Click Me!", onClick: () => alert("Button clicked!")}),
        createElement("p", null, "This is a simple app.")
    );

// Render into the #root element
    const root = document.getElementById("root");
    render(App, root);
}