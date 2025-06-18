/*
================================================================================
 SECCIÓN 1: CONFIGURACIÓN GLOBAL Y TRADUCCIONES
================================================================================
Define textos en múltiples idiomas para la internacionalización (i18n), 
preguntas sugeridas y variables globales para el estado de la aplicación, como 
el idioma actual.
*/
const translations = {
    english: {
        title: "💬 HR Assistant",
        sidebarTitle: "Welcome!",
        mobileMenuTitle: "Menu",
        welcomeMessage: "Oficial AI HR Chatbot",
        placeholder: "Type your question here or use the microphone...",
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
        // --- INICIO: TEXTO DE AYUDA MEJORADO (INGLÉS) ---
        helpIntro: "This AI assistant is designed to provide quick and accurate information about HR policies and procedures at HISENSE ELECTRÓNICA MÉXICO. It can answer your questions based on documents like the Collective Work Agreement and Internal Work Regulations.",
        helpHowItWorksTitle: "How It Works:",
        helpHowItWorks1: "Ask any question related to company HR policies or internal regulations.",
        helpHowItWorks2: "The assistant processes your query and provides a response based on the relevant internal documents.",
        helpHowItWorks3: "When information is extracted directly from a document, you will see a clickable citation (e.g., [1], [Source]) next to the text.",
        helpCitationsTitle: "Understanding Citations:",
        helpCitations1: "Clicking a citation will open a new window showing the original document with the exact cited text highlighted.",
        helpCitations2: "This allows you to verify the information and see its context directly in the source document.",
        helpFeaturesTitle: "Additional Features:",
        helpFeatures1: "Voice Input (🎙️): Use the microphone button to ask questions by voice.",
        helpFeatures2: "Translation (🌐): Translate bot messages into other supported languages.",
        helpFeatures3: "Summarize (📄): Get a concise summary of long bot messages.",
        helpFeatures4: "Copy (📋): Easily copy any message to your clipboard.",
        helpFeatures5: "Edit (✏️): Correct or modify your last question and resend it.",
        helpSettingsTitle: "Settings (⚙️):",
        helpSettings1: "API Key: Enter your OpenAI API Key to enable the assistant. This key is stored securely in your browser session.",
        helpSettings2: "Theme: Switch between Light and Dark modes.",
        helpSettings3: "Language: Change the application interface language.",
        helpLanguage: "The assistant supports English, Spanish, Simplified Chinese, and Traditional Chinese.",
        // --- FIN: TEXTO DE AYUDA MEJORADO (INGLÉS) ---
        suggestedTitle: "Try asking:",
        helpButtonText: "Help",
        settingsButtonText: "Settings",
        themeButtonDark: "Dark Mode",
        themeButtonLight: "Light Mode",
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
        translationToggleTitle: "Translate message",
        summaryModalTitle: "Summary of Message",
        copied: "Copied!",
        copy: "Copy",
        edit: "Edit",
        saveAndSubmit: "Save & Submit",
        cancel: "Cancel"
    },
    spanish: {
        title: "💬 Asistente de RH",
        sidebarTitle: "¡Bienvenido!",
        mobileMenuTitle: "Menú",
        welcomeMessage: "AI Chat Oficial de RH",
        placeholder: "Escribe tu pregunta aquí o usa el micrófono...",
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
        // --- INICIO: TEXTO DE AYUDA MEJORADO (ESPAÑOL) ---
        helpIntro: "Este asistente de IA está diseñado para proporcionarte información rápida y precisa sobre las políticas y procedimientos de RH en HISENSE ELECTRÓNICA MÉXICO. Puede responder a tus preguntas basándose en documentos como el Contrato Colectivo de Trabajo y el Reglamento Interno de Trabajo.",
        helpHowItWorksTitle: "¿Cómo Funciona?",
        helpHowItWorks1: "Haz cualquier pregunta relacionada con las políticas de RH de la empresa o el reglamento interno.",
        helpHowItWorks2: "El asistente procesa tu consulta y te proporciona una respuesta basada en los documentos internos relevantes.",
        helpHowItWorks3: "Cuando la información se extrae directamente de un documento, verás una cita clickeable (ej. [1], [Fuente]) junto al texto.",
        helpCitationsTitle: "Entendiendo las Citas:",
        helpCitations1: "Al hacer clic en una cita, se abrirá una nueva ventana mostrando el documento original con el texto exacto citado resaltado.",
        helpCitations2: "Esto te permite verificar la información y ver su contexto directamente en el documento fuente.",
        helpFeaturesTitle: "Funcionalidades Adicionales:",
        helpFeatures1: "Entrada de Voz (🎙️): Usa el botón del micrófono para hacer preguntas por voz.",
        helpFeatures2: "Traducir (🌐): Traduce los mensajes del bot a otros idiomas soportados.",
        helpFeatures3: "Resumir (📄): Obtén un resumen conciso de mensajes largos del bot.",
        helpFeatures4: "Copiar (📋): Copia fácilmente cualquier mensaje al portapapeles.",
        helpFeatures5: "Editar (✏️): Corrige o modifica tu última pregunta y envíala de nuevo.",
        helpSettingsTitle: "Configuración (⚙️):",
        helpSettings1: "Clave API: Ingresa tu clave API de OpenAI para habilitar el asistente. Esta clave se guarda de forma segura en tu sesión del navegador.",
        helpSettings2: "Tema: Cambia entre el modo Claro y Oscuro.",
        helpSettings3: "Idioma: Cambia el idioma de la interfaz de la aplicación.",
        helpLanguage: "El asistente soporta inglés, español, chino simplificado y chino tradicional.",
        // --- FIN: TEXTO DE AYUDA MEJORADO (ESPAÑOL) ---
        suggestedTitle: "Prueba preguntando:",
        helpButtonText: "Ayuda",
        settingsButtonText: "Configuración",
        themeButtonDark: "Modo Oscuro",
        themeButtonLight: "Modo Claro",
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
        translationToggleTitle: "Traducir mensaje",
        summaryModalTitle: "Resumen del Mensaje",
        copied: "¡Copiado!",
        copy: "Copiar",
        edit: "Editar",
        saveAndSubmit: "Guardar y Enviar",
        cancel: "Cancelar"
    },
    chinese_simplified: {
        title: "💬 人力资源助理",
        sidebarTitle: "欢迎!",
        mobileMenuTitle: "菜单",
        welcomeMessage: "官方AI人力资源聊天机器人",
        placeholder: "在此输入您的问题或使用麦克风...",
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
        helpText: "此AI助理专注于海信电子墨西哥公司的人力资源政策和程序。它可以提供来自集体工作协议和内部工作条例的信息。(简体)", // Actualizar con detalle
        helpCapabilities: "功能: (简体)", // Actualizar con detalle
        helpItem1: "回答有关员工权利的问题 (简体)",
        helpItem2: "解释人力资源政策和程序 (简体)",
        helpItem3: "提供有关福利的信息 (简体)",
        helpItem4: "阐明工作规定 (简体)",
        helpLanguage: "该助理支持英语、西班牙语、简体中文和繁体中文。(简体)",
        suggestedTitle: "尝试提问: (简体)",
        helpButtonText: "帮助 (简体)",
        settingsButtonText: "设置 (简体)",
        themeButtonDark: "深色模式 (简体)",
        themeButtonLight: "浅色模式 (简体)",
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
        translationToggleTitle: "翻译消息 (简体)",
        summaryModalTitle: "消息摘要 (简体)",
        copied: "已复制!",
        copy: "复制",
        edit: "编辑",
        saveAndSubmit: "保存并提交",
        cancel: "取消"
    },
    chinese_traditional: {
        title: "💬 人力資源助理",
        sidebarTitle: "歡迎!",
        mobileMenuTitle: "選單",
        welcomeMessage: "官方AI人力資源聊天機器人",
        placeholder: "在此輸入您的問題或使用麥克風...",
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
        helpText: "此AI助理專注於海信電子墨西哥公司的人力資源政策和程序。它可以提供來自集體工作協議和內部工作條例的資訊。(繁體)", // Actualizar con detalle
        helpCapabilities: "功能: (繁體)", // Actualizar con detalle
        helpItem1: "回答有關員工權利的問題 (繁體)",
        helpItem2: "解釋人力資源政策和程序 (繁體)",
        helpItem3: "提供有關福利的資訊 (繁體)",
        helpItem4: "闡明工作規定 (繁體)",
        helpLanguage: "該助理支援英語、西班牙語、簡體中文和繁體中文。(繁體)",
        suggestedTitle: "嘗試提問: (繁體)",
        helpButtonText: "協助 (繁體)",
        settingsButtonText: "設定 (繁體)",
        themeButtonDark: "深色模式 (繁体)",
        themeButtonLight: "淺色模式 (繁體)",
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
        translationToggleTitle: "翻譯訊息 (繁體)",
        summaryModalTitle: "訊息摘要 (繁體)",
        copied: "已複製!",
        copy: "複製",
        edit: "編輯",
        saveAndSubmit: "儲存並提交",
        cancel: "取消"
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

/*
================================================================================
 SECCIÓN 2: SELECCIÓN DE ELEMENTOS DEL DOM
================================================================================
*/
const chatTitle = document.getElementById('chatTitle');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const stopButton = document.getElementById('stopButton');
const micButton = document.getElementById('micButton'); // Mic button
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
const themeToggleButton = document.getElementById('themeToggleButton');
const themeIcon = document.getElementById('themeIcon');
const themeButtonText = document.getElementById('themeButtonText');
const languageButtonContainer = document.getElementById('languageButtonContainer');
const currentLanguageDisplay = document.getElementById('currentLanguageDisplay');
const languageButtonText = document.getElementById('languageButtonText');
const languageOptions = document.getElementById('languageOptions');
let abortController = null;

/*
================================================================================
 SECCIÓN 3: CONFIGURACIÓN DEL RECONOCIMIENTO DE VOZ (Web Speech API)
================================================================================
*/
let isRecording = false;
let recognition;
let finalTranscript = '';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }
        userInput.value = finalTranscript + interimTranscript;
        sendButton.disabled = userInput.value.trim().length === 0;
    };
    
    recognition.onend = () => {
        isRecording = false;
        micButton.classList.remove('recording');
        micButton.title = "Use Microphone";
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        alert(`Speech recognition error: ${event.error}. Please ensure microphone access is allowed.`);
        micButton.classList.remove('recording');
        isRecording = false;
    };

} else {
    console.warn("Speech Recognition not supported in this browser.");
    if(micButton) micButton.style.display = 'none';
}
/*
================================================================================
 SECCIÓN 4: GESTIÓN DEL TEMA (MODO CLARO/OSCURO)
================================================================================
*/

function setInitialTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.textContent = '☀️';
        if (themeButtonText) themeButtonText.textContent = translations[appLanguage].themeButtonLight;
    } else {
        document.body.classList.remove('dark-mode');
        themeIcon.textContent = '🌙';
        if (themeButtonText) themeButtonText.textContent = translations[appLanguage].themeButtonDark;
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    let currentTheme;
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.textContent = '☀️';
        themeButtonText.textContent = translations[appLanguage].themeButtonLight;
        currentTheme = 'dark';
    } else {
        themeIcon.textContent = '🌙';
        themeButtonText.textContent = translations[appLanguage].themeButtonDark;
        currentTheme = 'light';
    }
    localStorage.setItem('theme', currentTheme);
}

/*
================================================================================
 SECCIÓN 5: INICIALIZACIÓN Y ACTUALIZACIÓN DE LA INTERFAZ DE USUARIO (UI)
================================================================================
*/

function initUI() {
    setInitialTheme();
    const loadingContent = document.querySelector('.loading-content');
    if (loadingContent) {
        loadingContent.innerHTML = `
            <div class="robot-loader">
                <div class="loader-spinner"></div>
            </div>
            <h1 id="welcomeTitle"></h1>
            <p id="loadingSubtitle"></p>
        `;
    }

    const welcomeText = "Welcome";
    const subtitleText = "Starting your HR assistant...";
    
    document.getElementById('welcomeTitle').textContent = welcomeText;
    document.getElementById('loadingSubtitle').textContent = subtitleText;


    setTimeout(() => {
        loadingScreen.style.opacity = '0';

        setTimeout(() => {
            loadingScreen.style.display = 'none';
            document.body.style.overflow = 'auto';
            appContainer.style.display = 'flex';
            appContainer.style.opacity = '1';
            animateAppEntry();
            updateUIText();
            chatBox.innerHTML = '';
            addBotMessage(translations[appLanguage].greeting);
            setTimeout(() => {
                showSuggestedQuestions();
            }, 1000);

        }, 500);

    }, 2800);
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

    if (document.body.classList.contains('dark-mode')) {
        themeButtonText.textContent = lang.themeButtonLight;
    } else {
        themeButtonText.textContent = lang.themeButtonDark;
    }
    
    if (languageButtonText) languageButtonText.textContent = lang.currentLanguageText;
    if (currentLanguageDisplay) currentLanguageDisplay.title = lang.languageButton;

    // --- INICIO: ACTUALIZACIÓN DE TEXTOS EN EL MODAL DE AYUDA ---
    document.getElementById('helpModalTitle').textContent = lang.helpTitle;
    document.getElementById('helpIntro').textContent = lang.helpIntro;
    
    document.getElementById('helpHowItWorksTitle').textContent = lang.helpHowItWorksTitle;
    document.getElementById('helpHowItWorks1').textContent = lang.helpHowItWorks1;
    document.getElementById('helpHowItWorks2').textContent = lang.helpHowItWorks2;
    document.getElementById('helpHowItWorks3').textContent = lang.helpHowItWorks3;

    document.getElementById('helpCitationsTitle').textContent = lang.helpCitationsTitle;
    document.getElementById('helpCitations1').textContent = lang.helpCitations1;
    document.getElementById('helpCitations2').textContent = lang.helpCitations2;

    document.getElementById('helpFeaturesTitle').textContent = lang.helpFeaturesTitle;
    document.getElementById('helpFeatures1').textContent = lang.helpFeatures1;
    document.getElementById('helpFeatures2').textContent = lang.helpFeatures2;
    document.getElementById('helpFeatures3').textContent = lang.helpFeatures3;
    document.getElementById('helpFeatures4').textContent = lang.helpFeatures4;
    document.getElementById('helpFeatures5').textContent = lang.helpFeatures5;

    document.getElementById('helpSettingsTitle').textContent = lang.helpSettingsTitle;
    document.getElementById('helpSettings1').textContent = lang.helpSettings1;
    document.getElementById('helpSettings2').textContent = lang.helpSettings2;
    document.getElementById('helpSettings3').textContent = lang.helpSettings3;

    document.getElementById('helpModalLanguage').textContent = lang.helpLanguage;
    // --- FIN: ACTUALIZACIÓN DE TEXTOS EN EL MODAL DE AYUDA ---

    document.getElementById('settingsModalTitle').textContent = lang.settingsTitle;
    document.getElementById('settingsModalText').textContent = lang.settingsText;
    document.getElementById('apiKeyLabel').textContent = lang.apiKeyLabel;
    apiKeyInput.placeholder = lang.apiKeyPlaceholder;
    saveSettingsButton.textContent = lang.saveSettings;
    clearKeyButton.textContent = lang.clearKey;
    document.getElementById('summaryModalTitle').textContent = lang.summaryModalTitle;

    const langOptionsLinks = languageOptions.querySelectorAll('a[data-lang]');
    langOptionsLinks.forEach(link => {
        const langKey = link.dataset.lang;
        link.textContent = availableLanguages[langKey];
    });
}

