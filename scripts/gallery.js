"use strict";

window.addEventListener("load", createLightbox);

function createLightbox() {
   // Find the target container in your HTML
   let lightBox = document.getElementById("lightbox");

   // 1. Create the Gallery Title
   let lbTitle = document.createElement("h1");
   lbTitle.id = "lbTitle";
   lbTitle.textContent = lightboxTitle;
   lightBox.appendChild(lbTitle);

   // 2. Create the Navigation Box (The container for buttons)
   let lbNavBox = document.createElement("div");
   lbNavBox.id = "lbNavBox";
   lightBox.appendChild(lbNavBox);

   // 3. Create the Buttons (Prev, Play, Next)
   let lbPrev = document.createElement("div");
   lbPrev.id = "lbPrev"; 
   lbPrev.innerHTML = "◀";
   lbPrev.onclick = showPrev;

   let lbPlay = document.createElement("div");
   lbPlay.id = "lbPlay"; 
   lbPlay.innerHTML = "⏯";

   let lbNext = document.createElement("div");
   lbNext.id = "lbNext";
   lbNext.innerHTML = "▶";
   lbNext.onclick = showNext;

   // Add buttons into the NavBox so they stay together
   lbNavBox.appendChild(lbPrev);
   lbNavBox.appendChild(lbPlay);
   lbNavBox.appendChild(lbNext);

   // 4. Create the Images Strip
   let lbImages = document.createElement("div");
   lbImages.id = "lbImages";
   lightBox.appendChild(lbImages);

   // 5. Create the Counter
   let lbCounter = document.createElement("div");
   lbCounter.id = "lbCounter"; 
   let currentImg = 1;
   lbCounter.textContent = currentImg + " / " + imgCount;
   lightBox.appendChild(lbCounter);

   // Slideshow Logic for Play/Pause
   let timeID;
   lbPlay.onclick = function() {
      if (timeID) {
         window.clearInterval(timeID);
         timeID = undefined;
      } else {
         showNext();
         timeID = window.setInterval(showNext, 1500);
      }
   }

   // Add images from the data array
   for (let i = 0; i < imgCount; i++) {
      let image = document.createElement("img");
      image.src = imgFiles[i];
      image.alt = imgCaptions[i];
      image.onclick = createOverlay;
      lbImages.appendChild(image);
   }
   
   function showNext() {
      lbImages.appendChild(lbImages.firstElementChild);
      (currentImg < imgCount) ? currentImg++ : currentImg = 1;
      lbCounter.textContent = currentImg + " / " + imgCount;
   }
   
   function showPrev() {
      lbImages.insertBefore(lbImages.lastElementChild, lbImages.firstElementChild);
      (currentImg > 1) ? currentImg-- : currentImg = imgCount;
      lbCounter.textContent = currentImg + " / " + imgCount;
   }
   
   function createOverlay() {
      let overlay = document.createElement("div");
      overlay.id = "lbOverlay";
      overlay.style.display = "flex"; // Show the overlay
      
      let figureBox = document.createElement("figure");
      overlay.appendChild(figureBox);
      
      let overlayImage = this.cloneNode(true);
      figureBox.appendChild(overlayImage);

      let overlayCaption = document.createElement("figcaption");
      overlayCaption.textContent = this.alt;
      figureBox.appendChild(overlayCaption);
      
      let closeBox = document.createElement("div");
      closeBox.id = "lbOverlayClose";
      closeBox.innerHTML = "&times;";
      closeBox.onclick = function() {
         document.body.removeChild(overlay);
      }      
      overlay.appendChild(closeBox);
      
      document.body.appendChild(overlay);
   }   
}
