// ===== GLOBAL VARIABLES =====
let currentTheme = 'dark';
let currentCategory = 'all';
let videos = [];
let subscriptions = [];
let currentVideo = null;
let isPlaying = false;

// ===== MOCK DATA =====
const mockVideos = [
    {
        id: 1,
        title: "Comment débuter en programmation en 2025 - Guide complet pour débutants",
        channel: "TechMaster Pro",
        channelId: 1,
        views: 1234567,
        uploadDate: "il y a 2 semaines",
        duration: "15:42",
        thumbnail: "tech",
        category: "tech",
        description: "Dans cette vidéo, nous allons voir comment débuter en programmation en 2025. Je vais vous guider à travers les meilleures ressources, outils et langages pour commencer votre voyage dans le monde du code.",
        likes: 125000,
        dislikes: 1200,
        comments: 1234,
        channelAvatar: "techmaster"
    },
    {
        id: 2,
        title: "Top 10 des gadgets tech de l'année 2025",
        channel: "TechReview",
        channelId: 2,
        views: 890123,
        uploadDate: "il y a 1 semaine",
        duration: "12:30",
        thumbnail: "gadgets",
        category: "tech",
        description: "Découvrez les 10 gadgets technologiques les plus innovants de 2025.",
        likes: 89000,
        dislikes: 800,
        comments: 567,
        channelAvatar: "techreview"
    },
    {
        id: 3,
        title: "Recette facile : Cookies au chocolat en 10 minutes",
        channel: "CuisineFacile",
        channelId: 3,
        views: 456789,
        uploadDate: "il y a 3 jours",
        duration: "8:15",
        thumbnail: "cooking",
        category: "lifestyle",
        description: "Apprenez à faire des cookies délicieux en seulement 10 minutes !",
        likes: 45000,
        dislikes: 200,
        comments: 234,
        channelAvatar: "cuisine"
    },
    {
        id: 4,
        title: "Gameplay: Nouveau jeu indépendant - Aventure épique",
        channel: "GameZone",
        channelId: 4,
        views: 234567,
        uploadDate: "il y a 5 jours",
        duration: "25:18",
        thumbnail: "gaming",
        category: "gaming",
        description: "Découvrez ce nouveau jeu indépendant qui va révolutionner le genre aventure !",
        likes: 23000,
        dislikes: 150,
        comments: 189,
        channelAvatar: "gamezone"
    },
    {
        id: 5,
        title: "Apprendre la guitare : Cours pour débutants #1",
        channel: "MusicAcademy",
        channelId: 5,
        views: 345678,
        uploadDate: "il y a 1 semaine",
        duration: "18:45",
        thumbnail: "music",
        category: "music",
        description: "Premier cours de guitare pour débutants. Apprenez les bases en 18 minutes !",
        likes: 34000,
        dislikes: 300,
        comments: 456,
        channelAvatar: "musicacademy"
    },
    {
        id: 6,
        title: "Entraînement HIIT : 20 minutes pour tout le corps",
        channel: "FitLife",
        channelId: 6,
        views: 567890,
        uploadDate: "il y a 4 jours",
        duration: "20:30",
        thumbnail: "fitness",
        category: "sports",
        description: "Entraînement HIIT complet pour tonifier tout le corps en 20 minutes.",
        likes: 56000,
        dislikes: 400,
        comments: 345,
        channelAvatar: "fitlife"
    },
    {
        id: 7,
        title: "Histoire de l'Art : La Renaissance italienne",
        channel: "ArtHistory",
        channelId: 7,
        views: 123456,
        uploadDate: "il y a 2 semaines",
        duration: "32:15",
        thumbnail: "art",
        category: "education",
        description: "Plongez dans l'histoire fascinante de la Renaissance italienne.",
        likes: 12000,
        dislikes: 100,
        comments: 123,
        channelAvatar: "arthistory"
    },
    {
        id: 8,
        title: "Vlog : Ma journée à Paris",
        channel: "TravelVlog",
        channelId: 8,
        views: 789012,
        uploadDate: "il y a 1 jour",
        duration: "14:22",
        thumbnail: "travel",
        category: "lifestyle",
        description: "Suivez-moi dans ma journée à Paris, de la Tour Eiffel aux Champs-Élysées !",
        likes: 78000,
        dislikes: 600,
        comments: 678,
        channelAvatar: "travelvlog"
    }
];

