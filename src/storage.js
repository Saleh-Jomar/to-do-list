import Task from "./task";
import Project from "./project";
import Todolist from "./todolist";

export default class Storage{
    static save(todolist){
        localStorage.setItem('todolist',JSON.stringify(todolist))
    }

    static load(){
        const todolist = Object.assign(
            new Todolist(), 
            JSON.parse(localStorage.getItem('todolist')))

        todolist.setProjects(todolist.projects.map(proj => Object.assign(new Project, proj)))

        todolist.projects.forEach(proj =>{
            proj.setTasks(proj.tasks.map(task => Object.assign(new Task(), task)));
        })

        return todolist;
    }
}