import React from 'react';
import LoginFormContainer from './LoginFormContainer';
import FeaturedCourses from './FeaturedCourses';

const LandingPage = () => {
    return (
        <div className="landing-page min-h-screen bg-gray-50 text-gray-900 font-sans">
            {/* Split Layout: Hero/Courses Left, Login Right (or stacked on mobile) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-12 items-start">

                {/* Left Column: Content & Courses */}
                <div className="flex-1 space-y-12">
                    <header className="space-y-4">
                        <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                            Learn without limits.
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl">
                            Discover a world of knowledge with Atlantis University's premium courses.
                            Start your journey today.
                        </p>
                    </header>

                    <section>
                        <h2 className="text-2xl font-semibold mb-6">Featured Courses</h2>
                        <FeaturedCourses />
                    </section>
                </div>

                {/* Right Column: Login (Sticky on Desktop) */}
                <div className="w-full lg:w-[400px] lg:sticky lg:top-8">
                    <LoginFormContainer />
                </div>
            </div>

            {/* Global Styles for this page Override */}
            <style>{`
                body.page-login-index, body.page-site-index {
                    background: #f9fafb !important; /* Soft gray */
                }
                /* Hide standard Moodle stuff we want to replace */
                #page-header, #page-footer, .navbar {
                    /* We might want to keep navbar? Or custom one? 
                       User showed a clean design. Let's assume we hide standard wrappers if we are "Taking over"
                       BUT 'login' page usually has simple structure. 
                    */
                    /* display: none;  <-- Risky if navigation needed. Let's rely on CSS mostly overriding. */
                }
                
                /* Glassmorphism utility */
                .glass-panel {
                    background: rgba(255, 255, 255, 0.7);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    border-radius: 24px;
                    padding: 2rem;
                    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
                }
            `}</style>
        </div>
    );
};

export default LandingPage;
