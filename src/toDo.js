//code for project and task objects
    export function createTask(form) {
        const title = form.querySelector("#title").value;
        const description = form.querySelector("#description").value;
        const dueDate = form.querySelector("#dueDate").value;
        const priority = form.querySelector("#priority").value;
        const parentProject = form.querySelector("#parentProject").value;

        return {title, description, dueDate, priority, parentProject}
    }

    export function addTaskToProject(task, projectArray) {
        projectArray.forEach((project) => {
            if (task.parentProject == project.title) {
                project.projectArray.push(task)
            }
        })
    }

    export function createProjectArray(form) {
        let projectArray = []
        const title = form.querySelector("#projectTitle").value;

        return {title, projectArray}
    }

//user interface functionality (stuff that's not necessary but looks nice)
    export function lightDarkButton(button) {
        button.addEventListener("mouseenter", () => {
            button.style.filter = "brightness(80%)"})
        button.addEventListener("mouseleave", () => {
            button.style.filter = "brightness(100%)"})    
    }

    function updateTitle(title) {
        const projectTitle = document.querySelector(".tasks-title")
        projectTitle.innerHTML 
        = `<p>Your Tasks > ${title} <p>`
        }

//real functionality
    export function updateProjectSelect(projects) {
        const projectSelect = document.querySelector("#parentProject")
        projectSelect.innerHTML = " "

        projects.forEach((project) => {
            const option = document.createElement("option")
            option.value = project.title
            option.textContent = project.title
            projectSelect.appendChild(option)
        })
    }

    export function renderTasks(taskViewport, project) {
        taskViewport.innerHTML = ""
        project.projectArray.forEach((task) => {
            const newTaskElement = document.createElement("div")
            newTaskElement.classList.add("task")

            newTaskElement.innerHTML = `${task.title}`

            //add edit, delete event listeners, display

            taskViewport.appendChild(newTaskElement)
        })
    }

    export function renderProjects(sidebar, projects, taskViewport) {
        sidebar.innerHTML = "<p>Your Projects</p>"

        projects.forEach(project => {
            const projectElement = document.createElement("p")
            projectElement.textContent = project.title
            projectElement.classList.add("project-item")

            projectElement.addEventListener("click", () => {
                renderTasks(taskViewport, project)
                updateTitle(project.title)
            })

            projectElement.style.borderBottom = ("2px solid black")
            sidebar.appendChild(projectElement)
        });
    }