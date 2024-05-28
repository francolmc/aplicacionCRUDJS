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
    <td>
      <a href="#" onclick="deleteTask(${index})">Eliminar</a> | 
      <a href="#" onclick="editTask(${index})">Editar</a>
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
  addTaskButton.setAttribute("disabled", "");
  addTaskButton.setAttribute("class", DISABLE_BUTTON_STYLE);
  let updateTaskButton = document.getElementById("update_task_button");
  updateTaskButton.removeAttribute("disabled");
  updateTaskButton.setAttribute("class", ENABLE_BUTTON_STYLE);
  // Asignar los valores a los cuadros de texto
  let nameText = document.getElementById("task_name");
  let descriptionText = document.getElementById("task_description");
  const task = taskList[index];
  nameText.value = task.name;
  descriptionText.value = task.description;
  // Asignar la funcion de actualizar al boton actualizar.
  updateTaskButton.addEventListener(updateTask(Event, index));
}

const updateTask = (index) => {
  debugger;
  // Tomar los valores de los cuadros de texto y actualizarlos en los de la lista
  // Cambiar el estilo y comportamiento de los botones
  // Informar que todo fue exitoso.
}