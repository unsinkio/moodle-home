import React from 'react'
import ReactDOM from 'react-dom/client'
import FeaturedCourses from './components/FeaturedCourses'

// Ensure we only mount if the container exists
// Ensure we only mount if we are on the frontpage or want to inject dynamically
// Strategy: If the root element doesn't exist, create it and inject it into a suitable place.
let rootElement = document.getElementById('react-featured-courses-root');

if (!rootElement) {
    // Try to find a place to inject. 
    // In Boost, usually [role="main"] or .region-main or just after the header.
    // Let's try to inject at the top of the main region.
    const mainRegion = document.querySelector('[role="main"]') || document.getElementById('region-main') || document.body;

    if (mainRegion) {
        rootElement = document.createElement('div');
        rootElement.id = 'react-featured-courses-root';
        // Insert at the beginning of main region
        mainRegion.insertBefore(rootElement, mainRegion.firstChild);
        // Or append? insertBefore might be better for visibility.
    }
}

if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <FeaturedCourses />
        </React.StrictMode>,
    )
}