/*
================================================================================
 SECCIÓN 6: COMPONENTES Y FUNCIONALIDADES DE LA UI
================================================================================
*/
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

function animateAppEntry() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    if (sidebar) {
        sidebar.classList.add('visible');
    }

    if (mainContent) {
        setTimeout(() => {
            mainContent.classList.add('visible');
        }, 200);
    }
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

    if (recognition) {
        const langMap = {
            english: 'en-US',
            spanish: 'es-MX',
            chinese_simplified: 'zh-CN',
            chinese_traditional: 'zh-TW'
        };
        recognition.lang = langMap[newLang] || 'en-US';
        console.log(`Speech recognition language set to: ${recognition.lang}`);
    }

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

/*
================================================================================
 SECCIÓN 7: GESTIÓN DE API KEY
================================================================================
*/
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

/*
================================================================================
 SECCIÓN 8: ACCIONES DE MENSAJE (TRADUCIR, RESUMIR, COPIAR, EDITAR)
================================================================================
*/

/**
 * Agrega botones de acción (Copiar, Editar) a un elemento de mensaje.
 * @param {HTMLElement} messageElement - El elemento div del mensaje completo.
 * @param {boolean} isUserMessage - True si el mensaje es del usuario.
 */
function addMessageActions(messageElement, isUserMessage) {
    const lang = translations[appLanguage];
    let footer = messageElement.querySelector('.message-footer');

    // Si no existe un pie de página, créalo.
    if (!footer) {
        footer = document.createElement('div');
        footer.className = 'message-footer';
        messageElement.appendChild(footer);
    } else {
        // Limpiar botones existentes para evitar duplicados si se llama varias veces
        footer.innerHTML = '';
    }

    // --- Botón de Copiar ---
    const copyBtn = document.createElement('button');
    copyBtn.className = 'message-action-btn';
    copyBtn.title = lang.copy;
    copyBtn.innerHTML = '📋'; // Icono de portapapeles
    copyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const messageBody = messageElement.querySelector('.message-body');
        // Usar .innerText para obtener el texto visible sin HTML
        const textToCopy = messageBody ? messageBody.innerText : '';
        // Utilizar document.execCommand para compatibilidad con iframes
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            // Feedback visual
            copyBtn.innerHTML = '✅';
            copyBtn.title = lang.copied;
            setTimeout(() => {
                copyBtn.innerHTML = '📋';
                copyBtn.title = lang.copy;
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy text.');
        } finally {
            document.body.removeChild(textArea);
        }
    });
    footer.appendChild(copyBtn);

    // --- Botón de Editar (solo para mensajes de usuario) ---
    if (isUserMessage) {
        const editBtn = document.createElement('button');
        editBtn.className = 'message-action-btn';
        editBtn.title = lang.edit;
        editBtn.innerHTML = '✏️'; // Icono de lápiz
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            enterEditMode(messageElement);
        });
        footer.appendChild(editBtn);
    }
}


