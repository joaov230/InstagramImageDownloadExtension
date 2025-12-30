// service-worker.js
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "getHTML" })
      .then(async (response) => {
        if (response.imgURL) {
          if (response.isCarousel) {
            await setupOffscreenDocument();

            console.log ('response.imgURL: ', response.imgURL);
            Promise.all(response.imgURL.map(async function (url, index) {
              const res = await fetch(url);
              const blob = await res.blob();

              console.log ('blob array: ', {
                name: `instagram_photo-${index + 1}.jpg`,
                blob
              });

              return {
                name: `instagram_photo-${index + 1}.jpg`,
                blob
              };
            })).then((results) => {
              console.log('images: ', results);
  
              chrome.runtime.sendMessage({
                action: "createZip",
                results
              });
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


let creating;
async function setupOffscreenDocument() {
  const offscreenUrl = chrome.runtime.getURL("./offscreen.html");
  const existingContexts = await chrome.runtime.getContexts({
    contextTypes: ['OFFSCREEN_DOCUMENT'],
    documentUrls: [offscreenUrl]
  });

  if (existingContexts.length > 0) {
    return;
  }

  // create offscreen document
  if (creating) {
    await creating;
  } else {
    creating = chrome.offscreen.createDocument({
      url: "./offscreen.html",
      reasons: ["BLOBS"],
      justification: "Zip and download images"
    });

    await creating;
    creating = null;

    setTimeout(async () => {
      await chrome.offscreen.closeDocument();
    }, 300000);
  }
}


function getVisibleMedia() {
  const media = Array.from(
    document.querySelectorAll("article img, article video")
  );

  let best = null;
  let bestRatio = 0;

  for (const el of media) {
    const rect = el.getBoundingClientRect();
    const visibleWidth = Math.max(
      0,
      Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0)
    );
    const visibleHeight = Math.max(
      0,
      Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
    );

    const visibleArea = visibleWidth * visibleHeight;
    const totalArea = rect.width * rect.height;
    const ratio = totalArea ? visibleArea / totalArea : 0;

    if (ratio > bestRatio) {
      bestRatio = ratio;
      best = el;
    }
  }

  return best; // currently visible image or video
}
