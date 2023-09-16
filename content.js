function extractTextContent() {
    const paragraphs = document.querySelectorAll('p'); 
    let textContent = '';
  
    paragraphs.forEach((paragraph) => {
      textContent += paragraph.textContent + ' ';
    });
  
    return textContent.trim();
  }
  chrome.runtime.sendMessage({ summary: extractTextContent() });
  