/**
 * Pone un mensaje de usuario en modo de edición.
 * @param {HTMLElement} messageElement - El elemento div del mensaje del usuario.
 */
function enterEditMode(messageElement) {
    const bubble = messageElement.querySelector('.message-bubble');
    const messageBody = messageElement.querySelector('.message-body');
    if (!bubble || !messageBody) return;

    // Ocultar botones de acción existentes
    const footer = messageElement.querySelector('.message-footer');
    if(footer) footer.style.display = 'none';

    // Guardar el contenido original para restaurar si se cancela
    const originalHTML = messageBody.innerHTML;
    const originalText = messageBody.innerText; // Usar innerText para obtener el texto puro
    bubble.dataset.originalHtml = originalHTML; // Guardar HTML original
    
    // Limpiar contenido y crear el editor
    messageBody.innerHTML = ''; 

    const editContainer = document.createElement('div');
    editContainer.className = 'edit-controls';

    const textArea = document.createElement('textarea');
    textArea.value = originalText; // Cargar el texto puro
    
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'buttons-container';

    const saveBtn = document.createElement('button');
    saveBtn.textContent = translations[appLanguage].saveAndSubmit;
    saveBtn.className = 'save-edit-btn';
    saveBtn.onclick = (e) => {
        e.stopPropagation();
        saveEdit(messageElement);
    };

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = translations[appLanguage].cancel;
    cancelBtn.className = 'cancel-edit-btn';
    cancelBtn.onclick = (e) => {
        e.stopPropagation();
        cancelEdit(messageElement);
    };

    buttonsContainer.appendChild(saveBtn);
    buttonsContainer.appendChild(cancelBtn);

    editContainer.appendChild(textArea);
    editContainer.appendChild(buttonsContainer);
    messageBody.appendChild(editContainer);
    
    textArea.focus();
    // Ajustar altura del textarea para que quepa el contenido
    textArea.style.height = 'auto';
    textArea.style.height = (textArea.scrollHeight) + 'px';
}

/**
 * Cancela el modo de edición y restaura el mensaje original.
 * @param {HTMLElement} messageElement 
 */
