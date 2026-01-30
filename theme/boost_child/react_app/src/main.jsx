import React from 'react'
import ReactDOM from 'react-dom/client'
import FeaturedCourses from './components/FeaturedCourses'

// Ensure we only mount if the container exists
const rootElement = document.getElementById('react-featured-courses-root');

if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <FeaturedCourses />
        </React.StrictMode>,
    )
}
