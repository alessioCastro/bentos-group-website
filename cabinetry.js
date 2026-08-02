/**
 * Cabinet Calculator & Lead Capture Logic
 * Vanilla JavaScript ES6+ implementation focused on performance.
 */

// 1. DATA STRUCTURE
const cabinetModels = [
    {
        id: 'sw',
        name: 'Shaker White',
        series: 'Shaker Series',
        pricePerFoot: 180,
        image: 'https://d11847v46nrhkc.cloudfront.net/media/wysiwyg/Shaker-White-SW_1.png'
    },
    {
        id: 'sow',
        name: 'Shaker Origami White',
        series: 'Shaker Series',
        pricePerFoot: 180,
        image: 'https://d11847v46nrhkc.cloudfront.net/media/wysiwyg/Shaker-Origami-White_1.png'
    },
    {
        id: 'sg',
        name: 'Shaker Gray',
        series: 'Shaker Series',
        pricePerFoot: 180,
        image: 'https://d11847v46nrhkc.cloudfront.net/media/wysiwyg/Shaker-Gray-SG_1.png'
    },
    {
        id: 'spg',
        name: 'Shaker Pebble Gray',
        series: 'Shaker Series',
        pricePerFoot: 195,
        image: 'https://d11847v46nrhkc.cloudfront.net/media/wysiwyg/Shaker-Pebble-Gray-PB_1.png'
    },
    {
        id: 'snw',
        name: 'Shaker Natural Wood',
        series: 'Shaker Series',
        pricePerFoot: 210,
        image: 'https://d11847v46nrhkc.cloudfront.net/media/wysiwyg/Shaker-Natural-Wood-SNW_1.png'
    },
    {
        id: 'scb',
        name: 'Shaker Charcoal Black',
        series: 'Shaker Series',
        pricePerFoot: 225,
        image: 'https://d11847v46nrhkc.cloudfront.net/media/wysiwyg/Shaker-Charcoal-Black-CB_1.png'
    },
    {
        id: 'sjg',
        name: 'Shaker Jade Green',
        series: 'Shaker Series',
        pricePerFoot: 225,
        image: 'https://d11847v46nrhkc.cloudfront.net/media/wysiwyg/SJG-224x396.jpg'
    },
    {
        id: 'sco',
        name: 'Shaker Cotton Oak',
        series: 'Shaker Series',
        pricePerFoot: 225,
        image: 'https://d11847v46nrhkc.cloudfront.net/media/wysiwyg/SCO-door-image.png'
    },
    {
        id: 'iow',
        name: 'Inset Origami White',
        series: 'Inset Series',
        pricePerFoot: 225,
        image: 'https://d11847v46nrhkc.cloudfront.net/media/wysiwyg/inset-origami-white.jpg'
    },
    {
        id: 'iho',
        name: 'Inset Hazelnut Oak',
        series: 'Inset Series',
        pricePerFoot: 225,
        image: 'https://d11847v46nrhkc.cloudfront.net/media/wysiwyg/IHO---.jpg'
    },
    {
        id: 'itb',
        name: 'Inset Truffle Brown',
        series: 'Inset Series',
        pricePerFoot: 225,
        image: 'https://d11847v46nrhkc.cloudfront.net/media/wysiwyg/inset-truffle-brown.jpg'
    },
    {
        id: 'ew',
        name: 'Escada White',
        series: 'Escada Series',
        pricePerFoot: 225,
        image: 'https://d11847v46nrhkc.cloudfront.net/media/wysiwyg/Escada-White-EW_1.png'
    },
    {
        id: 'ed',
        name: 'Escada Dove',
        series: 'Escada Series',
        pricePerFoot: 225,
        image: 'https://d11847v46nrhkc.cloudfront.net/media/wysiwyg/Escada-Dove-ED_1.png'
    },
    {
        id: 'evw',
        name: 'Escada Vintage Wood',
        series: 'Escada Series',
        pricePerFoot: 225,
        image: 'https://d11847v46nrhkc.cloudfront.net/media/wysiwyg/Escada-Vintage-Wood-EVW_1.png'
    },
    {
        id: 'emb',
        name: 'Escada Midnight Blue',
        series: 'Escada Series',
        pricePerFoot: 225,
        image: 'https://d11847v46nrhkc.cloudfront.net/media/wysiwyg/Escada-Midnight-Blue-EMB_1.png'
    },
    {
        id: 'ehm',
        name: 'Escada Honey Mapple',
        series: 'Escada Series',
        pricePerFoot: 225,
        image: 'https://roccabinetry.com/media/catalog/category/EHM-Door_1_.png'
    },
    {
        id: 'now',
        name: 'Newtown Origami White',
        series: 'Newtown Series',
        pricePerFoot: 225,
        image: 'https://d11847v46nrhkc.cloudfront.net/media/wysiwyg/newtown-origami_1.png'
    },
    {
        id: 'nso',
        name: 'Newtown Smoked Oak',
        series: 'Newtown Series',
        pricePerFoot: 225,
        image: 'https://d11847v46nrhkc.cloudfront.net/media/wysiwyg/Newtown-Smoked-Oak-new-offline_1.png'
    },
    {
        id: 'njg',
        name: 'Newtown Jade Green',
        series: 'Newtown Series',
        pricePerFoot: 225,
        image: 'https://d11847v46nrhkc.cloudfront.net/media/wysiwyg/newtown-jade-green_1.png'
    },
    {
        id: 'ncb',
        name: 'Newtown Charcoal Black',
        series: 'Newtown Series',
        pricePerFoot: 225,
        image: 'https://d11847v46nrhkc.cloudfront.net/media/wysiwyg/newtown-charcoal-black_1.png'
    },
    {
        id: 'nsg',
        name: 'Newtown Sage Gray',
        series: 'Newtown Series',
        pricePerFoot: 225,
        image: 'https://d11847v46nrhkc.cloudfront.net/media/wysiwyg/nsg-available.png'
    },
    {
        id: 'nlb',
        name: 'Newtown Lakeside Blue',
        series: 'Newtown Series',
        pricePerFoot: 225,
        image: 'https://d11847v46nrhkc.cloudfront.net/media/wysiwyg/NLB_1__1_1.png'
    },
    {
        id: 'nco',
        name: 'Newtown Cotton Oak',
        series: 'Newtown Series',
        pricePerFoot: 225,
        image: 'https://d11847v46nrhkc.cloudfront.net/media/wysiwyg/nco-coming-soon-new.png'
    },
    {
        id: 'bw',
        name: 'Belmont White',
        series: 'Belmont Series',
        pricePerFoot: 225,
        image: 'https://d11847v46nrhkc.cloudfront.net/media/wysiwyg/belmont-white-feature.png'
    },
    {
        id: 'bg',
        name: 'Belmont Gray',
        series: 'Belmont Series',
        pricePerFoot: 225,
        image: 'https://d11847v46nrhkc.cloudfront.net/media/wysiwyg/belmont-gray-features_1.png'
    },
    {
        id: 'cw',
        name: 'Classic White',
        series: 'Classic Series',
        pricePerFoot: 225,
        image: 'https://d11847v46nrhkc.cloudfront.net/media/wysiwyg/classic-white-cw-206x366_1.jpg'
    },
    {
        id: 'cc',
        name: 'Classic Chocolate',
        series: 'Classic Series',
        pricePerFoot: 225,
        image: 'https://d11847v46nrhkc.cloudfront.net/media/wysiwyg/classic-chocolate-cc-206x366_1.jpg'
    },
    {
        id: 'gw',
        name: 'Glossy White',
        series: 'European Series',
        pricePerFoot: 225,
        image: 'https://d11847v46nrhkc.cloudfront.net/media/wysiwyg/gw-label-new.png'
    },
    {
        id: 'emw',
        name: 'Matte White',
        series: 'European Series',
        pricePerFoot: 225,
        image: 'https://d11847v46nrhkc.cloudfront.net/media/wysiwyg/matt-white-label-new.png'
    },
    {
        id: 'emb',
        name: 'Matte Blue',
        series: 'European Series',
        pricePerFoot: 225,
        image: 'https://d11847v46nrhkc.cloudfront.net/media/wysiwyg/matt-blue-label-new.png'
    },
    {
        id: 'emg',
        name: 'Matte Gray',
        series: 'European Series',
        pricePerFoot: 225,
        image: 'https://d11847v46nrhkc.cloudfront.net/media/wysiwyg/matt-gray-label-new.png'
    },
    {
        id: 'ew',
        name: 'Walnut',
        series: 'European Series',
        pricePerFoot: 225,
        image: 'https://d11847v46nrhkc.cloudfront.net/media/wysiwyg/brown-walnut-label-new.png'
    },
    {
        id: 'emcb',
        name: 'Matte Charcoal Black',
        series: 'European Series',
        pricePerFoot: 225,
        image: 'https://d11847v46nrhkc.cloudfront.net/media/wysiwyg/Matte-Charcoal-Black_1.png'
    },
    {
        id: 'csw',
        name: 'Soft White',
        series: 'Closet Series',
        pricePerFoot: 225,
        image: 'https://d11847v46nrhkc.cloudfront.net/media/wysiwyg/closet-series-white_1.png'
    },
    {
        id: 'cao',
        name: 'Ashton Oak',
        series: 'Closet Series',
        pricePerFoot: 225,
        image: 'https://d11847v46nrhkc.cloudfront.net/media/wysiwyg/closet-series-wood_1.png'
    },
    {
        id: 'clo',
        name: 'Slate Oak',
        series: 'Closet Series',
        pricePerFoot: 225,
        image: 'https://d11847v46nrhkc.cloudfront.net/media/wysiwyg/closet-series-grey_1.png'
    }
];