function cancelEdit(messageElement) {
    const bubble = messageElement.querySelector('.message-bubble');
    const messageBody = messageElement.querySelector('.message-body');
    if (bubble && messageBody && bubble.dataset.originalHtml) {
        messageBody.innerHTML = bubble.dataset.originalHtml;
        delete bubble.dataset.originalHtml;
    }
    const footer = messageElement.querySelector('.message-footer');
    if(footer) footer.style.display = 'flex'; // Mostrar de nuevo los botones de acción
}

/**
 * Guarda el texto editado, actualiza el mensaje y vuelve a enviar la pregunta.
 * @param {HTMLElement} messageElement 
 */
function saveEdit(messageElement) {
    const bubble = messageElement.querySelector('.message-bubble');
    const newText = messageElement.querySelector('textarea').value.trim();

    if (!newText) {
        cancelEdit(messageElement); // Si el texto está vacío, cancela la edición
        return;
    }

    // Eliminar todos los mensajes que vinieron después del que se está editando
    let nextElement = messageElement.nextElementSibling;
    while (nextElement) {
        let toRemove = nextElement;
        nextElement = nextElement.nextElementSibling;
        toRemove.remove();
    }
    
    // Restaurar el contenido del mensaje del usuario con el nuevo texto
    const messageBody = messageElement.querySelector('.message-body');
    messageBody.innerHTML = newText.replace(/\n/g, '<br>'); // Reemplazar saltos de línea por <br>
    delete bubble.dataset.originalHtml; // Limpiar el HTML original guardado

    const footer = messageElement.querySelector('.message-footer');
    if(footer) footer.style.display = 'flex'; // Mostrar de nuevo los botones de acción

    // Llamar a sendMessage para obtener una nueva respuesta del bot
    // Pasar el nuevo texto como questionOverride
    sendMessage(newText);
}

/**
 * Crea los botones de Traducir y Resumir para los mensajes del bot.
 * @param {HTMLElement} messageElement 
 */
function createMessageActionButtons(messageElement) {
    let footer = messageElement.querySelector('.message-footer');
    if (!footer) {
        footer = document.createElement('div');
        footer.className = 'message-footer';
        messageElement.appendChild(footer);
    }

    // Contenedor específico para los botones avanzados (traducir, resumir)
    // Esto asegura que no se dupliquen y se manejen aparte de copiar/editar
    let advancedActionsContainer = footer.querySelector('.advanced-actions');
    if (!advancedActionsContainer) {
        advancedActionsContainer = document.createElement('div');
        advancedActionsContainer.className = 'advanced-actions';
        advancedActionsContainer.style.display = 'flex';
        advancedActionsContainer.style.gap = '8px';
        footer.appendChild(advancedActionsContainer);
    } else {
        advancedActionsContainer.innerHTML = ''; // Limpiar para evitar duplicados
    }

    const dropdownContainer = document.createElement('div');
    dropdownContainer.className = 'message-translation-dropdown';

    const toggleButton = document.createElement('button');
    toggleButton.className = 'translate-dropdown-toggle message-action-btn'; // Usar la clase de botón general
    toggleButton.innerHTML = '🌐';
    toggleButton.title = translations[appLanguage].translationToggleTitle;

    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'translate-dropdown-options';

    const messageBody = messageElement.querySelector('.message-body');
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
                if (messageBody.dataset.translationInProgress === "true") return;
                translateMessage(messageElement, langKey);
                optionsDiv.classList.remove('show');
            });
            optionsDiv.appendChild(optionLink);
        }
    }
    
    if (optionsCount > 0) {
        dropdownContainer.appendChild(toggleButton);
        dropdownContainer.appendChild(optionsDiv);
        advancedActionsContainer.appendChild(dropdownContainer);
        
        toggleButton.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.translate-dropdown-options.show').forEach(openDropdown => {
                if (openDropdown !== optionsDiv) {
                    openDropdown.classList.remove('show');
                }
            });
            optionsDiv.classList.toggle('show');
        });
    }

    const summarizeButton = document.createElement('button');
    summarizeButton.className = 'translate-dropdown-toggle message-action-btn'; // Usar la clase de botón general
    summarizeButton.innerHTML = '📄';
    summarizeButton.title = 'Resumir este mensaje';
    summarizeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        summarizeMessage(messageElement);
    });

    advancedActionsContainer.appendChild(summarizeButton);
}


