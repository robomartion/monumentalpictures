// Video data structure - this will hold your video information
const videoData = [
       {
        src: 'videos/collateral.webm',
        title: 'Collateral',
        director: 'Nora Tunsli',
        crew: {
            director: 'Nora Tunsli',
            producer: '[Producer Name]',
            cinematographer: 'Robert Marsh',
            editor: 'Robert Marsh',
            sound: 'Srishti Pai',
            other: '[Other Crew Members]'
        },
        description: [
            '[Nora Tunsli came to us with the vision of a James Bond style action film combined with The Batman.]',
            '[It was shot using a virtual production LED wall and a high octane chase sequence fully rendered using Unreal Engine.]',
            '[Optional third paragraph if needed.]'
        ]
    },
      {
        src: 'videos/dearsamwebsite.webm',
        title: 'Dear Sam',
        director: 'Sanaa Bat-Erdene',
        crew: {
            director: 'Sanaa Bat-Erdene',
            producer: '[Producer Name]',
            cinematographer: '[Cinematographer Name]',
            editor: '[Editor Name]',
            other: '[Other Crew Members]'
        },
        description: [
            '[First paragraph describing the project, its vision, and key elements.]',
            '[Second paragraph with additional details about production, themes, or notable aspects.]',
            '[Optional third paragraph if needed.]'
        ]
    },
    {
        src: 'videos/samsara.webm',
        title: 'Samsara',
        director: 'Robert Marsh',
        crew: {
            director: 'Robert Marsh',
            producer: '[Producer Name]',
            cinematographer: '[Cinematographer Name]',
            editor: '[Editor Name]',
            other: '[Other Crew Members]'
        },
        description: [
            '[First paragraph describing the project, its vision, and key elements.]',
            '[Second paragraph with additional details about production, themes, or notable aspects.]',
            '[Optional third paragraph if needed.]'
        ]
    },
        {
        src: 'videos/blood-robert marsh.webm', // Replace with actual .webm file paths
        title: 'Blood',
        director: 'Robert Marsh',
        crew: {
            director: 'Robert Marsh',
            producer: '[Producer Name]',
            cinematographer: '[Cinematographer Name]',
            editor: '[Editor Name]',
            other: '[Other Crew Members]'
        },
        description: [
            '[First paragraph describing the project, its vision, and key elements.]',
            '[Second paragraph with additional details about production, themes, or notable aspects.]',
            '[Optional third paragraph if needed.]'
        ]
    },
    {
        src: 'videos/sansar.webm',
        title: 'Sansar',
        director: 'Robert Marsh',
        crew: {
            director: 'Robert Marsh',
            producer: '[Producer Name]',
            cinematographer: '[Cinematographer Name]',
            editor: '[Editor Name]',
            other: '[Other Crew Members]'
        },
        description: [
            '[First paragraph describing the project, its vision, and key elements.]',
            '[Second paragraph with additional details about production, themes, or notable aspects.]',
            '[Optional third paragraph if needed.]'
        ]
    },
        {
        src: 'videos/forestgirlshort.webm',
        title: 'The Girl in the Forest', 
        director: 'Robert Marsh',
        crew: {
            director: 'Robert Marsh',
            producer: '[Producer Name]',
            cinematographer: '[Cinematographer Name]',
            editor: '[Editor Name]',
            other: '[Other Crew Members]'
        },
        description: [
            '[First paragraph describing the project, its vision, and key elements.]',
            '[Second paragraph with additional details about production, themes, or notable aspects.]',
            '[Optional third paragraph if needed.]'
        ]
    }
];

class VideoGallery {
    constructor() {
        this.gallery = document.getElementById('videoGallery');
        this.currentVideo = null;
        
        this.init();
    }

    init() {
        this.loadVideos();
        this.setupEventListeners();
    }

