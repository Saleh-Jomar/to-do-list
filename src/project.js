import WebUI from "./WebUI";
export default class Project{
    constructor(name, tasks=[]){
        this.name = name;
        this.tasks = tasks;
    }

    getTask(description){
        return this.tasks.find(task => task.description === description);
    }

    contains(description){
        return this.tasks.some(task => task.description === description);
    }

    add(task){
        this.tasks.push(task);
    }

    delete(taskName) {
        const taskToDelete = this.tasks.find((task) => task.description === taskName);
        this.tasks.splice(this.tasks.indexOf(taskToDelete), 1);
      }

    render(){
        const templateClone = document.getElementById('demo-project').cloneNode(true);
        templateClone.querySelector('.project-name').textContent = this.name;
        templateClone.removeAttribute('id');
        templateClone.removeAttribute('style');
        WebUI.projectList.append(templateClone);
    }

    renderTasks(){
        this.tasks.forEach(task => task.render());
    }
}