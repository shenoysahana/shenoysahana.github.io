 // On app load, get all tasks from localStorage
 window.onload = loadTasks;
 //Add Submit event listener to form
 document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();
  addTask();
 });


 const navSelect = document.getElementById("nav-select");
 navSelect.addEventListener('change',function(){
    showParticular(this.value);
 });

function showParticular(value){
    //show the asked catogory

    //get the items from local storage

    if (localStorage.getItem("tasks") == null) return;
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    
    //traverse through each task and 
    //compare it with selected value
    //on selected value,show the list and remove the older one
    const list = document.querySelector("ul");
    list.textContent ="";

    tasks.forEach(task => {
        if(value == 'all'){
            const list = document.querySelector("ul");
            const li = document.createElement("li");
            
            //create the innerhtml and delete the previous one
            li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? 'checked' : ''}>
            <input type="text" value="${task.task}" class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)">
            <p id="type">${task.category}</p>
            <i class="fa fa-trash" onclick="removeTask(this)"></i>`;

            list.insertBefore(li, list.children[0]);
            
        }
        if(task.category == value){
            if(task.completed == false){
                const list = document.querySelector("ul");
                const li = document.createElement("li");
                
                //create the innerhtml and delete the previous one
                li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? 'checked' : ''}>
                <input type="text" value="${task.task}" class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
                <p id="type">${task.category}</p>
                <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
    
                list.insertBefore(li, list.children[0]);
            }
          
        }
        else if(task.completed == true && value == 'completed'){
            const list = document.querySelector("ul");
            const li = document.createElement("li");
            
            //create the innerhtml and delete the previous one
            li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? 'checked' : ''}>
            <input type="text" value="${task.task}" class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
            <p id="type">${task.category}</p>
            <i class="fa fa-trash" onclick="removeTask(this)"></i>`;

            list.insertBefore(li, list.children[0]);
        }
    });
      
}
 
 
 function loadTasks() {
  // check if localStorage has any tasks
  // if not then return
  if (localStorage.getItem("tasks") == null) return;
 
  // Get the tasks from localStorage and convert it to an array
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
 
 
  // Loop through the tasks and add them to the list
  tasks.forEach(task => {
    const list = document.querySelector("ul");
    const li = document.createElement("li");
    
    li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? 'checked' : ''}>
          <input type="text" value="${task.task}" class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
          <p id="type">${task.category}</p>
          <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
  
    list.insertBefore(li, list.children[0]);
 
    
 
  });
 
 }
 
 function addTask() {
 
  const task = document.querySelector("form input");
 
  const list = document.querySelector("ul");
  
  const selectItem = document.getElementsByName("category");
  let selectValue = 0 ;
  selectItem.forEach((select)=>{
      if(select.selected){
          console.log(`you have selected: ${select.value}`);
          selectValue =select.value;
      }
    });
 
  console.log(selectValue);
  // return if task is empty
  if (task.value === "") {
    alert("Please add some task!");
    return false;
  }
  // check is task already exist
  if (document.querySelector(`input[value="${task.value}"]`)) {
    alert("Task already exist!");
    return false;
  }
 
  // add task to local storage using deep copy
  localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), 
  { task: task.value, completed: false,category : selectValue }]));
 
  // create list item, add innerHTML and append to ul
  const li = document.createElement("li");
  //add check box
  //add list item
  //input elemet
  //delete button using the icon 
  //call function on each event
 
 
  li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check">
      <input type="text" value="${task.value}"class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
      <p id="type">${selectValue}</p>
      <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
   
      console.log(list.childNodes);
  list.insertBefore(li, list.children[0]);
 
 
  // clear input
  task.value = "";
 }
 
 function taskComplete(event) {
  //get the Array from local storage
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  
  //loop through the array 
  //check whether the task completed or not
  //task not complted set it to false
  //e
  tasks.forEach(task => {
    if (task.task === event.nextElementSibling.value) {
      task.completed = !task.completed;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
 
 
  //join the below one to the top is the last step
  event.nextElementSibling.classList.toggle("completed");
 }
 
 function removeTask(event) {
 
  //remove the element from parent and off the parent and 
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
 
  //loop through eachharray elemet and chcek whether the deleted nodde 
  //is the exact element 
  //if yes remove and re arrange the array 
  tasks.forEach(task => {
    if (task.task === event.parentNode.children[1].value) {
      // delete task
      tasks.splice(tasks.indexOf(task), 1);
    }
  });
 
 //again store it to the array
  localStorage.setItem("tasks", JSON.stringify(tasks));
  //now remove that elemet which is sway from the array
  event.parentElement.remove();
 }
 
 
 
 
 
 
 
 
 
 // store current task to track changes
 var currentTask = null;
 
 // get current task
 function getCurrentTask(event) {
  currentTask = event.value;
 }
 
 