    toggleVideoDetail(videoInfoDiv, videoIndex) {
        const videoInfo = videoData[videoIndex];
        if (!videoInfo) return;
        
        const expandedSection = videoInfoDiv.querySelector('.video-info-expanded');
        const videoItem = videoInfoDiv.closest('.video-item');
        const isExpanded = videoInfoDiv.classList.contains('expanded');
        
        if (isExpanded) {
            // Collapse - get the stored or current height for smooth reverse animation
            const storedHeight = expandedSection.dataset.expandedHeight || expandedSection.scrollHeight;
            
            // Ensure we're starting from the expanded state
            expandedSection.style.maxHeight = `${storedHeight}px`;
            
            // Force reflow
            expandedSection.offsetHeight;
            
            // Trigger collapse animation - exact reverse of expand
            requestAnimationFrame(() => {
                expandedSection.style.maxHeight = '0';
                videoInfoDiv.classList.remove('expanded');
                videoItem.classList.remove('info-expanded');
                // Reset gradient height
                videoItem.style.setProperty('--gradient-height', '200px');
            });
        } else {
            // Expand - populate content if not already done
            const crewListEl = expandedSection.querySelector('.crew-list');
            const descriptionParasEl = expandedSection.querySelector('.description-paragraphs');
            
            // Populate description paragraphs if empty
            if (descriptionParasEl.children.length === 0 && videoInfo.description && Array.isArray(videoInfo.description)) {
                videoInfo.description.forEach(para => {
                    if (para && !para.startsWith('[')) { // Only show non-placeholder paragraphs
                        const paraEl = document.createElement('p');
                        paraEl.className = 'description-paragraph';
                        paraEl.textContent = para;
                        descriptionParasEl.appendChild(paraEl);
                    }
                });
            }
            
            // Populate crew if empty
            if (crewListEl.children.length === 0 && videoInfo.crew) {
                Object.entries(videoInfo.crew).forEach(([role, name]) => {
                    if (name && !name.startsWith('[')) { // Only show non-placeholder entries
                        const crewItem = document.createElement('div');
                        crewItem.className = 'crew-item';
                        crewItem.innerHTML = `<span class="crew-role">${role.charAt(0).toUpperCase() + role.slice(1)}</span> <span class="crew-name">${name}</span>`;
                        crewListEl.appendChild(crewItem);
                    }
                });
            }
            
            // Calculate actual height needed for expanded content
            // First, temporarily show expanded section to measure its height
            expandedSection.style.maxHeight = 'none';
            expandedSection.style.opacity = '1';
            const expandedHeight = expandedSection.scrollHeight;
            
            // Store the height for collapse animation
            expandedSection.dataset.expandedHeight = expandedHeight;
            
            // Reset for animation
            expandedSection.style.maxHeight = '0';
            expandedSection.style.opacity = '';
            
            // Measure total video-info height when expanded
            // video-info is positioned at bottom: 60px, so we need to measure from its top when expanded
            const titleHeight = videoInfoDiv.querySelector('.video-title').offsetHeight;
            const directorHeight = videoInfoDiv.querySelector('.video-director').offsetHeight;
            const spacing = 25; // margin-top + padding-top of expanded section
            const totalContentHeight = titleHeight + directorHeight + spacing + expandedHeight;
            
            // Gradient should cover from bottom of video-item (0) up to cover all expanded content
            // Since video-info is at bottom: 60px, gradient needs to be: 60px (bottom offset) + total content height + some padding
            const gradientHeight = Math.max(200, 60 + totalContentHeight + 40);
            
            // Set gradient height dynamically
            videoItem.style.setProperty('--gradient-height', `${gradientHeight}px`);
            
            // Expand - use requestAnimationFrame to ensure transition works
            requestAnimationFrame(() => {
                expandedSection.style.maxHeight = `${expandedHeight}px`;
                videoInfoDiv.classList.add('expanded');
                videoItem.classList.add('info-expanded');
            });
        }
    }

    loadVideos() {
        videoData.forEach((video, index) => {
            const videoItem = this.createVideoElement(video, index);
            this.gallery.appendChild(videoItem);
        });
    }

