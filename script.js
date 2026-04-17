// 1. GESTÃO DE DADOS (Simulação de uma API)
const pokemons = [
    { nome: "Pikachu", tipo: "Elétrico", desc: "O rato elétrico mais famoso." },
    { nome: "Charizard", tipo: "Fogo/Voador", desc: "Um dragão cuspido de fogo." },
    { nome: "Squirtle", tipo: "Água", desc: "Uma tartaruga que lança jatos de água." }
];

const regioes = ["Kanto", "Johto", "Hoenn", "Sinnoh"];

const faqs = [
    { q: "Como capturar um Pokémon?", a: "Use uma Pokébola em um Pokémon enfraquecido." },
    { q: "O que são Ginásios?", a: "Locais onde treinadores testam suas habilidades contra líderes." }
];

// 2. RENDERIZAÇÃO DINÂMICA
function init() {
    // Renderizar Cards
    const grid = document.getElementById('pokemon-grid');
    pokemons.forEach(p => {
        grid.innerHTML += `
            <article class="pokemon-card">
                <h3>${p.nome}</h3>
                <p><strong>Tipo:</strong> ${p.tipo}</p>
                <p>${p.desc}</p>
            </article>
        `;
    });

    // Renderizar Carrossel
    const carouselContent = document.getElementById('carousel-content');
    regioes.forEach(r => {
        carouselContent.innerHTML += `<div class="carousel-item"><h3>Região de ${r}</h3></div>`;
    });

    // Renderizar Acordeão
    const accContainer = document.getElementById('accordion-container');
    faqs.forEach((item, index) => {
        accContainer.innerHTML += `
            <div class="accordion-item">
                <button onclick="toggleAccordion(${index})" aria-expanded="false" id="btn-acc-${index}">
                    ${item.q}
                </button>
                <div class="panel" id="panel-${index}" style="display:none; padding:10px;">
                    <p>${item.a}</p>
                </div>
            </div>
        `;
    });
}

// 3. ACESSIBILIDADE: TAMANHO DA FONTE E CONTRASTE
let currentFontSize = 16;
function changeFontSize(action) {
    currentFontSize = action === 'increase' ? currentFontSize + 2 : currentFontSize - 2;
    document.documentElement.style.setProperty('--font-size-base', currentFontSize + 'px');
}

function toggleContrast() {
    document.body.classList.toggle('high-contrast');
}

// 4. LÓGICA DO CARROSSEL
let currentSlide = 0;
function moveCarousel(step) {
    const slides = document.querySelectorAll('.carousel-item');
    currentSlide = (currentSlide + step + slides.length) % slides.length;
    document.getElementById('carousel-content').style.transform = `translateX(-${currentSlide * 100}%)`;
}

// 5. ACORDEÃO (EXPANDABLES)
function toggleAccordion(index) {
    const panel = document.getElementById(`panel-${index}`);
    const btn = document.getElementById(`btn-acc-${index}`);
    const isVisible = panel.style.display === 'block';
    
    panel.style.display = isVisible ? 'none' : 'block';
    btn.setAttribute('aria-expanded', !isVisible);
}

// 6. SCROLL REVEAL (ANIMAÇÃO)
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        if (revealTop < windowHeight - 100) el.classList.add("active");
    });
}

window.addEventListener("scroll", reveal);
window.onload = () => { init(); reveal(); };
