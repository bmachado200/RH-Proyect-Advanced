// Language configuration
const translations = {
    english: {
        title: "💬 HR Assistant",
        sidebarTitle: "Welcome!",
        mobileMenuTitle: "Menu",
        welcomeMessage: "Oficial AI HR Chatbot",
        placeholder: "Type your question here...",
        send: "Send",
        greeting: "Hello! I'm your HR Assistant. How can I help you today? 🤖",
        noQuestion: "Please enter a question",
        error: "❌ Error processing your question, please enter your API Key. If you don't have it, go to https://auth.openai.com/log-in",
        languageButton: "Language", // For tooltip on main language button
        currentLanguageText: "English", // For display on the main language button
        loading: "Loading your HR assistant...",
        welcome: "Welcome to HR Assistant",
        typing: "Generating response...",
        clear: "Clear Conversation",
        helpTitle: "About HR Assistant",
        helpText: "This AI assistant specializes in HR policies and procedures at HISENSE ELECTRÓNICA MÉXICO. It can provide information from the Collective Work Agreement and Internal Work Regulations.",
        helpCapabilities: "Capabilities:",
        helpItem1: "Answer questions about employee rights",
        helpItem2: "Explain HR policies and procedures",
        helpItem3: "Provide information about benefits",
        helpItem4: "Clarify work regulations",
        helpLanguage: "The assistant supports English, Spanish, Simplified Chinese, and Traditional Chinese.", // Updated
        suggestedTitle: "Try asking:",
        helpButtonText: "Help",
        settingsButtonText: "Settings",
        translating: "Translating...",
        settingsTitle: "Settings",
        apiKeyLabel: "OpenAI API Key",
        apiKeyPlaceholder: "Enter your OpenAI API key",
        saveSettings: "Save",
        settingsSaved: "Settings saved successfully",
        invalidKey: "Invalid API key",
        settingsText: "Enter your OpenAI API key to use this service. Your key will be stored securely in your session.",
        clearKey: "Clear Key",
        translateToLabel: "Translate to:",
        translationToggleTitle: "Translate message"
    },
    spanish: {
        title: "💬 Asistente de RH",
        sidebarTitle: "¡Bienvenido!",
        mobileMenuTitle: "Menú",
        welcomeMessage: "AI Chat Oficial de RH",
        placeholder: "Escribe tu pregunta aquí...",
        send: "Enviar",
        greeting: "¡Hola! Soy tu asistente de Recursos Humanos. ¿En qué puedo ayudarte hoy? 🤖",
        noQuestion: "Por favor ingresa una pregunta",
        error: "❌ Error al procesar tu pregunta, por favor ingresa tu API Key. Si no lo tienes, ingresa a https://auth.openai.com/log-in",
        languageButton: "Idioma",
        currentLanguageText: "Español",
        loading: "Cargando tu asistente de RH...",
        welcome: "Bienvenido al Asistente de RH",
        typing: "Generando respuesta...",
        clear: "Limpiar Conversación",
        helpTitle: "Acerca del Asistente de RH",
        helpText: "Este asistente de IA está especializado en políticas y procedimientos de RH en HISENSE ELECTRÓNICA MÉXICO. Puede proporcionar información del Contrato Colectivo de Trabajo y el Reglamento Interno de Trabajo.",
        helpCapabilities: "Capacidades:",
        helpItem1: "Responder preguntas sobre derechos laborales",
        helpItem2: "Explicar políticas y procedimientos de RH",
        helpItem3: "Proveer información sobre beneficios",
        helpItem4: "Aclarar regulaciones laborales",
        helpLanguage: "El asistente soporta inglés, español, chino simplificado y chino tradicional.", // Updated
        suggestedTitle: "Prueba preguntando:",
        helpButtonText: "Ayuda",
        settingsButtonText: "Configuración",
        translating: "Traduciendo...",
        settingsTitle: "Configuración",
        apiKeyLabel: "Clave API de OpenAI",
        apiKeyPlaceholder: "Ingresa tu clave API de OpenAI",
        saveSettings: "Guardar",
        settingsSaved: "Configuración guardada exitosamente",
        invalidKey: "Clave API inválida",
        settingsText: "Ingresa tu clave API de OpenAI para usar este servicio. Tu clave se almacenará de forma segura en tu sesión.",
        clearKey: "Borrar Clave",
        translateToLabel: "Traducir a:",
        translationToggleTitle: "Traducir mensaje"
    },
    chinese_simplified: {
        title: "💬 人力资源助理",
        sidebarTitle: "欢迎!",
        mobileMenuTitle: "菜单",
        welcomeMessage: "官方AI人力资源聊天机器人",
        placeholder: "在此输入您的问题...",
        send: "发送",
        greeting: "你好！我是你的人力资源助理。今天我能帮你做些什么？🤖 (简体)",
        noQuestion: "请输入一个问题 (简体)",
        error: "❌ 处理您的问题时出错，请输入您的API密钥。如果您没有，请访问 https://auth.openai.com/log-in (简体)",
        languageButton: "语言 (简体)",
        currentLanguageText: "简体中文",
        loading: "正在加载您的人力资源助理... (简体)",
        welcome: "欢迎来到人力资源助理 (简体)",
        typing: "正在生成回复... (简体)",
        clear: "清除对话 (简体)",
        helpTitle: "关于人力资源助理 (简体)",
        helpText: "此AI助理专注于海信电子墨西哥公司的人力资源政策和程序。它可以提供来自集体工作协议和内部工作条例的信息。(简体)",
        helpCapabilities: "功能: (简体)",
        helpItem1: "回答有关员工权利的问题 (简体)",
        helpItem2: "解释人力资源政策和程序 (简体)",
        helpItem3: "提供有关福利的信息 (简体)",
        helpItem4: "阐明工作规定 (简体)",
        helpLanguage: "该助理支持英语、西班牙语、简体中文和繁体中文。(简体)",
        suggestedTitle: "尝试提问: (简体)",
        helpButtonText: "帮助 (简体)",
        settingsButtonText: "设置 (简体)",
        translating: "翻译中... (简体)",
        settingsTitle: "设置 (简体)",
        apiKeyLabel: "OpenAI API 密钥 (简体)",
        apiKeyPlaceholder: "输入您的 OpenAI API 密钥 (简体)",
        saveSettings: "保存 (简体)",
        settingsSaved: "设置已成功保存 (简体)",
        invalidKey: "无效的 API 密钥 (简体)",
        settingsText: "输入您的 OpenAI API 密钥以使用此服务。您的密钥将安全地存储在您的会话中。(简体)",
        clearKey: "清除密钥 (简体)",
        translateToLabel: "翻译成: (简体)",
        translationToggleTitle: "翻译消息 (简体)"
    },
    chinese_traditional: {
        title: "💬 人力資源助理",
        sidebarTitle: "歡迎!",
        mobileMenuTitle: "選單",
        welcomeMessage: "官方AI人力資源聊天機器人",
        placeholder: "在此輸入您的問題...",
        send: "傳送",
        greeting: "你好！我是您的人力資源助理。今天我能幫您做些什麼？🤖 (繁體)",
        noQuestion: "請輸入一個問題 (繁體)",
        error: "❌ 處理您的問題時出錯，請輸入您的API金鑰。如果您沒有，請造訪 https://auth.openai.com/log-in (繁體)",
        languageButton: "語言 (繁體)",
        currentLanguageText: "繁體中文",
        loading: "正在載入您的人力資源助理... (繁體)",
        welcome: "歡迎來到人力資源助理 (繁體)",
        typing: "正在產生回覆... (繁體)",
        clear: "清除對話 (繁體)",
        helpTitle: "關於人力資源助理 (繁體)",
        helpText: "此AI助理專注於海信電子墨西哥公司的人力資源政策和程序。它可以提供來自集體工作協議和內部工作條例的資訊。(繁體)",
        helpCapabilities: "功能: (繁體)",
        helpItem1: "回答有關員工權利的問題 (繁體)",
        helpItem2: "解釋人力資源政策和程序 (繁體)",
        helpItem3: "提供有關福利的資訊 (繁體)",
        helpItem4: "闡明工作規定 (繁體)",
        helpLanguage: "該助理支援英語、西班牙語、簡體中文和繁體中文。(繁體)",
        suggestedTitle: "嘗試提問: (繁體)",
        helpButtonText: "協助 (繁體)",
        settingsButtonText: "設定 (繁體)",
        translating: "翻譯中... (繁體)",
        settingsTitle: "設定 (繁體)",
        apiKeyLabel: "OpenAI API 金鑰 (繁體)",
        apiKeyPlaceholder: "輸入您的 OpenAI API 金鑰 (繁體)",
        saveSettings: "儲存 (繁體)",
        settingsSaved: "設定已成功儲存 (繁體)",
        invalidKey: "無效的 API 金鑰 (繁體)",
        settingsText: "輸入您的 OpenAI API 金鑰以使用此服務。您的金鑰將安全地儲存在您的會話中。(繁體)",
        clearKey: "清除金鑰 (繁體)",
        translateToLabel: "翻譯成: (繁體)",
        translationToggleTitle: "翻譯訊息 (繁體)"
    }
};

