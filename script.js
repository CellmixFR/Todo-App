//*********Selectors*************
let input = document.getElementById('input');
let ul = document.getElementById('ul');

let all = document.getElementById("all");
let active = document.getElementById("active");
let completed = document.getElementById("completed");
let clearCompleted = document.getElementById("clear_completed");

let dynamicNumber = document.getElementById("dynamic_number");
// let count = document.querySelector("ul").children.length;

//**************Add Input Content********
input.addEventListener('keydown', function (e) {  
    if (e.key === 'Enter') {
        e.preventDefault();
        createToDoDiv(input.value, true);
    }
})

function createToDoDiv(InputValue, writeToLocalStorage) {
    //Create div
    let toDoDiv = document.createElement("div");
    toDoDiv.classList.add("todo_div");
    ul.appendChild(toDoDiv);

    //Create li
    let li = document.createElement("li");
    li.classList.add("todo_item");
    toDoDiv.appendChild(li);

    //button "check"
    let icon_check = document.createElement("button");
    icon_check.innerHTML = '<img class="icon_check" src="images/icon-check.svg" alt="icon check">';
    icon_check.classList.add("button_icon_check");
    toDoDiv.appendChild(icon_check);

    //button "cross"
    let icon_cross = document.createElement("button");
    icon_cross.innerHTML = '<img class="icon_cross" src="images/icon-cross.svg" alt="icon cross">';
    icon_cross.classList.add("button_icon_cross");
    toDoDiv.appendChild(icon_cross);

    li.innerHTML = InputValue;
    input.value = ""; //reset input

    if(localStorage.getItem(InputValue)== "true"){
        li.classList.add("complete");
        icon_check.classList.add("complete");
    }

    if (writeToLocalStorage == true){
        saveToDoInLocalStorage(InputValue);
    }
    //Functions calls 
    completeToDo(icon_check, li);
    deleteToDo(toDoDiv, icon_cross, ul, li.innerHTML);
    showAllToDo(toDoDiv);
    showActiveToDo(toDoDiv, li);
    showCompletedToDo(toDoDiv, li);
    deleteCompletedToDo(toDoDiv, li, ul, li.innerHTML);
    updateCountItemsLeft(li);  
}

//*************Functions**************/

function completeToDo(Icon_check, Li) {
    Icon_check.addEventListener('click', completedToDo);
    function completedToDo() {
        todo = Li.innerHTML;
        localStorage.setItem(todo, !Li.classList.contains('complete'));
        Li.classList.toggle("complete");
        Icon_check.classList.toggle("complete");
        updateCountItemsLeft(Li);
    }
}

function deleteToDo(ToDoDiv, Icon_cross, Ul, key) {
    Icon_cross.addEventListener('click', () => {
        Ul.removeChild(ToDoDiv);
        removeLocalTodos(key);
        updateCountItemsLeft();
    })
}

function showAllToDo(ToDoDiv) {
    all.addEventListener("click", () => {
        ToDoDiv.style.display = "flex"; 
        changeColorofLinks(all, active, completed);
    })
}

function showActiveToDo(ToDoDiv, Li) {

    active.addEventListener("click", () => {
        changeColorofLinks(active, all, completed);
        if (!Li.classList.contains('complete')) {
            ToDoDiv.style.display = "flex"; /*The element is visible...*/
        } else {
            ToDoDiv.style.display = "none"; /*...else the element is hidden*/
        }
    })
}

function showCompletedToDo(ToDoDiv, Li) {
    completed.addEventListener("click", () => {
        changeColorofLinks(completed, active, all);
        if (Li.classList.contains('complete')) {
            ToDoDiv.style.display = "flex";
        } else {
            ToDoDiv.style.display = "none";
        }
    })
}

function deleteCompletedToDo(ToDoDiv, Li, Ul, key) {
    clearCompleted.addEventListener("click", () => {
        if (Li.classList.contains('complete')) {
            Ul.removeChild(ToDoDiv);
            removeLocalTodos(key)
        } else {
            ToDoDiv.style.display = "flex";
        }
        
    })
}

function updateCountItemsLeft() {
    let lis = document.getElementById("todo_div").getElementsByTagName("li");
    console.log(lis);
    let itemsLeft = 0;
    for (let i = 0; i < lis.length; i++) {
        if (!lis[i].classList.contains("complete")){
            itemsLeft++;
        }
    }
    document.getElementById("dynamic_number").innerHTML = itemsLeft;
}


function changeColorofLinks(ColoredLink, NormalLink1, NormalLink2) {
    ColoredLink.style.color = "rgb(58, 123, 253)";
    NormalLink1.style.color = "hsl(236, 9%, 61%)";
    NormalLink2.style.color = "hsl(236, 9%, 61%)";
}

//************************************/

// Save todos in local storage 
function saveToDoInLocalStorage(todo) {
    localStorage.setItem(todo, false); //La méthode setItem(), lorsque lui sont passées le duo clé-valeur, les ajoute à l'emplacement de stockage, sinon elle met à jour la valeur si la clé existe déjà.
}

document.addEventListener("DOMContentLoaded", getToDo); //Dès que la page se charge, on appelle la fonction

function getToDo() {
    // Pour chaque clé :
    //   Récupérer la clé (qui correspond à une todo)
    //   Récupérér son été (true ou false qui correspond à complété ou non)
    //   Afficher le todo dans la div et le li et défini la classe complete si il vaut true

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        createToDoDiv(key, false);
    }
}

//Delete todos in local storage
function removeLocalTodos(key) {
  localStorage.removeItem(key);
}

//*****************Dark Mode********************

//Selectors 
let moon = document.getElementById("moon");
let body = document.getElementById("body");
let footer = document.getElementById("footer");
let sun = document.getElementById("sun");
let form = document.getElementById("form");

//When we click on the moon --> we add the "dark_mode" class 
moon.addEventListener("click", () => {
    body.classList.add("dark_mode");
    footer.classList.add("dark_mode");
    ul.classList.add("dark_mode");
    input.classList.add("dark_mode");
    moon.classList.add("dark_mode");
    sun.classList.add("dark_mode");
    form.classList.add("dark_mode");

});

//When we click on the sun --> we remove the "dark_mode" class 
sun.addEventListener("click", () => {
    body.classList.remove("dark_mode");
    footer.classList.remove("dark_mode");
    ul.classList.remove("dark_mode");
    input.classList.remove("dark_mode");
    moon.classList.remove("dark_mode");
    sun.classList.remove("dark_mode");
    form.classList.remove("dark_mode");
});


