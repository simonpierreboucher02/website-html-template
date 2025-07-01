// ===== SEARCH FUNCTIONALITY =====

// Mock search suggestions
const searchSuggestions = [
    "programmation",
    "programmation python",
    "programmation javascript",
    "programmation web",
    "tutoriel programmation",
    "cours programmation",
    "débuter programmation",
    "apprendre à coder",
    "développement web",
    "application mobile",
    "intelligence artificielle",
    "machine learning",
    "data science",
    "cybersécurité",
    "cloud computing",
    "devops",
    "gaming",
    "jeux vidéo",
    "streaming",
    "musique",
    "cuisine",
    "fitness",
    "voyage",
    "éducation",
    "technologie",
    "gadgets",
    "smartphone",
    "ordinateur",
    "tablette",
    "accessoires tech"
];

// Mock search results
const searchResults = {
    "programmation": [
        { id: 1, title: "Comment débuter en programmation en 2025", channel: "TechMaster Pro", views: 1234567, duration: "15:42", thumbnail: "tech" },
        { id: 9, title: "Apprendre Python en 1 heure", channel: "CodeAcademy", views: 567890, duration: "58:30", thumbnail: "python" },
        { id: 10, title: "JavaScript pour débutants", channel: "WebDev Pro", views: 345678, duration: "42:15", thumbnail: "javascript" }
    ],
    "gaming": [
        { id: 4, title: "Gameplay: Nouveau jeu indépendant", channel: "GameZone", views: 234567, duration: "25:18", thumbnail: "gaming" },
        { id: 11, title: "Test du dernier jeu AAA", channel: "GameReview", views: 789012, duration: "18:45", thumbnail: "game-review" },
        { id: 12, title: "Trucs et astuces gaming", channel: "GamingTips", views: 456789, duration: "12:30", thumbnail: "gaming-tips" }
    ],
    "musique": [
        { id: 5, title: "Apprendre la guitare : Cours pour débutants", channel: "MusicAcademy", views: 345678, duration: "18:45", thumbnail: "music" },
        { id: 13, title: "Piano classique pour débutants", channel: "ClassicalMusic", views: 234567, duration: "22:15", thumbnail: "piano" },
        { id: 14, title: "Production musicale avec FL Studio", channel: "MusicProducer", views: 123456, duration: "35:20", thumbnail: "music-production" }
    ]
};

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchSuggestions = document.getElementById('searchSuggestions');
    
    if (!searchInput) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        
        clearTimeout(searchTimeout);
        
        if (query.length < 2) {
            hideSearchSuggestions();
            return;
        }
        
        searchTimeout = setTimeout(() => {
            showSearchSuggestions(query);
        }, 300);
    });
    
    searchInput.addEventListener('focus', () => {
        const query = searchInput.value.trim();
        if (query.length >= 2) {
            showSearchSuggestions(query);
        }
    });
    
    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
            hideSearchSuggestions();
        }
    });
    
    // Handle search form submission
    const searchForm = searchInput.closest('.search-box');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                performSearch(query);
            }
        });
    }
}

function showSearchSuggestions(query) {
    const suggestionsContainer = document.getElementById('searchSuggestions');
    if (!suggestionsContainer) return;
    
    const filteredSuggestions = searchSuggestions.filter(suggestion => 
        suggestion.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);
    
    if (filteredSuggestions.length === 0) {
        hideSearchSuggestions();
        return;
    }
    
    suggestionsContainer.innerHTML = filteredSuggestions.map(suggestion => `
        <div class="suggestion-item" onclick="selectSuggestion('${suggestion}')">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="6" stroke="currentColor" stroke-width="1.5"/>
                <path d="m11 11-2-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <span>${suggestion}</span>
        </div>
    `).join('');
    
    suggestionsContainer.style.display = 'block';
}

function hideSearchSuggestions() {
    const suggestionsContainer = document.getElementById('searchSuggestions');
    if (suggestionsContainer) {
        suggestionsContainer.style.display = 'none';
    }
}

