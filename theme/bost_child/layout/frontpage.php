<?php
defined('MOODLE_INTERNAL') || die();

// Standard header
echo $OUTPUT->header();

// Main content
echo $OUTPUT->main_content();

// React Container for Anonymous Users
if (!isloggedin() || isguestuser()) {
    echo '<div id="react-featured-courses-root"></div>';
}

// Standard footer
echo $OUTPUT->footer();
