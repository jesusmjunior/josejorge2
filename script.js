document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.getElementById('prevSlide');
    const nextButton = document.getElementById('nextSlide');
    const slideCounter = document.getElementById('slideCounter');
    const fullScreenToggle = document.getElementById('fullScreenToggle');
    
    // Estado atual
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Função para mostrar o slide atual
    function showSlide(index) {
        // Remove classe active de todos os slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Adiciona classe active ao slide atual
        slides[index].classList.add('active');
        
        // Atualiza o contador
        slideCounter.textContent = `Slide: ${index + 1}/${totalSlides}`;
        
        // Habilita/desabilita botões de navegação
        prevButton.disabled = index === 0;
        nextButton.disabled = index === totalSlides - 1;
    }
    
    // Função para ir para o slide anterior
    function goToPrevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            showSlide(currentSlide);
        }
    }
    
    // Função para ir para o próximo slide
    function goToNextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            showSlide(currentSlide);
        }
    }
    
    // Função para alternar modo tela cheia
    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Erro ao tentar entrar em modo de tela cheia: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }
    
    // Event Listeners
    prevButton.addEventListener('click', goToPrevSlide);
    nextButton.addEventListener('click', goToNextSlide);
    fullScreenToggle.addEventListener('click', toggleFullScreen);
    
    // Navegação por teclado
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            goToPrevSlide();
        } else if (event.key === 'ArrowRight') {
            goToNextSlide();
        } else if (event.key === 'f' || event.key === 'F') {
            toggleFullScreen();
        }
    });
    
    // Gestos de toque (swipe)
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(event) {
        touchStartX = event.changedTouches[0].screenX;
    }, false);
    
    document.addEventListener('touchend', function(event) {
        touchEndX = event.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe para a esquerda
            goToNextSlide();
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe para a direita
            goToPrevSlide();
        }
    }
    
    // Redimensionamento responsivo
    window.addEventListener('resize', function() {
        // Ajustar para melhor visualização em diferentes dispositivos
        const container = document.querySelector('.presentation-container');
        const windowRatio = window.innerWidth / window.innerHeight;
        const presentationRatio = 1200 / 800; // largura/altura desejada
        
        if (windowRatio > presentationRatio) {
            // Ajuste baseado na altura
            container.style.height = '100vh';
            container.style.width = '100vh * ' + presentationRatio;
        } else {
            // Ajuste baseado na largura
            container.style.width = '100vw';
            container.style.height = '100vw / ' + presentationRatio;
        }
    });
    
    // Inicialização
    showSlide(currentSlide);
    
    // Preload de imagens para animações mais suaves
    function preloadImages() {
        const imageUrls = [
            'assets/logo-cogex.png',
            'assets/texture-bg.png',
            'assets/reuniao-equipe.jpg',
            'assets/balanca-justica.svg',
            'assets/predio-cogex.jpg',
            'assets/corregedor.jpg',
            'assets/icon-inovacao.svg',
            'assets/icon-colaboracao.svg',
            'assets/icon-eficiencia.svg',
            'assets/videoconferencia.jpg',
            'assets/partner-1.png',
            'assets/partner-2.png',
            'assets/partner-3.png',
            'assets/partner-4.png',
            'assets/grafico-crescimento.svg'
        ];
        
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }
    
    // Tente carregar imagens em background
    preloadImages();
});
