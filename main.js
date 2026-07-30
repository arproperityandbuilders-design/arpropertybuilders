/* ==========================================================================
   MAIN.JS — global boot, header state, scroll progress, cursor glow
   ========================================================================== */
(function(){
  "use strict";

  /* ---- Loading screen ---- */
  window.addEventListener("load",function(){
    var loader=document.getElementById("loading-screen");
    if(loader){
      setTimeout(function(){loader.classList.add("hidden");},650);
    }
  });

  /* ---- Page transition veil (on internal link clicks) ---- */
  var veil=document.getElementById("page-veil");
  document.addEventListener("click",function(e){
    var a=e.target.closest("a");
    if(!a) return;
    var href=a.getAttribute("href");
    if(!href||href.startsWith("#")||href.startsWith("http")||href.startsWith("mailto")||href.startsWith("tel")||a.target==="_blank") return;
    if(!href.endsWith(".html")) return;
    e.preventDefault();
    if(veil){
      veil.classList.add("leaving");
      setTimeout(function(){window.location.href=href;},260);
    }else{
      window.location.href=href;
    }
  });

  /* ---- Scroll progress bar ---- */
  var progress=document.getElementById("scroll-progress");
  var header=document.querySelector(".site-header");
  var backTop=document.getElementById("back-to-top");

  function onScroll(){
    var scrollTop=window.scrollY||document.documentElement.scrollTop;
    var height=document.documentElement.scrollHeight-document.documentElement.clientHeight;
    var pct=height>0?(scrollTop/height)*100:0;
    if(progress) progress.style.width=pct+"%";
    if(header){
      if(scrollTop>40) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    }
    if(backTop){
      if(scrollTop>500) backTop.classList.add("show");
      else backTop.classList.remove("show");
    }
  }
  window.addEventListener("scroll",onScroll,{passive:true});
  onScroll();

  if(backTop){
    backTop.addEventListener("click",function(){
      window.scrollTo({top:0,behavior:"smooth"});
    });
  }

  /* ---- Cursor glow (desktop only) ---- */
  var glow=document.getElementById("cursor-glow");
  if(glow && matchMedia("(hover:hover)").matches){
    var gx=0,gy=0,cx=0,cy=0;
    window.addEventListener("mousemove",function(e){gx=e.clientX;gy=e.clientY;});
    (function loop(){
      cx+=(gx-cx)*.12; cy+=(gy-cy)*.12;
      glow.style.left=cx+"px"; glow.style.top=cy+"px";
      requestAnimationFrame(loop);
    })();
  }

  /* ---- Ripple effect on buttons ---- */
  document.addEventListener("click",function(e){
    var btn=e.target.closest(".btn,.chip,.pagination button");
    if(!btn) return;
    var rect=btn.getBoundingClientRect();
    var ripple=document.createElement("span");
    var size=Math.max(rect.width,rect.height);
    ripple.className="ripple";
    ripple.style.width=ripple.style.height=size+"px";
    ripple.style.left=(e.clientX-rect.left-size/2)+"px";
    ripple.style.top=(e.clientY-rect.top-size/2)+"px";
    btn.appendChild(ripple);
    setTimeout(function(){ripple.remove();},650);
  });

  /* ---- Toast helper (exposed globally) ---- */
  window.showToast=function(msg){
    var wrap=document.getElementById("toast-wrap");
    if(!wrap) return;
    var t=document.createElement("div");
    t.className="toast";
    t.innerHTML='<span class="dot"></span><span>'+msg+"</span>";
    wrap.appendChild(t);
    requestAnimationFrame(function(){t.classList.add("show");});
    setTimeout(function(){
      t.classList.remove("show");
      setTimeout(function(){t.remove();},500);
    },3400);
  };

  /* ---- Mouse-reactive hero parallax shapes ---- */
  var parallaxEls=document.querySelectorAll("[data-parallax]");
  if(parallaxEls.length && matchMedia("(hover:hover)").matches){
    window.addEventListener("mousemove",function(e){
      var px=(e.clientX/window.innerWidth-.5);
      var py=(e.clientY/window.innerHeight-.5);
      parallaxEls.forEach(function(el){
        var depth=parseFloat(el.getAttribute("data-parallax"))||10;
        el.style.transform="translate("+(px*depth)+"px,"+(py*depth)+"px)";
      });
    });
  }

  /* ---- Scroll parallax for hero visual on scroll ---- */
  var scrollParallax=document.querySelectorAll("[data-scroll-parallax]");
  if(scrollParallax.length){
    window.addEventListener("scroll",function(){
      var y=window.scrollY;
      scrollParallax.forEach(function(el){
        var speed=parseFloat(el.getAttribute("data-scroll-parallax"))||.15;
        el.style.transform="translateY("+(y*speed)+"px)";
      });
    },{passive:true});
  }
})();