const suggestedQuestions = {
    english: [
        "What benefits do I have as an employee under the collective agreement?",
        "What should I do if I think my boss is violating the collective agreement?",
        "What behaviors are prohibited according to the internal regulations?",
        "What are the penalties for being late, absent, or failing to fulfill my duties?"
    ],
    spanish: [
        "¿Qué beneficios tengo como trabajador bajo el contrato colectivo?",
        "¿Qué hago si creo que mi jefe está incumpliendo el contrato colectivo?",
        "¿Qué conductas están prohibidas según el reglamento interno?",
        "¿Cuáles son las sanciones por llegar tarde, ausentarse o incumplir con mis deberes?"
    ],
    chinese_simplified: [
        "根据集体协议，我作为员工有哪些福利？ (简)",
        "如果我认为我的老板违反了集体协议，我该怎么办？ (简)",
        "根据内部规定，哪些行为是被禁止的？ (简)",
        "迟到、缺勤或未能履行职责的处罚是什么？ (简)"
    ],
    chinese_traditional: [
        "根據集體協議，我作為員工有哪些福利？ (繁)",
        "如果我認為我的老闆違反了集體協議，我該怎麼辦？ (繁)",
        "根據內部規定，哪些行為是被禁止的？ (繁)",
        "遲到、缺勤或未能履行職責的處罰是什麼？ (繁)"
    ]
};

