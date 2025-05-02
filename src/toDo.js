import { deleteTask } from "."

//code for project and task objects
    export function createTask(form) {
        const title = form.querySelector("#title").value
        const description = form.querySelector("#description").value
        const dueDate = form.querySelector("#dueDate").value
        const priority = form.querySelector("#priority").value
        const parentProject = form.querySelector("#parentProject").value

        const realDueDate = new Date(dueDate)
        const today = new Date()

        today.setHours(0, 0, 0, 0)

        if(realDueDate < today) {
            alert("Invalid date")
        }

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

    export function updateTitle(title) {
        const projectTitle = document.querySelector(".tasks-title")
        projectTitle.innerHTML 
        = `<p>Your Tasks > ${title} <p>`
        }
    
    export function changeCursor(item) {
        item.addEventListener("mouseenter", () => {
            item.style.cursor = "pointer"
        })
        item.addEventListener("mouseleave", () => {
            item.style.cursor = "default"
        })
    }

    function changeSize(item) {
        item.addEventListener("mouseenter", () => {
            item.style.transform = "scale(1.1)"
        })
        item.addEventListener("mouseleave", () => {
            item.style.transform = "scale(1)"
        })
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
    
    function displayTaskDetails(taskElement, task) {
        const dialog = document.getElementById("taskDetailsDialog")
        const content = dialog.querySelector(".dialog-content")
    
        taskElement.addEventListener("click", () => {
            content.innerHTML = `
                <button class="dialog-close-button">×</button>
                <p><strong>Title:</strong> ${task.title}</p>
                <p><strong>Description:</strong> ${task.description}</p>
                <p><strong>Due:</strong> ${task.dueDate}</p>
                <p><strong>Priority:</strong> ${task.priority}</p>
            `;
    
            dialog.showModal()
    
            // Add close functionality to the X button only
            const closeButton = content.querySelector(".dialog-close-button")
            closeButton.addEventListener("click", () => {
                dialog.close()
            })
        })
    }

    /*function deleteTask(project, task) {
        const index = project.projectArray.indexOf(task)
        project.projectArray.splice(index, 1)
        renderTasks(taskViewport, projects, project.title)
    }*/

    export function renderTasks(taskViewport, projects, parentProjectTitle) {
            taskViewport.innerHTML = ""
    
            projects.forEach((project) => {
                if (project.title === parentProjectTitle) {
                    project.projectArray.forEach((task) => {
                        const newTaskElement = document.createElement("div")
                        newTaskElement.classList.add("task")
                        newTaskElement.innerHTML = `<p>${task.title}</p> <p class="task-delete-btn">x</p>`
                        newTaskElement.style.fontWeight = "200"
                        newTaskElement.style.display = "flex"
                        newTaskElement.style.justifyContent = "space-between"
                        const taskDeleteButton = newTaskElement.querySelector(".task-delete-btn")
                        taskDeleteButton.addEventListener("click", (e) => {
                            e.stopPropagation();
                            deleteTask(project, task)
                        })

                        //add edit, delete event listeners, display
                        changeCursor(newTaskElement)
                        changeSize(newTaskElement)
                        displayTaskDetails(newTaskElement, task)
            
                        taskViewport.appendChild(newTaskElement)
                    })
                }
            });
        }

    export function renderProjects(sidebar, projects, taskViewport) {
        sidebar.innerHTML = "<p>Your Projects</p>"

        projects.forEach(project => {
            const projectElement = document.createElement("p")
            projectElement.textContent = project.title
            projectElement.classList.add("project-item")

            projectElement.addEventListener("click", () => {
                renderTasks(taskViewport, projects, project.title)
                updateTitle(project.title)
            })

            projectElement.addEventListener("mouseenter", () => {
                projectElement.style.color = "grey";
                projectElement.style.borderBottom = "2px solid grey";
                projectElement.style.cursor = "pointer";
            })

            projectElement.addEventListener("mouseleave", () => {
                projectElement.style.color = "black";
                projectElement.style.borderBottom = "2px solid black";
                projectElement.style.cursor = "default";
            })

            projectElement.style.borderBottom = "2px solid black"
            projectElement.style.fontWeight = "200"
            sidebar.appendChild(projectElement)
        });
    }