import React from 'react';
import LoginFormContainer from './LoginFormContainer';
import FeaturedCourses from './FeaturedCourses';

const LandingPage = () => {
    // Tech-Pro Aesthetic: Clean, sharp, minimalist.
    // Colors: #199EDA (Blue), #E30613 (Red), #535158 (Dark Gray)

    // Fetch Site Info (Logos)
    const [siteInfo, setSiteInfo] = React.useState(null);
    const [baseUrl, setBaseUrl] = React.useState('');

    React.useEffect(() => {
        const root = (window.M && window.M.cfg && window.M.cfg.wwwroot) ? window.M.cfg.wwwroot : '';
        setBaseUrl(root);

        // Use the root to construct the API URL so it works from any sub-page
        const apiUrl = `${root}/theme/boost_child/api.php?featured=1`;

        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success' && data.site) {
                    setSiteInfo(data.site);
                    // Also set favicon dynamically if desired
                    if (data.site.favicon) {
                        let link = document.querySelector("link[rel~='icon']");
                        if (!link) {
                            link = document.createElement('link');
                            link.rel = 'icon';
                            document.getElementsByTagName('head')[0].appendChild(link);
                        }
                        link.href = data.site.favicon;
                    }
                }
            })
            .catch(err => console.error("Failed to load site info", err));
    }, []);

    // Robust Fallback: Use the absolute base URL if available to find the local theme file
    const fallbackLogo = baseUrl ? `${baseUrl}/theme/boost_child/pix/logo.png` : "/theme/boost_child/pix/logo.png";
    const logoSrc = (siteInfo && siteInfo.logo) ? siteInfo.logo : fallbackLogo;

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
                <div className="flex-1 space-y-20 lg:pt-8 pb-20">
                    <header className="space-y-8 animate-fade-in-up">
                        {/* Brand Logo */}
                        <div className="flex items-center gap-4">
                            <img
                                src={logoSrc}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/theme/boost_child/pix/logo.png";
                                }}
                                alt="Atlantis University"
                                className="h-12 lg:h-14 w-auto object-contain"
                            />
                            <div className="h-8 w-px bg-gray-300 mx-2 hidden sm:block"></div>
                            <span className="text-brand-gray-dark font-medium tracking-wide hidden sm:block text-sm uppercase">Learning Community</span>
                        </div>

                        {/* Heading */}
                        <div className="space-y-6">
                            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-brand-black leading-[1.05]">
                                Learning designed for <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#199EDA] to-[#0077B5]">depth, clarity, and relevance.</span>
                            </h1>
                            <p className="text-xl lg:text-2xl text-brand-gray-dark max-w-2xl font-light leading-relaxed">
                                Atlantis University advances academic and professional learning through intentional systems that go beyond traditional instructional models.
                            </p>
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-4 pt-4">
                            <button onClick={() => document.querySelector('.login-wrapper')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 rounded-full bg-[#199EDA] hover:bg-[#158cc2] text-white font-semibold transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transform hover:-translate-y-px">
                                Access the Learning Community
                            </button>
                            <a href="#courses" className="px-8 py-4 rounded-full bg-white border border-gray-200 hover:bg-gray-50 text-brand-gray-dark font-semibold transition-all hover:border-gray-300">
                                Explore featured courses
                            </a>
                        </div>
                    </header>

                    {/* LEARNING PHILOSOPHY */}
                    <section className="animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "Intentional Learning", desc: "Learning paths designed with purpose, coherence, and long-term understanding." },
                                { title: "Academic Rigor", desc: "Programs grounded in research, critical thinking, and applied knowledge." },
                                { title: "Modern Pedagogy", desc: "Educational models aligned with contemporary professional and societal realities." }
                            ].map((item, idx) => (
                                <div key={idx} className="space-y-3">
                                    <div className="w-12 h-1 bg-gradient-to-r from-[#199EDA] to-[#E30613] rounded-full mb-4 opacity-80"></div>
                                    <h3 className="text-lg font-bold text-brand-black">{item.title}</h3>
                                    <p className="text-brand-gray-dark text-base leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* NEWS SECTION */}
                    <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-brand-black">Academic Updates</h2>
                        </div>
                        {/* News Card Example */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#199EDA] text-xs font-bold mb-3 uppercase tracking-wider">Spring Term 2026</span>
                            <h3 className="text-xl font-bold text-brand-black mb-2 group-hover:text-[#199EDA] transition-colors">Enrollment Now Open</h3>
                            <p className="text-brand-gray-dark text-sm mb-4">January 2026 · Academic Affairs</p>
                            <div className="text-[#199EDA] font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                Read update <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </div>
                        </div>
                    </section>

                    {/* Featured Section */}
                    <section id="courses" className="animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-brand-black flex items-center gap-3">
                                <svg className="w-6 h-6 text-[#199EDA]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                                Featured Academic Offerings
                            </h2>
                        </div>
                        <FeaturedCourses />
                    </section>

                    {/* FOOTER (Mobile/Left only? Or global?) we put it here for layout flow */}
                    <footer className="pt-12 border-t border-gray-100 flex flex-col sm:flex-row justify-between text-sm text-[#86868b]">
                        <div>Atlantis University ©</div>
                        <div className="flex gap-4 mt-2 sm:mt-0">
                            <span>Academic Policies</span>
                            <span>Privacy</span>
                            <span>Support</span>
                        </div>
                    </footer>
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
