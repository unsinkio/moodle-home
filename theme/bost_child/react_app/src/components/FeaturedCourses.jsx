import React, { useState, useEffect } from 'react';

const FeaturedCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Construct API URL relative to the site root
        // Assuming the app is running on the moodle site, /local/publicapi/api.php should be accessible.
        // We might need M.cfg.wwwroot if available, but relative path often works if at root.
        const apiUrl = '/local/publicapi/api.php?featured=1';

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.status === 'success') {
                    setCourses(data.courses);
                } else {
                    setError('Error fetching courses');
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Fetch error:', err);
                setError('Failed to load courses');
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center p-4">Loading featured courses...</div>;
    if (error) return <div className="text-center text-danger p-4">{error}</div>;
    if (courses.length === 0) return null; // Don't show anything if no course

    return (
        <div className="featured-courses-container container my-5">
            <h2 className="text-center mb-4">Featured Courses</h2>
            <div className="row">
                {courses.map(course => (
                    <div key={course.id} className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            {course.imageurl && (
                                <img src={course.imageurl} className="card-img-top" alt={course.fullname} style={{ height: '200px', objectFit: 'cover' }} />
                            )}
                            <div className="card-body">
                                <h5 className="card-title">{course.fullname}</h5>
                                <p className="card-text text-truncate">{course.summary}</p>
                                <a href={`/course/view.php?id=${course.id}`} className="btn btn-primary">View Course</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedCourses;
