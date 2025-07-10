

const API_URL = 'https://todoapp-0in7.onrender.com/todos';
// Add a new todo to the DOM
function addTodoToDOM(todo) {
    const todoList=document.getElementById("todo-list");

    const newtodo=document.createElement("li");
    newtodo.classList.add("newtodo");

    const newtodocontent=document.createElement("div");
    newtodocontent.classList.add("newtodocontent");
    newtodocontent.textContent=todo.todocontent;

    const delbutton=document.createElement("button");
    delbutton.textContent="Delete";
    delbutton.dataset.id = todo.id;

    delbutton.addEventListener("click",()=>{
        deleteTodo(todo.id);
    });

    newtodo.appendChild(newtodocontent);
    newtodo.appendChild(delbutton);

    todoList.appendChild(newtodo);

    
    
}
// Fetch todos from backend
async function fetchTodos() {

    const response=await fetch("http://localhost:3001/todos");
    const data= await response.json();
    for(let i=0;i<data.length;i++){
                addTodoToDOM(data[i]);
    };


    
    
  
}

// Fetch existing todos when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchTodos();
});





// Add a new todo backend server data
document.getElementById('add-todo-btn').addEventListener('click', () => {
    const todocontent=document.getElementById("todo-input").value;
    
    if(!todocontent){
        alert("input field empty");
    }
    else{

        const newTodo={
            todocontent:todocontent
        }
        async function post(){
           const response=await fetch(API_URL, {
                method: 'POST',
                headers: {
                   'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTodo),
            })

            const data=await response.json();
            addTodoToDOM(data);
        }
        post();
        

    }





});



// Delete a todo
async function deleteTodo(id) {
    
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });

    if (response.status === 204) {
        
        const todoList = document.getElementById("todo-list");
        const items = todoList.getElementsByTagName("li");
        for (let item of items) {
            if (item.querySelector("button").dataset.id == id) {
                todoList.removeChild(item);
                break;
            }
        }
    } else {
        alert("Failed to delete todo");
    }
}