// 2. STATE MANAGEMENT
const state = {
    selectedCabinetId: null,
    linearFeet: 0,
    activeFilter: 'all' // Novo: Controla qual série está ativa
};

// 3. DOM ELEMENTS
const DOM = {};

// 4. INITIALIZATION
function init() {
    DOM.grid = document.getElementById('cabinet-grid');
    DOM.filtersContainer = document.getElementById('series-filters'); // Novo
    DOM.form = document.getElementById('lead-form');
    DOM.linearFeetInput = document.getElementById('linearFeet');
    DOM.phoneInput = document.getElementById('phone');
    DOM.errorMsg = document.getElementById('form-error');
    DOM.appView = document.getElementById('calculator-app');
    DOM.successView = document.getElementById('success-screen');
    DOM.estimateResult = document.getElementById('estimate-result');
    DOM.resetBtn = document.getElementById('reset-btn');

    renderFilterButtons(); // Novo: Cria os botões de filtro
    renderCabinetGrid();
    setupEventListeners();
}

// 5. RENDER FUNCTIONS
function renderFilterButtons() {
    // Extrai as séries únicas do array de dados de forma dinâmica
    const uniqueSeries = ['all', ...new Set(cabinetModels.map(m => m.series))];
    DOM.filtersContainer.innerHTML = '';

    uniqueSeries.forEach(seriesName => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `filter-btn ${state.activeFilter === seriesName ? 'active' : ''}`;
        button.dataset.series = seriesName;
        button.textContent = seriesName === 'all' ? 'All' : seriesName;
        DOM.filtersContainer.appendChild(button);
    });
}

