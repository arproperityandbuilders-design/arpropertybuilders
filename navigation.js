/* ==========================================================================
   NAVIGATION.JS — mobile menu, search overlay, active link highlighting
   ========================================================================== */
(function(){
  "use strict";

  var hamburger=document.querySelector(".hamburger");
  var mobileNav=document.querySelector(".mobile-nav");

  if(hamburger && mobileNav){
    hamburger.addEventListener("click",function(){
      hamburger.classList.toggle("active");
      mobileNav.classList.toggle("open");
      document.body.style.overflow=mobileNav.classList.contains("open")?"hidden":"";
    });
    mobileNav.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click",function(){
        hamburger.classList.remove("active");
        mobileNav.classList.remove("open");
        document.body.style.overflow="";
      });
    });
  }

  /* ---- Search overlay ---- */
  var searchTrigger=document.querySelector(".search-trigger");
  var searchOverlay=document.querySelector(".search-overlay");
  var searchClose=document.querySelector(".search-close");
  var searchInput=document.querySelector(".search-box input");

  if(searchTrigger && searchOverlay){
    searchTrigger.addEventListener("click",function(){
      searchOverlay.classList.add("open");
      setTimeout(function(){searchInput&&searchInput.focus();},350);
    });
  }
  if(searchClose && searchOverlay){
    searchClose.addEventListener("click",function(){searchOverlay.classList.remove("open");});
  }
  if(searchOverlay){
    searchOverlay.addEventListener("click",function(e){
      if(e.target===searchOverlay) searchOverlay.classList.remove("open");
    });
    document.addEventListener("keydown",function(e){
      if(e.key==="Escape") searchOverlay.classList.remove("open");
    });
  }

  /* ---- Active nav link based on current file ---- */
  var current=(location.pathname.split("/").pop()||"index.html");
  document.querySelectorAll("nav.main-nav a, .mobile-nav a").forEach(function(a){
    var href=a.getAttribute("href");
    if(href===current || (current===""&&href==="index.html")){
      a.classList.add("active");
    }
  });
})();
