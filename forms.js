/* ==========================================================================
   FORMS.JS — floating labels, live validation, animated submit
   ========================================================================== */
(function(){
  "use strict";

  function validateField(input){
    var group=input.closest(".form-group");
    if(!group) return true;
    var valid=true;

    if(input.hasAttribute("required") && !input.value.trim()){
      valid=false;
    }
    if(input.type==="email" && input.value.trim()){
      var re=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!re.test(input.value.trim())) valid=false;
    }
    if(input.type==="tel" && input.value.trim()){
      var reTel=/^[0-9+\-\s()]{7,}$/;
      if(!reTel.test(input.value.trim())) valid=false;
    }

    group.classList.toggle("error",!valid);
    group.classList.toggle("success",valid && input.value.trim()!=="");
    return valid;
  }

  document.querySelectorAll(".form-group input, .form-group textarea").forEach(function(input){
    input.addEventListener("blur",function(){validateField(input);});
    input.addEventListener("input",function(){
      var group=input.closest(".form-group");
      if(group && group.classList.contains("error")) validateField(input);
    });
  });

  document.querySelectorAll("form[data-ajax]").forEach(function(form){
    form.addEventListener("submit",function(e){
      e.preventDefault();
      var inputs=form.querySelectorAll("input[required],textarea[required]");
      var allValid=true;
      inputs.forEach(function(input){
        if(!validateField(input)) allValid=false;
      });
      if(!allValid){
        window.showToast && window.showToast("Please check the highlighted fields");
        return;
      }

      var submitBtn=form.querySelector('button[type="submit"]');
      if(submitBtn) submitBtn.classList.add("loading");

      var actionUrl=form.getAttribute("action");
      var successBanner=form.querySelector(".form-success-banner") || document.querySelector(".form-success-banner");
      var errorBanner=form.querySelector(".form-error-banner") || document.querySelector(".form-error-banner");

      function onSuccess(){
        if(submitBtn) submitBtn.classList.remove("loading");
        if(successBanner){
          successBanner.classList.add("show");
          setTimeout(function(){successBanner.classList.remove("show");},6000);
        }
        window.showToast && window.showToast("Message sent — we'll reply to your email shortly");
        form.reset();
        form.querySelectorAll(".form-group").forEach(function(g){g.classList.remove("success","error");});
      }
      function onFailure(){
        if(submitBtn) submitBtn.classList.remove("loading");
        if(errorBanner){
          errorBanner.classList.add("show");
          setTimeout(function(){errorBanner.classList.remove("show");},6000);
        }
        window.showToast && window.showToast("Message could not be sent — please call or email us directly");
      }

      // Real submission (e.g. Formspree) when the form has a live action URL.
      if(actionUrl && /^https?:\/\//.test(actionUrl)){
        fetch(actionUrl,{
          method:(form.getAttribute("method")||"POST").toUpperCase(),
          body:new FormData(form),
          headers:{"Accept":"application/json"}
        }).then(function(res){
          if(res.ok) onSuccess(); else onFailure();
        }).catch(onFailure);
      }else{
        // No live endpoint configured — simulate for local preview only.
        setTimeout(onSuccess,1200);
      }
    });
  });
})();
