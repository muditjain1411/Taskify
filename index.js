#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import os from 'os'


const TASK_FILE_PATH = path.join(os.homedir(), '.taskify-data.json')
const data = loadTasks()

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
