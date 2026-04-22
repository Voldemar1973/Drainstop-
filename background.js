// Константа для детекції сід-фрази (спрощений пошук 12 слів)
const isSeedPhrase = (text) => {
  const words = text.trim().split(/\s+/);
  return words.length === 12 || words.length === 24;
};

chrome.runtime.onInstalled.addListener(() => {
  console.log("DrainStop: Модуль захисту буфера активовано.");
  chrome.storage.local.set({ protectionActive: true });
});

// Функція перевірки буфера обміну
async function checkClipboard() {
  try {
    // Створюємо невидиме поле для "вставки" тексту з буфера
    const input = document.createElement('textarea');
    document.body.appendChild(input);
    input.focus();
    document.execCommand('paste');
    const clipboardContent = input.value;
    document.body.removeChild(input);

    if (isSeedPhrase(clipboardContent)) {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon.png',
        title: '🚨 НЕБЕЗПЕКА: DrainStop',
        message: 'Виявлено сід-фразу в буфері обміну! Будьте обережні, шкідливі сайти можуть її вкрасти.',
        priority: 2
      });
    }
  } catch (err) {
    console.error('Помилка доступу до буфера:', err);
  }
}

// Кожні 5 секунд перевіряємо буфер (для тесту)
setInterval(checkClipboard, 5000);
