export default class WebUI {

    static overlay = document.querySelector('.overlay');
    static addProjectForm = document.querySelector('.add-project-popup');
    static addProjectButton = document.getElementById('button-add-project');
    static cancelButton = document.querySelectorAll('.cancel');
    
    static addProjectPopup(){
        WebUI.overlay.classList.toggle('active');
        WebUI.addProjectForm.classList.toggle('active');
    }

    static Initialize(){
        window.addEventListener('keydown', (e) => {
            if (WebUI.overlay.classList.contains('active') && (e.key === "Escape")) WebUI.addProjectPopup();
        });
        WebUI.overlay.addEventListener('click',WebUI.addProjectPopup);
        WebUI.addProjectButton.addEventListener('click',WebUI.addProjectPopup);
        WebUI.cancelButton.forEach(button => {
            button.addEventListener('click', WebUI.addProjectPopup);
        })
    }    
}

