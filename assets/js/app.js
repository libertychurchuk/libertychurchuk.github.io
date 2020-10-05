// -----------------------------------------------------------------------------
// FontFaceObserver support
// -----------------------------------------------------------------------------

// Fonts are loaded through @font-face rules in the CSS whenever an element
// references them. FontFaceObserver creates a referencing element to trigger
// the font request, and listens for font load events.
// When all fonts are loaded, we enable them by adding a class to the html
// element

(function( w ){
// if the class is already set, we're good.
if( w.document.documentElement.className.indexOf( "fonts-loaded" ) > -1 ){
  return;
}
var fontA = new w.FontFaceObserver( "lovetime_cleanregular", {
});

w.Promise
  .all([fontA.check()])
  .then(function(){
    w.document.documentElement.className += "fonts-loaded";
  });
}( this ));


// -----------------------------------------------------------------------------
// Fluidvid support
// -----------------------------------------------------------------------------

fluidvids.init({
  selector: ["iframe"],
  players: ["www.youtube.com", "player.vimeo.com"]
});

// -----------------------------------------------------------------------------
// Mediabox light box support
// -----------------------------------------------------------------------------

MediaBox('.mediabox');

// -----------------------------------------------------------------------------
// Off Canvas Navigation
// -----------------------------------------------------------------------------

var offCanvasMenu = document.querySelector(".off-canvas-wrapper");
var openMenu = document.querySelector(".js-nav-open");
var closeMenu = document.querySelectorAll(".js-nav-close");
var preventScroll = document.querySelector("body");
var offCanvasLinks = document.querySelectorAll(".off-canvas__link");

// Open menu
openMenu.onclick = function () {
  "use strict";
  offCanvasMenu.classList.toggle("is-visible");
  offCanvasMenu.setAttribute('aria-expanded', 'true');
  offCanvasLinks.forEach(element => {
    element.removeAttribute('tabindex');
  });
  preventScroll.classList.toggle("off-canvas-no-scroll");
};

// Close Menu
for (var i = 0; i < closeMenu.length; i++) {
  closeMenu[i].addEventListener("click", function(event) {
    "use strict";
    offCanvasMenu.classList.toggle("is-visible");
    offCanvasMenu.setAttribute('aria-expanded', 'false');
    offCanvasLinks.forEach(element => {
      element.setAttribute('tabindex', -1);
    });
    offCanvasMenu.setAttribute('tabindex', -1);
    preventScroll.classList.toggle("off-canvas-no-scroll");
  });
}

// -----------------------------------------------------------------------------
// Faithlife Reftagger
// -----------------------------------------------------------------------------

var refTagger = {
  settings: {
    bibleVersion: "ESV",			
    roundCorners: true,
    socialSharing: [],
    customStyle : {
      heading: {
        backgroundColor : "#313640",
        color : "#f2f2f2",
        fontSize : "14px"
      },
      body   : {
        color : "#555555"
      }
    }
  }
};

(function(d, t) {
  var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
  g.src = "//api.reftagger.com/v2/RefTagger.js";
  s.parentNode.insertBefore(g, s);
}(document, "script"));

// -----------------------------------------------------------------------------
// Glide Slider
// -----------------------------------------------------------------------------

var glide = new Glide('.glide', {
  type: 'carousel',
  autoplay: 3000,
  hoverpause: true,
  perView: 2,
  gap: 0,
  breakpoints: {
    1024: {
      perView: 2
    },
    600: {
      perView: 1
    }
  }
})

glide.mount()