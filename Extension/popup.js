function testing() {
    console.log('This is a popup!');
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs.length > 0) {
            const currentTab = tabs[0];
    
            console.log("Current tab: ", currentTab);
        }
    });
}

document.getElementById('greetButton').addEventListener('click', testing);