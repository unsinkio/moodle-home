<?php

defined('MOODLE_INTERNAL') || die();

$THEME->name = 'boost_child'; // Must match the folder name
$THEME->sheets = [];
$THEME->editor_sheets = [];
$THEME->parents = ['boost']; // Herencia directa de Boost
$THEME->enable_dock = false;
$THEME->yuicssmodules = array();
$THEME->rendererfactory = 'theme_overridden_renderer_factory';
$THEME->requiredblocks = '';
// $THEME->addblockposition = SIDE_PRE; // Deprecated/Undefined in some contexts.

$THEME->scss = function($theme) {
    return theme_boost_child_get_main_scss_content($theme);
};

// Add React Bundle
$THEME->javascripts_footer = ['react_bundle'];

// Config layout to use our custom frontpage
// WARMING: Defining $THEME->layouts overrides PARENT layouts completely. 
// Do not uncomment unless you define ALL layouts.
// $THEME->layouts = [
//     'frontpage' => array(
//         'file' => 'frontpage.php',
//         'regions' => array('side-pre'),
//         'defaultregion' => 'side-pre',
//     ),
// ];

// Wait, I shouldn't uncomment the layouts array if I don't want to break other pages.
// I'll just add javascripts_footer for now.

