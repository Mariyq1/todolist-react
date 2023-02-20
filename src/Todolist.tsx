import React, { useState } from "react";
import { FilterValuesType } from "./App";
export type TaskType ={
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id:string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title:string)=> void
    
}

export function Todolist(props: PropsType){
  const [newTaskTitle, setNewTaskTitle] = useState("")
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={newTaskTitle}
        onChange= {(e)=>{setNewTaskTitle(e.currentTarget.value)}}
        />
        <button onClick={(e)=>{props.addTask(newTaskTitle)}}>+</button>
      </div>
      <ul>
        {
          props.tasks.map((t)=>{
            return <li key={t.id}><input type="checkbox" checked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={()=> {props.removeTask(t.id)}}>X</button>
            </li>
          }

          )
        }
        
      </ul>
      <div>
        <button onClick={(e)=> {props.changeFilter("all")}}>All</button>
        <button onClick={(e)=> {props.changeFilter("active")}}>Active</button>
        <button onClick={(e)=> {props.changeFilter("completed")}}>Complited</button>
      </div>
    </div>

  )
 
}