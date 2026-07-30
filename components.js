/* ==========================================================================
   COMPONENTS.JS — accordion, tabs, chips, modal, testimonial slider
   ========================================================================== */
(function(){
  "use strict";

  /* ---- Accordion ---- */
  document.querySelectorAll(".accordion-item").forEach(function(item){
    var head=item.querySelector(".accordion-head");
    var body=item.querySelector(".accordion-body");
    if(!head||!body) return;
    head.addEventListener("click",function(){
      var isOpen=item.classList.contains("open");
      item.closest(".accordion")?.querySelectorAll(".accordion-item.open").forEach(function(other){
        if(other!==item){
          other.classList.remove("open");
          other.querySelector(".accordion-body").style.maxHeight=null;
        }
      });
      if(isOpen){
        item.classList.remove("open");
        body.style.maxHeight=null;
      }else{
        item.classList.add("open");
        body.style.maxHeight=body.scrollHeight+"px";
      }
    });
  });

  /* ---- FAQ live search ---- */
  var faqSearch=document.getElementById("faq-search");
  if(faqSearch){
    faqSearch.addEventListener("input",function(){
      var q=faqSearch.value.toLowerCase();
      document.querySelectorAll(".accordion-item").forEach(function(item){
        var text=item.textContent.toLowerCase();
        item.style.display=text.includes(q)?"":"none";
      });
    });
  }

  /* ---- Tabs ---- */
  document.querySelectorAll(".tabs-nav").forEach(function(nav){
    var buttons=nav.querySelectorAll("button");
    var panelWrap=nav.parentElement.querySelectorAll(".tab-panel");
    buttons.forEach(function(btn){
      btn.addEventListener("click",function(){
        buttons.forEach(function(b){b.classList.remove("active");});
        panelWrap.forEach(function(p){p.classList.remove("active");});
        btn.classList.add("active");
        var target=nav.parentElement.querySelector('[data-tab-panel="'+btn.getAttribute("data-tab")+'"]');
        if(target) target.classList.add("active");
      });
    });
  });

  /* ---- Filter chips (projects/properties/news) ---- */
  document.querySelectorAll(".filter-chips").forEach(function(chipRow){
    var chips=chipRow.querySelectorAll(".chip");
    var itemsSelector=chipRow.getAttribute("data-target");
    var items=itemsSelector?document.querySelectorAll(itemsSelector):[];
    chips.forEach(function(chip){
      chip.addEventListener("click",function(){
        chips.forEach(function(c){c.classList.remove("active");});
        chip.classList.add("active");
        var filter=chip.getAttribute("data-filter");
        items.forEach(function(item){
          if(filter==="all"||item.getAttribute("data-category")===filter){
            item.style.display="";
            item.style.animation="fadeUp .6s var(--ease-out)";
          }else{
            item.style.display="none";
          }
        });
      });
    });
  });

  /* ---- Modal (project details) ---- */
  var modalOverlay=document.querySelector(".modal-overlay");
  if(modalOverlay){
    var modalBox=modalOverlay.querySelector(".modal-box");
    document.querySelectorAll("[data-modal-open]").forEach(function(trigger){
      trigger.addEventListener("click",function(){
        var title=trigger.getAttribute("data-title")||"Project Details";
        var desc=trigger.getAttribute("data-desc")||"";
        var meta=trigger.getAttribute("data-meta")||"";
        modalBox.querySelector(".modal-title").textContent=title;
        modalBox.querySelector(".modal-desc").textContent=desc;
        modalBox.querySelector(".modal-meta").textContent=meta;
        modalOverlay.classList.add("open");
        document.body.style.overflow="hidden";
      });
    });
    modalOverlay.querySelector(".modal-close").addEventListener("click",closeModal);
    modalOverlay.addEventListener("click",function(e){
      if(e.target===modalOverlay) closeModal();
    });
    document.addEventListener("keydown",function(e){
      if(e.key==="Escape") closeModal();
    });
    function closeModal(){
      modalOverlay.classList.remove("open");
      document.body.style.overflow="";
    }
  }

  /* ---- Testimonial slider (text-only, arrow controlled) ---- */
  document.querySelectorAll(".testi-track").forEach(function(track){
    var wrapper=track.closest(".testi-wrapper");
    if(!wrapper) return;
    var prev=wrapper.querySelector(".testi-prev");
    var next=wrapper.querySelector(".testi-next");
    var cardWidth=function(){
      var card=track.querySelector(".testi-card");
      return card?card.offsetWidth+24:340;
    };
    next && next.addEventListener("click",function(){
      track.scrollBy({left:cardWidth(),behavior:"smooth"});
    });
    prev && prev.addEventListener("click",function(){
      track.scrollBy({left:-cardWidth(),behavior:"smooth"});
    });
  });

  /* ---- Property/Project search filter by keyword ---- */
  document.querySelectorAll("[data-live-search]").forEach(function(input){
    var targetSelector=input.getAttribute("data-live-search");
    var items=document.querySelectorAll(targetSelector);
    input.addEventListener("input",function(){
      var q=input.value.toLowerCase();
      items.forEach(function(item){
        item.style.display=item.textContent.toLowerCase().includes(q)?"":"none";
      });
    });
  });
})();
