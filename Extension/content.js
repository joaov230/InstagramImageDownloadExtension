chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getHTML") {

    const isPopupPhoto = document.querySelectorAll("._aagu._aato").length > 0;

    let imgURL = null;
    let isPopup = isPopupPhoto;

    if (isPopupPhoto) {
      const popupImages = document.querySelectorAll("._aagu._aato ._aagv");

      imgURL = [];
      for (img of popupImages) {
        imgURL.push(img.children[0].src);
      }
      
    } else {
      imgURL = document.querySelectorAll("._aagv")[0].children[0].src;
    }

    // imgURL can be a string or an array of strings, depending on "isPopup" value
    // isPopup == true, then imgURL is an array
    // isPopup == false, then imgURL is a string
    sendResponse({ isPopup: isPopup, imgURL: imgURL });
  }
});