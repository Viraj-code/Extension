document.addEventListener("DOMContentLoaded", function () {
    const getSummaryButton = document.getElementById("getSummary");
    const summaryResult = document.getElementById("summaryResult");
  
    getSummaryButton.addEventListener("click", function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTab = tabs[0];
        chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          function: extractTextContent,
        });
      });
    });
  
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
      if (message.text) {
        summarizeWithChatGPT(message.text)
          .then((summary) => {
            summaryResult.textContent = summary;
          })
          .catch((error) => {
            console.error(error);
            summaryResult.textContent = "Failed to summarize text.";
          });
      }
    });
  
    // summary request to chatpgt 
    async function summarizeWithChatGPT(text) {
      const apiKey = "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"; 
      const maxTokens = 300; 
  
      const response = await fetch("https://api.openai.com/v1/engines/text-davinci-002/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: text,
          max_tokens: maxTokens,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        return data.choices[0].text;
      } else {
        throw new Error("Failed to summarize text with ChatGPT API");
      }
    }
  });
  