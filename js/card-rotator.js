class CardRotator {
    constructor() {
        this.card = document.getElementById('mainCard');
        this.rotation = { x: 0, y: 0 };
        this.targetRotation = { x: 0, y: 0 };
        this.mouse = { x: 0, y: 0 };
        this.smoothness = 0.08;
        this.maxRotation = 8;
        
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            this.mouse.x = (e.clientX - centerX) / centerX;
            this.mouse.y = (e.clientY - centerY) / centerY;
            
            this.targetRotation.y = this.mouse.x * this.maxRotation;
            this.targetRotation.x = -this.mouse.y * (this.maxRotation * 0.8);
        });
        
        document.addEventListener('mouseleave', () => {
            this.targetRotation = { x: 0, y: 0 };
        });
        
        this.animate();
    }
    
    animate() {
        this.rotation.x += (this.targetRotation.x - this.rotation.x) * this.smoothness;
        this.rotation.y += (this.targetRotation.y - this.rotation.y) * this.smoothness;
        
        this.card.style.transform = `
            rotateX(${this.rotation.x}deg)
            rotateY(${this.rotation.y}deg)
        `;
        
        requestAnimationFrame(() => this.animate());
    }
}