let appLanguage = 'english';
const availableLanguages = {
    english: "English",
    spanish: "Español",
    chinese_simplified: "简体中文",
    chinese_traditional: "繁體中文"
};
// DOM Elements
const chatTitle = document.getElementById('chatTitle');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const chatBox = document.getElementById('chatBox');
const loadingScreen = document.getElementById('loadingScreen');
const appContainer = document.getElementById('appContainer');
const welcomeTitle = document.getElementById('welcomeTitle');
const helpButton = document.getElementById('helpButton');
const helpModal = document.getElementById('helpModal');
const sidebarTitle = document.getElementById('sidebarTitle');
const welcomeMessage = document.getElementById('welcomeMessage');
const helpButtonText = document.getElementById('helpButtonText');
const settingsButtonText = document.getElementById('settingsButtonText');
const settingsButton = document.getElementById('settingsButton');
const settingsModal = document.getElementById('settingsModal');
const apiKeyInput = document.getElementById('apiKeyInput');
const saveSettingsButton = document.getElementById('saveSettingsButton');
const clearKeyButton = document.getElementById('clearKeyButton');
const mobileSidebarHeaderTitle = document.getElementById('mobileSidebarHeaderTitle');
const hamburgerButton = document.querySelector('.hamburger');
const sidebarElement = document.querySelector('.sidebar');

