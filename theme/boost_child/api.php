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
    
    // Params
    $tagname = 'featured'; // The tag key to look for
    
    // SQL to fetch courses that have the specific tag
    $sql = "SELECT c.id, c.fullname, c.summary, c.summaryformat
            FROM {course} c
            JOIN {tag_instance} ti ON ti.itemid = c.id
            JOIN {tag} t ON t.id = ti.tagid
            WHERE t.name = :tagname 
              AND ti.itemtype = 'course' 
              AND ti.component = 'core' 
              AND c.visible = 1
            ORDER BY c.sortorder ASC";
            
    $courses = $DB->get_records_sql($sql, ['tagname' => $tagname]);
    
    // Fallback: If no courses found with tag, return array empty (controlled by UI)
    
    foreach ($courses as $course) {
        
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
