import WebUI from "./WebUI";
import Task from "./task";

class Main {
    static project = [];

    static inputTask(){
        const description = document.querySelector('#task-name').value;
        const date = document.querySelector('#task-date').value||'No Date'
        return new Task(description,date)
    }

    static addTask(e){
        e.preventDefault();
        const newTask = Main.inputTask();
        if (Main.project.some((task) => task.description === newTask.description)){
            alert('You already made a task like this')
            return;
        }
        Main.project.push(newTask);
        newTask.render();
        WebUI.closePopup();
    }

    static editTaskStatus(e){
        if(e.target.className != 'task-status'){return};
        const description = e.target.parentNode.parentNode.querySelector('.task-name').textContent;
        const task = Main.project.find(task=>task.description===description);
        task.setStatus(e.target.checked);
    }

    static Initialize(){
        WebUI.Initialize();
        WebUI.addTaskForm.addEventListener('submit',Main.addTask);
        WebUI.toDoList.addEventListener('click',Main.editTaskStatus);
    }
}

Main.Initialize();