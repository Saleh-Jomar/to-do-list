export default class WebUI {

    static overlay = document.querySelector('.overlay');
    static addProjectForm = document.querySelector('.add-project-popup');
    static addTaskForm = document.querySelector('.add-task-popup');
    static addProjectButton = document.getElementById('button-add-project');
    static addTaskButton = document.getElementById('add-task-button');
    static cancelButton = document.querySelectorAll('.cancel');
    static projDefaultBut = document.querySelectorAll('.button-default')

    static toDoList = document.querySelector('#to-do-list');
    static projectList = document.querySelector('#Project-List');

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
        const content = e.target.innerHTML;
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

    static renderTask(e){
        e.preventDefault();
        const description = document.querySelector('#task-name').value;
        const date = document.querySelector('#task-date').value||'No Date';

        const templateClone = document.getElementById('Template').cloneNode(true);
        templateClone.querySelector('.task-name').textContent = description;
        templateClone.querySelector('.task-date').textContent = date;
        templateClone.removeAttribute('id');
        templateClone.removeAttribute('style');

        WebUI.toDoList.append(templateClone);
        WebUI.closePopup();
    }
    
    static renderProject(e){
        e.preventDefault();
        const description = document.querySelector('#project-name').value;
        const templateClone = document.getElementById('demo-project').cloneNode(true);
        templateClone.querySelector('.project-name').textContent = description;
        templateClone.removeAttribute('id');
        templateClone.removeAttribute('style');
        WebUI.projectList.append(templateClone);
        WebUI.closePopup();

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

        //Change Project Title Event
        WebUI.projectList.addEventListener('click',WebUI.displayProjectTitle);
        WebUI.projDefaultBut.forEach(button =>{
            button.addEventListener('click',WebUI.displayProjectTitle);
        })


        //Task Display Modifier Events
        WebUI.toDoList.addEventListener('click',WebUI.taskDisplayModify);
        WebUI.addTaskForm.addEventListener('submit',WebUI.renderTask);
        WebUI.addProjectForm.addEventListener('submit',WebUI.renderProject);
    }    
}

