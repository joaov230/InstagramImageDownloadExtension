chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === "getHTML") {

    const isCarouselPhoto = document.querySelectorAll("._aagu._aato").length > 0;

    let imgURL = null;
    let isCarousel = isCarouselPhoto;

    if (isCarouselPhoto) {
      const popupImages = document.querySelectorAll("._aagu._aato ._aagv");

      imgURL = [];
      for (img of popupImages) {
        imgURL.push(img.children[0].src);
      }
      
    } else {
      imgURL = document.querySelectorAll("._aagv")[0].children[0].src;
    }

    // imgURL can be a string or an array of strings, depending on "isCarousel" value
    // isCarousel == true, then imgURL is an array
    // isCarousel == false, then imgURL is a string
    sendResponse({ isCarousel: isCarousel, imgURL: imgURL });
  }
});