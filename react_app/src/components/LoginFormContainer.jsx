import React, { useEffect, useRef } from 'react';

const LoginFormContainer = () => {
    const formTargetRef = useRef(null);
    const idpTargetRef = useRef(null);

    useEffect(() => {
        let attempts = 0;
        const maxAttempts = 10;

        const findAndMoveForm = () => {
            // Find the original Moodle login form
            // Try explicit ID first, then class, then generic action
            const originalForm = document.getElementById('login') || document.querySelector('.login-form') || document.querySelector('form[action*="login.php"]');
            const potentialIdps = document.querySelector('.potential-idps') || document.querySelector('.login-identityproviders');

            let formMoved = false;

            // 1. Move the Main Form into our specific target slot
            if (originalForm && formTargetRef.current) {
                if (!formTargetRef.current.contains(originalForm)) {
                    formTargetRef.current.appendChild(originalForm);
                    // Ensure it's visible
                    originalForm.style.display = 'block';
                }
                formMoved = true;
            }

            // 2. Move OAuth Buttons into our specific target slot
            if (potentialIdps && idpTargetRef.current && !idpTargetRef.current.contains(potentialIdps)) {
                // Remove the original heading "Log in using your account on:"
                const oldHeading = potentialIdps.querySelector('.login-heading');
                if (oldHeading) oldHeading.style.display = 'none';

                idpTargetRef.current.appendChild(potentialIdps);
            }

            // Retry if form not found yet
            if (!formMoved && attempts < maxAttempts) {
                attempts++;
                setTimeout(findAndMoveForm, 200);
            } else if (!formMoved && attempts >= maxAttempts) {
                // FALLBACK: If form never found (e.g. strict landing page without login block), show a manual link
                if (formTargetRef.current) {
                    // Check if we already added the fallback
                    if (!formTargetRef.current.querySelector('.fallback-login-btn')) {
                        const fallbackBtn = document.createElement('a');
                        fallbackBtn.href = '/login/index.php';
                        fallbackBtn.className = 'btn btn-primary fallback-login-btn';
                        fallbackBtn.innerText = 'Log In (Direct)';
                        fallbackBtn.style.display = 'block';
                        fallbackBtn.style.width = '100%';
                        fallbackBtn.style.textAlign = 'center';
                        fallbackBtn.style.marginTop = '20px';
                        formTargetRef.current.appendChild(fallbackBtn);
                    }
                }
            }
        };

        findAndMoveForm();
    }, []);

    return (
        <div className="glass-panel login-wrapper flex flex-col justify-center p-6 md:p-8">
            <div className="mb-6 text-center">
                <h2 className="text-xl lg:text-2xl font-bold text-[#1d1d1f] mb-2 tracking-tight">Access the Learning Community</h2>
                <p className="text-[#86868b] text-xs leading-relaxed max-w-[280px] mx-auto">
                    Reserved for students, faculty, and academic collaborators.
                </p>
            </div>

            {/* The Moodle Login Form Slot */}
            <div ref={formTargetRef} className="w-full"></div>

            {/* Helper Link */}
            <div className="mt-4 mb-6 text-center">
                <a href="/login/forgot_password.php" className="text-xs font-medium text-[#199EDA] hover:underline">
                    Need help accessing your account?
                </a>
            </div>

            {/* OAuth Buttons Slot */}
            <div ref={idpTargetRef} className="w-full">
                <div className="relative text-center mb-4 mt-2">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                    <div className="relative flex justify-center text-xs"><span className="px-2 bg-white text-[#86868b]">or continue with</span></div>
                </div>
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