    createVideoElement(videoInfo, index) {
        const videoItem = document.createElement('div');
        videoItem.className = 'video-item loading';
        videoItem.dataset.index = index;

        const video = document.createElement('video');
        video.src = videoInfo.src;
        video.muted = true;
        video.loop = true;
        video.preload = 'metadata';
        video.autoplay = false; // Disable autoplay - videos will only play when scrolled into view
        
        // Create video info overlay - this same div will expand on click
        const videoInfoDiv = document.createElement('div');
        videoInfoDiv.className = 'video-info';
        videoInfoDiv.dataset.index = index;
        videoInfoDiv.innerHTML = `
            <div class="video-title">${videoInfo.title}</div>
            <div class="video-director">${videoInfo.director}</div>
            <div class="video-info-expanded">
                <div class="video-detail-description">
                    <div class="description-paragraphs"></div>
                </div>
                <div class="video-detail-crew">
                    <h3>Crew</h3>
                    <div class="crew-list"></div>
                </div>
            </div>
        `;
        
        // Handle video load events
        video.addEventListener('loadeddata', () => {
            videoItem.classList.remove('loading');
            // Don't auto-play on load - only play when scrolled into view
        });

        video.addEventListener('error', () => {
            videoItem.classList.remove('loading');
            videoItem.style.backgroundColor = '#222';
            videoItem.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #666; z-index: 10;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">🎬</div>
                    <div style="font-size: 1.2rem;">Video Loading...</div>
                    <div style="font-size: 1rem; margin-top: 10px; color: #999;">${videoInfo.title}</div>
                    <div style="font-size: 0.9rem; color: #777;">${videoInfo.director}</div>
                </div>
            `;
        });

        // Add click handler to expand/collapse video info
        videoItem.addEventListener('click', (e) => {
            // Only prevent if clicking directly on video element that has controls
            if (e.target.tagName === 'VIDEO' && e.target.controls) {
                return; // Let video controls handle the click
            }
            // Toggle expanded state
            this.toggleVideoDetail(videoInfoDiv, index);
        });
        
        videoItem.appendChild(video);
        videoItem.appendChild(videoInfoDiv);
        return videoItem;
    }

    setupEventListeners() {
        // Video intersection observer for lazy loading and autoplay
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target.querySelector('video');
                if (video && !video.error) {
                    if (entry.isIntersecting) {
                        // Video is visible, start playing
                        video.play().catch(() => {
                            // Ignore autoplay errors (browser policies)
                            console.log('Autoplay blocked for:', entry.target.dataset.index);
                        });
                    } else {
                        // Video is not visible, pause it
                        video.pause();
                    }
                }
            });
        }, {
            threshold: 0.3, // Start playing when 30% of video is visible
            rootMargin: '0px 0px -10% 0px' // Add some buffer
        });

        // Observe video items as they're added
        const observeVideoItem = (videoItem) => {
            if (videoItem.classList.contains('video-item')) {
                observer.observe(videoItem);
            }
        };

        // Observe existing videos
        document.querySelectorAll('.video-item').forEach(observeVideoItem);

        // Use MutationObserver instead of deprecated DOMNodeInserted
        const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        if (node.classList && node.classList.contains('video-item')) {
                            observeVideoItem(node);
                        }
                        // Also check child nodes
                        const videoItems = node.querySelectorAll && node.querySelectorAll('.video-item');
                        if (videoItems) {
                            videoItems.forEach(observeVideoItem);
                        }
                    }
                });
            });
        });

        // Start observing the gallery for new video additions
        mutationObserver.observe(this.gallery, {
            childList: true,
            subtree: true
        });

        // Burger menu functionality
        const burgerMenu = document.querySelector('.burger-menu');
        const overlayMenu = document.getElementById('overlayMenu');
        const logo = document.querySelector('.logo');
        
        burgerMenu.addEventListener('click', () => {
            const isActive = overlayMenu.classList.contains('active');
            
            if (isActive) {
                // Close menu
                overlayMenu.classList.remove('active');
                burgerMenu.classList.remove('active');
                logo.style.opacity = '1'; // Show logo
                // Resume any paused videos that should be playing
                this.resumeVisibleVideos();
            } else {
                // Open menu
                overlayMenu.classList.add('active');
                burgerMenu.classList.add('active');
                logo.style.opacity = '0'; // Hide logo
                // Pause all videos when menu opens
                this.pauseAllVideos();
            }
        });

        // Close menu when clicking outside content
        overlayMenu.addEventListener('click', (e) => {
            if (e.target === overlayMenu) {
                overlayMenu.classList.remove('active');
                burgerMenu.classList.remove('active');
                logo.style.opacity = '1'; // Show logo
                this.resumeVisibleVideos();
            }
        });

        // Close menu with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (overlayMenu.classList.contains('active')) {
                    overlayMenu.classList.remove('active');
                    burgerMenu.classList.remove('active');
                    logo.style.opacity = '1'; // Show logo
                    this.resumeVisibleVideos();
                } else {
                    // Close any expanded video info
                    document.querySelectorAll('.video-info.expanded').forEach(videoInfo => {
                        const videoIndex = parseInt(videoInfo.dataset.index);
                        if (!isNaN(videoIndex)) {
                            this.toggleVideoDetail(videoInfo, videoIndex);
                        }
                    });
                }
            }
        });

        // Pause videos when window loses focus (alt+tab, etc.)
        this.setupFocusHandlers();

        // Smooth scrolling between videos
        let isScrolling = false;
        window.addEventListener('wheel', (e) => {
            if (isScrolling) return;
            
            const videos = document.querySelectorAll('.video-item');
            if (videos.length === 0) return;
            
            isScrolling = true;
            setTimeout(() => isScrolling = false, 1000);
            
            // Find current video in viewport
            let currentIndex = 0;
            videos.forEach((video, index) => {
                const rect = video.getBoundingClientRect();
                if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                    currentIndex = index;
                }
            });
            
            // Scroll to next/previous video
            if (e.deltaY > 0 && currentIndex < videos.length - 1) {
                videos[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
            } else if (e.deltaY < 0 && currentIndex > 0) {
                videos[currentIndex - 1].scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    setupFocusHandlers() {
        let windowBlurVideos = [];
        let tabHiddenVideos = [];

        // Handle window focus/blur events (for alt+tab)
        window.addEventListener('blur', () => {
            // Store which videos were playing before losing focus
            windowBlurVideos = [];
            const videos = document.querySelectorAll('.video-item video');
            
            videos.forEach((video, index) => {
                if (!video.paused && !video.error) {
                    windowBlurVideos.push(index);
                    video.pause();
                }
            });
        });

        window.addEventListener('focus', () => {
            // Resume videos that were playing before losing focus
            const videos = document.querySelectorAll('.video-item video');
            
            windowBlurVideos.forEach(index => {
                if (videos[index] && !videos[index].error) {
                    // Check if the video is in viewport before playing
                    const videoItem = videos[index].closest('.video-item');
                    const rect = videoItem.getBoundingClientRect();
                    const windowHeight = window.innerHeight;
                    
                    // More precise viewport check - video should be sufficiently visible
                    if (rect.top < windowHeight * 0.7 && rect.bottom > windowHeight * 0.3) {
                        videos[index].play().catch(() => {
                            // Ignore autoplay errors
                        });
                    }
                }
            });
            
            windowBlurVideos = [];
        });

        // Handle visibility change API (for tab switching)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Tab is not visible - pause all videos
                tabHiddenVideos = [];
                const videos = document.querySelectorAll('.video-item video');
                
                videos.forEach((video, index) => {
                    if (!video.paused && !video.error) {
                        tabHiddenVideos.push(index);
                        video.pause();
                    }
                });
            } else {
                // Tab is visible again - resume videos that were playing
                setTimeout(() => {
                    const videos = document.querySelectorAll('.video-item video');
                    
                    tabHiddenVideos.forEach(index => {
                        if (videos[index] && !videos[index].error) {
                            // Check if the video is in viewport before playing
                            const videoItem = videos[index].closest('.video-item');
                            const rect = videoItem.getBoundingClientRect();
                            const windowHeight = window.innerHeight;
                            
                            // More precise viewport check - video should be sufficiently visible
                            if (rect.top < windowHeight * 0.7 && rect.bottom > windowHeight * 0.3) {
                                videos[index].play().catch(() => {
                                    // Ignore autoplay errors
                                });
                            }
                        }
                    });
                    
                    tabHiddenVideos = [];
                }, 100); // Small delay to ensure page is fully visible
            }
        });
    }

    // Method to add new videos dynamically
    addVideo(videoInfo) {
        videoData.push(videoInfo);
        const videoItem = this.createVideoElement(videoInfo, videoData.length - 1);
        this.gallery.appendChild(videoItem);
    }

    // Method to update video data (useful when you get actual .webm files)
    updateVideoData(newVideoData) {
        // Clear existing videos
        this.gallery.innerHTML = '';
        
        // Update data and reload
        videoData.length = 0;
        videoData.push(...newVideoData);
        this.loadVideos();
    }

    // Helper method to pause all videos
    pauseAllVideos() {
        const videos = document.querySelectorAll('.video-item video');
        videos.forEach(video => {
            if (!video.paused && !video.error) {
                video.pause();
            }
        });
    }

    // Helper method to resume visible videos
    resumeVisibleVideos() {
        const videos = document.querySelectorAll('.video-item video');
        videos.forEach(video => {
            if (video.paused && !video.error) {
                const videoItem = video.closest('.video-item');
                const rect = videoItem.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                // Check if video is sufficiently visible
                if (rect.top < windowHeight * 0.7 && rect.bottom > windowHeight * 0.3) {
                    video.play().catch(() => {
                        // Ignore autoplay errors
                    });
                }
            }
        });
    }
}

// Initialize the gallery when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const gallery = new VideoGallery();
    
    // Make gallery globally accessible for debugging/updates
    window.videoGallery = gallery;
    
    console.log('Upriver Pictures gallery initialized!');
    console.log('To add a new video: window.videoGallery.addVideo({src: "path/to/video.webm", title: "Title", director: "Director"})');
});

// Utility function to handle .webm file drops (for future use)
function handleWebmFile(file, title, director) {
    if (file.type === 'video/webm') {
        const url = URL.createObjectURL(file);
        const videoInfo = {
            src: url,
            title: title || file.name.replace('.webm', ''),
            director: director || 'Unknown Director'
        };
        
        if (window.videoGallery) {
            window.videoGallery.addVideo(videoInfo);
        }
    }

}



