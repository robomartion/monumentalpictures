# Upriver Pictures Video Gallery

A responsive video gallery for showcasing .webm files with hover effects displaying title and director information.

## Setup

1. Place your `.webm` video files in the `videos/` folder
2. Update the `videoData` array in `script.js` with your video information:

```javascript
const videoData = [
    {
        src: 'videos/your-video.webm',
        title: 'Your Video Title',
        director: 'Director Name'
    },
    // Add more videos...
];
```

3. Open `index.html` in a web browser

## Features

- **Responsive Grid Layout**: Videos display in a responsive grid that adapts to different screen sizes
- **Hover Effects**: When you hover over a video, it shows the title and director in an overlay
- **Auto-play on Hover**: Videos start playing when hovered and pause when mouse leaves
- **Clean Design**: Minimalist black design inspired by film production websites
- **Header**: Fixed header with "Upriver" title and burger menu placeholder

## File Structure

```
upriverpictures/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # JavaScript functionality
├── videos/             # Place your .webm files here
└── README.md           # This file
```

## Adding Videos

### Method 1: Update the JavaScript array
Edit the `videoData` array in `script.js` to include your videos.

### Method 2: Dynamically add videos (in browser console)
```javascript
window.videoGallery.addVideo({
    src: 'videos/new-video.webm',
    title: 'New Video Title',
    director: 'Director Name'
});
```

### Method 3: Replace all videos at once
```javascript
const newVideos = [
    {src: 'videos/video1.webm', title: 'Title 1', director: 'Director 1'},
    {src: 'videos/video2.webm', title: 'Title 2', director: 'Director 2'}
];
window.videoGallery.updateVideoData(newVideos);
```

## Browser Compatibility

- Modern browsers with WebM support
- Requires JavaScript enabled
- Responsive design works on mobile devices

## Next Steps

- Add your actual .webm files to the `videos/` folder
- Update video titles and director names in `script.js`
- Customize the burger menu functionality as needed
- Adjust styling in `styles.css` to match your brand

## Notes

The gallery is set up to handle video loading gracefully - if a video file is missing or fails to load, it will show a placeholder with the video title.