const languageButtonContainer = document.getElementById('languageButtonContainer'); // The div container
const currentLanguageDisplay = document.getElementById('currentLanguageDisplay'); // The button part of the dropdown
const languageButtonText = document.getElementById('languageButtonText'); // The span inside currentLanguageDisplay
const languageOptions = document.getElementById('languageOptions'); // The div holding the language choices


function initUI() {
    welcomeTitle.textContent = translations[appLanguage].welcome;
    chatBox.innerHTML = `<div class="loading-message">${translations[appLanguage].loading}</div>`;

    setTimeout(() => {
        updateUIText();
        chatBox.innerHTML = '';
        addBotMessage(translations[appLanguage].greeting);
        setTimeout(() => {
            showSuggestedQuestions();
        }, 500);

        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            document.body.style.overflow = 'auto';
            appContainer.style.display = 'flex';
            appContainer.style.opacity = '1';
            animateUI();
        }, 500);
    }, 1000);
}

function updateUIText() {
    const lang = translations[appLanguage];

    chatTitle.textContent = lang.title;
    userInput.placeholder = lang.placeholder;
    sendButton.textContent = lang.send;

    sidebarTitle.textContent = lang.sidebarTitle;
    if (mobileSidebarHeaderTitle) mobileSidebarHeaderTitle.textContent = lang.mobileMenuTitle;
    welcomeMessage.textContent = lang.welcomeMessage;
    helpButtonText.textContent = lang.helpButtonText;
    settingsButtonText.textContent = lang.settingsButtonText;
    
    if (languageButtonText) languageButtonText.textContent = lang.currentLanguageText;
    if (currentLanguageDisplay) currentLanguageDisplay.title = lang.languageButton;

    document.getElementById('helpModalTitle').textContent = lang.helpTitle;
    document.getElementById('helpModalText').textContent = lang.helpText;
    document.getElementById('helpModalCapabilities').textContent = lang.helpCapabilities;
    document.getElementById('helpModalItem1').textContent = lang.helpItem1;
    document.getElementById('helpModalItem2').textContent = lang.helpItem2;
    document.getElementById('helpModalItem3').textContent = lang.helpItem3;
    document.getElementById('helpModalItem4').textContent = lang.helpItem4;
    document.getElementById('helpModalLanguage').textContent = lang.helpLanguage;

    document.getElementById('settingsModalTitle').textContent = lang.settingsTitle;
    document.getElementById('settingsModalText').textContent = lang.settingsText;
    document.getElementById('apiKeyLabel').textContent = lang.apiKeyLabel;
    apiKeyInput.placeholder = lang.apiKeyPlaceholder;
    saveSettingsButton.textContent = lang.saveSettings;
    clearKeyButton.textContent = lang.clearKey;

    const langOptionsLinks = languageOptions.querySelectorAll('a[data-lang]');
    langOptionsLinks.forEach(link => {
        const langKey = link.dataset.lang;
        link.textContent = availableLanguages[langKey];
    });
}

function showSuggestedQuestions() {
    const questionsContainer = document.createElement('div');
    questionsContainer.className = 'suggested-questions';
    const title = document.createElement('div');
    title.className = 'suggested-title';
    title.textContent = translations[appLanguage].suggestedTitle;
    questionsContainer.appendChild(title);

    const questionsList = document.createElement('div');
    questionsList.className = 'questions-list';

    suggestedQuestions[appLanguage].forEach(question => {
        const questionBtn = document.createElement('button');
        questionBtn.className = 'suggested-question';
        questionBtn.textContent = question;
        questionBtn.addEventListener('click', () => {
            userInput.value = question;
            sendMessage();
        });
        questionsList.appendChild(questionBtn);
    });

    questionsContainer.appendChild(questionsList);
    chatBox.appendChild(questionsContainer);
    chatBox.scrollTop = chatBox.scrollHeight;
    setTimeout(() => {
        questionsContainer.style.opacity = '1';
        questionsContainer.style.transform = 'translateY(0)';
    }, 10);
}

