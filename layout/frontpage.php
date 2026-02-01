<?php
defined('MOODLE_INTERNAL') || die();

// Standard header
echo $OUTPUT->header();

// Main content
echo $OUTPUT->main_content();

// React Container for Anonymous Users - PRE-RENDERED SKELETON
if (!isloggedin() || isguestuser()) {
    echo '<div id="react-landing-page-root">';
    // INLINE CRITICAL CSS & SKELETON
    echo '
    <style>
        body { margin: 0; background: white; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
        .sk-wrapper { max-width: 1440px; margin: 0 auto; padding: 3rem 1.5rem; display: flex; flex-direction: column; gap: 4rem; }
        .sk-animate { animation: sk-pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes sk-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .sk-h-12 { height: 3rem; }
        .sk-w-32 { width: 8rem; }
        .sk-bg-gray { background-color: #f3f4f6; }
        .sk-rounded { border-radius: 9999px; }
        .sk-hero-title { height: 4rem; width: 80%; background-color: #e5e7eb; margin-bottom: 1.5rem; border-radius: 0.5rem; }
        .sk-hero-sub { height: 1.5rem; width: 60%; background-color: #f3f4f6; margin-bottom: 2rem; border-radius: 0.5rem; }
        .sk-btn { height: 3.5rem; width: 12rem; border-radius: 9999px; display: inline-block; margin-right: 1rem; }
        
        .sk-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; margin-top: 4rem; }
        @media (min-width: 768px) { 
            .sk-wrapper { flex-direction: row; }
            .sk-left { flex: 1; }
            .sk-right { width: 400px; display: none; } /* Hide right on mobile initially */
            @media (min-width: 1024px) { .sk-right { display: block; } .sk-grid { grid-template-columns: repeat(3, 1fr); } }
        }
    </style>
    <div class="sk-wrapper">
        <div class="sk-left">
            <!-- Header/Logo -->
            <div class="sk-animate sk-h-12 sk-w-32 sk-bg-gray mb-12"></div>
            
            <!-- Hero Text -->
            <div class="sk-animate sk-hero-title"></div>
            <div class="sk-animate sk-hero-title" style="width: 60%"></div>
            <div class="sk-animate sk-hero-sub"></div>
            
            <!-- Buttons -->
            <div class="sk-animate sk-btn" style="background-color: #bfdbfe"></div>
            <div class="sk-animate sk-btn sk-bg-gray"></div>

            <!-- Pillars Grid -->
            <div class="sk-grid">
                 <div><div class="sk-animate sk-h-12 sk-w-12 sk-rounded mb-4" style="background-color: #bfdbfe"></div><div class="sk-animate h-6 w-3/4 sk-bg-gray mb-2"></div><div class="sk-animate h-4 w-full sk-bg-gray"></div></div>
                 <div><div class="sk-animate sk-h-12 sk-w-12 sk-rounded mb-4" style="background-color: #fca5a5"></div><div class="sk-animate h-6 w-3/4 sk-bg-gray mb-2"></div><div class="sk-animate h-4 w-full sk-bg-gray"></div></div>
                 <div><div class="sk-animate sk-h-12 sk-w-12 sk-rounded mb-4" style="background-color: #bfdbfe"></div><div class="sk-animate h-6 w-3/4 sk-bg-gray mb-2"></div><div class="sk-animate h-4 w-full sk-bg-gray"></div></div>
            </div>
        </div>
        <div class="sk-right">
             <!-- Login Box Skeleton -->
             <div class="sk-animate" style="height: 400px; width: 100%; border-radius: 1.5rem; background-color: #f9fafb; border: 1px solid #e5e5e5;"></div>
        </div>
    </div>
    ';
    echo '</div>';
}

// Standard footer
echo $OUTPUT->footer();
