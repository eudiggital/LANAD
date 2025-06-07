document.addEventListener('DOMContentLoaded', function() {

    // Script para dropdown do menu (desktop)
    const dropdowns = document.querySelectorAll('.dropdown');
    if (dropdowns.length > 0) {
        dropdowns.forEach(dropdown => {
            const menu = dropdown.querySelector('.dropdown-menu');
            if (menu) {
                dropdown.addEventListener('mouseenter', () => {
                    menu.classList.remove('invisible', 'opacity-0');
                    menu.classList.add('visible', 'opacity-100');
                });
                dropdown.addEventListener('mouseleave', () => {
                    menu.classList.remove('visible', 'opacity-100');
                    menu.classList.add('invisible', 'opacity-0');
                });
            }
        });
    }

    // Scripts do Menu Mobile
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const servicesToggle = document.getElementById('services-toggle');
    const servicesMenu = document.getElementById('services-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    if (servicesToggle && servicesMenu) {
        servicesToggle.addEventListener('click', () => {
            servicesMenu.classList.toggle('hidden');
            const icon = servicesToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-chevron-down');
                icon.classList.toggle('fa-chevron-up');
            }
        });

        // Abre o submenu em telas móveis se a página atual estiver nele
        if (window.innerWidth < 768 && servicesToggle.classList.contains('text-lanadRed')) {
            servicesMenu.classList.remove('hidden');
            const icon = servicesToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        }
    }

    // Script do Botão "Voltar ao Topo"
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.remove('hidden');
            } else {
                backToTopButton.classList.add('hidden');
            }
        });
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Script para o Ano Atual no Rodapé
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Lógica de busca e filtro para a lista de exames (página exames.html)
    const searchInput = document.getElementById('exam-search-input');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const examItems = document.querySelectorAll('#exam-list .exam-item');
    const noResultsDiv = document.getElementById('no-results');

    function filterExams() {
        if (!searchInput) return; // Só executa se os elementos existirem
        const searchTerm = searchInput.value.toLowerCase().trim();
        const activeCategoryBtn = document.querySelector('.category-btn.bg-lanadRed');
        if (!activeCategoryBtn) return;
        
        const activeCategory = activeCategoryBtn.getAttribute('data-category');
        let hasVisibleItems = false;

        examItems.forEach(item => {
            const examName = item.querySelector('h3').textContent.toLowerCase();
            const itemCategory = item.getAttribute('data-category');
            const nameMatch = examName.includes(searchTerm);
            const categoryMatch = (activeCategory === 'todos' || itemCategory.includes(activeCategory));

            if (nameMatch && categoryMatch) {
                item.style.display = 'block';
                hasVisibleItems = true;
            } else {
                item.style.display = 'none';
            }
        });

        if (noResultsDiv) {
            noResultsDiv.style.display = hasVisibleItems ? 'none' : 'block';
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterExams);
    }

    if (categoryBtns.length > 0) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                categoryBtns.forEach(b => {
                    b.classList.remove('bg-lanadRed', 'text-white');
                    b.classList.add('bg-white', 'hover:bg-lanadRed', 'hover:text-white', 'border', 'border-gray-300');
                });
                btn.classList.add('bg-lanadRed', 'text-white');
                btn.classList.remove('bg-white', 'hover:bg-lanadRed', 'hover:text-white', 'border', 'border-gray-300');
                filterExams();
            });
        });
    }

    // Script do Acordeão do FAQ (página index.html)
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const wasActive = question.classList.contains('active');
                
                faqQuestions.forEach(q => {
                    if (q !== question) {
                        q.classList.remove('active');
                        q.nextElementSibling.style.maxHeight = null;
                    }
                });

                if (!wasActive) {
                    question.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + "px";
                } else {
                    question.classList.remove('active');
                    answer.style.maxHeight = null;
                }
            });
        });
    }

    // Script de Rolagem Suave para Âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.length > 1) {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                    }
                }
            }
        });
    });

    // Inicia a configuração do particles.js (página index.html)
    if (document.getElementById('particles-js')) {
        particlesJS("particles-js", {
            "particles": { "number": { "value": 80, "density": { "enable": true, "value_area": 800 }}, "color": { "value": "#ffffff" }, "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }, }, "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false }}, "size": { "value": 3, "random": true, "anim": { "enable": false, }}, "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.2, "width": 1}, "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false, }},
            "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": false }, "onclick": { "enable": false}, "resize": true }}, "retina_detect": true
        });
    }

    // INÍCIO - CÓDIGO DO CARROSSEL ATUALIZADO
    // Script para o Carrossel de Notícias (página index.html)
    if (document.querySelector('.news-carousel')) {
        const swiper = new Swiper('.news-carousel', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,

            // *** NOVA SEÇÃO DE AUTOPLAY ***
            autoplay: {
                delay: 4000, // 4 segundos
                disableOnInteraction: false, // Continua após interação do usuário
                pauseOnMouseEnter: true,     // Pausa quando o mouse está sobre o carrossel
            },
            // *******************************

            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            }
        });
    }
    // FIM - CÓDIGO DO CARROSSEL
});