function animateUI() {
    const elementsToAnimate = [
        { el: document.querySelector('.top-bar'), delay: 100 },
        { el: document.querySelector('#chatTitle'), delay: 200 },
        { el: document.querySelector('.chat-container'), delay: 300 },
        { el: document.querySelector('.chat-box'), delay: 400 },
        { el: document.querySelector('.input-area'), delay: 500 }
    ];
    elementsToAnimate.forEach(item => {
        if (item.el) {
            setTimeout(() => {
                item.el.classList.add('visible');
            }, item.delay);
        }
    });
}

function closeMobileSidebar() {
    if (sidebarElement && hamburgerButton && window.innerWidth <= 768) {
        sidebarElement.classList.remove('expanded');
        hamburgerButton.setAttribute('aria-expanded', 'false');
    }
}

function switchAppLanguage(newLang) {
    if (appLanguage === newLang) {
        languageOptions.classList.remove('show');
        return;
    }
    closeMobileSidebar();
    appLanguage = newLang;
    updateUIText();
    chatBox.innerHTML = '';
    addBotMessage(translations[appLanguage].greeting);
    setTimeout(() => showSuggestedQuestions(), 500);
    languageOptions.classList.remove('show');
}

function openHelpModal() {
    closeMobileSidebar();
    helpModal.style.display = 'flex';
    document.body.classList.add('modal-open');
    setTimeout(() => {
        helpModal.classList.add('visible');
    }, 10);
}

function closeHelpModal() {
    helpModal.classList.remove('visible');
    document.body.classList.remove('modal-open');
    setTimeout(() => {
        helpModal.style.display = 'none';
    }, 300);
}

function openSettingsModal() {
    closeMobileSidebar();
    settingsModal.style.display = 'flex';
    document.body.classList.add('modal-open');
    setTimeout(() => {
        settingsModal.classList.add('visible');
    }, 10);
}

function closeSettingsModal() {
    settingsModal.classList.remove('visible');
    document.body.classList.remove('modal-open');
    setTimeout(() => {
        settingsModal.style.display = 'none';
    }, 300);
}

function saveApiKey() {
    const apiKey = apiKeyInput.value.trim();
    if (!apiKey) {
        alert(translations[appLanguage].noQuestion.replace(translations[appLanguage].placeholder.split(" ")[0].toLowerCase(), "API key"));
        return;
    }
    const originalButtonText = saveSettingsButton.textContent;
    saveSettingsButton.disabled = true;
    saveSettingsButton.textContent = translations[appLanguage].typing.split("...")[0];

    fetch('/set_api_key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ api_key: apiKey })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(`${translations[appLanguage].invalidKey}: ${data.error}`);
        } else {
            alert(translations[appLanguage].settingsSaved);
            closeSettingsModal();
        }
    })
    .catch(error => {
        console.error('Error saving API key:', error);
        alert(translations[appLanguage].error);
    })
    .finally(() => {
        saveSettingsButton.disabled = false;
        saveSettingsButton.textContent = originalButtonText;
    });
}

function clearApiKey() {
    apiKeyInput.value = '';
    fetch('/set_api_key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ api_key: '' })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
             alert('Error clearing API key: ' + data.error);
        } else {
            alert(translations[appLanguage].settingsSaved.replace(translations[appLanguage].saveSettings, translations[appLanguage].clearKey));
        }
    })
    .catch(error => {
        console.error('Error clearing API key:', error);
        alert(translations[appLanguage].error);
    });
}