const mockSubscriptions = [
    { id: 1, name: "TechMaster Pro", avatar: "techmaster", videos: 1247, subscribers: "2.5M" },
    { id: 2, name: "TechReview", avatar: "techreview", videos: 856, subscribers: "1.2M" },
    { id: 3, name: "CuisineFacile", avatar: "cuisine", videos: 432, subscribers: "890K" },
    { id: 4, name: "GameZone", avatar: "gamezone", videos: 2341, subscribers: "3.1M" },
    { id: 5, name: "MusicAcademy", avatar: "musicacademy", videos: 567, subscribers: "1.8M" }
];

const mockComments = [
    {
        id: 1,
        author: "Jean Dupont",
        avatar: "user1",
        text: "Excellent tutoriel ! J'ai enfin compris les bases de la programmation.",
        date: "il y a 2 heures",
        likes: 45,
        replies: 3
    },
    {
        id: 2,
        author: "Marie Martin",
        avatar: "user2",
        text: "Merci pour ce guide complet. J'ai hâte de voir la suite !",
        date: "il y a 4 heures",
        likes: 23,
        replies: 1
    },
    {
        id: 3,
        author: "Pierre Durand",
        avatar: "user3",
        text: "Très bien expliqué, même pour un débutant comme moi.",
        date: "il y a 6 heures",
        likes: 67,
        replies: 0
    }
];

// ===== UTILITY FUNCTIONS =====
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function formatDate(dateString) {
    // Simple date formatting for demo
    return dateString;
}

function generateThumbnail(category) {
    const colors = {
        tech: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
        gaming: ['#FF8E53', '#FF6B6B', '#4ECDC4'],
        music: ['#A8E6CF', '#FF6B6B', '#FFD93D'],
        lifestyle: ['#FFB6C1', '#87CEEB', '#98FB98'],
        sports: ['#FF6347', '#32CD32', '#FFD700'],
        education: ['#9370DB', '#20B2AA', '#FF69B4']
    };
    
    const colorSet = colors[category] || colors.tech;
    const color1 = colorSet[0];
    const color2 = colorSet[1];
    const color3 = colorSet[2];
    
    return `
        <svg width="100%" height="100%" viewBox="0 0 320 180" fill="none">
            <defs>
                <linearGradient id="grad${category}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
                    <stop offset="50%" style="stop-color:${color2};stop-opacity:1" />
                    <stop offset="100%" style="stop-color:${color3};stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grad${category})"/>
            <circle cx="80" cy="90" r="30" fill="rgba(255,255,255,0.2)"/>
            <circle cx="240" cy="60" r="20" fill="rgba(255,255,255,0.15)"/>
            <circle cx="280" cy="140" r="15" fill="rgba(255,255,255,0.1)"/>
            <rect x="40" y="40" width="240" height="100" fill="rgba(0,0,0,0.3)" rx="8"/>
            <circle cx="160" cy="90" r="25" fill="#FF0000"/>
            <path d="M150 75l20 15-20 15z" fill="white"/>
        </svg>
    `;
}

function generateAvatar(name) {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FF8E53', '#A8E6CF', '#9370DB'];
    const color = colors[name.length % colors.length];
    
    return `
        <svg width="100%" height="100%" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="18" r="9" fill="${color}"/>
            <path d="M6 42c0-9.941 8.059-18 18-18s18 8.059 18 18" fill="${color}"/>
        </svg>
    `;
}

// ===== THEME MANAGEMENT =====
function initTheme() {
    const savedTheme = localStorage.getItem('viewstream-theme') || 'dark';
    setTheme(savedTheme);
}

function setTheme(theme) {
    currentTheme = theme;
    document.body.className = theme + '-theme';
    localStorage.setItem('viewstream-theme', theme);
    
    // Update theme toggle button
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const sunIcon = themeToggle.querySelector('.sun-icon');
        const moonIcon = themeToggle.querySelector('.moon-icon');
        
        if (theme === 'light') {
            sunIcon.style.opacity = '0';
            moonIcon.style.opacity = '1';
        } else {
            sunIcon.style.opacity = '1';
            moonIcon.style.opacity = '0';
        }
    }
}

function toggleTheme() {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// ===== SIDEBAR MANAGEMENT =====
function initSidebar() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            if (mainContent) {
                mainContent.classList.toggle('expanded');
            }
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar?.contains(e.target) && !menuToggle?.contains(e.target)) {
                sidebar?.classList.remove('active');
            }
        }
    });
}

