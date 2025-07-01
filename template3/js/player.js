// ===== VIDEO PLAYER CONTROLS =====
class VideoPlayer {
    constructor() {
        this.video = document.getElementById('mainVideo');
        this.controls = document.getElementById('videoControls');
        this.progressBar = document.getElementById('progressFilled');
        this.progressHandle = document.getElementById('progressHandle');
        this.currentTime = document.getElementById('currentTime');
        this.duration = document.getElementById('duration');
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.volumeBtn = document.getElementById('volumeBtn');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.settingsMenu = document.getElementById('settingsMenu');
        this.settingsBtn = document.getElementById('settingsBtn');
        this.theaterBtn = document.getElementById('theaterBtn');
        this.fullscreenBtn = document.getElementById('fullscreenBtn');
        this.rewindBtn = document.getElementById('rewindBtn');
        this.forwardBtn = document.getElementById('forwardBtn');
        
        this.isPlaying = false;
        this.isMuted = false;
        this.currentVolume = 1;
        this.isTheaterMode = false;
        this.isFullscreen = false;
        
        this.initPlayer();
    }
    
    initPlayer() {
        this.setupEventListeners();
        this.setupKeyboardControls();
        this.loadVideoData();
    }
    
    setupEventListeners() {
        // Play/Pause
        if (this.playPauseBtn) {
            this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        }
        
        // Video events
        if (this.video) {
            this.video.addEventListener('loadedmetadata', () => this.updateDuration());
            this.video.addEventListener('timeupdate', () => this.updateProgress());
            this.video.addEventListener('ended', () => this.handleVideoEnd());
            this.video.addEventListener('click', () => this.togglePlayPause());
        }
        
        // Progress bar
        if (this.progressBar) {
            this.progressBar.addEventListener('click', (e) => this.seekTo(e));
        }
        
        // Volume controls
        if (this.volumeBtn) {
            this.volumeBtn.addEventListener('click', () => this.toggleMute());
        }
        
        if (this.volumeSlider) {
            this.volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value));
        }
        
        // Settings
        if (this.settingsBtn) {
            this.settingsBtn.addEventListener('click', () => this.toggleSettings());
        }
        
        // Theater mode
        if (this.theaterBtn) {
            this.theaterBtn.addEventListener('click', () => this.toggleTheaterMode());
        }
        
        // Fullscreen
        if (this.fullscreenBtn) {
            this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        }
        
        // Rewind/Forward
        if (this.rewindBtn) {
            this.rewindBtn.addEventListener('click', () => this.rewind(10));
        }
        
        if (this.forwardBtn) {
            this.forwardBtn.addEventListener('click', () => this.forward(10));
        }
        
        // Hide settings when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.settingsBtn?.contains(e.target) && !this.settingsMenu?.contains(e.target)) {
                this.hideSettings();
            }
        });
    }
    
    setupKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            
            switch(e.code) {
                case 'Space':
                    e.preventDefault();
                    this.togglePlayPause();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.rewind(5);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.forward(5);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.changeVolume(0.1);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.changeVolume(-0.1);
                    break;
                case 'KeyM':
                    e.preventDefault();
                    this.toggleMute();
                    break;
                case 'KeyF':
                    e.preventDefault();
                    this.toggleFullscreen();
                    break;
                case 'KeyT':
                    e.preventDefault();
                    this.toggleTheaterMode();
                    break;
            }
        });
    }
    
    loadVideoData() {
        // Get video ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const videoId = parseInt(urlParams.get('id')) || 1;
        
        // Find video data
        const video = window.ViewStream?.mockVideos.find(v => v.id === videoId);
        if (video) {
            this.updateVideoInfo(video);
            this.loadSuggestedVideos(video);
            this.loadComments();
        }
    }
    
    updateVideoInfo(video) {
        // Update page title
        document.title = `${video.title} - ViewStream`;
        
        // Update video title
        const titleElement = document.querySelector('.video-title');
        if (titleElement) titleElement.textContent = video.title;
        
        // Update view count
        const viewCount = document.querySelector('.view-count');
        if (viewCount) viewCount.textContent = `${window.ViewStream.formatNumber(video.views)} vues`;
        
        // Update like count
        const likeCount = document.querySelector('.like-btn span');
        if (likeCount) likeCount.textContent = window.ViewStream.formatNumber(video.likes);
        
        // Update comment count
        const commentCount = document.querySelector('.comments-header h3');
        if (commentCount) commentCount.textContent = `Commentaires (${window.ViewStream.formatNumber(video.comments)})`;
    }
    
    togglePlayPause() {
        if (this.video) {
            if (this.isPlaying) {
                this.video.pause();
            } else {
                this.video.play();
            }
        }
    }
    
    play() {
        if (this.video) {
            this.video.play();
            this.isPlaying = true;
            this.updatePlayPauseButton();
        }
    }
    
    pause() {
        if (this.video) {
            this.video.pause();
            this.isPlaying = false;
            this.updatePlayPauseButton();
        }
    }
    
    updatePlayPauseButton() {
        if (this.playPauseBtn) {
            const playIcon = this.playPauseBtn.querySelector('.play-icon');
            const pauseIcon = this.playPauseBtn.querySelector('.pause-icon');
            
            if (this.isPlaying) {
                playIcon?.classList.remove('active');
                pauseIcon?.classList.add('active');
            } else {
                playIcon?.classList.add('active');
                pauseIcon?.classList.remove('active');
            }
        }
    }
    
    updateProgress() {
        if (this.video && this.progressBar) {
            const progress = (this.video.currentTime / this.video.duration) * 100;
            this.progressBar.style.width = `${progress}%`;
            
            if (this.progressHandle) {
                this.progressHandle.style.left = `${progress}%`;
            }
            
            if (this.currentTime) {
                this.currentTime.textContent = this.formatTime(this.video.currentTime);
            }
        }
    }
    
    seekTo(event) {
        if (this.video && this.progressBar) {
            const rect = this.progressBar.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const progress = clickX / rect.width;
            this.video.currentTime = progress * this.video.duration;
        }
    }
    
    updateDuration() {
        if (this.video && this.duration) {
            this.duration.textContent = this.formatTime(this.video.duration);
        }
    }
    
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    toggleMute() {
        if (this.video) {
            this.isMuted = !this.isMuted;
            this.video.muted = this.isMuted;
            this.updateVolumeButton();
        }
    }
    
    setVolume(value) {
        if (this.video) {
            const volume = value / 100;
            this.video.volume = volume;
            this.currentVolume = volume;
            this.isMuted = volume === 0;
            this.updateVolumeButton();
        }
    }
    
    changeVolume(delta) {
        if (this.volumeSlider) {
            const newVolume = Math.max(0, Math.min(100, parseFloat(this.volumeSlider.value) + (delta * 100)));
            this.volumeSlider.value = newVolume;
            this.setVolume(newVolume);
        }
    }
    
    updateVolumeButton() {
        if (this.volumeBtn) {
            const highIcon = this.volumeBtn.querySelector('.volume-high');
            const mutedIcon = this.volumeBtn.querySelector('.volume-muted');
            
            if (this.isMuted || this.currentVolume === 0) {
                highIcon?.style.display = 'none';
                mutedIcon?.style.display = 'block';
            } else {
                highIcon?.style.display = 'block';
                mutedIcon?.style.display = 'none';
            }
        }
    }
    
    toggleSettings() {
        if (this.settingsMenu) {
            this.settingsMenu.classList.toggle('active');
        }
    }
    
    hideSettings() {
        if (this.settingsMenu) {
            this.settingsMenu.classList.remove('active');
        }
    }
    
    toggleTheaterMode() {
        this.isTheaterMode = !this.isTheaterMode;
        const watchContent = document.querySelector('.watch-content');
        const playerContainer = document.querySelector('.video-player-container');
        
        if (this.isTheaterMode) {
            watchContent?.classList.add('theater-mode');
            playerContainer?.classList.add('theater');
        } else {
            watchContent?.classList.remove('theater-mode');
            playerContainer?.classList.remove('theater');
        }
    }
    
    toggleFullscreen() {
        if (!this.isFullscreen) {
            this.enterFullscreen();
        } else {
            this.exitFullscreen();
        }
    }
    
    enterFullscreen() {
        const watchContent = document.querySelector('.watch-content');
        const playerContainer = document.querySelector('.video-player-container');
        const videoPlayer = document.querySelector('.video-player');
        
        if (watchContent) {
            watchContent.classList.add('fullscreen');
            playerContainer?.classList.add('fullscreen');
            videoPlayer?.classList.add('fullscreen');
            this.isFullscreen = true;
        }
    }
    
    exitFullscreen() {
        const watchContent = document.querySelector('.watch-content');
        const playerContainer = document.querySelector('.video-player-container');
        const videoPlayer = document.querySelector('.video-player');
        
        if (watchContent) {
            watchContent.classList.remove('fullscreen');
            playerContainer?.classList.remove('fullscreen');
            videoPlayer?.classList.remove('fullscreen');
            this.isFullscreen = false;
        }
    }
    
    rewind(seconds) {
        if (this.video) {
            this.video.currentTime = Math.max(0, this.video.currentTime - seconds);
        }
    }
    
    forward(seconds) {
        if (this.video) {
            this.video.currentTime = Math.min(this.video.duration, this.video.currentTime + seconds);
        }
    }
    
    handleVideoEnd() {
        this.isPlaying = false;
        this.updatePlayPauseButton();
        // Auto-play next video or show end screen
    }
    
    loadSuggestedVideos(currentVideo) {
        const suggestedList = document.getElementById('suggestedList');
        if (!suggestedList) return;
        
        // Get suggested videos (exclude current video)
        const suggestedVideos = window.ViewStream?.mockVideos
            .filter(v => v.id !== currentVideo.id)
            .slice(0, 10);
        
        suggestedList.innerHTML = suggestedVideos.map(video => `
            <div class="suggested-video" onclick="window.location.href='watch.html?id=${video.id}'">
                <div class="suggested-thumbnail">
                    ${window.ViewStream.generateThumbnail(video.category)}
                </div>
                <div class="suggested-info">
                    <h4 class="suggested-title">${video.title}</h4>
                    <p class="suggested-channel">${video.channel}</p>
                    <p class="suggested-stats">${window.ViewStream.formatNumber(video.views)} vues • ${video.uploadDate}</p>
                </div>
            </div>
        `).join('');
    }
    
    loadComments() {
        const commentsList = document.getElementById('commentsList');
        if (!commentsList) return;
        
        const comments = window.ViewStream?.mockComments || [];
        
        commentsList.innerHTML = comments.map(comment => `
            <div class="comment-item">
                <div class="comment-author-avatar">
                    ${window.ViewStream.generateAvatar(comment.author)}
                </div>
                <div class="comment-content">
                    <div class="comment-header">
                        <span class="comment-author">${comment.author}</span>
                        <span class="comment-date">${comment.date}</span>
                    </div>
                    <p class="comment-text">${comment.text}</p>
                    <div class="comment-actions-bar">
                        <button class="comment-action">👍 ${comment.likes}</button>
                        <button class="comment-action">Répondre</button>
                        <button class="comment-action">Partager</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// ===== INTERACTION HANDLERS =====
function initVideoInteractions() {
    // Like/Dislike buttons
    const likeBtn = document.getElementById('likeBtn');
    const dislikeBtn = document.getElementById('dislikeBtn');
    
    if (likeBtn) {
        likeBtn.addEventListener('click', () => {
            likeBtn.classList.toggle('liked');
            if (likeBtn.classList.contains('liked')) {
                dislikeBtn?.classList.remove('disliked');
            }
        });
    }
    
    if (dislikeBtn) {
        dislikeBtn.addEventListener('click', () => {
            dislikeBtn.classList.toggle('disliked');
            if (dislikeBtn.classList.contains('disliked')) {
                likeBtn?.classList.remove('liked');
            }
        });
    }
    
    // Subscribe button
    const subscribeBtn = document.getElementById('subscribeBtn');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', () => {
            subscribeBtn.classList.toggle('subscribed');
            if (subscribeBtn.classList.contains('subscribed')) {
                subscribeBtn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 2v16M2 10h16" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    Abonné
                `;
            } else {
                subscribeBtn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 2v16M2 10h16" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    S'abonner
                `;
            }
        });
    }
    
    // Description expand/collapse
    const showMoreBtn = document.getElementById('showMoreBtn');
    const showLessBtn = document.getElementById('showLessBtn');
    const descriptionPreview = document.getElementById('descriptionPreview');
    const descriptionFull = document.getElementById('descriptionFull');
    
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', () => {
            descriptionPreview.style.display = 'none';
            descriptionFull.style.display = 'block';
        });
    }
    
    if (showLessBtn) {
        showLessBtn.addEventListener('click', () => {
            descriptionFull.style.display = 'none';
            descriptionPreview.style.display = 'block';
        });
    }
    
    // Comment form
    const commentInput = document.getElementById('commentInput');
    const submitCommentBtn = document.getElementById('submitCommentBtn');
    const cancelCommentBtn = document.getElementById('cancelCommentBtn');
    const commentActions = document.querySelector('.comment-actions');
    
    if (commentInput) {
        commentInput.addEventListener('input', () => {
            const hasText = commentInput.value.trim().length > 0;
            submitCommentBtn.disabled = !hasText;
            
            if (hasText) {
                commentActions?.classList.add('active');
            } else {
                commentActions?.classList.remove('active');
            }
        });
        
        commentInput.addEventListener('focus', () => {
            commentActions?.classList.add('active');
        });
    }
    
    if (cancelCommentBtn) {
        cancelCommentBtn.addEventListener('click', () => {
            commentInput.value = '';
            commentActions?.classList.remove('active');
            submitCommentBtn.disabled = true;
        });
    }
    
    if (submitCommentBtn) {
        submitCommentBtn.addEventListener('click', () => {
            const comment = commentInput.value.trim();
            if (comment) {
                // Add comment to list
                addComment(comment);
                commentInput.value = '';
                commentActions?.classList.remove('active');
                submitCommentBtn.disabled = true;
            }
        });
    }
}

function addComment(text) {
    const commentsList = document.getElementById('commentsList');
    if (!commentsList) return;
    
    const newComment = {
        id: Date.now(),
        author: 'Vous',
        avatar: 'user',
        text: text,
        date: 'À l\'instant',
        likes: 0,
        replies: 0
    };
    
    const commentElement = document.createElement('div');
    commentElement.className = 'comment-item';
    commentElement.innerHTML = `
        <div class="comment-author-avatar">
            ${window.ViewStream.generateAvatar(newComment.author)}
        </div>
        <div class="comment-content">
            <div class="comment-header">
                <span class="comment-author">${newComment.author}</span>
                <span class="comment-date">${newComment.date}</span>
            </div>
            <p class="comment-text">${newComment.text}</p>
            <div class="comment-actions-bar">
                <button class="comment-action">👍 ${newComment.likes}</button>
                <button class="comment-action">Répondre</button>
                <button class="comment-action">Partager</button>
            </div>
        </div>
    `;
    
    commentsList.insertBefore(commentElement, commentsList.firstChild);
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize video player
    const player = new VideoPlayer();
    
    // Initialize interactions
    initVideoInteractions();
    
    // Auto-play video after a short delay (for demo purposes)
    setTimeout(() => {
        player.play();
    }, 1000);
}); 