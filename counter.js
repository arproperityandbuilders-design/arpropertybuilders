/* ==========================================================================
   COUNTER.JS — animated number counting & progress bars
   ========================================================================== */
(function(){
  "use strict";

  function animateCounter(el){
    var target=parseFloat(el.getAttribute("data-count"));
    var suffix=el.getAttribute("data-suffix")||"";
    var duration=1600;
    var startTime=null;

    function step(ts){
      if(!startTime) startTime=ts;
      var progress=Math.min((ts-startTime)/duration,1);
      var eased=1-Math.pow(1-progress,3);
      var value=Math.floor(eased*target);
      el.textContent=value.toLocaleString()+suffix;
      if(progress<1) requestAnimationFrame(step);
      else el.textContent=target.toLocaleString()+suffix;
    }
    requestAnimationFrame(step);
  }

  var counters=document.querySelectorAll("[data-count]");
  var progressBars=document.querySelectorAll(".progress-fill");

  if("IntersectionObserver" in window){
    var counterObs=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          animateCounter(entry.target);
          counterObs.unobserve(entry.target);
        }
      });
    },{threshold:.5});
    counters.forEach(function(c){counterObs.observe(c);});

    var progObs=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          var el=entry.target;
          el.style.width=el.getAttribute("data-progress")+"%";
          progObs.unobserve(el);
        }
      });
    },{threshold:.4});
    progressBars.forEach(function(p){progObs.observe(p);});
  }else{
    counters.forEach(function(c){c.textContent=c.getAttribute("data-count");});
    progressBars.forEach(function(p){p.style.width=p.getAttribute("data-progress")+"%";});
  }
})();
