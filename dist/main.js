(()=>{"use strict";class t{static overlay=document.querySelector(".overlay");static addProjectForm=document.querySelector(".add-project-popup");static addTaskForm=document.querySelector(".add-task-popup");static addProjectButton=document.getElementById("button-add-project");static addTaskButton=document.getElementById("add-task-button");static cancelButton=document.querySelectorAll(".cancel");static projDefaultBut=document.querySelectorAll(".button-default");static toDoList=document.querySelector("#to-do-list");static projectList=document.querySelector("#Project-List");static homeButton=document.querySelector("#button-home");static taskTemplate=document.getElementById("Template");static addProjectPopup(){t.addProjectForm.reset(),t.overlay.classList.add("active"),t.addProjectForm.classList.add("active")}static addTaskPopup(){t.addTaskForm.reset(),t.overlay.classList.add("active"),t.addTaskForm.classList.add("active")}static closePopup(){t.overlay.classList.remove("active"),t.addProjectForm.classList.remove("active"),t.addTaskForm.classList.remove("active")}static displayProjectTitle(t){const e=document.querySelector("#current-project-title");if("button-projects"!=t.target.className&&"button-default"!=t.target.className)return;const a="button-projects"==t.target.className?t.target.querySelector("div").innerHTML:t.target.innerHTML;e.innerHTML=a}static changeStatus(t){const e=t.target.parentNode.querySelector(".task-name"),a=t.target.parentNode.parentNode.querySelector(".task-date");t.target.checked?(e.innerHTML=`<s>${e.textContent}</s>`,a.innerHTML=`<s>${a.textContent}</s>`):(e.innerHTML=`${e.textContent}`,a.innerHTML=`${a.textContent}`)}static removeTask(e){const a=e.target.parentNode.parentNode;t.toDoList.removeChild(a)}static removeProject(e){const a=e.target.parentNode;t.projectList.removeChild(a)}static taskDisplayModify(e){switch(e.target.className){case"task-status":t.changeStatus(e);break;case"task-remove":t.removeTask(e)}}static projDisplayModify(e){switch(e.target.className){case"button-projects":t.displayProjectTitle(e);break;case"project-remove":t.removeProject(e)}}static Initialize(){window.addEventListener("keydown",(e=>{t.overlay.classList.contains("active")&&"Escape"===e.key&&t.closePopup()})),t.overlay.addEventListener("click",t.closePopup),t.addProjectButton.addEventListener("click",t.addProjectPopup),t.addTaskButton.addEventListener("click",t.addTaskPopup),t.cancelButton.forEach((e=>{e.addEventListener("click",t.closePopup)})),t.projectList.addEventListener("click",t.projDisplayModify),t.projDefaultBut.forEach((e=>{e.addEventListener("click",t.displayProjectTitle)})),t.toDoList.addEventListener("click",t.taskDisplayModify)}}class e{constructor(t,e,a=!1){this.description=t,this.date=e,this.status=a}setDescription(t){this.description=t}setDate(t){this.date=t}setStatus(t){this.status=t}render(){const e=t.taskTemplate.cloneNode(!0);e.querySelector(".task-name").textContent=this.description,e.querySelector(".task-date").textContent=this.date,e.removeAttribute("id"),e.removeAttribute("style"),t.toDoList.append(e),this.status&&e.querySelector(".task-status").click()}}class a{constructor(t,e=[]){this.name=t,this.tasks=e}getTask(t){return this.tasks.find((e=>e.description===t))}contains(t){return this.tasks.some((e=>e.description===t))}add(t){this.tasks.push(t)}delete(t){const e=this.tasks.find((e=>e.description===t));this.tasks.splice(this.tasks.indexOf(e),1)}render(){const e=document.getElementById("demo-project").cloneNode(!0);e.querySelector(".project-name").textContent=this.name,e.removeAttribute("id"),e.removeAttribute("style"),t.projectList.append(e)}renderTasks(){this.tasks.forEach((t=>t.render()))}}class s{static TODOLIST=[new a("Home")];static inputTask(){const t=document.querySelector("#task-name").value,a=document.querySelector("#task-date").value||"No Date";return new e(t,a)}static inputProject(){const t=document.querySelector("#project-name").value;return new a(t)}static addProject(e){e.preventDefault();const a=s.inputProject();s.TODOLIST.some((t=>t.name===a.name))?alert("You already have a project like this"):(s.TODOLIST.push(a),a.render(),t.closePopup())}static addTask(e){e.preventDefault();const a=s.inputTask(),r=s.getCurrProj();r.contains(a.description)?alert("You already made a task like this"):(r.add(a),a.render(),t.closePopup())}static editTaskStatus(t){if("task-status"!=t.target.className)return;const e=t.target.parentNode.parentNode.querySelector(".task-name").textContent;let a=s.getCurrProj();"Home"==a.name&&(a=s.getProjFromDes(e)),a.getTask(e).setStatus(t.target.checked)}static removeTask(t){if("task-remove"!=t.target.className)return;const e=t.target.parentNode.parentNode.querySelector(".task-name").textContent;let a=s.getCurrProj();"Home"==a.name&&(a=s.getProjFromDes(e)),a.delete(e)}static getCurrProj(){const t=document.getElementById("current-project-title").textContent.trim();return s.TODOLIST.find((e=>e.name==t))}static getProjFromDes(t){for(let e of s.TODOLIST)if(e.contains(t))return e}static removeProject(e){if("project-remove"!=e.target.className)return;const a=e.target.parentNode.querySelector(".project-name").textContent,r=s.TODOLIST.find((t=>t.name==a)),o=s.TODOLIST.indexOf(r);s.TODOLIST.splice(o,1),t.homeButton.click()}static renderProject(e){if("button-projects"!=e.target.className)return;const a=e.target.querySelector(".project-name").textContent,r=s.TODOLIST.find((t=>t.name==a));t.toDoList.innerHTML="",r.renderTasks()}static renderHome(e){t.toDoList.innerHTML="",s.TODOLIST.forEach((t=>{t.renderTasks()}))}static Initialize(){t.Initialize(),t.addTaskForm.addEventListener("submit",s.addTask),t.toDoList.addEventListener("click",s.editTaskStatus),t.toDoList.addEventListener("click",s.removeTask),t.addProjectForm.addEventListener("submit",s.addProject),t.projectList.addEventListener("click",s.removeProject),t.projectList.addEventListener("click",s.renderProject),t.homeButton.addEventListener("click",s.renderHome)}}s.Initialize()})();