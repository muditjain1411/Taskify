# Taskify

Taskify is a lightweight, terminal-based Command Line Interface (CLI) application built with Node.js for managing tasks and categorizing them efficiently. All tasks are persistently stored locally in your home directory (`~/.taskify-data.json`).

## 🛠️ Prerequisites

* [Node.js](https://nodejs.org/) installed on your system.

## 🚀 Setup & Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/muditjain1411/Taskify.git](https://github.com/muditjain1411/Taskify.git)
   cd Taskify
   ```
2. Make the CLI globally available:
   ```bash
   npm link
   ```
   *(Ensure your `package.json` contains `"bin": { "taskify": "index.js" }`)*

## 📖 Usage

### Categories
* **Create a new category:**
  ```bash
  taskify create <category-name>
  ```
* **Delete a category:**
  ```bash
  taskify delete category <category-name>
  ```

### Adding Tasks
* **Add a task to the default (`general`) category:**
  ```bash
  taskify add -t "<task_description>"
  ```
* **Add a task to a specific category:**
  ```bash
  taskify add -c <category-name> -t "<task_description>"
  ```

### Listing Tasks
* **List all tasks:**
  ```bash
  taskify list
  ```
* **List tasks in a category:**
  ```bash
  taskify list <category-name>
  ```

### Updating Tasks
* **Update task description:**
  ```bash
  taskify update task -i <task-id> -t "<new_task_description>"
  ```
* **Update task status:**
  ```bash
  taskify update status -i <task-id> -t "<new_status>"
  ```

### Deleting Tasks
* **Delete a task:**
  ```bash
  taskify delete task -i <task-id>
  ```

### Help
* **View all commands:**
  ```bash
  taskify help
  ```