function renderCabinetGrid() {
    DOM.grid.innerHTML = '';
    const fragment = document.createDocumentFragment();

    // Filtra os modelos com base no filtro ativo do estado
    const filteredModels = state.activeFilter === 'all'
        ? cabinetModels
        : cabinetModels.filter(m => m.series === state.activeFilter);

    filteredModels.forEach(model => {
        const card = document.createElement('div');
        card.className = 'cabinet-card';
        card.setAttribute('role', 'radio');

        // Mantém o card visualmente selecionado se o ID dele for o selecionado no estado
        const isSelected = state.selectedCabinetId === model.id;
        card.setAttribute('aria-checked', isSelected ? 'true' : 'false');
        card.setAttribute('tabindex', '0');
        card.dataset.id = model.id;

        card.innerHTML = `
            <img src="${model.image}" alt="${model.name} Cabinet Finish" class="cabinet-img" width="400" height="300" loading="lazy">
            <span class="cabinet-series">${model.series}</span>
            <h3 class="cabinet-name">${model.name}</h3>
        `;

        fragment.appendChild(card);
    });

    DOM.grid.appendChild(fragment);
}

// 6. EVENT LISTENERS
function setupEventListeners() {
    // Clique nos botões de filtro
    DOM.filtersContainer.addEventListener('click', handleFilterSelection);

    // Seleção de armários
    DOM.grid.addEventListener('click', handleCabinetSelection);

    // Acessibilidade do teclado para a grade
    DOM.grid.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCabinetSelection(e);
        }
    });

    DOM.phoneInput.addEventListener('input', handlePhoneMask);
    DOM.form.addEventListener('submit', handleFormSubmit);
    DOM.resetBtn.addEventListener('click', resetApp);
}

