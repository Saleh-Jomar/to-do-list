import Project from "./project";
export default class Todolist{
    constructor(name, projects = []){
        this.projects = projects;
        this.projects.push(new Project('Home'))
    }

    setProjects(projects){
        this.projects = projects;
    }

    getProject(name){
        return this.projects.find(proj => proj.name == name);
    }

    contains(name){
        return this.projects.some(proj => proj.name == name);
    }

    add(project){
        this.projects.push(project);
    }

    delete(projectName){
        const projToDelete = this.getProject(projectName);
        this.projects.splice(this.projects.indexOf(projToDelete), 1);
    }

    renderProjects(){
        this.projects.forEach(proj =>{
            if(proj.name != 'Home'){
                proj.render();
            }
        })
    }
}