function translateMessage(messageElement, targetLanguage) {
    const messageBody = messageElement.querySelector('.message-body');
    if (!messageBody || messageBody.dataset.translationInProgress === "true") return;

    if (!messageBody.dataset.originalText) {
        messageBody.dataset.originalText = messageBody.innerHTML;
        messageBody.dataset.originalLanguage = messageElement.dataset.currentLanguage || appLanguage;
    }
    
    const textToTranslate = messageBody.dataset.originalText;
    const sourceLanguageForPrompt = messageBody.dataset.originalLanguage;

    messageBody.dataset.translationInProgress = "true";
    messageBody.innerHTML = `<div class="loading-translation">${translations[appLanguage].translating}</div>`;
    
    // Deshabilitar botones mientras se traduce
    const actionBtns = messageElement.querySelectorAll('.message-action-btn');
    actionBtns.forEach(btn => btn.disabled = true);
    
    // Ocultar botones avanzados durante la traducción
    const advancedActions = messageElement.querySelector('.advanced-actions');
    if(advancedActions) advancedActions.style.display = 'none';


    fetch('/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'text/event-stream'
        },
        body: JSON.stringify({
            text: textToTranslate,
            target_language: targetLanguage,
            source_language: sourceLanguageForPrompt 
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errData => {
                throw new Error(errData.error || `HTTP error! status: ${response.status}`);
            });
        }

        messageBody.innerHTML = '';
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let partialData = '';
        let fullTranslatedResponse = "";

        function readStream() {
            reader.read().then(({ done, value }) => {
                if (done) {
                    delete messageBody.dataset.translationInProgress;
                    actionBtns.forEach(btn => btn.disabled = false); // Re-habilitar botones
                    messageBody.dataset.originalText = fullTranslatedResponse;
                    messageElement.dataset.currentLanguage = targetLanguage;
                    createMessageActionButtons(messageElement); // Volver a crear los botones para el nuevo idioma
                    
                    // Asegurar que los botones avanzados se muestran al finalizar
                    if(advancedActions) advancedActions.style.display = 'flex';
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
                                messageBody.innerHTML += data.token;
                                fullTranslatedResponse += data.token;
                            }
                            if (data.error) {
                                console.error("Server error during translation stream:", data.error);
                                messageBody.innerHTML += `<br><span class="stream-error">Error: ${data.error}</span>`;
                            }
                        } catch (e) {
                            console.error("Error parsing translation stream data:", e, "Line:", line);
                        }
                    }
                });
                
                return readStream();
            }).catch(streamError => {
                console.error('Translation stream reading error:', streamError);
                messageBody.innerHTML = messageBody.dataset.originalText;
                delete messageBody.dataset.translationInProgress;
                actionBtns.forEach(btn => btn.disabled = false); // Re-habilitar botones
                if(advancedActions) advancedActions.style.display = 'flex'; // Restaurar si falla
            });
        }
        return readStream();
    })
    .catch(error => {
        console.error('Translation fetch failed:', error);
        messageBody.innerHTML = messageBody.dataset.originalText || "Error during translation.";
        delete messageBody.dataset.translationInProgress;
        const actionBtns = messageElement.querySelectorAll('.message-action-btn');
        actionBtns.forEach(btn => btn.disabled = false); // Re-habilitar botones
        const advancedActions = messageElement.querySelector('.advanced-actions');
        if(advancedActions) advancedActions.style.display = 'flex'; // Restaurar si falla
    });
}

function summarizeMessage(messageElement) {
    const messageBody = messageElement.querySelector('.message-body');
    const originalText = messageBody.dataset.originalText || messageBody.innerHTML;
    const textLanguage = messageElement.dataset.currentLanguage || appLanguage;

    const summaryModal = document.getElementById('summaryModal');
    const summaryModalBody = document.getElementById('summaryModalBody');
    const closeButton = summaryModal.querySelector('.close-modal');

    summaryModalBody.textContent = translations[appLanguage].typing;
    summaryModal.style.display = 'flex';
    setTimeout(() => summaryModal.classList.add('visible'), 10);

    const closeModal = () => {
        summaryModal.classList.remove('visible');
        setTimeout(() => {
            summaryModal.style.display = 'none';
            closeButton.onclick = null;
            window.onclick = null;
        }, 300);
    };

    closeButton.onclick = closeModal;
    window.onclick = (event) => {
        if (event.target == summaryModal) {
            closeModal();
        }
    };

    fetch('/summarize', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'text/event-stream'
        },
        body: JSON.stringify({ 
            text: originalText,
            language: textLanguage 
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let partialData = '';
        let isFirstToken = true;

        function readStream() {
            reader.read().then(({ done, value }) => {
                if (done) {
                    return;
                }

                partialData += decoder.decode(value, { stream: true });
                const lines = partialData.split('\n\n');
                partialData = lines.pop();

                lines.forEach(line => {
                    if (line.startsWith('data: ')) {
                        try {
                            const jsonData = line.substring(6);
                            if (jsonData.trim() === "[DONE]") {
                                return;
                            }
                            
                            const data = JSON.parse(jsonData);
                            
                            if (data.token) {
                                if (isFirstToken) {
                                    summaryModalBody.innerHTML = '';
                                    isFirstToken = false;
                                }
                                summaryModalBody.innerHTML += data.token;
                            }
                            if (data.error) {
                                summaryModalBody.innerHTML = `<span class="stream-error">Error: ${data.error}</span>`;
                            }
                        } catch (e) {
                            console.error("Error parsing stream data:", e, "Line:", line);
                        }
                    }
                });
                
                return readStream();
            });
        }
        
        return readStream();
    })
    .catch(error => {
        console.error('Summarization fetch failed:', error);
        summaryModalBody.textContent = `Error al conectar con el servidor: ${error.message}`;
    });
}


/*
================================================================================
 SECCIÓN 9: LÓGICA PRINCIPAL DEL CHAT
================================================================================
*/

/**
 * Agrega un mensaje del bot al chat.
 * @param {string} message - El contenido del mensaje.
 * @param {boolean} specialEffect - Si se aplica el efecto de tipeo.
 * @returns {HTMLElement} El elemento del mensaje del bot.
 */
