import React, { useState, useEffect } from 'react';

const FeaturedCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Construct API URL using Moodle's global config if available
        // M.cfg.wwwroot contains the base URL of the Moodle site.
        const baseUrl = (window.M && window.M.cfg && window.M.cfg.wwwroot) ? window.M.cfg.wwwroot : '';
        // API is now located inside the theme
        const apiUrl = `${baseUrl}/theme/boost_child/api.php?featured=1`;

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

    if (loading) return (
        <div className="flex gap-4 animate-pulse">
            {[1, 2, 3].map(i => (
                <div key={i} className="flex-1 h-64 bg-gray-200 rounded-2xl"></div>
            ))}
        </div>
    );
    if (error) return <div className="text-red-500 font-medium p-4 bg-red-50 rounded-lg">{error}</div>;
    if (courses.length === 0) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map(course => (
                <a key={course.id} href={`/course/view.php?id=${course.id}`} className="group block no-underline text-inherit">
                    <div className="relative bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-[1.02]">
                        <div className="aspect-w-16 aspect-h-10 bg-gray-100 h-48 overflow-hidden">
                            {course.imageurl ? (
                                <img src={course.imageurl} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" alt={course.fullname} />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-200">
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                </div>
                            )}
                        </div>
                        <div className="p-6">
                            <h5 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{course.fullname}</h5>
                            <p className="text-gray-500 line-clamp-2 text-sm">{course.summary}</p>
                            <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center text-sm font-medium text-indigo-600">
                                <span>Start Course</span>
                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </div>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
};

export default FeaturedCourses;
