<?php

defined('MOODLE_INTERNAL') || die();

$plugin->component = 'theme_bost_child';
$plugin->version   = 2024013000;
$plugin->requires  = 2023041800; // Compatible con Moodle 4.2+ (basado en theme_boost provided)
$plugin->maturity  = MATURITY_STABLE;
$plugin->release   = '1.0.1';
$plugin->dependencies = array(
    'theme_bost'  => 2022041900, // Version base de Bost (si existe)
    'theme_boost' => 2023042400, // Version de Boost instalada
);