function addBotMessage(message, specialEffect = true) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message bot-message';
    messageElement.dataset.originalLanguage = appLanguage;
    messageElement.dataset.currentLanguage = appLanguage;

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';

    const messageBody = document.createElement('div');
    messageBody.className = 'message-body';

    bubble.appendChild(messageBody);
    messageElement.appendChild(bubble);
    chatBox.appendChild(messageElement);

    // Añadir botones de copiar inmediatamente (y otros si los hubiera para bots)
    addMessageActions(messageElement, false);

    setTimeout(() => {
        if (specialEffect === false) {
            messageBody.innerHTML = message;
            chatBox.scrollTop = chatBox.scrollHeight;
            if (message !== translations[appLanguage].greeting && !message.toLowerCase().includes("error")) {
                messageBody.dataset.originalText = messageBody.innerHTML;
                createMessageActionButtons(messageElement); // Traducir/Resumir para bots
            }
        } else {
            let i = 0;
            const baseSpeed = 20;
            const lengthFactor = Math.max(0, Math.min(15, message.length / 20));
            const typingSpeed = Math.max(5, baseSpeed - lengthFactor);

            function typingEffect() {
                if (i < message.length) {
                    messageBody.innerHTML += message.charAt(i++);
                    chatBox.scrollTop = chatBox.scrollHeight;
                    setTimeout(typingEffect, typingSpeed);
                } else {
                    chatBox.scrollTop = chatBox.scrollHeight;
                    if (message !== translations[appLanguage].greeting) {
                        messageBody.dataset.originalText = messageBody.innerHTML;
                        createMessageActionButtons(messageElement); // Traducir/Resumir para bots
                    }
                }
            }
            typingEffect();
        }
    }, 100);
    return messageElement;
}

/**
 * Agrega un mensaje del usuario al chat.
 * @param {string} message - El contenido del mensaje.
 */
function addUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message user-message';

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';

    const messageBody = document.createElement('div');
    messageBody.className = 'message-body';
    messageBody.innerHTML = message.replace(/\n/g, '<br>');

    bubble.appendChild(messageBody);
    messageElement.appendChild(bubble);
    chatBox.appendChild(messageElement);

    // Añadir botones de copiar y editar para mensajes de usuario
    addMessageActions(messageElement, true); 

    chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: 'smooth' });
}


function toggleChatButtons(isGenerating) {
    if (isGenerating) {
        sendButton.style.display = 'none';
        stopButton.style.display = 'inline-block';
        sendButton.disabled = true;
        stopButton.disabled = false;
    } else {
        sendButton.style.display = 'inline-block';
        stopButton.style.display = 'none';
        sendButton.disabled = userInput.value.trim().length === 0;
    }
}

/**
 * Envía un mensaje al asistente y maneja la respuesta en streaming.
 * Permite reenviar una pregunta (por ejemplo, después de editarla).
 * @param {string} [questionOverride=null] - Texto de la pregunta a enviar, si es diferente del input del usuario.
 */
