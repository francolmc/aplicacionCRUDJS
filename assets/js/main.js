// Variables para estilos de botons
const ENABLE_BUTTON_STYLE = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";
const DISABLE_BUTTON_STYLE = "bg-gray-300 px-4 py-2 rounded-md cursor-not-allowed opacity-50";

// Crear la lista que gestionara las tareas
const taskList = [];

// Crear clase que represente a la tarea
class Task {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.completed = false;
  }

  toggleCompletion() {
    this.completed = !this.completed;
  }
}

const addTask = (e) => {
  e.preventDefault();
  // Obtener los elementos del formulario HTML
  let name = document.getElementById("task_name").value;
  let description = document.getElementById("task_description").value;
  // Crear objeto tarea
  const task = new Task(name, description);
  // Agregar tarea a la lista
  taskList.push(task);
  alert('La tarea fue agregada con exito.');
  showTasks();
}

const showTasks = () => {
  const tableTaskBody = document.getElementById("table_task_body");

  tableTaskBody.innerHTML = "";

  taskList.forEach((task, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${task.name}</td>
    <td>${task.description}</td>
    <td>${task.completed}</td>
    <td>
      <a href="#" onclick="deleteTask(${index})">Eliminar</a> | 
      <a href="#" onclick="editTask(${index})">Editar</a> | 
      <a href="#" onclick="completeTask(${index})">Completar</a>
    </td>
    `;
    tableTaskBody.appendChild(row);
  });
}

const deleteTask = (index) => {
  // Validar que el indice es valido
  if (index >= 0 && index < taskList.length) {
    // Eliminar tarea de la lista por indice
    taskList.splice(index, 1);
    alert('El registro fue eliminado correctamente.');
    showTasks();
  }
}

const editTask = (index) => {
  // Cambiar las acciones y estilos de los botones
  let addTaskButton = document.getElementById("add_task_button");
  let updateTaskButton = document.getElementById("update_task_button");
  addTaskButton.setAttribute("disabled", "");
  addTaskButton.setAttribute("class", DISABLE_BUTTON_STYLE);
  updateTaskButton.removeAttribute("disabled");
  updateTaskButton.setAttribute("class", ENABLE_BUTTON_STYLE);
  // Asignar la funcion de actualizar al boton actualizar.
  updateTaskButton.onclick = (e) => updateTask(e, index);
  // Asignar los valores a los cuadros de texto
  let nameInputText = document.getElementById("task_name");
  let descriptionInputText = document.getElementById("task_description");
  nameInputText.value = taskList[index].name;
  descriptionInputText.value = taskList[index].description;
}

const updateTask = (e, index) => {
  e.preventDefault();
  // Modificar o actualizar el registro o la tarea
  let nameInputText = document.getElementById("task_name");
  let descriptionInputText = document.getElementById("task_description");
  taskList[index].name = nameInputText.value;
  taskList[index].description = descriptionInputText.value;
  // Actualizar la tabla para mostrar la tarea modificada
  showTasks();
  // Intercambiar el estilo y comportamiento de los botones
  let addTaskButton = document.getElementById("add_task_button");
  let updateTaskButton = document.getElementById("update_task_button");
  addTaskButton.removeAttribute("disabled");
  addTaskButton.setAttribute("class", ENABLE_BUTTON_STYLE);
  updateTaskButton.setAttribute("disabled", "");
  updateTaskButton.setAttribute("class", DISABLE_BUTTON_STYLE);
  // Remover la funcion de actualizar al boton actualizar.
  updateTaskButton.onclick = null;
  // Informar que fue actualizado con exito
  alert("La tarea fue actualizada con exito.");
}

const completeTask = (index) => {
  taskList[index].toggleCompletion();
  showTasks();
  let cardCompletedTasks = document.getElementById("card_completed_tasks");
  const completedTaks = taskList.filter((task) => task.completed);
  cardCompletedTasks.innerHTML=`Total de tareas completadas (${completedTaks.length})`;
}