function createMessageTranslationDropdown(messageElement) {
    const existingDropdownContainer = messageElement.querySelector('.translation-buttons');
    if (existingDropdownContainer) existingDropdownContainer.remove(); // Remove old one

    const translationButtonsContainer = document.createElement('div');
    translationButtonsContainer.className = 'translation-buttons persistent';

    const dropdownContainer = document.createElement('div');
    dropdownContainer.className = 'message-translation-dropdown';

    const toggleButton = document.createElement('button');
    toggleButton.className = 'translate-dropdown-toggle';
    toggleButton.innerHTML = '🌐'; 
    toggleButton.title = translations[appLanguage].translationToggleTitle;

    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'translate-dropdown-options';

    const currentMsgLang = messageElement.dataset.currentLanguage || messageElement.dataset.originalLanguage || appLanguage;

    let optionsCount = 0;
    for (const langKey in availableLanguages) {
        if (langKey !== currentMsgLang) {
            optionsCount++;
            const optionLink = document.createElement('a');
            optionLink.href = '#';
            optionLink.dataset.targetLang = langKey;
            optionLink.textContent = `${translations[appLanguage].translateToLabel.replace(':','')} ${availableLanguages[langKey]}`;
            optionLink.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (messageElement.querySelector('.message-text').dataset.translationInProgress === "true") return;
                translateMessage(messageElement, langKey);
                optionsDiv.classList.remove('show');
            });
            optionsDiv.appendChild(optionLink);
        }
    }

    if (optionsCount === 0) return; // No languages to translate to, so don't add dropdown

    dropdownContainer.appendChild(toggleButton);
    dropdownContainer.appendChild(optionsDiv);

    toggleButton.addEventListener('click', (e) => {
        e.stopPropagation();
        document.querySelectorAll('.translate-dropdown-options.show').forEach(openDropdown => {
            if (openDropdown !== optionsDiv) {
                openDropdown.classList.remove('show');
            }
        });
        optionsDiv.classList.toggle('show');
    });
    
    translationButtonsContainer.appendChild(dropdownContainer);
    messageElement.appendChild(translationButtonsContainer);
}

function translateMessage(messageElement, targetLanguage) {
    const messageTextElement = messageElement.querySelector('.message-text');
    if (!messageTextElement || messageTextElement.dataset.translationInProgress === "true") return;

    if (!messageTextElement.dataset.originalText) { // First time translating this specific message
        messageTextElement.dataset.originalText = messageTextElement.innerHTML; // Store current HTML as original
        messageTextElement.dataset.originalLanguage = messageElement.dataset.currentLanguage || appLanguage;
    }
    
    const textToTranslate = messageTextElement.dataset.originalText; // Always translate from the stored original
    const sourceLanguageForPrompt = messageTextElement.dataset.originalLanguage;

    messageTextElement.dataset.translationInProgress = "true";
    const currentVisibleHTML = messageTextElement.innerHTML; // To restore if translation fails early
    messageTextElement.innerHTML = `<div class="loading-translation">${translations[appLanguage].translating}</div>`;
    
    const toggleButton = messageElement.querySelector('.translate-dropdown-toggle');
    if (toggleButton) toggleButton.disabled = true;

    fetch('/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            text: textToTranslate,
            target_language: targetLanguage,
            source_language: sourceLanguageForPrompt 
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error || !data.translated_text) {
            messageTextElement.innerHTML = currentVisibleHTML; 
            console.error('Translation error:', data.error || "No translated text received");
        } else {
            messageTextElement.innerHTML = data.translated_text;
            messageElement.dataset.currentLanguage = targetLanguage; 
            createMessageTranslationDropdown(messageElement); // Rebuild dropdown with updated options
        }
    })
    .catch(error => {
        console.error('Translation failed:', error);
        messageTextElement.innerHTML = currentVisibleHTML; 
    })
    .finally(() => {
        delete messageTextElement.dataset.translationInProgress;
        if (toggleButton) toggleButton.disabled = false;
    });
}

