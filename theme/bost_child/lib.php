<?php

defined('MOODLE_INTERNAL') || die();

function theme_bost_child_get_main_scss_content($theme) {
    global $CFG;

    $scss = '';
    $filename = $CFG->dirroot . '/theme/bost_child/scss/post.scss';
    $content = file_get_contents($filename);
    if (!empty($content)) {
        $scss .= $content;
    }

    return $scss;
}
