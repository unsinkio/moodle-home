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
        <div className="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] gap-6 lg:gap-8 justify-center">
            {courses.map(course => (
                <a key={course.id} href={`/course/view.php?id=${course.id}`} className="group block no-underline text-inherit h-full">
                    <div className="relative bg-white rounded-[20px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition-all duration-500 ease-out border border-gray-100 hover:scale-[1.01] h-full flex flex-col">
                        <div className="aspect-w-16 aspect-h-9 bg-gray-50 h-48 overflow-hidden relative">
                            {course.imageurl ? (
                                <img src={course.imageurl} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" alt={course.fullname} />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-[#F5F5F7]">
                                    {/* Abstract AU Pattern or Icon */}
                                    <svg className="w-12 h-12 text-[#e0e0e0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <h5 className="text-xl font-bold text-[#1d1d1f] mb-2 group-hover:text-[#CC0000] transition-colors leading-snug">{course.fullname}</h5>
                            <p className="text-[#86868b] line-clamp-2 text-sm font-medium mb-4 flex-1">{course.summary}</p>

                            <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                                <span className="text-xs font-bold text-[#0066CC] uppercase tracking-wide group-hover:underline">Start Course</span>
                                <div className="w-6 h-6 rounded-full bg-[#0066CC] flex items-center justify-center text-white transform translate-x-0 group-hover:translate-x-1 transition-transform">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
};

export default FeaturedCourses;
