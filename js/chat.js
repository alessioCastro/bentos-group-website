import { sendToNtfy, scrollToChatBottom } from './utils.js';

const chatFab = document.querySelector('.chat-fab');
const chatContainer = document.querySelector('.chat-container');
const closeChatBtn = document.querySelector('.close-chat-btn');
const chatForm = document.querySelector('.chat-input');
const messageList = document.querySelector('.chat-messages');
const messageInput = chatForm ? chatForm.querySelector('input') : null;
const sendButton = chatForm ? chatForm.querySelector('button') : null;

// Configurações da API
const API_KEY = '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';
const API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.3-70b-versatile';

// Prompt inicial (só entra no histórico uma vez)
const SYSTEM_PROMPT = {
  role: 'system',
  content:
    `Your name is Bella. You are a friendly and professional customer service representative for Bento's Group (formerly Chivv Flooring LLC), a licensed, bonded, and insured home remodeling company based in Alpharetta, Georgia.

    Your role:
    - Assist customers by answering questions about Bento's Group services (flooring, bathrooms, kitchens, HVAC, painting, drywall, carpet removal, outdoor living, remodeling, estimates, scheduling, etc.).
    - If a question is outside the company’s scope, politely respond that you can only assist with Bento's Group matters.
    - Always reply in the same language used by the customer.
    - Introduce yourself only once at the start of the conversation.
    - Remember the conversation with the customer.
    - If a user asks about prices or quotes, explain that you have average prices for some services, and that personalized quotes are free through a form. Only if the user explicitly requests to fill out the form, end the reply with "open-quote-window" to open it. Never add this unless the request is explicit. Do not assist the user in filling out the form in any way.
    
    Important Rules about Pricing:
    - You MUST use only the exact prices listed below.
    - Never invent, guess, or adjust prices — even for specific materials.
    - If a price is not listed, respond: "We would need to provide a custom quote."

    Company Information:
    - Name: Bento's Group / Chivv Flooring LLC
    - Founded: Operating since 2005
    - Owner & Project Manager: Charles Silva
    - Location: Alpharetta, Georgia (USA) — serving Alpharetta and nearby cities
    - Address: 7250 Jamestown Dr, Alpharetta, GA 30005
    - Phone: +1 (678) 571-7028
    - Email: charlesbgroup@gmail.com
    - Instagram: @chivvflooring
    - License No.: 19065945
    - Licensed in Plumbing and Electrical
    - Fully Licensed, Bonded, and Insured

    Services & Exact Pricing:

    Kitchen Remodeling
    - Full remodels: $25,000 – $27,000 (base), $52,000 (mid-range), $60,000 (customized), up to $80,000 (high-end)
    - Custom cabinets & refacing
    - Countertops: quartz, granite, custom stones
    - Backsplashes, custom hoods, and islands
    - Lighting & electrical upgrades: $2,500
    - Exhaust fan venting: $800 (labor + materials)

    Bathroom Remodeling
    - Full remodels: $24,000 – $27,000
    - Tub-to-shower conversion: $8,950
    - Curbless zero-entry showers, niches, benches, shampoo boxes
    - Custom shower doors: $1,500 – $2,000
    - Vanity installation: $400 (plumbing relocation $350 – $800)
    - Tub replacement with plumbing: $800 – $1,500
    - Painting: $1,200 – $1,800
    - Light fixtures: $80 – $150 each

    Flooring
    - Engineered hardwood glue-down: $2.60 / sq.ft.
    - Solid hardwood: $1.65 – $1.70 / sq.ft.
    - Floating (Laminate / LVP): $1.25 / sq.ft.
    - Carpet removal: $0.25 / sq.ft.
    - Tile installation: $15 / sq.ft. (floor), $38 / sq.ft. (walls)
    - Shoe/quarter round molding: $0.75 – $2.10 / linear ft.
    - Solid wood stair treads: $139 per step (labor + materials)
    - Subfloor/plywood repair: $400 – $1,000

    Outdoor Living & Exterior Projects
    - Travertine or brick pavers (labor + materials): $7,000 – $14,000+
    - Fireplaces, fireboxes, chimneys
    - Wood storage, mantels, gazebos, outdoor kitchens
    - Synthetic grass installations
    - Custom exterior remodeling

    HVAC, Plumbing & Electrical
    - HVAC installation, service, and replacements
    - Freeman HVAC systems, Goodman units, Bryant systems
    - Goodman: 3 Tons AC System, 14.3 SEER-2, 80% Gas Furnace setup → $8,200
    - Bryant: 3 Tons AC System, same setup → $10,200
    - Laundry room addition (plumbing + permits): $2,000 – $3,500

    Standards & Notes
    - Transparent estimates with clear exclusions and add-ons
    - Preferred waterproofing system: Hydro-Ban (over RedGard)
    - Subcontractor payouts are standardized and transparent
    - Professional project management from demolition to completion

    Branding & Values
    At Bento’s Group, we believe every home deserves exceptional care. We combine craftsmanship, reliability, and customer-first service to transform living spaces. From everyday flooring projects to high-end remodeling, our mission is to deliver results that stand out for their beauty, durability, and attention to detail.`
};

