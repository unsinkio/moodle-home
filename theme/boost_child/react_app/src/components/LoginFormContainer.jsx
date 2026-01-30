import React, { useEffect, useRef } from 'react';

const LoginFormContainer = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        // Find the original Moodle login form
        // Moodle 4.x usually has a login container with class 'login-container' or id 'page-login-index' context
        // We look for the main login form. 
        // In Boost: .login-form or #login
        const originalForm = document.querySelector('.login-form') || document.querySelector('#login') || document.querySelector('form[action*="login.php"]');
        // Standard Moodle 4.x IDP container
        const potentialIdps = document.querySelector('.potential-idps');

        if (containerRef.current) {
            // 1. Move the Main Form
            if (originalForm && !containerRef.current.contains(originalForm)) {
                containerRef.current.appendChild(originalForm);
            }

            // 2. Move OAuth Buttons (Google/Microsoft)
            if (potentialIdps && !containerRef.current.contains(potentialIdps)) {
                // Add a divider or title if needed
                const divider = document.createElement('div');
                divider.className = 'login-divider text-center my-4 text-sm text-[#86868b] font-medium';
                divider.innerText = 'Or log in with';
                containerRef.current.appendChild(divider);

                containerRef.current.appendChild(potentialIdps);
            }
        }
    }, []);

    return (
        <div className="glass-panel login-wrapper flex flex-col justify-center min-h-[500px]" ref={containerRef}>
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-semibold text-[#1d1d1f] mb-2">Welcome Back</h2>
                <p className="text-[#86868b]">Access your student portal</p>
            </div>

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
                .login-wrapper input.form-control {
                    border-radius: 12px;
                    padding: 12px;
                    border: 1px solid #e5e7eb;
                    background: rgba(255,255,255,0.8);
                    backdrop-filter: blur(4px);
                }
                .login-wrapper button.btn-primary, .login-wrapper button.btn-secondary, .login-wrapper input[type="submit"] {
                    background: #1d1d1f !important; /* Apple Black */
                    color: white !important;
                    border-radius: 12px !important;
                    width: 100%;
                    padding: 14px;
                    font-weight: 600;
                    border: none;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    transition: transform 0.2s;
                }
                .login-wrapper button:hover, .login-wrapper input[type="submit"]:hover {
                    background: #000 !important;
                    transform: scale(1.01);
                }
                /* Input Styling Elevation */
                .login-wrapper input.form-control {
                    border-radius: 12px;
                    padding: 16px; /* Taller inputs */
                    border: 1px solid #d2d2d7;
                    background: rgba(255,255,255,0.6);
                    backdrop-filter: blur(10px);
                    font-size: 1rem;
                    transition: border-color 0.2s, box-shadow 0.2s;
                }
                .login-wrapper input.form-control:focus {
                     border-color: #0066CC;
                     box-shadow: 0 0 0 4px rgba(0, 102, 204, 0.1);
                }
                
                /* Potential IDPs (OAuth Buttons) */
                .potential-idps {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    margin-top: 1rem;
                }
                .potential-idps .login-identityprovider-btn {
                    display: flex !important;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    padding: 12px;
                    background: white !important;
                    border: 1px solid #d2d2d7 !important;
                    border-radius: 12px !important;
                    color: #1d1d1f !important;
                    font-weight: 500;
                    text-decoration: none;
                    transition: all 0.2s;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
                }
                .potential-idps .login-identityprovider-btn:hover {
                    background: #f5f5f7 !important;
                    transform: scale(1.005);
                    box-shadow: 0 4px 8px rgba(0,0,0,0.05);
                }
                .potential-idps img {
                    margin-right: 10px;
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
