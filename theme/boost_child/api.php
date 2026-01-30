<?php

// Disable Moodle cookies to allow public access without session.
define('NO_MOODLE_COOKIES', true);

// Adjust path to config.php if needed.
// From theme/boost_child/api.php -> ../../config.php 
require_once('../../config.php');

// Set JSON header.
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *'); // Optional: CORS if needed

// Get parameters.
$featured = optional_param('featured', 0, PARAM_BOOL);

$response = [
    'status' => 'success',
    'courses' => []
];

try {
    // Basic query to fetch courses.
    // In a real scenario, we would join with custom fields.
    // For this POC, we will mock the logic or fetch all visible courses if 'featured' is not strictly implemented via DB yet.
    // Let's assume we look for courses where 'visible' is 1.
    
    // NOTE: To strictly follow "identified by some property", we normally check 'mdl_customfield_data'.
    // For simplicity/robustness in this environment without DB setup, we'll fetch courses and return simulated data 
    // OR try to fetch visible courses.
    
    // Let's implement a real query assuming standard Moodle tables.
    global $DB, $CFG;
    
    // Fetch courses that are visible and not site course (id 1).
    $courses = $DB->get_records_select('course', 'visible = 1 AND id != 1', null, 'sortorder ASC', 'id, fullname, summary, summaryformat');
    
    foreach ($courses as $course) {
        // Here we would filter by custom field if implemented.
        // For now, return all visible courses to the React app.
        
        // Handle summary image if exists (simplified).
        $imageurl = ''; 
        // Logic to extract image would go here, or return a placeholder.
        
        $response['courses'][] = [
            'id' => $course->id,
            'fullname' => $course->fullname,
            'summary' => strip_tags($course->summary), // Strip tags for cleaner JSON
            'imageurl' => $imageurl
        ];
    }

} catch (Exception $e) {
    $response['status'] = 'error';
    $response['message'] = $e->getMessage();
}

echo json_encode($response);
