export function createTask(form) {
    const title = form.querySelector("#title").value;
    const description = form.querySelector("#description").value;
    const dueDate = form.querySelector("#dueDate").value;
    const priority = form.querySelector("#priority").value;
    return {title, description, dueDate, priority}
}

export function createProjectArray(form) {
    let projectArray = []
    const title = form.querySelector("#projectTitle").value;

    function addToProject(item) {
        projectArray.push(item);
    }

    function removeFromProject(item) {
        projectArray = projectArray.filter(element => element !== item);
    }

    return {title, projectArray, addToProject, removeFromProject}
}

export function lightDarkButton(button) {
    button.addEventListener("mouseenter", () => {
        button.style.filter = "brightness(80%)"})
      button.addEventListener("mouseleave", () => {
        button.style.filter = "brightness(100%)"})    
}

//left off here
export function renderTasks(taskViewport, project) {
    taskViewport.innerHTML = "<p>Your Tasks</p>"
    project.projectArray.forEach((task) => {
        const taskElement = document.createElement("div")
        taskElement.innerHTML = `Title: ${task.title} Description: ${task.description} 
        Due: ${task.dueDate} Priority: ${task.priority}`
        taskElement.classList.add("task-item")
        taskViewport.appendChild(taskElement)
    })
}

export function renderProjects(sidebar, projects, taskViewport) {
    sidebar.innerHTML = "<p>Your Projects</p>"

    projects.forEach(project => {
        const projectElement = document.createElement("p")
        projectElement.textContent = project.title
        projectElement.classList.add("project-item")
        projectElement.addEventListener("click", () => renderTasks(taskViewport, project))
        sidebar.appendChild(projectElement)
    });
}