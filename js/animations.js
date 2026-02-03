
class UIEffects {
    static init() {
        this.initButtonEffects();
        
        this.initTitleEffects();

        this.initBoxEffects();
        
        this.initAvatarEffect();
    }
    
    static initButtonEffects() {
        const contactButtons = document.querySelectorAll('.contact-btn');
        contactButtons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                anime({
                    targets: btn,
                    scale: 1.05,
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            });
            
            btn.addEventListener('mouseleave', () => {
                anime({
                    targets: btn,
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            });
            
            btn.addEventListener('click', function() {
                const platform = this.getAttribute('data-platform');
                anime({
                    targets: this,
                    scale: [1, 1.1, 1],
                    duration: 300,
                    easing: 'easeInOutQuad'
                });
            });
        });
        
        const donateButtons = document.querySelectorAll('.donate-btn');
        donateButtons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                anime({
                    targets: btn,
                    scale: 1.05,
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            });
            
            btn.addEventListener('mouseleave', () => {
                anime({
                    targets: btn,
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            });
            
            btn.addEventListener('click', function() {
                const crypto = this.getAttribute('data-crypto');
                const address = this.getAttribute('data-address');
                
                anime({
                    targets: this,
                    scale: [1, 1.1, 1],
                    backgroundColor: ['rgba(0,20,0,0.8)', 'rgba(0,60,0,0.9)', 'rgba(0,20,0,0.8)'],
                    duration: 500,
                    easing: 'easeInOutQuad'
                });
                
                copyToClipboard(address);
            });
        });
    }
    
    static initTitleEffects() {
        const titles = document.querySelectorAll('.box-title');
        setInterval(() => {
            titles.forEach(title => {
                if (Math.random() > 0.85) {
                    anime({
                        targets: title,
                        color: ['#00ff00', '#00aa00', '#00ff00'],
                        duration: 1500,
                        easing: 'easeInOutQuad'
                    });
                }
            });
        }, 4000);
    }
    
    static initBoxEffects() {
        const boxes = document.querySelectorAll('.box');
        setInterval(() => {
            boxes.forEach(box => {
                if (Math.random() > 0.9) {
                    anime({
                        targets: box,
                        borderColor: ['#008800', '#00ff00', '#008800'],
                        duration: 1000,
                        easing: 'easeInOutQuad'
                    });
                }
            });
        }, 3000);
    }
    
    static initAvatarEffect() {
        const avatarPulse = document.querySelector('.avatar-pulse');
        if (avatarPulse) {
            avatarPulse.style.animation = 'pulse 4s infinite';
        }
    }
    
    static animateBoxes() {
        const boxes = document.querySelectorAll('.box');
        anime({
            targets: boxes,
            opacity: [0, 1],
            translateY: [30, 0],
            delay: anime.stagger(80),
            duration: 800,
            easing: 'easeOutCubic'
        });
    }
}