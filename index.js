const fs = require("fs");
const path =  require("path");
const readline =  require("readline");

const dataFilePath = path.join(__dirname,"data.json");

// console.log(dataFilePath);

// Add a new task.
if(!fs.existsSync(dataFilePath)){
    fs.writeFileSync(dataFilePath,JSON.stringify([]));
}

// Function for read task from file 

const readtask =()=>{
    const data = fs.readFileSync(dataFilePath,"utf-8");
    return JSON.parse(data);
}

// Function for write task 

const writeTask = (tasks)=>{
      fs.writeFileSync(dataFilePath,JSON.stringify(tasks,null,2));
}

// Function for add task

  const addTask = (task)=>{
    const tasks = readtask();
    tasks.push({task,completed:false});
    writeTask(tasks);
    console.log("task added")
  }

// Function for task view

const viewTasks = ()=>{
    const tasks = readtask();
    if(tasks.length === 0){
        console.log("No Task Found");
    }
    else{
        tasks.forEach((task,index)=>{
           const status = task.completed ? "ok" : "";
           console.log(`${index + 1}. ${status} ${task.task}`);
        })
    }
};

// Function task as complete

const markTaskComplete = (index)=>{
    const tasks = readtask();
    if (index > 0 && index <= tasks.length) {
        tasks[index - 1].completed = true;
        writeTask(tasks);
        console.log(`Task "${tasks[index - 1].task}" marked as complete.`);
    } else {
        console.log("Invalid task number.");
    }
}

// function for remove task 

const removeTask = (index)=>{
    const tasks = readtask();
    if (index > 0 && index <= tasks.length) {
        const removed = tasks.splice(index - 1, 1);
        writeTask(tasks);
        console.log(`Task removed: "${removed[0].task}"`);
    } else {
        console.log("Invalid task number.");
    }
};

// Create readline 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


function showMenu() {
    console.log("\nTask Manager:");
    console.log("1. Add a new task");
    console.log("2. View tasks");
    console.log("3. Mark task as complete");
    console.log("4. Remove a task");
    console.log("5. Exit");
    rl.question("\nChoose an option: ", (option) => {
        switch (option) {
            case '1':
                rl.question("Enter new task: ", (task) => {
                    addTask(task);
                    showMenu();
                });
                break;
            case '2':
                viewTasks();
                showMenu();
                break;
            case '3':
                rl.question("Enter task number to mark as complete: ", (num) => {
                    markTaskComplete(parseInt(num));
                    showMenu();
                });
                break;
            case '4':
                rl.question("Enter task number to remove: ", (num) => {
                    removeTask(parseInt(num));
                    showMenu();
                });
                break;
            case '5':
                rl.close();
                break;
            default:
                console.log("Invalid option, please try again.");
                showMenu();
                break;
        }
    });
}


showMenu();

rl.on('close', () => {
    console.log("Exiting task manager.");
    process.exit(0);
});