let conversationHistory = [];

// --- FUNÇÕES DE ESTADO (LocalStorage/Session) ---

function saveChatToSession() {
  // Filtramos o system prompt para não salvar duplicado
  const toSave = conversationHistory.filter(msg => msg.role !== 'system');
  sessionStorage.setItem('bella_chat_history', JSON.stringify(toSave));
}

function loadChatFromSession() {
  const saved = sessionStorage.getItem('bella_chat_history');
  if (saved) {
    conversationHistory = JSON.parse(saved);
    conversationHistory.forEach(msg => {
      const name = msg.role === 'user' ? 'You' : 'Bella';
      displayMessage(name, msg.role, msg.content, false, false);
    });
  } else {
    // Mensagem de boas-vindas inicial se não houver histórico
    const welcome = "Hello! Welcome to Bento's Group chat. How can I assist you with your home improvement needs today?";
    displayMessage('Bella', 'assistant', welcome);
    conversationHistory.push({ role: 'assistant', content: welcome });
    saveChatToSession();
  }
}

// --- FUNÇÕES DE UI ---

function displayMessage(sender, role, content, isLoading = false, shouldScroll = true) {
  const isBot = (sender.toLowerCase() === 'bella');
  const isYou = (role === 'user');

  const wrapper = document.createElement('div');
  wrapper.classList.add('message-wrapper', isYou ? 'user' : 'bot');

  const img = document.createElement('img');
  img.src = isBot ? './assets/images/bot-bella-profile.webp' : './assets/images/profile-user.webp';
  img.classList.add('avatar');

  const messageContent = document.createElement('div');
  messageContent.classList.add('message-content');

  const nameSpan = document.createElement('span');
  nameSpan.classList.add('user-name');
  nameSpan.textContent = sender;

  const textDiv = document.createElement('div');
  textDiv.classList.add('message-text');

  if (isLoading) {
    textDiv.innerHTML = '<span class="loading-dots">...</span>';
    wrapper.classList.add('loading-msg');
  } else {
    textDiv.textContent = content;
  }

  messageContent.append(nameSpan, textDiv);

  if (isYou) {
    wrapper.append(messageContent, img);
  } else {
    wrapper.append(img, messageContent);
  }

  messageList.appendChild(wrapper);

  if (shouldScroll) scrollToChatBottom();

  return textDiv;
}

// --- LÓGICA DE ENVIO ---

async function handleSendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;

  messageInput.value = '';
  displayMessage('You', 'user', text);
  conversationHistory.push({ role: 'user', content: text });
  saveChatToSession();

  sendToNtfy('User', text, 'default', 'speech_balloon');

  const responseDiv = displayMessage('Bella', 'assistant', '', true);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [SYSTEM_PROMPT, ...conversationHistory]
      })
    });

    const data = await response.json();
    const botText = data.choices[0].message.content;

    responseDiv.innerHTML = ''; // Limpa o spinner
    responseDiv.textContent = botText;

    conversationHistory.push({ role: 'assistant', content: botText });
    saveChatToSession();
    sendToNtfy('Assistant', botText, 'default', 'speech_balloon');

  } catch (error) {
    responseDiv.textContent = "Sorry, I'm having trouble connecting.";
  } finally {
    scrollToChatBottom();
  }
}

// --- INICIALIZAÇÃO ---

//document.addEventListener('DOMContentLoaded', () => {
loadChatFromSession();

chatFab.addEventListener('click', () => {
  chatContainer.hidden = false;
  //chatContainer.classList.add('active');
  chatFab.hidden = true;
  scrollToChatBottom(); // Garante que abre no final
});

closeChatBtn.addEventListener('click', () => {
  chatContainer.hidden = true;
  //chatContainer.classList.remove('active');
  chatFab.hidden = false;
});

sendButton.addEventListener('click', (e) => {
  e.preventDefault();
  handleSendMessage();
});

messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleSendMessage();
});
//});