function addBotMessage(message, specialEffect = true) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message bot-message';
    messageElement.dataset.originalLanguage = appLanguage; 
    messageElement.dataset.currentLanguage = appLanguage;

    const messageContent = document.createElement('div');
    messageContent.className = 'message-text';
    messageElement.appendChild(messageContent);
    chatBox.appendChild(messageElement);

    setTimeout(() => {
        if (specialEffect === false) {
            messageContent.innerHTML = message;
            chatBox.scrollTop = chatBox.scrollHeight;
            messageElement.classList.add('reveal');
            if (message !== translations[appLanguage].greeting && !message.toLowerCase().includes("error")) {
                messageContent.dataset.originalText = messageContent.innerHTML; // Store HTML if it contains formatting
                createMessageTranslationDropdown(messageElement);
            }
        } else {
            let i = 0;
            const baseSpeed = 20;
            const lengthFactor = Math.max(0, Math.min(15, message.length / 20));
            const typingSpeed = Math.max(5, baseSpeed - lengthFactor); // Ensure speed is not too fast or zero

            function typingEffect() {
                if (i < message.length) {
                    messageContent.innerHTML += message.charAt(i++);
                    chatBox.scrollTop = chatBox.scrollHeight;
                    setTimeout(typingEffect, typingSpeed);
                } else {
                    messageElement.classList.add('reveal');
                    chatBox.scrollTop = chatBox.scrollHeight;
                    if (message !== translations[appLanguage].greeting) {
                        messageContent.dataset.originalText = messageContent.innerHTML; // Store after typing
                        createMessageTranslationDropdown(messageElement);
                    }
                }
            }
            typingEffect();
        }
    }, 100);
    return messageElement;
}

function addUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message user-message';
    messageElement.innerHTML = message.replace(/\n/g, '<br>');
    chatBox.appendChild(messageElement);
    chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: 'smooth' });
}

