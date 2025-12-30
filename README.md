# InstagramImageDownloadExtension
Extensão para Google Chrome para baixar fotos (e no futuro, vídeos) do Instagram Web

## TO DO
Next steps:

* get the _acaz class -> get the CHILD style width in pixels

* then get the URL index from page (ex.: https://www.instagram.com/p/DR3MRlvAEXg/?img_index=1, in this case it's img_index=1) 

* multiply the index with _acaz width, save this number as PHOTO_INDEX

* then get all the _acaz from querySelectorAll("._acaz");

* then get the _acaz style transform (ex.: translateX(3143px)) 

* check all that returned, the one that fits the number of PHOTO_INDEX, is the element that must be downloaded