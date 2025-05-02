//imports
import './styles.css';
import './forms.css';
import {createTask, createProjectArray, lightDarkButton, renderProjects, addTaskToProject, updateProjectSelect, renderTasks, changeCursor, updateTitle} from "./toDo.js"

//array of projects
const projects = []

//js for task items
    const newTaskButton = document.getElementById("new-task-button")
    const newTaskDialog = document.querySelector("#taskDialog")
    const newTaskForm = document.querySelector("#taskForm")
    const newTaskFormCloseButton = newTaskForm.querySelector(".dialog-close-button")

    //when you click to create a new task, the form shows and options dynamically update
    newTaskButton.addEventListener("click", () => {
        newTaskDialog.showModal()
        updateProjectSelect(projects)
    })

    lightDarkButton(newTaskButton)
    changeCursor(newTaskButton)

    newTaskFormCloseButton.addEventListener("click", () => {
        newTaskDialog.close()
    })

    //when you submit the new task form, the task is added to the proper project
    newTaskForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const newTask = createTask(newTaskForm)
        addTaskToProject(newTask, projects)
        renderTasks(taskViewport, projects, newTaskForm.querySelector("#parentProject").value)
        updateTitle(newTaskForm.querySelector("#parentProject").value)
        newTaskForm.reset()
        newTaskDialog.close()
    })

//js for project items
    const newProjectButton = document.getElementById("new-project-button")
    const newProjectDialog = document.querySelector("#projectDialog")
    const newProjectForm = document.querySelector("#projectForm")
    const newProjectFormCloseButton = newProjectForm.querySelector(".dialog-close-button")

    //when you click to create a new task, the form shows
    newProjectButton.addEventListener("click", () => {newProjectDialog.showModal()})

    lightDarkButton(newProjectButton)
    changeCursor(newProjectButton)

    newProjectFormCloseButton.addEventListener("click", () => {
        newProjectDialog.close()
    })

    /*when you submit the new project form, the project it added to your array of projects and rendered on the
    screen. In the render function, event listeners are added so that the tasks render on click */
    newProjectForm.addEventListener("submit", (e) => {
        e.preventDefault()
        projects.push(createProjectArray(newProjectForm))
        newProjectForm.reset()
        newProjectDialog.close()
        renderProjects(sidebar, projects, taskViewport)
    })

//sidebar js
const sidebar = document.querySelector(".projects")
const taskViewport = document.querySelector(".task-viewport")

export function deleteTask(project, task) {
    const index = project.projectArray.indexOf(task)
    project.projectArray.splice(index, 1)
    renderTasks(taskViewport, projects, project.title)
}
