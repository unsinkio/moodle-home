import React, { useEffect, useRef } from 'react';

const LoginFormContainer = () => {
    const containerRef = useRef(null);

    const [hasGuestAccess, setHasGuestAccess] = React.useState(false);

    useEffect(() => {
        // Find the original Moodle login form
        // Moodle 4.x usually has a login container with class 'login-container' or id 'page-login-index' context
        // We look for the main login form. 
        // In Boost: .login-form or #login
        const originalForm = document.querySelector('.login-form') || document.querySelector('#login') || document.querySelector('form[action*="login.php"]');
        // Standard Moodle 4.x IDP container, or the specific one user has
        const potentialIdps = document.querySelector('.potential-idps') || document.querySelector('.login-identityproviders');

        // Guest Access Check
        // Try multiple selectors
        const guestForm = document.getElementById('guestlogin') || document.querySelector('form[action*="login.php"][id="guestlogin"]') || document.querySelector('.guestlogin'); // Fallback class check

        if (guestForm) {
            setHasGuestAccess(true);
        }

        if (containerRef.current) {
            // 1. Move the Main Form
            if (originalForm && !containerRef.current.contains(originalForm)) {
                containerRef.current.appendChild(originalForm);
            }

            // 2. Move OAuth Buttons (Google/Microsoft)
            if (potentialIdps && !containerRef.current.contains(potentialIdps)) {
                // Remove the original heading "Log in using your account on:" if it exists, 
                // because we will add our own cleaner divider.
                const oldHeading = potentialIdps.querySelector('.login-heading');
                if (oldHeading) oldHeading.style.display = 'none';

                // Add a divider or title if needed
                const divider = document.createElement('div');
                divider.className = 'login-divider text-center my-6 text-sm text-[#86868b] font-medium flex items-center gap-4 before:h-px before:flex-1 before:bg-gray-200 after:h-px after:flex-1 after:bg-gray-200';
                divider.innerText = 'or continue with';
                containerRef.current.appendChild(divider);

                containerRef.current.appendChild(potentialIdps);
            }
        }
    }, []);

    const handleGuestLogin = () => {
        const guestForm = document.getElementById('guestlogin');
        if (guestForm) {
            guestForm.submit();
        }
    };

    return (
        <div className="glass-panel login-wrapper flex flex-col justify-center min-h-[500px] p-8" ref={containerRef}>
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-semibold text-[#1d1d1f] mb-2 tracking-tight">Welcome Back</h2>
                <p className="text-[#86868b] text-lg">Access your student portal</p>
            </div>

            {/* Guest Login Button */}
            {hasGuestAccess && (
                <div className="mb-6">
                    <button
                        onClick={handleGuestLogin}
                        className="w-full py-3.5 rounded-xl bg-white border border-[#e5e5e5] hover:bg-[#fbfbfd] text-[#1d1d1f] font-medium transition-all shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] flex items-center justify-center gap-3 transform hover:-translate-y-px"
                    >
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        Access as a Guest
                    </button>
                    <div className="text-center my-6 text-sm text-[#86868b] font-medium flex items-center gap-4 before:h-px before:flex-1 before:bg-gray-200 after:h-px after:flex-1 after:bg-gray-200">
                        or login with credentials
                    </div>
                </div>
            )}

            {/* The Moodle Login Form will appear here */}
            <div id="react-login-placeholder" className="min-h-[100px] flex items-center justify-center text-gray-400 text-sm">
                Loading secure login...
            </div>
            <style>{`
                /* Overlay styles for the injected form to make it look "Apple" */
                .login-wrapper .login-form {
                    width: 100% !important;
                    max-width: 100% !important;
                }
                .login-wrapper .login-form .form-group {
                    margin-bottom: 1.5rem;
                }
                .login-wrapper input.form-control {
                    border-radius: 12px;
                    padding: 16px; /* Taller inputs */
                    border: 1px solid #d2d2d7;
                    background: rgba(255,255,255,0.8);
                    backdrop-filter: blur(10px);
                    font-size: 1rem;
                    transition: border-color 0.2s, box-shadow 0.2s;
                    box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
                }
                .login-wrapper input.form-control:focus {
                     border-color: #0066CC;
                     box-shadow: 0 0 0 4px rgba(0, 102, 204, 0.15);
                     outline: none;
                }
                .login-wrapper button.btn-primary, .login-wrapper button.btn-secondary, .login-wrapper input[type="submit"] {
                    background: #1d1d1f !important; /* Apple Black */
                    color: white !important;
                    border-radius: 14px !important;
                    width: 100%;
                    padding: 16px;
                    font-weight: 600;
                    border: none;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    font-size: 1rem;
                }
                .login-wrapper button:hover, .login-wrapper input[type="submit"]:hover {
                    background: #000 !important;
                    transform: scale-[1.02];
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
                }
                
                /* Potential IDPs (OAuth Buttons - Fixed Selector) */
                .potential-idps, .login-identityproviders {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    margin-top: 0.5rem;
                    width: 100%;
                }
                /* Target buttons specifically */
                .potential-idps a, .login-identityproviders a, 
                .potential-idps .btn, .login-identityproviders .btn {
                    display: flex !important;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    padding: 14px;
                    background: white !important;
                    border: 1px solid #e5e5e5 !important;
                    border-radius: 12px !important;
                    color: #1d1d1f !important;
                    font-weight: 500;
                    text-decoration: none;
                    transition: all 0.2s;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
                    margin-bottom: 0 !important; /* Override moodle margin */
                }
                .potential-idps a:hover, .login-identityproviders a:hover {
                    background: #fbfbfd !important;
                    border-color: #d2d2d7 !important;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.06);
                }
                /* Images inside buttons */
                .potential-idps img, .login-identityproviders img {
                    margin-right: 12px;
                    height: 20px;
                    width: 20px;
                }
                
                .login-wrapper .login-form .form-label {
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                    color: #1d1d1f;
                    font-size: 0.95rem;
                }
                .login-wrapper a {
                    color: #0066CC !important;
                    font-weight: 500;
                    text-decoration: none;
                }
                #react-login-placeholder:not(:only-child) {
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default LoginFormContainer;
