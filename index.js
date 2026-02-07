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

