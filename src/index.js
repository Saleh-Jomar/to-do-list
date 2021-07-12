import WebUI from "./WebUI";
import Task from "./task";
import Project from "./project";
import Todolist from "./todolist";
import Storage from "./storage";

class Main {
    static TODOLIST = Storage.load()||new Todolist();

    // Task Modifiers
    static inputTask() {
        const description = document.querySelector("#task-name").value;
        const date = document.querySelector("#task-date").value || "No Date";
        return new Task(description, date);
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
        Storage.save(Main.TODOLIST);
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
        Storage.save(Main.TODOLIST);
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
        Storage.save(Main.TODOLIST);
    }

    // Project modifiers
    static inputProject() {
        const name = document.querySelector("#project-name").value;
        return new Project(name);
    }

    static addProject(e) {
        e.preventDefault();
        const newProj = Main.inputProject();
        if (Main.TODOLIST.contains(newProj.name)) {
            alert("You already have a project like this");
            return;
        }
        Main.TODOLIST.add(newProj);
        newProj.render();
        WebUI.closePopup();
        Storage.save(Main.TODOLIST);
    }

    static getCurrProj() {
        const projName = document.getElementById("current-project-title").textContent.trim();
        return Main.TODOLIST.getProject(projName);
    }

    static getProjFromDes(description){
        for (let proj of Main.TODOLIST.projects){
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
        Main.TODOLIST.delete(projName);
        WebUI.homeButton.click();
        Storage.save(Main.TODOLIST);
    }

    static renderProject(e) {
        if (e.target.className != "button-projects") {
            return;
        }
        const projName = e.target.querySelector(".project-name").textContent;
        const project = Main.TODOLIST.getProject(projName);
        WebUI.toDoList.innerHTML = '';
        project.renderTasks();
    }

    static renderHome(e){
        WebUI.toDoList.innerHTML = '';
        Main.TODOLIST.projects.forEach(proj =>{
            proj.renderTasks();
        })
    }

    static initialLoad(){
        Main.TODOLIST.renderProjects();
        WebUI.homeButton.click();
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
        Main.initialLoad();
    }
}

Main.Initialize();