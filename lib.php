<?php

defined('MOODLE_INTERNAL') || die();

function theme_boost_child_get_main_scss_content($theme) {
    global $CFG;

    // 1. Get Parent's SCSS (Boost)
    // We need to ensure Boost's lib is loaded to call its function.
    // Usually Moodle loads parent libs, but let's be safe or just call it if exists.
    $scss = '';
    if (function_exists('theme_boost_get_main_scss_content')) {
        $scss .= theme_boost_get_main_scss_content($theme);
    } else {
        // Fallback: try to include boost lib if not found (rare if 'parents' is set correctly, but happens)
        $boostlib = $CFG->dirroot . '/theme/boost/lib.php';
        if (file_exists($boostlib)) {
            require_once($boostlib);
            if (function_exists('theme_boost_get_main_scss_content')) {
                $scss .= theme_boost_get_main_scss_content($theme);
            }
        }
    }

    // 2. Append Child's SCSS
    $filename = $CFG->dirroot . '/theme/boost_child/scss/post.scss';
    if (file_exists($filename)) {
        $content = file_get_contents($filename);
        if (!empty($content)) {
            $scss .= "\n" . $content;
        }
    }

    return $scss;
}
