#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import os from 'os'


const TASK_FILE_PATH = path.join(os.homedir(), '.taskify-data.json')
const data = loadTasks()

function generateTaskId(category) {

    let id = `${category}@${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`
    while (id in data[category]) {
        id = `${category}@${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`
    }
    return id

}

function loadTasks() {
    let data;
    if (fs.existsSync(TASK_FILE_PATH)) {
        data = fs.readFileSync(TASK_FILE_PATH, 'utf-8')
    }
    else {
        data = '{"general":{}}\n'
        fs.writeFileSync(TASK_FILE_PATH, data)
    }

    return JSON.parse(data)
}

function saveTasks(tasks, category = 'general') {
    category = category.toLowerCase()

    if (!data[category]) {
        console.log(`Category ${category} does not exist.\nTerminating addition of task.`)
        return
    }

    const id = generateTaskId(category)
    data[category][id] = {}
    data[category][id]["task"] = tasks
    data[category][id]["status"] = "pending"
    console.log(data)
    fs.writeFileSync(TASK_FILE_PATH, JSON.stringify(data))
    console.log(`Task added with ID: ${id}`)
}

function createCategory(category) {
    category = category.toLowerCase()

    if (data[category]) {
        console.log(`Category ${category} already exists.\nTerminating creation of category...`)
        return
    }
    data[category] = {}
    fs.writeFileSync(TASK_FILE_PATH, JSON.stringify(data))
    console.log(`Category ${category} created successfully.`)
}

function listTasks(category = '*') {
    category = category.toLowerCase()

    if (category === '*') {
        for (const cat in data) {
            console.log("=".repeat(50), cat, "=".repeat(50))
            for (const task in data[cat]) {
                console.log(`ID: ${task}        Task: ${data[cat][task].task}         Status: ${data[cat][task].status}`)
            }
        }
    }
    else {
        for (const task in data[category]) {
            console.log(`ID: ${task}        Task: ${data[category][task].task}         Status: ${data[category][task].status}`)
        }
    }
}

function updateTask(id, task) {
    const category = id.split('@')[0]
    if (data[category][id]) {
        data[category][id]["task"] = task
        fs.writeFileSync(TASK_FILE_PATH, JSON.stringify(data))
        console.log(`Task successfuly updated for Task Id ${id}`)
        return
    }
    else{
    console.log("Task Id not found!\nTerminating update...")
    }
    return
}

function updateTaskStatus(id, status) {
    const category = id.split('@')[0]
    if (data[category][id]) {
        data[category][id]["status"] = status
        fs.writeFileSync(TASK_FILE_PATH, JSON.stringify(data))
        console.log(`Task status successfuly updated for Task Id ${id}`)
        return
    }
    console.log("Task Id not found!\nTerminating update...")
}

function deleteTask(id) {
    const category = id.split("@")[0]
    if (data[category][id]) {
        delete data[category][id]
        fs.writeFileSync(TASK_FILE_PATH, JSON.stringify(data))
        console.log(`Deleting task with Task ID ${id}`)
        return
    }
    console.log(`Task ID not found!\nTerminating deletion of task...`)
    return
}

function deleteCat(category) {
    if (data[category]) {
        delete data[category]
        fs.writeFileSync(TASK_FILE_PATH, JSON.stringify(data))
        console.log(`Deleting category ${category}`)
        return
    }
    console.log(`Category not found!\nTerminating deletion of Category...`)
    return
}

function help() {
    console.log("\n", "-".repeat(45), "TASKIFY COMMANDS", "-".repeat(45))
    console.log(`
        taskify create <category-name> ----> create new category
        taskify list <category-name> ----> list all the task from that category
        taskify list ----> list all the task
        taskify add -c <category-name> -t <task> ----> add new task in that category
        taskify add -t task ----> add new task in the default general category
        taskify update task -i <task-id> -t <task> ----> update task
        taskify update status -i <task-id> -t <task> ----> update task status
        taskify delete task -i <task-id> ----> delete a task
        taskify delete category <category-name> ----> delete whole category
        taskify help ----> help menu
        `)
}

function main() {
    const args = process.argv.slice(2);

    try {

        switch (args[0].toLowerCase()) {
            case "add":
                switch (args[1].toLowerCase()) {
                    case "-c":
                        if (args[2].toLowerCase()) {
                            if (args[3].toLowerCase() == "-t") {
                                if (args[4].toLowerCase) {
                                    saveTasks(args[4], args[2]);
                                }
                                else {
                                    console.log("Invalid Syntax! Task argument not found...");
                                }
                            }
                            else {
                                console.log("Invalid Syntax! Task not found...");
                            }
                        }
                        else {
                            console.log("Invalid Syntax! Category argument not found...");
                        }
                        break;
                    case "-t":
                        if (args[2].toLowerCase()) {
                            saveTasks(args[2]);
                        }
                        else {
                            console.log("Invalid Task! Task argument not found...");
                        }
                        break;
                    default:
                        console.log(`Invalid Syntax! Enter "taskify help" to view commands`);
                }
                break;

            case "list":
                try{
                    listTasks(args[1])
                }
                catch{
                    listTasks();
                }
                break;

            case "create":
                createCategory(args[1].toLowerCase())
                break;

            case "update":
                if(args[2] == '-i'){
                    if(args[3]){
                        if(args[4] == '-t'){
                            if(args[5]){
                                switch(args[1].toLowerCase()){
                                    case "task":
                                        updateTask(args[3],args[5])
                                        break;
                                    case "status":
                                        updateTaskStatus(args[3],args[5])
                                        break;
                                    default:
                                        console.log(`Invalid Syntax! Enter "taskify help" to view commands`)
                                        break;
                                }
                            }
                            else{
                            console.log("Invalid Syntax! task argument not found...")
                            }
                        }
                        else{
                        console.log(`Invalid Syntax! Enter "taskify help" to view commands`)
                        }
                    }
                    else{
                    console.log("Invalid Syntax! Task ID not found...")
                    }
                }
                else{
                console.log(`Invalid Syntax! Enter "taskify help" to view commands`)
                }
                break;

            case "delete":
                switch(args[1]){
                    case "task":
                        if(args[2] == "-i"){
                            if(args[3]){
                                deleteTask(args[3])
                            }
                            else{
                                console.log("Invalid Syntax! Task Id not found...")
                            }
                        }
                        else{
                            console.log(`Invalid Syntax! Enter "taskify help" to view commands`)
                        }
                        break;
                    case "category":
                        if(args[2]){
                            deleteCat(args[2]);
                        }
                        else{
                            console.log("Invalid Synntax! Category not found...")
                        }
                        break;
                    default:
                        console.log(`Invalid Syntax! Enter "taskify help" to view commands`)
                        break;
                    }

            case "help":
                help()
                break;

            default:
                console.log(`Invalid Syntax! Enter "taskify help" to view commands`)
                break;
        }
    }
    catch (error) {
        console.log(`Invalid Syntax! Enter "taskify help" to view commands`)
    }
}
main()