function sendMessage(questionOverride = null) {
    const question = questionOverride ?? userInput.value.trim();
    if (!question) {
        if (!questionOverride) alert(translations[appLanguage].noQuestion);
        return;
    }

    // Solo agregar un nuevo mensaje de usuario si no es una edición
    if (!questionOverride) {
        addUserMessage(question);
        userInput.value = '';
    }

    toggleChatButtons(true);
    abortController = new AbortController();
    
    // --- Creación de la respuesta del bot con la nueva estructura ---
    const botMessageElement = document.createElement('div');
    botMessageElement.className = 'message bot-message';
    botMessageElement.dataset.originalLanguage = appLanguage;
    botMessageElement.dataset.currentLanguage = appLanguage;

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';

    const messageBody = document.createElement('div');
    messageBody.className = 'message-body';
    messageBody.innerHTML = `
        <div class="generating-indicator">
            <div class="generating-loader"></div>
            <div class="generating-text">${translations[appLanguage].typing}</div>
        </div>
    `;
    
    bubble.appendChild(messageBody);
    botMessageElement.appendChild(bubble);
    // Añadir botones de acción (solo copiar al inicio, los demás al final del stream)
    addMessageActions(botMessageElement, false); 

    chatBox.appendChild(botMessageElement);
    chatBox.scrollTop = chatBox.scrollHeight;


    function escapeRegex(string) {
        return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    fetch('/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'text/event-stream' },
        body: JSON.stringify({ question: question, language: appLanguage }),
        signal: abortController.signal
    })
    .then(response => {
        if (!response.ok) {
            if (botMessageElement.parentNode === chatBox) chatBox.removeChild(botMessageElement);
            return response.json().then(errData => { throw new Error(errData.error || `HTTP error! status: ${response.status}`); })
                           .catch(() => { throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`); });
        }
        
        messageBody.innerHTML = ''; // Limpiar el indicador "Generando..."
        messageBody.classList.add('streaming');
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let partialData = '';
        let fullStreamedResponse = "";
        let annotationsData = []; // Para guardar la información de las citas

        function readStream() {
            reader.read().then(({ done, value }) => {
                if (done) {
                    messageBody.classList.remove('streaming');
                    messageBody.dataset.originalText = fullStreamedResponse;

                    if (annotationsData.length > 0) {
                        let currentHtml = messageBody.innerHTML;
                        annotationsData.forEach(ann => {
                            // Codificamos los parámetros para que se puedan enviar en una URL de forma segura.
                            const encodedFilename = encodeURIComponent(ann.file_name);
                            // Asegurarse de que `ann.quote` exista antes de codificarlo
                            const encodedQuote = ann.quote ? encodeURIComponent(ann.quote) : '';

                            // El enlace ahora apunta a nuestro nuevo visor: /view_document
                            // Si no hay quote, el enlace aún se genera pero el visor mostrará todo el doc.
                            const link = `<a href="/view_document?file=${encodedFilename}&quote=${encodedQuote}" target="_blank" class="citation-link" title="Ver cita en: ${ann.file_name}">${ann.text_to_replace}</a>`;
                            
                            const regex = new RegExp(escapeRegex(ann.text_to_replace), 'g');
                            currentHtml = currentHtml.replace(regex, link);
                        });
                        messageBody.innerHTML = currentHtml;
                    }

                    // Después de que el stream termina y se procesan las citas, creamos los botones de acción avanzados.
                    createMessageActionButtons(botMessageElement);
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
                            
                            if (data.type === 'token') {
                                messageBody.innerHTML += data.value;
                                fullStreamedResponse += data.value;
                                chatBox.scrollTop = chatBox.scrollHeight;
                            } else if (data.type === 'annotations') {
                                annotationsData = data.data; // Guardamos los datos de la cita
                            } else if (data.error) {
                                console.error("Server error during stream:", data.error);
                                messageBody.innerHTML += `<br><span class="stream-error">Error: ${data.error}</span>`;
                            }
                        } catch (e) { console.error("Error al parsear datos del stream:", e, "Línea:", line); }
                    }
                });
                return readStream();
            }).catch(streamError => {
                 console.error('Stream reading error:', streamError);
                 if (botMessageElement.parentNode === chatBox) chatBox.removeChild(botMessageElement);
                 addBotMessage(`${translations[appLanguage].error.split("<a")[0]}: Streaming failed.`, false);
            });
        }
        return readStream();
    })
    .catch(error => {
        if (error.name === 'AbortError') {
            console.log('Fetch abortado por el usuario.');
            if (botMessageElement && botMessageElement.parentNode === chatBox) {
                if (messageBody) {
                    messageBody.innerHTML = 'Generación de respuesta detenida por el usuario.';
                    messageBody.classList.remove('streaming');
                }
            }
        } else {
            console.error('Error en Fetch/Ask:', error);
            if (botMessageElement && botMessageElement.parentNode === chatBox) {
                chatBox.removeChild(botMessageElement);
            }
            addBotMessage(`${translations[appLanguage].error.split("<a")[0]}: ${error.message}`, false);
        }
    })
    .finally(() => {
        toggleChatButtons(false);
        abortController = null;
    });
}


/*
================================================================================
 SECCIÓN 10: MANEJADORES DE EVENTOS (EVENT LISTENERS)
================================================================================
*/
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

    userInput.addEventListener('input', () => {
        if (sendButton.style.display !== 'none') {
            sendButton.disabled = userInput.value.trim().length === 0;
        }
    });
    sendButton.disabled = true;

    // Cambiado para llamar a sendMessage() sin argumento por defecto
    sendButton.addEventListener('click', () => sendMessage()); 
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!sendButton.disabled) sendMessage();
        }
    });

    stopButton.addEventListener('click', () => {
        if (abortController) {
            abortController.abort();
            stopButton.disabled = true;
        }
    });

    if (micButton && recognition) {
        micButton.addEventListener('click', () => {
            if (isRecording) {
                recognition.stop();
            } else {
                try {
                    finalTranscript = '';
                    userInput.value = '';
                    recognition.start();
                    isRecording = true;
                    micButton.classList.add('recording');
                    micButton.title = "Stop Recording";
                } catch(e) {
                    console.error("Could not start recognition", e);
                }
            }
        });
    }

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

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
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
        // Cerrar dropdowns de traducción de mensajes si se hace clic fuera
        document.querySelectorAll('.translate-dropdown-options.show').forEach(dropdown => {
            if (!dropdown.closest('.message-translation-dropdown').contains(e.target)) {
                 dropdown.classList.remove('show');
            }
        });

        // Cerrar modales al hacer clic fuera
        if (e.target === helpModal && helpModal.classList.contains('visible')) closeHelpModal();
        if (e.target === settingsModal && settingsModal.classList.contains('visible')) closeSettingsModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Cancelar edición si está activa
            const editingBubble = document.querySelector('.edit-controls');
            if (editingBubble) {
                const messageElement = editingBubble.closest('.message');
                if (messageElement) {
                    cancelEdit(messageElement);
                }
            }

            // Cerrar modales
            if (helpModal.style.display !== 'none' && helpModal.classList.contains('visible')) closeHelpModal();
            if (settingsModal.style.display !== 'none' && settingsModal.classList.contains('visible')) closeSettingsModal();
            
            const summaryModal = document.getElementById('summaryModal');
            if (summaryModal.style.display !== 'none' && summaryModal.classList.contains('visible')) {
                summaryModal.classList.remove('visible');
                setTimeout(() => summaryModal.style.display = 'none', 300);
            }

            // Cerrar dropdowns
            if (languageOptions && languageOptions.classList.contains('show')) languageOptions.classList.remove('show');
            document.querySelectorAll('.translate-dropdown-options.show').forEach(dropdown => dropdown.classList.remove('show'));
        }
    });
});
