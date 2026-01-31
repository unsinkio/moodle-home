import React from 'react'
import ReactDOM from 'react-dom/client'
import FeaturedCourses from './components/FeaturedCourses'
import LandingPage from './components/LandingPage'
import './index.css' // Assuming we use tailwind or custom css? Just ensure usage.

// Ensure we only mount if the container exists
// Ensure we only mount if we are on the frontpage or want to inject dynamically
// Strategy: If the root element doesn't exist, create it and inject it into a suitable place.
// But ONLY on specific pages (Login or Frontpage).
const validPageIds = ['page-login-index', 'page-site-index'];
const bodyId = document.body.id;

// Check if we are on a target page
// Also check if user is guest or not logged in? Moodle usually handles this via classes, 
// but checking page ID is a good proxy for "Home/Login" screens.
// If the user wants strictly login/index.php, that is 'page-login-index'.
// Check if we are on a target page AND user is NOT logged in.
// Moodle adds 'notloggedin' class to body for anonymous users.
const isNotLoggedIn = document.body.classList.contains('notloggedin');

if (validPageIds.includes(bodyId) && isNotLoggedIn) {
    // Strategy for Landing Page:
    // We want to TAKE OVER the page.
    let rootElement = document.getElementById('react-landing-page-root');

    if (!rootElement) {
        // Create root.
        rootElement = document.createElement('div');
        rootElement.id = 'react-landing-page-root';

        // We append to BODY to overlay everything? Or replace #page-wrapper?
        // Appending to body and using z-index / position absolute might be safer to avoid breaking scripts that rely on #page-wrapper structure.
        // BUT we want to replace the view.

        // Let's insert at top of body.
        document.body.prepend(rootElement);

        // We can add a class to body to allow CSS to hide strict Moodle elements
        document.body.classList.add('react-landing-active');
    }

    class ErrorBoundary extends React.Component {
        constructor(props) {
            super(props);
            this.state = { hasError: false, error: null, errorInfo: null };
        }

        static getDerivedStateFromError(error) {
            return { hasError: true };
        }

        componentDidCatch(error, errorInfo) {
            this.setState({ error, errorInfo });
            console.error("React Crash:", error, errorInfo);
        }

        render() {
            if (this.state.hasError) {
                return (
                    <div style={{ padding: '2rem', background: '#fee2e2', color: '#991b1b', border: '2px solid #ef4444', borderRadius: '1rem', margin: '2rem', zIndex: 99999, position: 'relative' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Something went wrong.</h2>
                        <details style={{ whiteSpace: 'pre-wrap' }}>
                            {this.state.error && this.state.error.toString()}
                            <br />
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </details>
                    </div>
                );
            }

            return this.props.children;
        }
    }

    if (rootElement) {
        ReactDOM.createRoot(rootElement).render(
            <React.StrictMode>
                <ErrorBoundary>
                    <LandingPage />
                </ErrorBoundary>
            </React.StrictMode>,
        )
    }
}
