import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * CourseShowcase — Replaces FeaturedCourses with clustered course cards.
 *
 * Fetches thematic clusters from block_homecourses/ajax.php and displays
 * them in a tabbed, animated grid. Falls back gracefully if no clusters
 * exist yet (K-means task hasn't run).
 */
const CourseShowcase = () => {
    const [clusters, setClusters] = useState([]);
    const [activeCluster, setActiveCluster] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loadingMore, setLoadingMore] = useState({});
    const gridRef = useRef(null);

    // ── Fetch initial data ────────────────────────────────────────────────
    useEffect(() => {
        const baseUrl = (window.M && window.M.cfg && window.M.cfg.wwwroot) ? window.M.cfg.wwwroot : '';
        const apiUrl = `${baseUrl}/blocks/homecourses/ajax.php?action=get_all_clusters&limit=8`;

        fetch(apiUrl)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(data => {
                if (data.success && data.clusters) {
                    setClusters(data.clusters);
                } else {
                    // No clusters yet — K-means hasn't run. Show empty state.
                    setClusters([]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('CourseShowcase: fetch error', err);
                setError('Could not load course catalog');
                setLoading(false);
            });
    }, []);

    // ── Load more courses for a cluster ───────────────────────────────────
    const loadMore = useCallback((clusterId, currentCount) => {
        const baseUrl = (window.M && window.M.cfg && window.M.cfg.wwwroot) ? window.M.cfg.wwwroot : '';
        setLoadingMore(prev => ({ ...prev, [clusterId]: true }));

        fetch(`${baseUrl}/blocks/homecourses/ajax.php?action=get_cluster_courses&cluster_id=${clusterId}&offset=${currentCount}&limit=8`)
            .then(res => res.json())
            .then(data => {
                if (data.success && data.courses) {
                    setClusters(prev => prev.map(c => {
                        if (c.id === clusterId) {
                            return {
                                ...c,
                                courses: [...c.courses, ...data.courses],
                                _hasMore: data.has_more,
                            };
                        }
                        return c;
                    }));
                }
                setLoadingMore(prev => ({ ...prev, [clusterId]: false }));
            })
            .catch(() => {
                setLoadingMore(prev => ({ ...prev, [clusterId]: false }));
            });
    }, []);

    // ── Loading skeleton ──────────────────────────────────────────────────
    if (loading) return (
        <div className="space-y-6">
            <div className="flex gap-3">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-10 w-32 bg-gray-100 rounded-full animate-pulse" />
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="bg-gray-50 rounded-2xl overflow-hidden animate-pulse">
                        <div className="h-44 bg-gray-200" />
                        <div className="p-5 space-y-3">
                            <div className="h-5 bg-gray-200 rounded w-3/4" />
                            <div className="h-3 bg-gray-100 rounded w-full" />
                            <div className="h-3 bg-gray-100 rounded w-2/3" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    if (error) return (
        <div className="text-red-500 font-medium p-4 bg-red-50 rounded-xl">{error}</div>
    );

    if (clusters.length === 0) return null; // No clusters yet — silent hide.

    // ── Visible courses ───────────────────────────────────────────────────
    const visibleClusters = activeCluster === 'all'
        ? clusters
        : clusters.filter(c => String(c.id) === String(activeCluster));

    return (
        <div className="space-y-8">

            {/* ── Cluster tabs ──────────────────────────────────────────── */}
            <div className="flex flex-wrap gap-2">
                <TabButton
                    active={activeCluster === 'all'}
                    onClick={() => setActiveCluster('all')}
                    color="#199EDA"
                    emoji="🎓"
                    label="All Areas"
                />
                {clusters.map(cluster => (
                    <TabButton
                        key={cluster.id}
                        active={String(activeCluster) === String(cluster.id)}
                        onClick={() => setActiveCluster(cluster.id)}
                        color={cluster.color || '#199EDA'}
                        emoji={cluster.emoji}
                        label={cluster.label}
                    />
                ))}
            </div>

            {/* ── Course grids per cluster ──────────────────────────────── */}
            <div ref={gridRef} className="space-y-12">
                {visibleClusters.map(cluster => (
                    <ClusterSection
                        key={cluster.id}
                        cluster={cluster}
                        onLoadMore={() => loadMore(cluster.id, cluster.courses.length)}
                        isLoadingMore={!!loadingMore[cluster.id]}
                        showLabel={activeCluster === 'all'}
                    />
                ))}
            </div>
        </div>
    );
};


// ── Tab button ────────────────────────────────────────────────────────────────
const TabButton = ({ active, onClick, color, emoji, label }) => (
    <button
        onClick={onClick}
        className={`
            inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold
            transition-all duration-300 ease-out border
            ${active
                ? 'text-white shadow-lg scale-[1.02]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:scale-[1.01]'
            }
        `}
        style={active ? {
            backgroundColor: color,
            borderColor: color,
            boxShadow: `0 4px 14px ${color}33`,
        } : {}}
    >
        {emoji && <span className="text-base">{emoji}</span>}
        {label}
    </button>
);


// ── Cluster section ───────────────────────────────────────────────────────────
const ClusterSection = ({ cluster, onLoadMore, isLoadingMore, showLabel }) => {
    const hasMore = cluster._hasMore !== false; // true by default until told otherwise

    return (
        <div>
            {showLabel && (
                <div className="flex items-center gap-3 mb-5">
                    <span className="text-xl">{cluster.emoji}</span>
                    <h3 className="text-lg font-bold text-[#1d1d1f]">{cluster.label}</h3>
                    <div
                        className="flex-1 h-px opacity-20"
                        style={{ background: `linear-gradient(to right, ${cluster.color || '#ccc'}, transparent)` }}
                    />
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {(cluster.courses || []).map((course, i) => (
                    <CourseCard key={course.id} course={course} index={i} accentColor={cluster.color} />
                ))}
            </div>

            {/* Load more */}
            {hasMore && cluster.courses && cluster.courses.length >= 8 && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={onLoadMore}
                        disabled={isLoadingMore}
                        className="px-8 py-3 rounded-full bg-white border border-gray-200 text-gray-500 font-semibold text-sm
                                   hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700
                                   transition-all duration-300 disabled:opacity-40 disabled:cursor-wait"
                    >
                        {isLoadingMore ? 'Loading…' : 'Load more courses'}
                    </button>
                </div>
            )}
        </div>
    );
};


// ── Course card ───────────────────────────────────────────────────────────────
const CourseCard = ({ course, index, accentColor }) => {
    const [visible, setVisible] = useState(false);
    const cardRef = useRef(null);

    // Intersection Observer for entrance animation
    useEffect(() => {
        const el = cardRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Stagger delay based on index
                    setTimeout(() => setVisible(true), index * 60);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [index]);

    const hasImage = course.has_image && course.image_url;

    return (
        <div
            ref={cardRef}
            className={`
                group relative bg-white rounded-[20px] overflow-hidden
                border border-gray-100
                shadow-[0_2px_8px_rgba(0,0,0,0.04)]
                hover:shadow-[0_12px_28px_rgba(0,0,0,0.10)]
                hover:scale-[1.015] hover:border-gray-200
                transition-all duration-500 ease-out
                flex flex-col h-full cursor-default
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}
            style={{ transitionDelay: `${index * 60}ms` }}
        >
            {/* Image / Gradient */}
            <div className="relative h-44 overflow-hidden flex-shrink-0">
                {hasImage ? (
                    <img
                        src={course.image_url}
                        alt={course.display_name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                ) : (
                    <div
                        className="w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        style={{ background: course.gradient_css || `linear-gradient(135deg, ${accentColor || '#6366f1'}, #1e293b)` }}
                    />
                )}

                {/* Bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />

                {/* Credit badge */}
                {course.has_credits && (
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                                     bg-white/80 backdrop-blur-sm text-gray-700 border border-white/50 shadow-sm">
                        {course.credit_hours} credits
                    </span>
                )}
            </div>

            {/* Body */}
            <div className="p-5 flex-1 flex flex-col gap-2">
                <h4 className="text-base font-bold text-[#1d1d1f] leading-snug line-clamp-2 group-hover:text-[#199EDA] transition-colors duration-300">
                    {course.display_name}
                </h4>

                {course.description && (
                    <p className="text-sm text-[#86868b] leading-relaxed line-clamp-3 flex-1">
                        {course.description}
                    </p>
                )}

                {course.has_apply_url && course.apply_url && (
                    <div className="mt-auto pt-3 border-t border-gray-100">
                        <a
                            href={course.apply_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold uppercase tracking-wide flex items-center gap-1.5
                                       group-hover:gap-2.5 transition-all duration-300 no-underline"
                            style={{ color: accentColor || '#199EDA' }}
                        >
                            Learn more
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};


export default CourseShowcase;