// ===== VIDEO GRID MANAGEMENT =====
function renderVideos(videoList = videos) {
    const videosGrid = document.getElementById('videosGrid');
    if (!videosGrid) return;
    
    videosGrid.innerHTML = '';
    
    videoList.forEach(video => {
        const videoCard = createVideoCard(video);
        videosGrid.appendChild(videoCard);
    });
}

function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.onclick = () => openVideo(video.id);
    
    card.innerHTML = `
        <div class="video-thumbnail">
            ${generateThumbnail(video.category)}
            <span class="video-duration">${video.duration}</span>
        </div>
        <div class="video-info">
            <div class="video-meta">
                <div class="video-avatar">
                    ${generateAvatar(video.channel)}
                </div>
                <div>
                    <h3 class="video-title">${video.title}</h3>
                    <p class="video-channel">${video.channel}</p>
                    <p class="video-stats">${formatNumber(video.views)} vues • ${video.uploadDate}</p>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

function openVideo(videoId) {
    // Store current video for mini player
    currentVideo = videos.find(v => v.id === videoId);
    
    // Navigate to watch page
    window.location.href = `watch.html?id=${videoId}`;
}

// ===== CATEGORY FILTER =====
function initCategoryFilter() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            filterVideosByCategory(category);
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

function filterVideosByCategory(category) {
    currentCategory = category;
    
    if (category === 'all') {
        renderVideos(mockVideos);
    } else {
        const filteredVideos = mockVideos.filter(video => video.category === category);
        renderVideos(filteredVideos);
    }
}

// ===== SUBSCRIPTIONS =====
function renderSubscriptions() {
    const subscriptionChannels = document.getElementById('subscriptionChannels');
    if (!subscriptionChannels) return;
    
    subscriptionChannels.innerHTML = '';
    
    mockSubscriptions.forEach(sub => {
        const subItem = document.createElement('div');
        subItem.className = 'subscription-item';
        subItem.onclick = () => openChannel(sub.id);
        
        subItem.innerHTML = `
            <div class="subscription-avatar">
                ${generateAvatar(sub.name)}
            </div>
            <span class="subscription-name">${sub.name}</span>
        `;
        
        subscriptionChannels.appendChild(subItem);
    });
}

function openChannel(channelId) {
    window.location.href = `channel.html?id=${channelId}`;
}

// ===== LOAD MORE FUNCTIONALITY =====
function initLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            // Simulate loading more videos
            loadMoreBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="pulse">
                    <path d="M10 3v14M3 10h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Chargement...
            `;
            
            setTimeout(() => {
                // Add more mock videos
                const newVideos = [...mockVideos, ...mockVideos.slice(0, 4)];
                renderVideos(newVideos);
                
                loadMoreBtn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 3v14M3 10h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    Charger plus de vidéos
                `;
            }, 1500);
        });
    }
}

// ===== MINI PLAYER =====
function initMiniPlayer() {
    const miniPlayer = document.getElementById('miniPlayer');
    const miniPlayBtn = miniPlayer?.querySelector('.mini-play-btn');
    const miniCloseBtn = miniPlayer?.querySelector('.mini-close-btn');
    
    if (miniPlayBtn) {
        miniPlayBtn.addEventListener('click', () => {
            if (isPlaying) {
                pauseVideo();
            } else {
                playVideo();
            }
        });
    }
    
    if (miniCloseBtn) {
        miniCloseBtn.addEventListener('click', () => {
            hideMiniPlayer();
        });
    }
}

function showMiniPlayer(video) {
    const miniPlayer = document.getElementById('miniPlayer');
    if (!miniPlayer) return;
    
    const miniTitle = miniPlayer.querySelector('.mini-title');
    const miniChannel = miniPlayer.querySelector('.mini-channel');
    
    if (miniTitle) miniTitle.textContent = video.title;
    if (miniChannel) miniChannel.textContent = video.channel;
    
    miniPlayer.classList.add('active');
}

function hideMiniPlayer() {
    const miniPlayer = document.getElementById('miniPlayer');
    if (miniPlayer) {
        miniPlayer.classList.remove('active');
    }
}

function playVideo() {
    isPlaying = true;
    const miniPlayBtn = document.querySelector('.mini-play-btn svg');
    if (miniPlayBtn) {
        miniPlayBtn.innerHTML = `
            <path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="currentColor"/>
        `;
    }
}

function pauseVideo() {
    isPlaying = false;
    const miniPlayBtn = document.querySelector('.mini-play-btn svg');
    if (miniPlayBtn) {
        miniPlayBtn.innerHTML = `
            <path d="M8 5v14l11-7z" fill="currentColor"/>
        `;
    }
}

// ===== SEARCH FUNCTIONALITY =====
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchSuggestions = document.getElementById('searchSuggestions');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            
            if (query.length > 0) {
                showSearchSuggestions(query);
            } else {
                hideSearchSuggestions();
            }
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch(searchInput.value.trim());
            }
        });
    }
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput?.contains(e.target) && !searchSuggestions?.contains(e.target)) {
            hideSearchSuggestions();
        }
    });
}

function showSearchSuggestions(query) {
    const searchSuggestions = document.getElementById('searchSuggestions');
    if (!searchSuggestions) return;
    
    const suggestions = mockVideos
        .filter(video => 
            video.title.toLowerCase().includes(query.toLowerCase()) ||
            video.channel.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5);
    
    if (suggestions.length > 0) {
        searchSuggestions.innerHTML = suggestions.map(video => `
            <div class="suggestion-item" onclick="openVideo(${video.id})">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="9" cy="9" r="7" stroke="currentColor" stroke-width="2"/>
                    <path d="m14 14-3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <span>${video.title}</span>
            </div>
        `).join('');
        
        searchSuggestions.classList.add('active');
    } else {
        hideSearchSuggestions();
    }
}

function hideSearchSuggestions() {
    const searchSuggestions = document.getElementById('searchSuggestions');
    if (searchSuggestions) {
        searchSuggestions.classList.remove('active');
    }
}

function performSearch(query) {
    if (query.trim()) {
        // For demo, just filter videos
        const results = mockVideos.filter(video => 
            video.title.toLowerCase().includes(query.toLowerCase()) ||
            video.channel.toLowerCase().includes(query.toLowerCase())
        );
        
        renderVideos(results);
        hideSearchSuggestions();
    }
}

// ===== INITIALIZATION =====
function initApp() {
    // Initialize theme
    initTheme();
    
    // Initialize sidebar
    initSidebar();
    
    // Initialize search
    initSearch();
    
    // Initialize category filter
    initCategoryFilter();
    
    // Initialize subscriptions
    renderSubscriptions();
    
    // Initialize load more
    initLoadMore();
    
    // Initialize mini player
    initMiniPlayer();
    
    // Load initial videos
    videos = [...mockVideos];
    renderVideos();
    
    // Initialize theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Add mobile bottom navigation if on mobile
    if (window.innerWidth <= 768) {
        addMobileBottomNav();
    }
}

function addMobileBottomNav() {
    const body = document.body;
    const bottomNav = document.createElement('nav');
    bottomNav.className = 'mobile-bottom-nav';
    bottomNav.innerHTML = `
        <a href="index.html" class="mobile-nav-item active">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" stroke-width="2"/>
                <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" stroke-width="2"/>
            </svg>
            <span>Accueil</span>
        </a>
        <a href="trending.html" class="mobile-nav-item">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M23 6l-9.5 9.5-5-5L1 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Tendances</span>
        </a>
        <a href="subscriptions.html" class="mobile-nav-item">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" stroke="currentColor" stroke-width="2"/>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" stroke="currentColor" stroke-width="2"/>
            </svg>
            <span>Abonnements</span>
        </a>
        <a href="library.html" class="mobile-nav-item">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 3h18v18H3z" stroke="currentColor" stroke-width="2"/>
                <path d="M9 9h6v6H9z" stroke="currentColor" stroke-width="2"/>
            </svg>
            <span>Bibliothèque</span>
        </a>
    `;
    
    body.appendChild(bottomNav);
}

// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', initApp);

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        const existingNav = document.querySelector('.mobile-bottom-nav');
        if (!existingNav) {
            addMobileBottomNav();
        }
    } else {
        const mobileNav = document.querySelector('.mobile-bottom-nav');
        if (mobileNav) {
            mobileNav.remove();
        }
    }
});

// Export functions for other modules
window.ViewStream = {
    formatNumber,
    formatDuration,
    formatDate,
    generateThumbnail,
    generateAvatar,
    setTheme,
    toggleTheme,
    openVideo,
    openChannel,
    showMiniPlayer,
    hideMiniPlayer,
    playVideo,
    pauseVideo,
    mockVideos,
    mockSubscriptions,
    mockComments
}; 