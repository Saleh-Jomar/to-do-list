(()=>{"use strict";class t{static overlay=document.querySelector(".overlay");static addProjectForm=document.querySelector(".add-project-popup");static addProjectButton=document.getElementById("button-add-project");static cancelButton=document.querySelectorAll(".cancel");static addProjectPopup(){t.overlay.classList.toggle("active"),t.addProjectForm.classList.toggle("active")}static Initialize(){window.addEventListener("keydown",(e=>{t.overlay.classList.contains("active")&&"Escape"===e.key&&t.addProjectPopup()})),t.overlay.addEventListener("click",t.addProjectPopup),t.addProjectButton.addEventListener("click",t.addProjectPopup),t.cancelButton.forEach((e=>{e.addEventListener("click",t.addProjectPopup)}))}}(class{static Initialize(){t.Initialize()}}).Initialize()})();