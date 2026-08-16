document.addEventListener("DOMContentLoaded", () => {
    const videos = document.querySelectorAll('.auto-video');

    // Usaremos Intersection Observer para reproducir los videos
    // solo cuando sean visibles en la pantalla.
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // El video debe estar al 50% visible para reproducirse
    };

    const videoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const video = entry.target;
            
            if (entry.isIntersecting) {
                // Si el video es visible, intentar reproducirlo
                const playPromise = video.play();
                
                if (playPromise !== undefined) {
                    playPromise.then(_ => {
                        // Reproducción automática iniciada con éxito
                    })
                    .catch(error => {
                        // Reproducción automática evitada por el navegador
                        console.log("Autoplay was prevented:", error);
                    });
                }
            } else {
                // Si el video ya no es visible, pausarlo
                video.pause();
            }
        });
    }, observerOptions);

    videos.forEach(video => {
        videoObserver.observe(video);
        
        // Agregar un efecto de hover al contenedor para darle vida
        const container = video.parentElement;
        container.addEventListener('mouseenter', () => {
            container.style.transform = 'scale(1.02)';
            container.style.transition = 'transform 0.3s ease';
        });
        
        container.addEventListener('mouseleave', () => {
            container.style.transform = 'scale(1)';
        });
    });
});
