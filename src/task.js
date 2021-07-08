import WebUI from "./WebUI";
export default class Task{
    constructor(description, date, status = false){
        this.description = description;
        this.date = date;
        this.status = status;
    }

    setDescription(description){
        this.description = description;
    }

    setDate(date){
        this.date = date;
    }

    setStatus(status){
        this.status = status;
    }

    render(){
        const templateClone = WebUI.taskTemplate.cloneNode(true);
        templateClone.querySelector('.task-name').textContent = this.description;
        templateClone.querySelector('.task-date').textContent = this.date;
        templateClone.removeAttribute('id');
        templateClone.removeAttribute('style');
        WebUI.toDoList.append(templateClone);
        if (this.status){
            templateClone.querySelector('.task-status').click();
        }
    }
}