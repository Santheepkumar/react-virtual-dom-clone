export function render(virtualNode, container) {
    if (!container) {
        throw new Error("Container element not found.");
    }

    // Clear the container for simplicity (React optimizes this step)
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    // Internal function to convert virtual nodes to actual DOM nodes
    function createDomNode(virtualNode) {
        if (typeof virtualNode === "string" || typeof virtualNode === "number") {
            // Handle text nodes
            return document.createTextNode(virtualNode);
        }

        if (typeof virtualNode.type === "function") {
            // If the type is a function, it's a component
            const componentResult = virtualNode.type(virtualNode.props || {});
            return createDomNode(componentResult);
        }

        // Create the element for normal tags (div, p, etc.)
        const domNode = document.createElement(virtualNode.type);

        // Apply props (attributes, events, etc.)
        if (virtualNode.props) {
            for (const [key, value] of Object.entries(virtualNode.props)) {
                if (key.startsWith("on") && typeof value === "function") {
                    const eventType = key.slice(2).toLowerCase(); // e.g., onClick -> click
                    domNode.addEventListener(eventType, value);
                } else if (key === "style" && typeof value === "object") {
                    Object.assign(domNode.style, value); // Apply style object
                } else if (key === "className") {
                    domNode.className = value; // Special case for className
                } else {
                    domNode.setAttribute(key, value); // Generic attribute
                }
            }
        }

        // Recursively render and append children
        if (virtualNode.children) {
            for (const child of virtualNode.children) {
                domNode.appendChild(createDomNode(child));
            }
        }

        return domNode;
    }

    // Render the root virtualNode into the container
    container.appendChild(createDomNode(virtualNode));
}
