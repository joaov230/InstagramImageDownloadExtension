chrome.runtime.onMessage.addListener(async (msg) => {
  if (msg.action === "createZip") {
    const zip = new JSZip();

    msg.images.forEach(img => {
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
