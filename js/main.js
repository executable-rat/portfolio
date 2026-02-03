document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth > 768) {
        if (typeof CardRotator !== 'undefined') {
            const cardRotator = new CardRotator();
        }
    } else {
        const mainCard = document.getElementById('mainCard');
        if (mainCard) {
            mainCard.classList.remove('transform-style-3d');
        }
    }
    

    if (window.innerWidth > 768) {
        if (typeof JapaneseMatrix !== 'undefined') {
            const matrix = new JapaneseMatrix();
        }
    }
    

    if (typeof UIEffects !== 'undefined') {
        UIEffects.init();
        UIEffects.animateBoxes();
    }
    

    if (typeof CopyClipboard !== 'undefined') {
        const copyHandler = new CopyClipboard();
    }
    

    if (typeof Player !== 'undefined') {
        const player = new Player();
    }
    

    const adaptForMobile = () => {
        const mainCard = document.getElementById('mainCard');
        const body = document.body;
        const html = document.documentElement;
        
        if (!mainCard) return;
        

        const cardHeight = mainCard.offsetHeight;
        const windowHeight = window.innerHeight;
        

        if (window.innerWidth < 641) {
            mainCard.classList.add('max-w-full');
            mainCard.classList.remove('max-w-[850px]');
            

            body.style.overflowY = 'auto';
            html.style.overflowY = 'auto';
            body.style.height = 'auto';
            body.style.minHeight = '100vh';
            

            mainCard.style.boxShadow = '0 0 10px rgba(0, 100, 0, 0.5), inset 0 0 15px rgba(0, 50, 0, 0.2)';
            

            const gridOverlay = document.querySelector('.grid-overlay');
            if (gridOverlay) {
                gridOverlay.style.opacity = '0.1';
            }
        }

        else if (window.innerWidth >= 641 && window.innerWidth <= 1024) {
            mainCard.classList.add('max-w-full');
            mainCard.classList.remove('max-w-[850px]');
            

            if (cardHeight > windowHeight - 60) {
                body.style.overflowY = 'auto';
                html.style.overflowY = 'auto';
            } else {
                body.style.overflowY = 'hidden';
                html.style.overflowY = 'hidden';
            }
            
            body.style.height = '100vh';
            

            mainCard.style.boxShadow = '0 0 20px rgba(0, 100, 0, 0.6), inset 0 0 20px rgba(0, 50, 0, 0.25)';
            
            const gridOverlay = document.querySelector('.grid-overlay');
            if (gridOverlay) {
                gridOverlay.style.opacity = '0.2';
            }
        }

        else {
            mainCard.classList.remove('max-w-full');
            mainCard.classList.add('max-w-[850px]');
            


            if (cardHeight > windowHeight - 80) {
                body.style.overflowY = 'auto';
                html.style.overflowY = 'auto';
                body.style.height = 'auto';
            } else {
                body.style.overflowY = 'hidden';
                html.style.overflowY = 'hidden';
                body.style.height = '100vh';
            }
            

            mainCard.style.boxShadow = '0 0 40px rgba(0, 100, 0, 0.7), inset 0 0 30px rgba(0, 50, 0, 0.3)';
            
            const gridOverlay = document.querySelector('.grid-overlay');
            if (gridOverlay) {
                gridOverlay.style.opacity = '0.3';
            }
        }
        

        body.style.overflowX = 'hidden';
        html.style.overflowX = 'hidden';
    };
    

    adaptForMobile();
    window.addEventListener('resize', adaptForMobile);


    let lastZoomLevel = window.devicePixelRatio;
    let resizeTimer;

    const handleZoomChange = () => {
        const currentZoom = window.devicePixelRatio;
        
        if (Math.abs(currentZoom - lastZoomLevel) > 0.05) {

            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                adaptForMobile();

                document.body.style.overflow = 'hidden';
                setTimeout(() => {
                    adaptForMobile();
                }, 100);
            }, 250);
            lastZoomLevel = currentZoom;
        }
    };


    window.addEventListener('resize', () => {
        handleZoomChange();
        adaptForMobile();
    });


    document.addEventListener('wheel', (e) => {
        const body = document.body;
        const html = document.documentElement;
        const isAtTop = window.scrollY <= 0;
        const isAtBottom = window.innerHeight + window.scrollY >= body.scrollHeight - 1;
        

        if (isAtTop && e.deltaY < 0) {
            body.style.overflowY = 'auto';
            html.style.overflowY = 'auto';
            window.scrollTo(0, 1);
        }
    }, { passive: true });


    window.addEventListener('orientationchange', () => {
        setTimeout(adaptForMobile, 300);
    });
    

    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        

        const buttons = document.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.style.minHeight = '44px';
            btn.style.minWidth = '44px';
        });
    }
    

    setTimeout(() => {
        const notification = document.getElementById('copyNotification');
        if (notification) {
            notification.classList.add('show');
            console.log('Уведомление показано (тест)');
            setTimeout(() => {
                notification.classList.remove('show');
                console.log('Уведомление скрыто (тест)');
            }, 2000);
        }
    }, 1000);
    
    console.log('Портфолио InTeaReable загружено! Адаптация для мобилок и планшетов активирована.');
});