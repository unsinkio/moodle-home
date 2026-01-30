<?php

defined('MOODLE_INTERNAL') || die();

function theme_boost_child_get_main_scss_content($theme) {
    global $CFG;

    $scss = '';
    $filename = $CFG->dirroot . '/theme/boost_child/scss/post.scss';
    $content = file_get_contents($filename);
    if (!empty($content)) {
        $scss .= $content;
    }

    return $scss;
}
