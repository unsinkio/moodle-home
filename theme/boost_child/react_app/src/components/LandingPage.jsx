import React from 'react';
import LoginFormContainer from './LoginFormContainer';
import FeaturedCourses from './FeaturedCourses';

const LandingPage = () => {
    // AU Branding Colors based on reference:
    // Red: #CC0000 (approx from logo)
    // Blue: #003366 (approx from text)

    return (
        <div className="landing-page min-h-screen bg-[#F5F5F7] text-[#1d1d1f] font-sans selection:bg-[#CC0000] selection:text-white">
            {/* Split Layout: Hero/Courses Left, Login Right (or stacked on mobile) */}
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-24 flex flex-col lg:flex-row gap-16 items-start relative">

                {/* Left Column: Content & Courses */}
                <div className="flex-1 space-y-16">
                    <header className="space-y-6 animate-fade-in-up">
                        {/* Optional: Add Logo here if not in Navbar */}
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-8">
                            {/* Placeholder for AU Logo Icon if needed, or just keep text */}
                            <span className="text-[#CC0000] font-bold text-3xl">A</span>
                        </div>

                        <h1 className="text-6xl lg:text-7xl font-semibold tracking-tight text-[#1d1d1f] leading-tight">
                            Learn without <span className="text-[#0055AA]">limits.</span>
                        </h1>
                        <p className="text-2xl text-[#86868b] max-w-2xl font-light leading-relaxed">
                            Discover a world of knowledge with Atlantis University's premium courses.
                            Start your journey today.
                        </p>
                    </header>

                    <section>
                        <h2 className="text-3xl font-semibold mb-8 text-[#1d1d1f]">Featured Courses</h2>
                        <FeaturedCourses />
                    </section>
                </div>

                {/* Right Column: Login (Sticky on Desktop) */}
                <div className="w-full lg:w-[420px] lg:sticky lg:top-12 z-10">
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
