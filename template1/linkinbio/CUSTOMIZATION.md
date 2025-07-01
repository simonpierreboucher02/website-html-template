# 🎨 Guide de Personnalisation

Ce guide vous explique comment personnaliser votre page "Link in Bio" selon vos besoins.

## 📝 Personnalisation du Contenu

### 1. Informations de Base

Dans `index.html`, modifiez les éléments suivants :

```html
<!-- Nom d'utilisateur -->
<h1 class="profile-name">@votre_pseudo</h1>

<!-- Bio -->
<p class="profile-bio">Votre description | Vos centres d'intérêt ✨</p>

<!-- Statistiques -->
<div class="stats">
    <div class="stat">
        <span class="stat-number">Votre nombre</span>
        <span class="stat-label">Followers</span>
    </div>
    <!-- Ajoutez d'autres stats... -->
</div>
```

### 2. Liens Principaux

Remplacez les liens existants par les vôtres :

```html
<!-- Exemple pour YouTube -->
<a href="https://youtube.com/@votre_chaine" class="link-card youtube-link" target="_blank" rel="noopener">
    <div class="link-icon">
        <!-- Icône YouTube -->
    </div>
    <div class="link-content">
        <span class="link-title">🎥 Ma chaîne YouTube</span>
        <span class="link-subtitle">Nouveautés tech</span>
    </div>
</a>
```

### 3. Réseaux Sociaux

Modifiez les liens sociaux dans la section `social-section` :

```html
<div class="social-links">
    <a href="https://instagram.com/votre_compte" class="social-link instagram" aria-label="Instagram">
        <!-- Icône Instagram -->
    </a>
    <!-- Ajoutez d'autres réseaux... -->
</div>
```

## 🎨 Personnalisation des Couleurs

### 1. Couleurs Principales

Dans `css/style.css`, modifiez les variables CSS :

```css
:root {
    /* Votre palette de couleurs */
    --accent-primary: #votre_couleur_principale;
    --accent-secondary: #votre_couleur_secondaire;
    --accent-gradient: linear-gradient(135deg, #couleur1 0%, #couleur2 100%);
    
    /* Couleurs de fond */
    --bg-primary: #ffffff;
    --bg-secondary: #f8fafc;
    
    /* Couleurs de texte */
    --text-primary: #1e293b;
    --text-secondary: #64748b;
}
```

### 2. Couleurs des Réseaux Sociaux

Personnalisez les couleurs de vos réseaux :

```css
/* Exemple pour Instagram */
--instagram-color: #e4405f;

/* Exemple pour TikTok */
--tiktok-color: #000000;

/* Ajoutez vos propres couleurs... */
```

### 3. Mode Sombre

Personnalisez également le mode sombre :

```css
[data-theme="dark"] {
    --bg-primary: #0f172a;
    --bg-secondary: #1e293b;
    --text-primary: #f8fafc;
    --text-secondary: #cbd5e1;
}
```

## 🖼️ Personnalisation de l'Avatar

### 1. Avatar SVG Personnalisé

Remplacez l'avatar SVG dans `index.html` :

```html
<div class="profile-avatar">
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <!-- Votre avatar SVG personnalisé -->
        <!-- Vous pouvez utiliser des outils comme Figma ou Adobe Illustrator -->
    </svg>
</div>
```

### 2. Utiliser une Image

Pour utiliser une image au lieu d'un SVG :

```html
<div class="profile-avatar">
    <img src="votre-image.jpg" alt="Votre nom" width="120" height="120">
</div>
```

## 📱 Ajout de Nouveaux Liens

### 1. Structure d'un Lien

```html
<a href="votre-url" class="link-card votre-classe" target="_blank" rel="noopener">
    <div class="link-icon">
        <!-- Votre icône SVG -->
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <!-- Path de votre icône -->
        </svg>
    </div>
    <div class="link-content">
        <span class="link-title">🎯 Votre titre</span>
        <span class="link-subtitle">Votre description</span>
    </div>
    <div class="link-arrow">
        <!-- Icône de flèche -->
    </div>
</a>
```

### 2. Style CSS pour Nouveau Lien

```css
.votre-classe:hover {
    border-color: #votre_couleur;
}

.votre-classe:hover .link-icon {
    background: #votre_couleur;
}
```

## 🔧 Personnalisation JavaScript

### 1. Modifier les Animations

Dans `js/script.js`, personnalisez les effets :

```javascript
// Changer les couleurs du confetti
function createConfetti() {
    const colors = ['#votre_couleur1', '#votre_couleur2', '#votre_couleur3'];
    // ... reste du code
}
```

### 2. Ajouter des Interactions

```javascript
// Exemple : Effet spécial sur clic d'un lien
document.querySelector('.votre-lien').addEventListener('click', () => {
    // Votre effet personnalisé
    console.log('Lien cliqué !');
});
```

## 📊 Analytics Personnalisés

### 1. Google Analytics

Ajoutez votre ID GA4 dans `index.html` :

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 2. Autres Analytics

```javascript
// Exemple pour Plausible Analytics
<script defer data-domain="votre-domaine.com" src="https://plausible.io/js/script.js"></script>
```

## 🎯 Optimisations Avancées

### 1. Performance

```html
<!-- Précharger les polices importantes -->
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" as="style">
```

### 2. SEO

```html
<!-- Métadonnées personnalisées -->
<meta property="og:title" content="Votre nom | Link in Bio">
<meta property="og:description" content="Votre description">
<meta property="og:image" content="https://votre-domaine.com/votre-image.jpg">
```

## 🚀 Déploiement

### 1. GitHub Pages

1. Créez un repository GitHub
2. Uploadez vos fichiers
3. Activez GitHub Pages dans les paramètres

### 2. Netlify

1. Connectez votre repository GitHub
2. Configurez le build (pas nécessaire pour ce projet)
3. Déployez !

### 3. Vercel

1. Importez depuis GitHub
2. Vercel détectera automatiquement la configuration
3. Déployez !

## 🎨 Exemples de Personnalisation

### Style Minimaliste
```css
:root {
    --accent-primary: #000000;
    --accent-secondary: #333333;
    --bg-primary: #ffffff;
    --text-primary: #000000;
}
```

### Style Coloré
```css
:root {
    --accent-primary: #ff6b6b;
    --accent-secondary: #4ecdc4;
    --accent-gradient: linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%);
}
```

### Style Sombre
```css
:root {
    --accent-primary: #00d4ff;
    --accent-secondary: #0099cc;
    --bg-primary: #1a1a1a;
    --text-primary: #ffffff;
}
```

## 📞 Besoin d'Aide ?

- Consultez le README.md principal
- Vérifiez la documentation des technologies utilisées
- Contactez-nous pour du support personnalisé

---

**Bon personnalisation ! 🎨✨** 