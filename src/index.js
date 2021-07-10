import WebUI from "./WebUI";
import Task from "./task";
import Project from "./project";

class Main {
    static TODOLIST = [new Project("Home")];

    static inputTask() {
        const description = document.querySelector("#task-name").value;
        const date = document.querySelector("#task-date").value || "No Date";
        return new Task(description, date);
    }

    static inputProject() {
        const name = document.querySelector("#project-name").value;
        return new Project(name);
    }

    static addProject(e) {
        e.preventDefault();
        const newProj = Main.inputProject();
        if (Main.TODOLIST.some((proj) => proj.name === newProj.name)) {
            alert("You already have a project like this");
            return;
        }
        Main.TODOLIST.push(newProj);
        newProj.render();
        WebUI.closePopup();
    }

    static addTask(e) {
        e.preventDefault();
        const newTask = Main.inputTask();
        const project = Main.getCurrProj();
        if (project.contains(newTask.description)) {
            alert("You already made a task like this");
            return;
        }
        project.add(newTask);
        newTask.render();
        WebUI.closePopup();
    }

    static editTaskStatus(e) {
        if (e.target.className != "task-status") {
            return;
        }
        const description = e.target.parentNode.parentNode.querySelector(".task-name").textContent;
        let project = Main.getCurrProj();
        if(project.name == 'Home'){
            project = Main.getProjFromDes(description);
        }
        project.getTask(description).setStatus(e.target.checked);
    }

    static removeTask(e) {
        if (e.target.className != "task-remove") {
            return;
        }
        const description = e.target.parentNode.parentNode.querySelector(".task-name").textContent;
        let project = Main.getCurrProj();
        if(project.name == 'Home'){
            project = Main.getProjFromDes(description);
        }
        project.delete(description);
    }

    static getCurrProj() {
        const projName = document.getElementById("current-project-title").textContent.trim();
        return Main.TODOLIST.find((proj) => proj.name == projName);
    }

    static getProjFromDes(description){
        for (let proj of Main.TODOLIST){
            if (proj.contains(description)){
                return proj
            }
        }
    }

    static removeProject(e) {
        if (e.target.className != "project-remove") {
            return;
        }
        const projName = e.target.parentNode.querySelector(".project-name").textContent;
        const project = Main.TODOLIST.find((project) => project.name == projName);
        const index = Main.TODOLIST.indexOf(project);
        Main.TODOLIST.splice(index, 1);
        WebUI.homeButton.click();
    }

    static renderProject(e) {
        if (e.target.className != "button-projects") {
            return;
        }
        const projName = e.target.querySelector(".project-name").textContent;
        const project = Main.TODOLIST.find((project) => project.name == projName);
        WebUI.toDoList.innerHTML = '';
        project.renderTasks();
    }

    static renderHome(e){
        WebUI.toDoList.innerHTML = '';
        Main.TODOLIST.forEach(proj =>{
            proj.renderTasks();
        })
    }

    static Initialize() {
        WebUI.Initialize();
        WebUI.addTaskForm.addEventListener("submit", Main.addTask);
        WebUI.toDoList.addEventListener("click", Main.editTaskStatus);
        WebUI.toDoList.addEventListener("click", Main.removeTask);
        WebUI.addProjectForm.addEventListener("submit", Main.addProject);
        WebUI.projectList.addEventListener("click", Main.removeProject);
        WebUI.projectList.addEventListener("click", Main.renderProject);
        WebUI.homeButton.addEventListener('click', Main.renderHome);
    }
}

Main.Initialize();