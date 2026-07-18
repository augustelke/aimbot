function log(msg) {
  document.getElementById("log").textContent += msg + "\n";
}

async function sendToPage(action) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { action }, (response) => {
    log(response?.status || "Envoyé");
  });
}

document.getElementById("btnTeleport").addEventListener("click", () => sendToPage("teleport"));
document.getElementById("btnEsp").addEventListener("click", () => sendToPage("esp_request"));
document.getElementById("btnSpam").addEventListener("click", () => sendToPage("spam"));
