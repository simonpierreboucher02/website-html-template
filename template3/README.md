# ViewStream

A modern, multi-page video streaming platform inspired by YouTube, built with HTML5, CSS3, and vanilla JavaScript. ViewStream features a beautiful, responsive UI with dark mode by default, advanced video player controls, and a full suite of YouTube-like features.

## Features

- **Multi-page app**: Home, Watch, Channel/Profile, Library, Upload, Trends/Explore, Subscriptions, and Search Results
- **Modern UI**: Fixed header, collapsible sidebar, mini-player, responsive grid layouts
- **Dark/Light Mode**: Dark mode by default, with a toggle for light mode
- **SVG Graphics**: All icons, thumbnails, and avatars are AI-generated SVGs in a consistent flat design
- **Video Player**: Full controls, theater/fullscreen modes, keyboard shortcuts, mini-player, picture-in-picture, and more
- **Core YouTube Features**: Likes/dislikes, comments, subscriptions, notifications, playlists, search with suggestions, upload interface, channel profiles, recommendations
- **PWA Ready**: Designed for installability and offline support (add manifest and service worker for full PWA)
- **Fully Responsive**: Works on mobile, tablet, desktop, and TV
- **Accessibility**: Keyboard navigation, ARIA labels, and high-contrast support
- **Advanced UX**: Animations, transitions, gestures, live chat simulation, watch later, and easter eggs

## Project Structure

```
/ (root)
├── index.html              # Home (video feed)
├── watch.html              # Video watch page
├── channel.html            # Channel/profile page
├── upload.html             # Upload video page
├── search-results.html     # Search results page
├── trending.html           # Trends/Explore page
├── subscriptions.html      # Subscriptions feed page
├── css/
│   ├── main.css            # Main styles (themes, layout, grid)
│   ├── player.css          # Video player styles
│   ├── upload.css          # Upload page styles
│   └── mobile.css          # Mobile/responsive styles
├── js/
│   ├── app.js              # Main app logic, mock data, UI rendering
│   ├── player.js           # Video player controls and logic
│   └── search.js           # Search and suggestions logic
├── svg/                    # Inline SVG assets (icons, logos, avatars)
└── README.md               # This file
```

## Getting Started

1. **Clone the repository**
   ```
   git clone https://github.com/your-username/viewstream.git
   cd viewstream
   ```
2. **Open `index.html` in your browser**
   - No build step required. All files are static and ready to use.

3. **(Optional) Serve locally for PWA features**
   - Use a static server (e.g. `npx serve .` or VSCode Live Server) to test PWA and offline features.

## Customization & Development

- All video, channel, and comment data is mock data in `js/app.js`.
- To add more features (e.g. real uploads, backend, authentication), connect to an API and expand the JS logic.
- All SVGs are generated inline for easy theming and consistency.
- To enable full PWA support, add a `manifest.json` and a service worker.

## Credits

- UI inspired by YouTube, designed with modern CSS Grid/Flexbox
- Icons and graphics: AI-generated SVGs, Google Fonts (Roboto)
- Built by [Your Name]

---

Enjoy using **ViewStream**! If you have feedback or want to contribute, open an issue or pull request. 