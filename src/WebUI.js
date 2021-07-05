export default class WebUI {

    static overlay = document.querySelector('.overlay');
    static addProjectForm = document.querySelector('.add-project-popup');
    static addProjectButton = document.getElementById('button-add-project');
    static projectsButton = document.querySelectorAll('.button-default, .button-projects');
    
    static addProjectPopup(){
        WebUI.addProjectForm.reset();
        WebUI.overlay.classList.toggle('active');
        WebUI.addProjectForm.classList.toggle('active');
    }

    static displayProjectTitle(e){
        const projectTitle = document.querySelector('#current-project-title')
        projectTitle.innerHTML = e.target.innerHTML;
    }

    static Initialize(){
        //ADD PROJECT POPUP EVENTS
        window.addEventListener('keydown', (e) => {
            if (WebUI.overlay.classList.contains('active') && (e.key === "Escape")) WebUI.addProjectPopup();
        });
        WebUI.overlay.addEventListener('click',WebUI.addProjectPopup);
        WebUI.addProjectButton.addEventListener('click',WebUI.addProjectPopup);
        WebUI.addProjectForm.addEventListener('submit', (e)=>{
            e.preventDefault();
            WebUI.addProjectPopup();
        })

        //Change Project Title Event
        WebUI.projectsButton.forEach(button => {
            button.addEventListener('click', WebUI.displayProjectTitle);
        })
    }    
}

