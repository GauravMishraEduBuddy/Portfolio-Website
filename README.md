# Portfolio Website - Hacker Theme

A stylish, dark-themed portfolio website designed for software developers and cybersecurity enthusiasts. Features a terminal-like interface, matrix rain background, and interactive elements.

## 🚀 Features

- **Hacker/Developer Theme**: Dark interface with terminal styling
- **Matrix Rain Background**: Animated background effect
- **Terminal Simulation**: Interactive command-line interface
- **Typing Animations**: Dynamic text effects
- **Responsive Design**: Works on all devices
- **Smooth Scrolling**: Enhanced navigation experience
- **Project Showcase**: Code snippets and tech stacks
- **Achievement Cards**: Professional accomplishments
- **Contact Form**: Functional contact system
- **Easter Eggs**: Hidden console commands (try typing `help` in browser console)

## 🛠️ Customization Guide

### Personal Information

Replace the following placeholders in `index.html`:

- `[DEVELOPER_NAME]` - Your name
- `[YOUR_NAME]` - Your full name
- `[YOUR_LOCATION]` - Your location
- `[YOUR_EDUCATION]` - Your education background
- `[YOUR_EMAIL]` - Your email address
- `[LINKEDIN_URL]` - Your LinkedIn profile URL
- `[GITHUB_URL]` - Your GitHub profile URL  
- `[TWITTER_URL]` - Your Twitter profile URL
- `[YOUR_GPA]` - Your GPA (if you want to include it)

### Work Experience

Update the timeline section with your experience:

```html
<div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
        <h3>Your Job Title</h3>
        <h4>Company Name</h4>
        <span class="timeline-date">Start Date - End Date</span>
        <p>Description of your role and achievements</p>
        <div class="tech-stack">
            <span class="tech-tag">Technology 1</span>
            <span class="tech-tag">Technology 2</span>
        </div>
    </div>
</div>
```

### Projects

Replace the project placeholders:

- `[PROJECT_NAME_1/2/3]` - Your project names
- Update project descriptions
- Add actual GitHub/demo links
- Customize tech stacks

### Skills

Update the skills sections with your technologies:
- Programming languages
- Frameworks and libraries  
- Tools and platforms
- Cybersecurity skills

### Achievements

Add your accomplishments:

```html
<div class="achievement-card">
    <div class="achievement-icon">
        <span class="icon large">🏆</span>
    </div>
    <h3>Your Achievement</h3>
    <p>Description</p>
    <span class="achievement-date">Year</span>
</div>
```

## 🎨 Theme Customization

### Colors

Modify CSS variables in `styles.css`:

```css
:root {
    --bg-primary: #0a0a0a;
    --bg-secondary: #111111;
    --text-primary: #00ff41;
    --text-cyan: #00ffff;
    --text-yellow: #ffff00;
    --text-red: #ff0040;
    --text-purple: #ff00ff;
}
```

### Fonts

The website uses monospace fonts with fallbacks:
- Fira Code (preferred)
- SF Mono
- Monaco
- Consolas
- Courier New

## 🚀 Getting Started

1. Clone or download the repository
2. Customize the content (see guide above)
3. Open `index.html` in a web browser
4. For development, use a local server:
   ```bash
   python3 -m http.server 8000
   ```

## 📱 Mobile Responsiveness

The website is fully responsive and includes:
- Mobile navigation menu
- Optimized layouts for tablets and phones
- Touch-friendly interactions
- Readable text on small screens

## 🎯 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## 🔧 Technical Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with variables, grid, flexbox
- **Vanilla JavaScript**: No dependencies, pure JS
- **Canvas API**: Matrix rain animation
- **Intersection Observer**: Scroll animations

## 🎮 Easter Eggs

Try these commands in the browser console:
- `help` - Show available commands
- `about` - About information
- `skills` - List of skills
- `matrix` - Matrix reference
- `hack` - Fun hacker message
- Konami Code (↑↑↓↓←→←→BA) - Special animation

## 📄 License

This project is open source. Feel free to use and modify for your own portfolio!

## 🤝 Contributing

This is a template for personal portfolios. Feel free to:
- Report bugs
- Suggest improvements
- Add new features
- Share your customizations

---

**Made with ❤️ and lots of ☕ by developers, for developers**
