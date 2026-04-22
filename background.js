// Подія при встановленні розширення
chrome.runtime.onInstalled.addListener(() => {
  console.log("DrainStop: Система захисту активована.");
  
  // Створюємо базове налаштування захисту в пам'яті браузера
  chrome.storage.local.set({ protectionActive: true });
});

// Слухач для перехоплення запитів (фундамент для Transaction Simulation)
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    // Якщо сайт намагається відправити дані (POST-запит)
    if (details.method === "POST") {
      console.log("⚠️ Виявлено активність на: " + details.url);
      // Тут ми згодом додамо перевірку на дрейнери та симуляцію балансу
    }
  },
  { urls: ["<all_urls>"] }
);
