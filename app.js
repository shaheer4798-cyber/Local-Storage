
const form = document.getElementById("form")
const inp = document.getElementById("input")
const btn = document.getElementById("btn")
const div = document.getElementById("dynamic-div")

let editId = null;
let allTasks = []
class TodoObj {
    constructor(title, id) {
        this.title = title;
        this.id = id;
    }
}

btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (inp.value == "") {
        alert("Enter A Task First")
        return;
    }
    if (editId !== null) {
        const editing = allTasks.find((Task) => {
            return Task.id === editId;
        })
        editing.title = inp.value
        localStorage.setItem("Tasks", JSON.stringify(allTasks))
        inp.value = "";
        btn.innerText = "Add Task";
        editId = null;
        getTasks()
    }
    else {
        const obj = new TodoObj(inp.value, Date.now());
        allTasks.push(obj)
        localStorage.setItem("Tasks", JSON.stringify(allTasks))

        const parentDiv = document.createElement("div");
        const Task = document.createElement("h4");
        const childDiv = document.createElement("div");
        const editBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");
        
        Task.innerText = inp.value;
        editBtn.innerText = "Edit";
        deleteBtn.innerText = "Delete";
        div.appendChild(parentDiv)
        parentDiv.appendChild(Task)
        parentDiv.appendChild(childDiv)
        childDiv.appendChild(deleteBtn)
        childDiv.appendChild(editBtn)
        parentDiv.style.border = "1px solid rgb(145, 145, 145)";
        parentDiv.style.borderRadius = "10px";
        parentDiv.style.backgroundColor = "rgb(255, 255, 255)";
        Task.style.color = "black";
        parentDiv.style.display = "flex";
        childDiv.style.display = "flex";
        childDiv.style.gap = "10px";
        parentDiv.style.alignItems = "center";
        parentDiv.style.justifyContent = "space-between";
        parentDiv.style.padding = "2.5%"
        parentDiv.style.paddingTop = "0%"
        parentDiv.style.paddingBottom = "0%"
        parentDiv.style.margin = "2.5%"
        inp.value = "";
        
        
        deleteBtn.addEventListener("click", function () {
            div.removeChild(parentDiv)
            allTasks = allTasks.filter(function (Task) {
                return Task.id !== obj.id;;
            });
            localStorage.setItem("Tasks", JSON.stringify(allTasks))
            // localStorage.removeItem("Tasks")
        })
        
        editBtn.addEventListener("click", function (event) {
            event.preventDefault();
            editId = obj.id
            inp.value = obj.title
            btn.innerText = "Update"
        })
    }})

const getTasks = () => {
    const data = JSON.parse(localStorage.getItem("Tasks"))
    if (data) {
        allTasks = data;
        div.innerHTML = "";
        data.forEach((Task) => {
        const parentDiv = document.createElement("div");
        const title = document.createElement("h4");
        const childDiv = document.createElement("div");
        const editBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");

        title.innerText = Task.title;
        editBtn.innerText = "Edit";
        deleteBtn.innerText = "Delete";
        div.appendChild(parentDiv)
        parentDiv.appendChild(title)
        parentDiv.appendChild(childDiv)
        childDiv.appendChild(deleteBtn)
        childDiv.appendChild(editBtn)
        parentDiv.style.border = "1px solid rgb(145, 145, 145)";
        parentDiv.style.borderRadius = "10px";
        parentDiv.style.backgroundColor = "rgb(255, 255, 255)";
        title.style.color = "black";
        parentDiv.style.display = "flex";
        childDiv.style.display = "flex";
        childDiv.style.gap = "10px";
        parentDiv.style.alignItems = "center";
        parentDiv.style.justifyContent = "space-between";
        parentDiv.style.padding = "2.5%"
        parentDiv.style.paddingTop = "0%"
        parentDiv.style.paddingBottom = "0%"
        parentDiv.style.margin = "2.5%"
        inp.value = "";
        
        deleteBtn.addEventListener("click", function () {
            div.removeChild(parentDiv)
            allTasks = allTasks.filter(function (Todo) {
                return Todo.id !== Task.id;
            })
            localStorage.setItem("Tasks", JSON.stringify(allTasks))
        })

        editBtn.addEventListener("click", function (event) {
            event.preventDefault();
            editId = Task.id
            inp.value = Task.title
            btn.innerText = "Update"
        })
})}}

getTasks()

