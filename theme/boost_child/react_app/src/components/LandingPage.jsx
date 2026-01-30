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
                /* 1. HIDE MOODLE LEGACY UI */
                /* We hide the main wrappers but keep them in DOM so we can extract the form */
                body.react-landing-active #page-wrapper,
                body.react-landing-active #page-footer,
                body.react-landing-active .fixed-top, /* Navbars */
                body.react-landing-active .navbar,
                body.react-landing-active #region-main,
                body.react-landing-active footer {
                    display: none !important;
                }
                
                /* Ensure our root is visible and takes over */
                body.react-landing-active {
                    background: #F5F5F7 !important;
                    overflow-x: hidden;
                }

                /* 2. CUSTOM ANIMATIONS */
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translate3d(0, 40px, 0);
                    }
                    to {
                        opacity: 1;
                        transform: translate3d(0, 0, 0);
                    }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                }
                
                /* 3. GLASSMORPHISM & UTILITIES */
                .glass-panel {
                    background: rgba(255, 255, 255, 0.65);
                    backdrop-filter: blur(24px) saturate(180%);
                    -webkit-backdrop-filter: blur(24px) saturate(180%);
                    border: 1px solid rgba(255, 255, 255, 0.5);
                    border-radius: 32px; /* Super rounded */
                    box-shadow: 
                        0 20px 40px rgba(0,0,0,0.04),
                        0 1px 3px rgba(0,0,0,0.02);
                }
            `}</style>
        </div>
    );
};

export default LandingPage;
