/* ==========================================================================
   ANIMATION.JS — scroll-triggered reveals, text splitting
   ========================================================================== */
(function(){
  "use strict";

  /* Split text-reveal elements into spans (per line word wrap) */
  document.querySelectorAll(".text-reveal").forEach(function(el){
    var text=el.textContent;
    el.innerHTML="<span>"+text+"</span>";
  });

  var revealEls=document.querySelectorAll("[data-reveal],[data-reveal-group],.text-reveal");

  if("IntersectionObserver" in window){
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    },{threshold:.15,rootMargin:"0px 0px -60px 0px"});

    revealEls.forEach(function(el){obs.observe(el);});
  }else{
    revealEls.forEach(function(el){el.classList.add("in-view");});
  }
})();
