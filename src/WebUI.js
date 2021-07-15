export default class WebUI {
    // DOM CACHE
    static overlay = document.querySelector('.overlay');
    static addProjectForm = document.querySelector('.add-project-popup');
    static addTaskForm = document.querySelector('.add-task-popup');
    static addProjectButton = document.getElementById('button-add-project');
    static addTaskButton = document.getElementById('add-task-button');
    static cancelButton = document.querySelectorAll('.cancel');
    static projDefaultBut = document.querySelectorAll('.button-default')
    static timeFilter = document.querySelectorAll('.time-button');

    static toDoList = document.querySelector('#to-do-list');
    static projectList = document.querySelector('#Project-List');

    static homeButton = document.querySelector('#button-home');

    static taskTemplate = document.getElementById('Template');
    // DOM Methods
    static addProjectPopup(){
        WebUI.addProjectForm.reset();
        WebUI.overlay.classList.add('active');
        WebUI.addProjectForm.classList.add('active');
    }
    static addTaskPopup(){
        WebUI.addTaskForm.reset();
        WebUI.overlay.classList.add('active');
        WebUI.addTaskForm.classList.add('active');
    }
    static closePopup(){
        WebUI.overlay.classList.remove('active');
        WebUI.addProjectForm.classList.remove('active');
        WebUI.addTaskForm.classList.remove('active');
    }

    static displayProjectTitle(e){
        const projectTitle = document.querySelector('#current-project-title')
        const content = e.target.className=='button-projects'? e.target.querySelector('div').innerHTML:
        e.target.innerHTML;
        projectTitle.innerHTML = content;
    }

    static changeStatus(e){
        const description = e.target.parentNode.querySelector('.task-name')
        const date = e.target.parentNode.parentNode.querySelector('.task-date')
        if(e.target.checked){
            description.innerHTML = `<s>${description.textContent}</s>`
            date.innerHTML = `<s>${date.textContent}</s>`
        }
        else{
            description.innerHTML = `${description.textContent}`
            date.innerHTML = `${date.textContent}`
        }
    }
    
    static removeTask(e){
        const task = e.target.parentNode.parentNode;
        WebUI.toDoList.removeChild(task);
    }

    static removeProject(e){
        const proj = e.target.parentNode;
        WebUI.projectList.removeChild(proj);
    }

    static taskDisplayModify(e){
        const property = e.target.className;
        switch(property){
            case 'task-status':
                WebUI.changeStatus(e);
                break;
            case 'task-remove':
                WebUI.removeTask(e);
                break;
        }
    }

    static projDisplayModify(e){
        const property = e.target.className;
        switch(property){
            case 'button-projects':
                WebUI.displayProjectTitle(e);
                break;
            case 'project-remove':
                WebUI.removeProject(e);
                break;
        }
    }

    static Initialize(){
        //Form Popup Events
        window.addEventListener('keydown', (e) => {
            if (WebUI.overlay.classList.contains('active') && (e.key === "Escape")) WebUI.closePopup();
        });
        WebUI.overlay.addEventListener('click',WebUI.closePopup);
        WebUI.addProjectButton.addEventListener('click',WebUI.addProjectPopup);
        WebUI.addTaskButton.addEventListener('click', WebUI.addTaskPopup);
        WebUI.cancelButton.forEach(button => {
            button.addEventListener('click',WebUI.closePopup);
        })

        //Project Display Modifier Events
        WebUI.projectList.addEventListener('click',WebUI.projDisplayModify);
        WebUI.projDefaultBut.forEach(button =>{
            button.addEventListener('click',WebUI.displayProjectTitle);
        });

        WebUI.projectList.addEventListener('click',(e)=>{
            if(e.target.className != 'button-projects'){return}
            WebUI.addTaskButton.classList.remove('active');
        });

        WebUI.homeButton.addEventListener('click', ()=>{
            WebUI.addTaskButton.classList.remove('active');
        });

        WebUI.timeFilter.forEach(button =>{
            button.addEventListener('click',()=>{
                WebUI.addTaskButton.classList.add('active');
            })
        })

        //Task Display Modifier Events
        WebUI.toDoList.addEventListener('click',WebUI.taskDisplayModify);
    }    
}

