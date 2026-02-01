<?php

// Disable Moodle cookies to allow public access without session.
// define('NO_MOODLE_COOKIES', true); // Commented out to allow session access for file serving verification

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
    'site' => [
        'logo' => '',
        'logocompact' => '',
        'favicon' => ''
    ],
    'courses' => []
];

try {
    global $DB, $CFG;

    // Helper to get logo content as Base64 to avoid pluginfile permission issues
    function get_logo_data_from_config($name)
    {
        $fs = get_file_storage();
        // Get files, excluding directories
        $files = $fs->get_area_files(context_system::instance()->id, 'core_admin', $name, 0, 'itemid, filepath, filename', false);
        if ($files) {
            // Get the first file found (usually there is only one logo)
            $file = reset($files);

            // Read content
            $content = $file->get_content();
            $mimetype = $file->get_mimetype();

            // Encode
            $base64 = base64_encode($content);
            return 'data:' . $mimetype . ';base64,' . $base64;
        }
        return '';
    }

    $response['site']['logo'] = get_logo_data_from_config('logo');
    $response['site']['logocompact'] = get_logo_data_from_config('logocompact');
    $response['site']['favicon'] = get_logo_data_from_config('favicon');

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

    require_once($CFG->dirroot . '/course/lib.php');
    require_once($CFG->libdir . '/filelib.php');

    $courses_data = $DB->get_records_sql($sql, ['tagname' => $tagname]);

    foreach ($courses_data as $course) {

        // Handle summary image
        $imageurl = '';

        // Use core_course_list_element to easily get overview files
        $courseobj = new core_course_list_element($course);
        foreach ($courseobj->get_course_overviewfiles() as $file) {
            if ($file->is_valid_image()) {
                $imageurl = moodle_url::make_pluginfile_url(
                    $file->get_contextid(),
                    $file->get_component(),
                    $file->get_filearea(),
                    null,
                    $file->get_filepath(),
                    $file->get_filename()
                )->out();
                // Use the first valid image found
                break;
            }
        }

        $response['courses'][] = [
            'id' => $course->id,
            'fullname' => $course->fullname,
            'summary' => strip_tags($course->summary),
            'imageurl' => $imageurl
        ];
    }

} catch (Exception $e) {
    $response['status'] = 'error';
    $response['message'] = $e->getMessage();
}

echo json_encode($response);