function selectSuggestion(suggestion) {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = suggestion;
        hideSearchSuggestions();
        performSearch(suggestion);
    }
}

function performSearch(query) {
    // Store search query in session storage for results page
    sessionStorage.setItem('searchQuery', query);
    
    // Navigate to search results page
    window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
}

// Search results page functionality
function initSearchResults() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q') || sessionStorage.getItem('searchQuery') || '';
    
    if (!query) {
        window.location.href = 'index.html';
        return;
    }
    
    // Update search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = query;
    }
    
    // Update page title
    document.title = `Recherche: ${query} - ViewStream`;
    
    // Get search results
    const results = getSearchResults(query);
    
    // Render results
    renderSearchResults(results, query);
}

function getSearchResults(query) {
    // Simple search logic - in a real app, this would be an API call
    const allVideos = window.mockVideos || [];
    const queryLower = query.toLowerCase();
    
    return allVideos.filter(video => 
        video.title.toLowerCase().includes(queryLower) ||
        video.channel.toLowerCase().includes(queryLower) ||
        video.description.toLowerCase().includes(queryLower) ||
        video.category.toLowerCase().includes(queryLower)
    );
}

function renderSearchResults(results, query) {
    const resultsContainer = document.getElementById('searchResults');
    if (!resultsContainer) return;
    
    const resultsCount = results.length;
    
    resultsContainer.innerHTML = `
        <div class="search-header">
            <h2>Résultats pour "${query}"</h2>
            <p>${resultsCount} vidéo${resultsCount > 1 ? 's' : ''} trouvée${resultsCount > 1 ? 's' : ''}</p>
        </div>
        <div class="search-filters">
            <button class="filter-btn active" data-filter="all">Toutes les vidéos</button>
            <button class="filter-btn" data-filter="upload-date">Date d'upload</button>
            <button class="filter-btn" data-filter="view-count">Nombre de vues</button>
            <button class="filter-btn" data-filter="rating">Note</button>
            <button class="filter-btn" data-filter="duration">Durée</button>
        </div>
        <div class="search-results-grid" id="searchResultsGrid">
            ${results.length > 0 ? 
                results.map(video => createSearchResultCard(video)).join('') :
                '<div class="no-results"><p>Aucun résultat trouvé pour cette recherche.</p></div>'
            }
        </div>
    `;
    
    // Initialize filter buttons
    initSearchFilters();
}

function createSearchResultCard(video) {
    return `
        <div class="search-result-card" onclick="openVideo(${video.id})">
            <div class="result-thumbnail">
                <svg width="320" height="180" viewBox="0 0 320 180" fill="none">
                    <rect width="320" height="180" fill="#2C2C2C"/>
                    <circle cx="160" cy="90" r="30" fill="#FF0000"/>
                    <path d="M150 75l15 15-15 15z" fill="white"/>
                    <text x="280" y="25" fill="white" font-size="12" text-anchor="end">${video.duration}</text>
                </svg>
            </div>
            <div class="result-info">
                <h3 class="result-title">${video.title}</h3>
                <div class="result-meta">
                    <span class="result-views">${formatNumber(video.views)} vues</span>
                    <span class="result-date">${video.uploadDate}</span>
                </div>
                <div class="result-channel">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="8" r="4" fill="#FF6B6B"/>
                        <path d="M2 20c0-4.418 3.582-8 8-8s8 3.582 8 8" fill="#FF6B6B"/>
                    </svg>
                    <span>${video.channel}</span>
                </div>
                <p class="result-description">${video.description.substring(0, 150)}${video.description.length > 150 ? '...' : ''}</p>
            </div>
        </div>
    `;
}

function initSearchFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            applySearchFilter(filter);
        });
    });
}

function applySearchFilter(filter) {
    // This would implement actual filtering logic
    // For now, just log the filter
    console.log('Applying filter:', filter);
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initSearch();
    
    // If we're on the search results page, initialize it
    if (window.location.pathname.includes('search-results.html')) {
        initSearchResults();
    }
}); 