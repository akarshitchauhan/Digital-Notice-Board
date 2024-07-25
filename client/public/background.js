// Background script for Chrome extension

// Function to handle authentication
const authenticate = () => {
  chrome.identity.getAuthToken({ interactive: true }, (token) => {
    if (chrome.runtime.lastError || !token) {
      console.error("Failed to get token:", chrome.runtime.lastError);
      return;
    }

    console.log("Token obtained:", token);
    // Send the token to your server or use it as needed
    fetch("http://localhost:4000/google/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Server response:", data);
      })
      .catch((error) => {
        console.error("Error sending token to server:", error);
      });
  });
};

// Add a listener for clicks on the extension's action (toolbar icon)
chrome.action.onClicked.addListener(authenticate);
