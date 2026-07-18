console.log("[TEST-CHEAT] Extension chargée sur", window.location.hostname);

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  // Adapte selon comment ton jeu expose sa connexion WebSocket
  // Hypothèse : le jeu stocke sa socket dans window.gameSocket
  const socket = window.gameSocket;

  if (!socket || socket.readyState !== WebSocket.OPEN) {
    sendResponse({ status: "Erreur : socket du jeu introuvable" });
    return;
  }

  switch (msg.action) {
    case "teleport":
      socket.send(JSON.stringify({
        id: "joueur_001", x: 5000, y: 0, z: 5000, timestamp: Date.now()
      }));
      sendResponse({ status: "Téléportation envoyée" });
      break;

    case "esp_request":
      socket.send(JSON.stringify({ type: "request_all_positions" }));
      sendResponse({ status: "Requête ESP envoyée" });
      break;

    case "spam":
      for (let i = 0; i < 50; i++) {
        socket.send(JSON.stringify({ id: "joueur_001", x: i, y: 0, z: i }));
      }
      sendResponse({ status: "50 messages envoyés (spam)" });
      break;
  }

  return true; // pour la réponse asynchrone
});
