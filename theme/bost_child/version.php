<?php

defined('MOODLE_INTERNAL') || die();

$plugin->component = 'theme_bost_child';
$plugin->version   = 2024013000;
$plugin->requires  = 2022041900; // Moodle 4.0 or later
$plugin->maturiy   = MATURITY_STABLE;
$plugin->release   = '1.0.0';
$plugin->dependencies = array(
    'theme_bost'  => 2022041900, // Suponemos una versión base de Bost
);
