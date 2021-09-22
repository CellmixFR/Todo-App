//Selectors
let input = document.getElementById('input');
let ul = document.getElementById('ul');

let all = document.getElementById("all");
let active = document.getElementById("active");
let completed = document.getElementById("completed");

let dynamicNumber = document.getElementById("dynamic_number");
let count = document.querySelector("ul").children.length;

let etat="";

input.addEventListener('keydown', function (e) {  //keypress est maintenant obsolète
    if (e.key === 'Enter') {
        e.preventDefault();
        createToDoDiv(input.value);
    }
})

function createToDoDiv(InputValue) {
    //Création de la div
    let toDoDiv = document.createElement("div");
    toDoDiv.classList.add("todo_div");
    ul.appendChild(toDoDiv);

    //Création de la li
    let li = document.createElement("li");
    li.classList.add("todo_item");
    toDoDiv.appendChild(li);
    saveToDoInLocalStorage(input.value);

    //ajout du bouton "icon_check"
    let icon_check = document.createElement("button");
    icon_check.innerHTML = '<img class="icon_check" src="images/icon-check.svg" alt="icon check">';
    icon_check.classList.add("button_icon_check");
    toDoDiv.appendChild(icon_check);

    //Ajout du bouton "cross"
    let icon_cross = document.createElement("button");
    icon_cross.innerHTML = '<img class="icon_cross" src="images/icon-cross.svg" alt="icon cross">';
    icon_cross.classList.add("button_icon_cross");
    toDoDiv.appendChild(icon_cross);

    //On veut que le texte du li soit égal au texte de l'input
    li.innerHTML = InputValue;
    input.value = ""; //On réinitialise l'input

    completeToDo(icon_check, li);
    deleteToDo(toDoDiv, icon_cross, ul);
    showAllToDo(toDoDiv);
    showActiveToDo(toDoDiv, li);
    showCompletedToDo(toDoDiv, li);
    deleteCompletedToDo(toDoDiv, li, ul);
    updateCountItemsLeft();
};

function completeToDo(Icon_check, Li) {
    Icon_check.addEventListener('click', completedToDo);
    function completedToDo() {
        Li.classList.toggle("complete");       
        Icon_check.classList.toggle("complete");
        //Update Count if the icon_check is checked
        if (Li.classList.contains("complete")) {
            dynamicNumber = document.getElementById("dynamic_number");
            dynamicNumber.innerHTML--;          
            // saveStatusInLocalStorage(etat);
        } else {
            dynamicNumber.innerHTML++;
            // removeLocalStatus(etat);
            // saveStatusInLocalStorage(etat);
        }   
    }
}
function deleteToDo(ToDoDiv, Icon_cross, Ul) {
    Icon_cross.addEventListener('click', () => {
        Ul.removeChild(ToDoDiv);
        removeLocalTodos(ToDoDiv);
        updateCountItemsLeft();
    });
}

function showAllToDo(ToDoDiv) {
    all.addEventListener("click", () => {
        ToDoDiv.style.display = "flex";
        changeColorofLinks(all, active, completed);
    });
}

function showActiveToDo(ToDoDiv, Li) {

    active.addEventListener("click", () => {
        changeColorofLinks(active, all, completed);
        if (!Li.classList.contains('complete')) {
            ToDoDiv.style.display = "flex";
        } else {
            ToDoDiv.style.display = "none";
        }
    });
}

function showCompletedToDo(ToDoDiv, Li) {
    completed.addEventListener("click", () => {
        changeColorofLinks(completed, active, all);
        if (Li.classList.contains('complete')) {
            ToDoDiv.style.display = "flex";
        } else {
            ToDoDiv.style.display = "none";
        }
    });
}

function deleteCompletedToDo(ToDoDiv, Li, Ul) {
    let clearCompleted = document.getElementById("clear_completed");
    clearCompleted.addEventListener("click", () => {
        if (Li.classList.contains('complete')) {
            Ul.removeChild(ToDoDiv);
        } else {
            ToDoDiv.style.display = "flex";
        }
    });
}

function updateCountItemsLeft() {
    dynamicNumber = document.getElementById("dynamic_number");
    count = document.querySelector("ul").children.length;
    dynamicNumber.innerHTML = count;
}


