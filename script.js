let todoList = [];  // this is for storing the tasks
let history = [[]];   // this array is to store the history of ToDo list changes
let currentState = 0;

const message = document.getElementsByClassName("message-section")[0];

// --------for adding new task--------------------------------------
function addItem() {
   const taskInput = document.getElementById("taskInput");
   const task = taskInput.value.trim();
   if(task !== ""){
        taskInput.value = "";
        
        //add the task to the ToDo list
        todoList.push(task);

        //Now update the UI
        updateList(); 
        saveHistory();

        // increment the currentState for undo/redo
        currentState++;
        
        success();
   }
   else{
        failed();
   }
}

// ---if the task is successfully added --------------------------
function success(){
        const successMessage=document.createElement("p");
        successMessage.innerText="Success : Task added !";
        successMessage.style.color="green";
        message.innerHTML="";
        message.append(successMessage);
}

//-----if user doesnt fill input field, it will show error message------------------
function failed(){
        const errorText=document.createElement("p");
        errorText.innerText="Error : Please Make sure All the fields are filled before adding in an TodoList !"
        errorText.style.color="red";
        message.innerHTML="";
        message.append(errorText);
}

//----function for remove a task from the ToDo list--------
function removeItem(index){
        //Remove the task at the specified index
        todoList.splice(index,1);
        updateList();
        saveHistory();

        currentState++;
}

//--------function for undo the last action-------
function undo(){
    if(currentState >= 0){
        //decrement the currentState
        currentState--;
        todoList = [...history[currentState]];
            
        //update the UI
        updateList();
    }
}

//---------Fucntion to redo the last action---------
function redo(){
    if(currentState <= history.length-1){
        //Increment the currentState
        currentState++;

        todoList = [...history[currentState]];

        //update the UI
        updateList();
    }
}

// ---------function for update the UI ------------

function updateList(){
    const taskList = document.getElementById("taskList");

    taskList.innerHTML="";

    todoList.forEach((task,index) => {
        const tasks = document.createElement("div");
        tasks.className = "task-section";
        const addTask = document.createElement("div");
        const deleteItem = document.createElement("button");
        
        addTask.className = "task-detail";
        addTask.innerText=task;

        deleteItem.className = "deleteButton btn";
        deleteItem.innerText = "Delete";

        tasks.append(addTask);
        tasks.append(deleteItem);

        deleteItem.addEventListener("click", () => removeItem(index));
        taskList.append(tasks);

    })
   
}

// ----function for undo and redo action-------------------
function saveHistory(){
    // history = history.slice(0,currentState+1);
    history.push([...todoList]);
}


