chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
  console.log('Offscreen received message:', request);

  if (request.action === "createZip") {
    const zip = new JSZip();

    request.images.forEach(img => {
      zip.file(img.name, img.blob);
    });

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(zipBlob);

    chrome.downloads.download({
      url,
      filename: "images.zip",
      saveAs: true
    });

    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }
});
