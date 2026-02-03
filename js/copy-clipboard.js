
function copyToClipboard(text) {
    const notification = document.getElementById('copyNotification');
    

    anime.remove(notification);
    

    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%) translateY(-20px)';
    notification.style.opacity = '0';
    notification.style.display = 'flex';
    
    navigator.clipboard.writeText(text).then(() => {

        anime({
            targets: notification,
            opacity: [0, 1],
            translateY: [-20, 0],
            duration: 300,
            easing: 'easeOutQuad',
            begin: function() {
                notification.classList.add('active');
            }
        });
        

        setTimeout(() => {
            anime({
                targets: notification,
                opacity: [1, 0],
                translateY: [0, -20],
                duration: 300,
                easing: 'easeInQuad',
                complete: function() {
                    notification.classList.remove('active');
                    notification.style.display = 'none';
                }
            });
        }, 2000);
    }).catch(err => {
        console.error('Ошибка копирования: ', err);

        notification.innerHTML = '<i class="fas fa-times mr-2"></i> Ошибка копирования';
        notification.style.display = 'flex';
        
        anime({
            targets: notification,
            opacity: [0, 1],
            translateY: [-20, 0],
            duration: 300,
            easing: 'easeOutQuad'
        });
        
        setTimeout(() => {
            anime({
                targets: notification,
                opacity: [1, 0],
                translateY: [0, -20],
                duration: 300,
                easing: 'easeInQuad',
                complete: function() {
                    notification.style.display = 'none';
                }
            });
        }, 3000);
    });
}