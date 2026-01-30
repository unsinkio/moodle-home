import React, { useEffect, useRef } from 'react';

const LoginFormContainer = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        // Find the original Moodle login form
        // Moodle 4.x usually has a login container with class 'login-container' or id 'page-login-index' context
        // We look for the main login form. 
        // In Boost: .login-form or #login
        const originalForm = document.querySelector('.login-form') || document.querySelector('#login') || document.querySelector('form[action*="login.php"]');

        if (originalForm && containerRef.current) {
            // Check if we already moved it (to avoid loops if re-rendering)
            if (!containerRef.current.contains(originalForm)) {
                // Determine if we need to wrap it or just move it.
                // Moodle's form might have limited width styling. We might need to override it.
                // We move the Element into our React Ref.
                containerRef.current.appendChild(originalForm);

                // Optional: Remove the original container if it's now empty/ugly? 
                // Usually the parent of the form might be a .row or .card-body that we want to hide.
                // But let's be careful not to break scripts.
            }
        }
    }, []);

    return (
        <div className="glass-panel login-wrapper" ref={containerRef}>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Welcome Back</h2>
            {/* The Moodle Login Form will appear here */}
            <div id="react-login-placeholder" className="min-h-[200px] flex items-center justify-center text-gray-400 text-sm">
                Loading login form...
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
