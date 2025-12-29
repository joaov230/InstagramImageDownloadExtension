// service-worker.js
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "getHTML" })
      .then(async (response) => {
        if (response.imgURL) {
          if (response.isCarousel) {
            await ensureOffscreen();

            const images = response.imgURL.map(async (url, index) => {
              const res = await fetch(url);
              const blob = await res.blob();
              return {
                name: `instagram_photo-${index + 1}.jpg`,
                blob
              };
            });

            console.log(images);

            chrome.runtime.sendMessage({
              action: "createZip",
              images
            });

          } else {
            chrome.downloads.download({
              url: response.imgURL,
              filename: "images/instagram_photo.jpg", // optional
              saveAs: true                    // prompt user
            });
          }
        }
      });
  });
});

async function ensureOffscreen() {
  const exists = await chrome.offscreen.hasDocument();
  if (!exists) {
    await chrome.offscreen.createDocument({
      url: "./offscreen.html",
      reasons: ["BLOBS"],
      justification: "Zip and download images"
    });
  }
}
