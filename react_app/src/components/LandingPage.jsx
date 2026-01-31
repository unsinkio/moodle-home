import React from 'react';
import LoginFormContainer from './LoginFormContainer';
import FeaturedCourses from './FeaturedCourses';

const LandingPage = () => {
    // Tech-Pro Aesthetic: Clean, sharp, minimalist.
    // Colors: #199EDA (Blue), #E30613 (Red), #535158 (Dark Gray)

    return (
        <div className="landing-page min-h-screen bg-white text-[#1d1d1f] font-sans selection:bg-[#E30613] selection:text-white overflow-x-hidden">
            {/* Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-gradient-to-br from-[#199EDA]/10 to-transparent rounded-full blur-3xl opacity-60" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[30vw] h-[30vw] bg-gradient-to-tr from-[#E30613]/5 to-transparent rounded-full blur-3xl opacity-60" />
            </div>

            {/* Main Layout */}
            <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 py-12 lg:py-20 flex flex-col lg:flex-row gap-16 items-start">

                {/* Left Column: Brand & Content */}
                <div className="flex-1 space-y-12 lg:pt-8">
                    <header className="space-y-8 animate-fade-in-up">
                        {/* Brand Logo */}
                        <div className="flex items-center gap-4">
                            <img src="/theme/boost_child/pix/logo.png" alt="Atlantis University" className="h-12 lg:h-14 w-auto object-contain" />
                            <div className="h-8 w-px bg-gray-300 mx-2 hidden sm:block"></div>
                            <span className="text-brand-gray-dark font-medium tracking-wide hidden sm:block text-sm uppercase">Learning Community</span>
                        </div>

                        {/* Heading */}
                        <div className="space-y-4">
                            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-brand-black leading-[1.1]">
                                Future-Ready <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#199EDA] to-[#0077B5]">Excellence.</span>
                            </h1>
                            <p className="text-xl lg:text-2xl text-brand-gray-dark max-w-2xl font-light leading-relaxed">
                                Empowering your professional journey with world-class education and technology.
                            </p>
                        </div>

                        {/* CTA / Badges */}
                        <div className="flex flex-wrap gap-4 pt-2 text-sm font-semibold text-brand-gray-light">
                            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-100">
                                <span className="w-2 h-2 rounded-full bg-[#E30613]"></span> Live Classes
                            </span>
                            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-100">
                                <span className="w-2 h-2 rounded-full bg-[#199EDA]"></span> Certified Courses
                            </span>
                        </div>
                    </header>

                    {/* Featured Section */}
                    <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-brand-black flex items-center gap-3">
                                <svg className="w-6 h-6 text-[#199EDA]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                                Featured Courses
                            </h2>
                        </div>
                        <FeaturedCourses />
                    </section>
                </div>

                {/* Right Column: Login (Sticky) */}
                <div className="w-full lg:w-[400px] lg:sticky lg:top-12 z-20">
                    <LoginFormContainer />
                </div>
            </div>

            {/* Global Styles for this page Override */}
            <style>{`
                /* 1. HIDE MOODLE LEGACY UI */
                body.react-landing-active #page-wrapper,
                body.react-landing-active #page-footer,
                body.react-landing-active .fixed-top,
                body.react-landing-active .navbar,
                body.react-landing-active #region-main,
                body.react-landing-active footer {
                    display: none !important;
                }
                
                body.react-landing-active {
                    background: #ffffff !important; 
                    overflow-x: hidden;
                }

                /* 2. CUSTOM ANIMATIONS */
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translate3d(0, 20px, 0); }
                    to { opacity: 1; transform: translate3d(0, 0, 0); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    opacity: 0; 
                }
                
                /* 3. SHARP GLASS & UTILITIES */
                .glass-panel {
                    background: rgba(255, 255, 255, 0.85);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(0, 0, 0, 0.05);
                    border-radius: 24px;
                    box-shadow: 
                        0 20px 40px rgba(0,0,0,0.06),
                        0 1px 2px rgba(0,0,0,0.02);
                }
            `}</style>
        </div>
    );
};

export default LandingPage;