// 7. EVENT HANDLERS
function handleFilterSelection(e) {
    const button = e.target.closest('.filter-btn');
    if (!button) return;

    state.activeFilter = button.dataset.series;

    // Atualiza a classe ativa nos botões
    DOM.filtersContainer.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn === button);
    });

    // Renderiza novamente apenas os itens filtrados
    renderCabinetGrid();
}

function handleCabinetSelection(e) {
    const card = e.target.closest('.cabinet-card');
    if (!card) return;

    state.selectedCabinetId = card.dataset.id;

    // Atualiza o estado visual de seleção de todos os cards atualmente visíveis
    const allCards = DOM.grid.querySelectorAll('.cabinet-card');
    allCards.forEach(c => {
        c.setAttribute('aria-checked', c === card ? 'true' : 'false');
    });

    if (DOM.errorMsg.textContent.includes('cabinet')) {
        DOM.errorMsg.textContent = '';
    }
}

function handlePhoneMask(e) {
    let input = e.target.value.replace(/\D/g, '');
    input = input.substring(0, 10);

    if (input.length === 0) {
        e.target.value = '';
    } else if (input.length <= 3) {
        e.target.value = `(${input}`;
    } else if (input.length <= 6) {
        e.target.value = `(${input.substring(0, 3)}) ${input.substring(3)}`;
    } else {
        e.target.value = `(${input.substring(0, 3)}) ${input.substring(3, 6)}-${input.substring(6)}`;
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    DOM.errorMsg.textContent = '';

    if (!state.selectedCabinetId) {
        DOM.errorMsg.textContent = 'Please select a cabinet style first.';
        return;
    }

    if (!DOM.form.checkValidity()) {
        DOM.errorMsg.textContent = 'Please fill out all required fields correctly.';
        const inputs = DOM.form.querySelectorAll('input:invalid');
        inputs.forEach(input => input.classList.add('invalid'));

        DOM.form.addEventListener('input', function removeInvalid(ev) {
            if (ev.target.validity.valid) {
                ev.target.classList.remove('invalid');
            }
        });
        return;
    }

    const formData = new FormData(DOM.form);
    const linearFeet = parseFloat(formData.get('linearFeet'));

    if (isNaN(linearFeet) || linearFeet <= 0) {
        DOM.errorMsg.textContent = 'Please enter a valid number for linear feet.';
        return;
    }

    calculateAndShowEstimate(linearFeet);
}

// 8. LOGIC & CALCULATION
function calculateAndShowEstimate(linearFeet) {
    const selectedModel = cabinetModels.find(m => m.id === state.selectedCabinetId);
    if (!selectedModel) return;

    const baseEstimate = linearFeet * selectedModel.pricePerFoot;
    const lowerBound = Math.floor(baseEstimate * 0.9);
    const upperBound = Math.ceil(baseEstimate * 1.15);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    });

    DOM.estimateResult.innerHTML = `Your estimated project layout is between <strong>${formatter.format(lowerBound)}</strong> and <strong>${formatter.format(upperBound)}</strong> including installation.`;

    DOM.appView.classList.add('hidden');
    DOM.appView.style.display = 'none';
    DOM.successView.classList.remove('hidden');
}

function resetApp() {
    state.selectedCabinetId = null;
    state.linearFeet = 0;
    state.activeFilter = 'all'; // Reseta o filtro para todos

    DOM.form.reset();
    renderFilterButtons();
    renderCabinetGrid();

    DOM.errorMsg.textContent = '';
    DOM.form.querySelectorAll('input').forEach(input => input.classList.remove('invalid'));

    DOM.successView.classList.add('hidden');
    DOM.appView.style.display = 'block';
    DOM.appView.classList.remove('hidden');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Bootstrap app
document.addEventListener('DOMContentLoaded', init);