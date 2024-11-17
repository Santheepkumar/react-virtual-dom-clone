export function hydrate(virtualNode, container) {
    if (!container) {
        throw new Error("Container element not found.");
    }

    // Clear the container if it's not empty
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    // Recursive render function to process the virtual DOM tree
    function render(virtualNode) {
        if (typeof virtualNode === "string" || typeof virtualNode === "number") {
            // Handle text nodes
            return document.createTextNode(virtualNode);
        }

        if (typeof virtualNode.type === "function") {
            // If the type is a function, it's a functional component
            return render(virtualNode.type(virtualNode.props));
        }

        // Create the actual DOM element
        const element = document.createElement(virtualNode.type);

        // Set attributes and event listeners
        if (virtualNode.props) {
            for (const [key, value] of Object.entries(virtualNode.props)) {
                if (key.startsWith("on") && typeof value === "function") {
                    // Handle event listeners (e.g., onClick -> click)
                    const eventType = key.slice(2).toLowerCase();
                    element.addEventListener(eventType, value);
                } else if (key === "style" && typeof value === "object") {
                    // Handle style as an object
                    Object.assign(element.style, value);
                } else if (key === "className") {
                    // Handle className prop
                    element.className = value;
                } else {
                    // Set regular attributes
                    element.setAttribute(key, value);
                }
            }
        }

        // Render and append children
        if (virtualNode.children) {
            for (const child of virtualNode.children) {
                element.appendChild(render(child));
            }
        }

        return element;
    }

    // Append the rendered virtual node to the container
    container.appendChild(render(virtualNode));
}


export function createElement(type, props, ...children) {
    return {
        type,
        props: props || {},
        children: children.flat() // Flatten to handle nested arrays
            .map(child =>
                typeof child === "object" ? child : String(child) // Ensure text nodes are strings
            ),
    };
}
