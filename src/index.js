//imports
import './styles.css';
import './forms.css';
import {createTask, createProjectArray, lightDarkButton, renderProjects} from "./toDo.js"

//array of projects
const projects = []

//js for task items
const newTaskButton = document.getElementById("new-task-button")
const newTaskDialog = document.querySelector("#taskDialog")
const newTaskForm = document.querySelector("#taskForm")

newTaskButton.addEventListener("click", () => {newTaskDialog.showModal()})
lightDarkButton(newTaskButton)

//left off here//

//js for project items
const newProjectButton = document.getElementById("new-project-button")
const newProjectDialog = document.querySelector("#projectDialog")
const newProjectForm = document.querySelector("#projectForm")

newProjectButton.addEventListener("click", () => {newProjectDialog.showModal()})
lightDarkButton(newProjectButton)

newProjectForm.addEventListener("submit", (e) => {
    projects.push(createProjectArray(newProjectForm));
    e.preventDefault();
    newProjectForm.reset();
    newProjectDialog.close();
    renderProjects(sidebar, projects, taskViewport)
})

//sidebar js
const sidebar = document.querySelector(".projects")
const taskViewport = document.querySelector(".task-viewport")