function changeColorofLinks(ColoredLink, NormalLink1, NormalLink2) {
    ColoredLink.style.color = "rgb(58, 123, 253)";
    NormalLink1.style.color = "hsl(236, 9%, 61%)";
    NormalLink2.style.color = "hsl(236, 9%, 61%)";
}

//************************************/

// Save todos in local storage 
function saveToDoInLocalStorage(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {  //localStorage.getItem("clé") --> renvoie les valeurs correspondantes à la clé passée en paramètre. Ici, s'il n'y a pas de valeur, on crée un tableau vide 
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos")); //JSON.parse() transforme une chaîne JSON en un objet JavaScript.Si les valuers existent, alors on les stocke dans la variable todos
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos)); //La méthode setItem(), lorsque lui sont passées le duo clé-valeur, les ajoute à l'emplacement de stockage, sinon elle met à jour la valeur si la clé existe déjà. JSON.stringify() transforme un objet JavaScript en une chaîne JSON.
}

document.addEventListener("DOMContentLoaded", getToDo); //Dès que la page se charge, on appelle la fonction

function getToDo() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function (todo) {
        //Création de la div
        let toDoDiv = document.createElement("div");
        toDoDiv.classList.add("todo_div");
        ul.appendChild(toDoDiv);

        //Création de la li
        let li = document.createElement("li");
        li.classList.add("todo_item");
        toDoDiv.appendChild(li);

        //ajout du bouton "icon_check"
        let icon_check = document.createElement("button");
        icon_check.innerHTML = '<img class="icon_check" src="images/icon-check.svg" alt="icon check">';
        icon_check.classList.add("button_icon_check");
        toDoDiv.appendChild(icon_check);

        //Ajout du bouton "cross"
        let icon_cross = document.createElement("button");
        icon_cross.innerHTML = '<img class="icon_cross" src="images/icon-cross.svg" alt="icon cross">';
        icon_cross.classList.add("button_icon_cross");
        toDoDiv.appendChild(icon_cross);

        //On veut que le texte du li soit égal au texte de l'input
        li.innerHTML = todo;
        input.value = ""; //On réinitialise l'input

        completeToDo(icon_check, li);
        deleteToDo(toDoDiv, icon_cross, ul);
        showAllToDo(toDoDiv);
        showActiveToDo(toDoDiv, li);
        showCompletedToDo(toDoDiv, li);
        deleteCompletedToDo(toDoDiv, li, ul);
        updateCountItemsLeft();

    })

}

//Delete todos in local storage
function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    console.log(todo.children);
    todos.splice(todos.indexOf(todoIndex), 1);  //La méthode splice() modifie le contenu d'un tableau en retirant des éléments et/ou en ajoutant de nouveaux éléments à même le tableau.On peut ainsi vider ou remplacer une partie d'un tableau. Prend en paramètre l'index à partir du quel il faut supprimer l'élément puis prend le nombre d'éléments à supprimer  
    localStorage.setItem("todos", JSON.stringify(todos));
}

//**********************Pareil mais pour le statu completed/not completed*******************/

// function saveStatusInLocalStorage(state) {
//     let status;
//     if ((localStorage.getItem("status") === null)) {
//         status = [];
//     } else {
//         status = JSON.parse(localStorage.getItem("status"));
//     }
//     status.push(state);
//     localStorage.setItem("status", JSON.stringify(status));
// }


// document.addEventListener("DOMContentLoaded", getStatus);

// function getStatus() {
//     let status;
//     if ((localStorage.getItem("status") === null)) {
//         status = [];
//     } else {
//         status = JSON.parse(localStorage.getItem("status"));
//     }
//     status.forEach(function(state){

       
//     })}


// //Delete status in local storage
// function removeLocalStatus(state) {
//     let status;
//     if (localStorage.getItem("status") === null) {
//         status = [];
//     } else {
//         status = JSON.parse(localStorage.getItem("status"));
//     }
//     const statuIndex = state[1].innerText;
//     status.splice(status.indexOf(statuIndex), 1);  //La méthode splice() modifie le contenu d'un tableau en retirant des éléments et/ou en ajoutant de nouveaux éléments à même le tableau.On peut ainsi vider ou remplacer une partie d'un tableau. Prend en paramètre l'index à partir du quel il faut supprimer l'élément puis prend le nombre d'éléments à supprimer  
//     localStorage.setItem("status", JSON.stringify(status));
//  }


/***********************************************************************/


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