function sendMessage() {
    const question = userInput.value.trim();
    if (!question) {
        alert(translations[appLanguage].noQuestion);
        return;
    }
    addUserMessage(question);
    userInput.value = '';
    sendButton.disabled = true;

    const botResponseContainer = document.createElement('div');
    botResponseContainer.className = 'message bot-message';
    botResponseContainer.dataset.originalLanguage = appLanguage;
    botResponseContainer.dataset.currentLanguage = appLanguage;

    const messageTextElement = document.createElement('div');
    messageTextElement.className = 'message-text';
    messageTextElement.innerHTML = `
        <div class="typing-indicator-inline">
            <div class="typing-dots"><span></span><span></span><span></span></div>
            <div class="typing-text">${translations[appLanguage].typing}</div>
        </div>
    `;
    botResponseContainer.appendChild(messageTextElement);
    chatBox.appendChild(botResponseContainer);
    chatBox.scrollTop = chatBox.scrollHeight;

    fetch('/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'text/event-stream' },
        body: JSON.stringify({ question: question, language: appLanguage })
    })
    .then(response => {
        if (!response.ok) {
            if (botResponseContainer.parentNode === chatBox) chatBox.removeChild(botResponseContainer);
            return response.json().then(errData => { throw new Error(errData.error || `HTTP error! status: ${response.status}`); })
                           .catch(() => { throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`); });
        }
        messageTextElement.innerHTML = '';
        botResponseContainer.classList.add('streaming');
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let partialData = '';
        let fullStreamedResponse = "";

        function readStream() {
            reader.read().then(({ done, value }) => {
                if (done) {
                    botResponseContainer.classList.remove('streaming');
                    sendButton.disabled = false;
                    messageTextElement.dataset.originalText = fullStreamedResponse; // Store full response
                    createMessageTranslationDropdown(botResponseContainer);
                    chatBox.scrollTop = chatBox.scrollHeight;
                    return;
                }
                partialData += decoder.decode(value, { stream: true });
                const lines = partialData.split('\n\n');
                partialData = lines.pop();
                lines.forEach(line => {
                    if (line.startsWith('data: ')) {
                        try {
                            const jsonData = line.substring(6);
                            if (jsonData.trim() === "[DONE]") return;
                            const data = JSON.parse(jsonData);
                            if (data.token) {
                                messageTextElement.innerHTML += data.token;
                                fullStreamedResponse += data.token;
                                chatBox.scrollTop = chatBox.scrollHeight;
                            }
                            if (data.error) {
                                console.error("Server error during stream:", data.error);
                                messageTextElement.innerHTML += `<br><span class="stream-error">Error: ${data.error}</span>`;
                                chatBox.scrollTop = chatBox.scrollHeight;
                            }
                        } catch (e) { console.error("Error parsing stream data:", e, "Line:", line); }
                    }
                });
                return readStream();
            }).catch(streamError => {
                 console.error('Stream reading error:', streamError);
                 if (botResponseContainer.parentNode === chatBox) chatBox.removeChild(botResponseContainer);
                 addBotMessage(`${translations[appLanguage].error.split("<a")[0]}: Streaming failed.`, false); // Avoid link in this specific error
                 sendButton.disabled = false;
            });
        }
        return readStream();
    })
    .catch(error => {
        console.error('Fetch/Ask Error:', error);
        if (botResponseContainer && botResponseContainer.parentNode === chatBox) chatBox.removeChild(botResponseContainer);
        addBotMessage(`${translations[appLanguage].error.split("<a")[0]}: ${error.message}`, false); // Avoid link
        sendButton.disabled = false;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initUI();

    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal.id === 'helpModal') closeHelpModal();
            else if (modal.id === 'settingsModal') closeSettingsModal();
        });
    });
    
    if (hamburgerButton && sidebarElement) {
        hamburgerButton.addEventListener('click', () => {
            sidebarElement.classList.toggle('expanded');
            hamburgerButton.setAttribute('aria-expanded', sidebarElement.classList.contains('expanded').toString());
        });
    }

    userInput.addEventListener('input', () => sendButton.disabled = userInput.value.trim().length === 0);
    sendButton.disabled = true;

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!sendButton.disabled) sendMessage();
        }
    });

    if (currentLanguageDisplay && languageOptions) {
        currentLanguageDisplay.addEventListener('click', (e) => {
            e.stopPropagation();
            languageOptions.classList.toggle('show');
        });
        languageOptions.addEventListener('click', (e) => {
            e.stopPropagation();
            if (e.target.tagName === 'A' && e.target.dataset.lang) {
                switchAppLanguage(e.target.dataset.lang);
            }
        });
    }

    helpButton.addEventListener('click', openHelpModal);
    settingsButton.addEventListener('click', openSettingsModal);
    saveSettingsButton.addEventListener('click', saveApiKey);
    clearKeyButton.addEventListener('click', clearApiKey);

    window.addEventListener('click', (e) => {
        if (languageOptions && languageOptions.classList.contains('show')) {
            if (!languageButtonContainer.contains(e.target)) {
                languageOptions.classList.remove('show');
            }
        }
        document.querySelectorAll('.translate-dropdown-options.show').forEach(dropdown => {
            if (!dropdown.closest('.message-translation-dropdown').contains(e.target)) {
                 dropdown.classList.remove('show');
            }
        });
        if (e.target === helpModal && helpModal.classList.contains('visible')) closeHelpModal();
        if (e.target === settingsModal && settingsModal.classList.contains('visible')) closeSettingsModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (helpModal.style.display !== 'none' && helpModal.classList.contains('visible')) closeHelpModal();
            if (settingsModal.style.display !== 'none' && settingsModal.classList.contains('visible')) closeSettingsModal();
            if (languageOptions && languageOptions.classList.contains('show')) languageOptions.classList.remove('show');
            document.querySelectorAll('.translate-dropdown-options.show').forEach(dropdown => dropdown.classList.remove('show'));
        }
    });
});