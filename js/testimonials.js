/**
 * testimonials.js
 * * Adaptado para estrutura semântica: testimonial-card > figure > blockquote
 */

document.addEventListener('DOMContentLoaded', async () => {
    const cardsContainer = document.querySelector('#testimonials-cards-box');
    const REVIEWS_URL = './json/reviews.json';

    if (!cardsContainer) {
        console.warn("Contentor de testemunhos (#testimonials-cards-box) não encontrado.");
        return;
    }

    /**
     * Gera um único elemento que exibe as estrelas via CSS.
    */
    function createStarElements(rating) {
        const starContainer = document.createElement('span');
        starContainer.className = 'review-stars-visual';

        // Define a largura baseada na nota (ex: 5 estrelas = 100px se cada uma tiver 14px)
        // Isso evita o loop de criação de elementos <img>
        const starWidth = 14; // ajuste conforme o tamanho do seu ícone
        starContainer.style.width = `${rating * starWidth}px`;

        return starContainer;
    }

    /**
     * Cria o card completo conforme a nova estrutura, com verificação de texto.
    */
    function createTestimonialCard(review) {
        const { author_name, rating, review_text } = review;

        // Container Principal
        const card = document.createElement('div');
        card.className = 'testimonial-card carousel-item';

        // SVG de Aspas (Sempre visível como ícone decorativo do card)
        const quoteIcon = document.createElement('img');
        quoteIcon.src = './assets/svgs/format_quote.svg';
        quoteIcon.alt = '';
        quoteIcon.loading = 'lazy';
        quoteIcon.width = 36;
        quoteIcon.height = 36;

        // Figure (Wrapper do conteúdo)
        const figure = document.createElement('figure');
        figure.className = 'review-content';

        // 1. Condicional: Só cria o blockquote se houver texto
        if (review_text && review_text.trim() !== "") {
            const blockquote = document.createElement('blockquote');
            const p = document.createElement('p');
            p.className = 'card-text';
            p.textContent = review_text;
            blockquote.appendChild(p);
            figure.appendChild(blockquote); // Adiciona ao figure
        }

        // 2. Estrelas (Sempre aparecem)
        const starWidth = 14;
        const reviewStarsSpan = document.createElement('span');
        reviewStarsSpan.className = 'review-stars';
        reviewStarsSpan.style.width = `${rating * starWidth}px`;
        reviewStarsSpan.setAttribute('aria-label', `Rating: ${rating} of 5 stars`);
        //reviewStarsSpan.appendChild(createStarElements(rating));
        figure.appendChild(reviewStarsSpan);

        // 3. Figcaption / Autor (Sempre aparece)
        const figcaption = document.createElement('figcaption');
        const cite = document.createElement('cite');
        cite.className = 'author-name';
        cite.textContent = author_name;
        figcaption.appendChild(cite);
        figure.appendChild(figcaption);

        // Montagem final do card
        card.append(quoteIcon, figure);

        return card;
    }

    async function loadTestimonials() {
        try {
            const response = await fetch(REVIEWS_URL);
            if (!response.ok) throw new Error("Erro ao carregar JSON");

            const reviews = await response.json();
            const fragment = document.createDocumentFragment();

            reviews.forEach(review => {
                fragment.appendChild(createTestimonialCard(review));
            });

            cardsContainer.innerHTML = '';
            cardsContainer.appendChild(fragment);

        } catch (error) {
            console.error("Erro:", error);
            cardsContainer.innerHTML = '<p class="error-message">Não foi possível carregar os depoimentos.</p>';
        }
    }

    class SmartCarousel {
        constructor(container) {
            this.container = container;
            this.scroller = container.querySelector('.carousel-scroller');
            this.items = Array.from(this.scroller.querySelectorAll('.carousel-item'));
            this.isVertical = this.scroller.classList.contains('is-vertical');

            this.animType = container.dataset.animation || 'none'; // 'slide', 'continuous', 'none'
            this.autoplayTime = parseInt(container.dataset.autoplay) || 0;
            this.speed = parseFloat(container.dataset.speed) || 1;
            this.hasNav = container.dataset.nav === "true";
            this.hasDots = container.dataset.dots === "true";

            this.currentIndex = 0;
            this.isPaused = false;
            this.rafId = null;

            this.init();
        }

        init() {
            if (this.hasNav) this.createNav();
            if (this.hasDots) this.createDots();

            // Interações de Pausa
            this.container.onmouseenter = () => this.isPaused = true;
            this.container.onmouseleave = () => this.isPaused = false;
            this.container.ontouchstart = () => this.isPaused = true;
            this.container.ontouchend = () => setTimeout(() => this.isPaused = false, 1000);

            if (this.animType === 'continuous') {
                this.startContinuous();
            } else if (this.animType === 'slide' && this.autoplayTime > 0) {
                this.startSlideAutoplay();
            }

            this.scroller.addEventListener('scroll', () => this.syncIndex());
        }

        createNav() {
            const p = document.createElement('button');
            p.className = 'nav-btn btn-prev'; p.innerHTML = '❮';
            p.onclick = () => this.move(-1);

            const n = document.createElement('button');
            n.className = 'nav-btn btn-next'; n.innerHTML = '❯';
            n.onclick = () => this.move(1);

            this.container.appendChild(p);
            this.container.appendChild(n);
        }

        createDots() {
            const dContainer = document.createElement('div');
            dContainer.className = 'dots';
            this.items.forEach((_, i) => {
                const dot = document.createElement('div');
                dot.className = `dot ${i === 0 ? 'active' : ''}`;

                dot.onclick = () => this.scrollToIndex(i);

                dContainer.appendChild(dot);
            });
            this.container.appendChild(dContainer);
            this.dotsElements = dContainer.querySelectorAll('.dot');
        }

        // Animação por "Pulos" (Slide)
        move(dir) {
            this.currentIndex += dir;
            if (this.currentIndex >= this.items.length) this.currentIndex = 0;
            if (this.currentIndex < 0) this.currentIndex = this.items.length - 1;
            this.scrollToIndex(this.currentIndex);
        }

        scrollToIndex(index) {
            this.currentIndex = index; // Sincroniza o índice atual
            const gap = 20;
            const item = this.items[0];

            if (this.isVertical) {
                this.scroller.scrollTo({
                    top: index * (item.offsetHeight + gap),
                    behavior: 'smooth'
                });
            } else {
                this.scroller.scrollTo({
                    left: index * (item.offsetWidth + gap),
                    behavior: 'smooth'
                });
            }
        }

        // Animação Fluida (Contínua)
        startContinuous() {
            const animate = () => {
                if (!this.isPaused) {
                    const maxScroll = this.isVertical ?
                        this.scroller.scrollHeight - this.scroller.clientHeight :
                        this.scroller.scrollWidth - this.scroller.clientWidth;

                    if (this.isVertical) {
                        this.scroller.scrollTop += this.speed;
                        if (this.scroller.scrollTop >= maxScroll - 1) this.scroller.scrollTop = 0;
                    } else {
                        this.scroller.scrollLeft += this.speed;
                        if (this.scroller.scrollLeft >= maxScroll - 1) this.scroller.scrollLeft = 0;
                    }
                }
                this.rafId = requestAnimationFrame(animate);
            };
            animate();
        }

        startSlideAutoplay() {
            setInterval(() => {
                if (!this.isPaused) this.move(1);
            }, this.autoplayTime);
        }

        syncIndex() {
            const gap = 20;
            const item = this.items[0];
            const pos = this.isVertical ? this.scroller.scrollTop : this.scroller.scrollLeft;
            const size = this.isVertical ? item.offsetHeight + gap : item.offsetWidth + gap;
            const newIdx = Math.round(pos / size);

            if (newIdx !== this.currentIndex && newIdx < this.items.length) {
                this.currentIndex = newIdx;
                if (this.dotsElements) {
                    this.dotsElements.forEach((d, i) => d.classList.toggle('active', i === this.currentIndex));
                }
            }
        }
    }

    await loadTestimonials();

    // Inicialização
    document.querySelectorAll('.carousel-container').forEach(el => new SmartCarousel(el));
});