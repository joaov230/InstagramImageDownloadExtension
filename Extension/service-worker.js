// service-worker.js
chrome.action.onClicked.addListener(async (tab) => {
  const injectionResults = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: getPageDOM, // Function to inject and execute
    args: ['body'] // Optional arguments passed to the injected function
  });

  // injectionResults is an array, where results[0].result is the return value
  const pageHTML = injectionResults[0].result;
  console.log("Active Tab HTML:", pageHTML);
});

// This function is run inside the context of the active page
function getPageDOM(selector) {
  let element = document.querySelector(selector);
  return element ? element.outerHTML : "Element not found";
}