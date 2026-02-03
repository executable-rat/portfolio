const galleryData = [
    {
        type: 'image',
        src: 'gallery/constuctror.webp',
        title: 'Конструктор веб-страниц',
        description: 'Конструктор веб-страниц для проекта RodinaRP с визуальным редактором'
    },
    {
        type: 'image',
        src: 'gallery/hl2rp-inventory.webp',
        title: 'Кастомный инвентарь HL2RP',
        description: 'Модифицированный инвентарь на Helix Framework с улучшенным UI и функционалом'
    },
    {
        type: 'image',
        src: 'gallery/leyn-iwakura.webp',
        title: 'Leyn Iwakura - Telegram бот',
        description: 'Телеграм бот с встроенной нейросетью для развлечения в чатах'
    },
    {
        type: 'image',
        src: 'gallery/minecraft-server.webp',
        title: 'Майнкрафт сервер',
        description: 'Кастомный спавн и материалы сервера Minecraft'
    },
    {
        type: 'image',
        src: 'gallery/rodina-gallery.webp',
        title: 'Галерея RodinaRP',
        description: 'Система галереи на сайте проекта RodinaRP с просмотром изображений'
    },
    {
        type: 'image',
        src: 'gallery/rodina-search.webp',
        title: 'Система поиска Jekyll',
        description: 'Поисковая система контента на Jekyll для проекта RodinaRP'
    },
    {
        type: 'image',
        src: 'gallery/xenforo.webp',
        title: 'Тема для XenForo',
        description: 'Самостоятельно созданная тема для форума на XenForo'
    },
    {
        type: 'video',
        srcWebm: 'gallery/hl2rp-interface.webm',
        srcMp4: 'gallery/hl2rp-interface.mp4',
        title: 'Интерфейс Path To Rebirth',
        description: 'Основной динамический интерфейс проекта Path To Rebirth в Garry\'s Mod'
    },
    {
        type: 'video',
        srcWebm: 'gallery/interface-gmod.webm',
        srcMp4: 'gallery/interface-gmod.mp4',
        title: 'HUD для HL2RP',
        description: 'Пользовательский интерфейс для HL2RP проекта в Garry\'s Mod'
    },
    {
        type: 'video',
        srcWebm: 'gallery/minecraft-launcher.webm',
        srcMp4: 'gallery/minecraft-launcher.mp4',
        title: 'Minecraft лаунчер',
        description: 'Авторский лаунчер для сервера "netzona" с авторизацией и модами'
    },
    {
        type: 'video',
        srcWebm: 'gallery/movement-gmod.webm',
        srcMp4: 'gallery/movement-gmod.mp4',
        title: 'Аддон движения для GMod',
        description: 'Аддон для Garry\'s Mod добавляющий инерцию камеры и реалистичное поведение'
    },
    {
        type: 'image',
        src: 'gallery/rodina-map.webp',
        title: 'Интерактивная карта RodinaRP',
        description: 'Интерактивная карта проекта RodinaRP с метками и системой фильтров'
    },
    {
        type: 'image',
        src: 'gallery/rodina.webp',
        title: 'Лендинг RodinaRP',
        description: 'Главная лендинг страница проекта RodinaRP с описанием и функционалом'
    }
];


class Gallery {
    constructor() {
        this.modal = document.getElementById('galleryModal');
        this.grid = document.getElementById('galleryGrid');
        this.loading = document.getElementById('galleryLoading');
        this.openBtn = document.getElementById('openGallery');
        this.closeBtn = document.getElementById('closeGallery');
        this.isMobile = window.innerWidth < 768;
        
        this.init();
    }
    
    init() {
        this.openBtn.addEventListener('click', () => this.open());
        this.closeBtn.addEventListener('click', () => this.close());
        
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal || e.target.classList.contains('gallery-modal-backdrop')) {
                this.close();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('show')) {
                this.close();
            }
        });
        
        this.loadGallery();
    }
    
    open() {
        this.modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        
        anime({
            targets: this.modal,
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
        
        anime({
            targets: '.gallery-modal-content',
            scale: [0.95, 1],
            opacity: [0, 1],
            duration: 400,
            easing: 'easeOutBack'
        });
    }
    
    close() {
        const fullscreenItems = document.querySelectorAll('.gallery-item.fullscreen');
        fullscreenItems.forEach(item => item.classList.remove('fullscreen'));
        
        anime({
            targets: this.modal,
            opacity: [1, 0],
            duration: 200,
            easing: 'easeInQuad',
            complete: () => {
                this.modal.classList.remove('show');
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
            }
        });
    }
    
    loadGallery() {
        this.loading.style.display = 'block';
        this.grid.innerHTML = '';
        
        setTimeout(() => {
            this.renderGallery();
            this.loading.style.display = 'none';
        }, 300);
    }
    
    renderGallery() {
        galleryData.forEach((item, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.style.opacity = '0';
            galleryItem.style.transform = 'translateY(20px)';
            
            let mediaElement = '';
            
            if (item.type === 'image') {
                mediaElement = `
                    <div class="gallery-media-container">
                        <img src="${item.src}" alt="${item.title}" class="gallery-media" loading="lazy"
                             onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22200%22><rect width=%22100%25%22 height=%22100%25%22 fill=%22%23003300%22/><text x=%22200%22 y=%22110%22 font-family=%22Arial%22 font-size=%2216%22 text-anchor=%22middle%22 fill=%22%2300ff00%22>${item.title}</text></svg>'">
                    </div>
                `;
            } else if (item.type === 'video') {
                mediaElement = `
                    <div class="gallery-media-container">
                        <video class="gallery-video" preload="metadata" controls playsinline>
                            ${item.srcWebm ? `<source src="${item.srcWebm}" type="video/webm">` : ''}
                            ${item.srcMp4 ? `<source src="${item.srcMp4}" type="video/mp4">` : ''}
                        </video>
                    </div>
                `;
            }
            
            galleryItem.innerHTML = `
                ${mediaElement}
                <div class="gallery-info">
                    <div class="gallery-caption-title">${item.title}</div>
                    <div class="gallery-caption-description">${item.description}</div>
                </div>
            `;
            
            this.grid.appendChild(galleryItem);
            
            setTimeout(() => {
                anime({
                    targets: galleryItem,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 400,
                    delay: index * 50,
                    easing: 'easeOutQuad'
                });
            }, 100);
            
            if (!this.isMobile) {
                galleryItem.addEventListener('click', (e) => {
                    if (!e.target.classList.contains('gallery-caption-title') && 
                        !e.target.classList.contains('gallery-caption-description')) {
                        this.toggleFullscreen(galleryItem);
                    }
                });
            }
        });
    }
    
    toggleFullscreen(element) {
        if (element.classList.contains('fullscreen')) {
            element.classList.remove('fullscreen');
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
        } else {
            document.querySelectorAll('.gallery-item.fullscreen').forEach(item => {
                item.classList.remove('fullscreen');
            });
            
            element.classList.add('fullscreen');
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            
            const closeBtn = document.createElement('div');
            closeBtn.className = 'fullscreen-close';
            closeBtn.innerHTML = '×';
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                element.classList.remove('fullscreen');
                document.body.style.overflow = 'auto';
                document.documentElement.style.overflow = 'auto';
            });
            
            anime({
                targets: element,
                opacity: [0, 1],
                duration: 300,
                easing: 'easeOutQuad'
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Gallery();
});