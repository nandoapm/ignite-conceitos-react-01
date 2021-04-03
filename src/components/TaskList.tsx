import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleCreateNewTask = () => {
    console.log('newTaskTitle')
    if(!newTaskTitle) return;

    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false
    }

    //setTasks(oldState => [...oldState, newTask])
    setTasks([...tasks, newTask])
    setNewTaskTitle("")
    console.log(tasks)
  }

  const handleToggleTaskCompletion = (id: number) => {
    const checkedTask = tasks.map(task => task.id === id ? {
      ...tasks,
      id: task.id,
      title: task.title,
      isComplete: !task.isComplete
    } : task)

    setTasks(checkedTask)
  }

  const handleRemoveTask = (id: number) => {
    const deleteTask = tasks.filter(task => task.id !== id)
    setTasks(deleteTask)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}