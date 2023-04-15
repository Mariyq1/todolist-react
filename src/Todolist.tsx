import React, { ChangeEvent, useState } from "react";
import { FilterValuesType } from "./App";
import "./App.css"

export type TaskType ={
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id:string, todolistId:string) => void
    changeFilter: (value: FilterValuesType, todolistId:string) => void
    addTask: (title:string,todolistId:string)=> void  
    changeTaskStatus: (taskId: string, isDone:boolean,todolistId:string)=>void
    filter: FilterValuesType
    removeTodolist: (todolistId: string)=>void
  }

export function Todolist(props: PropsType){
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null)


  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>)=>{
    setTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: any) =>{
    setError(null);
    if(e.charCode ===13){
      addTask();
    }

  }
  
  const addTask = ()=>{
    if(title.trim()!==""){
      props.addTask(title.trim(), props.id);
      setTitle("");
    }else{
      setError("Title is required")
    }
  }
  const onAllClickHandler = ()=>props.changeFilter("all", props.id);
  const onActiveClickHandler = ()=> props.changeFilter("active", props.id);
  const onComplitedClickHandler = ()=>props.changeFilter("completed", props.id)
  const removeTodolist =()=>{
    props.removeTodolist(props.id);
  }
  return (
    <div>
      <button onClick={removeTodolist} className="button removeTodolistBtn">X</button>
      <h3>{props.title}</h3>
      
      <div>
        <input 
        onKeyPress={onKeyPressHandler}
        value={title}
        onChange= {onNewTitleChangeHandler}
        className={error ? "error": ""}
        />
        <button onClick={addTask}>
          
        +</button>
        {error && <div className="error-message"><p>{error}</p></div>}
      </div>
      <ul>
        {
          props.tasks.map((t)=>{
            const onRemoveHandler = () =>{props.removeTask(t.id,props.id);}
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeTaskStatus(t.id, e.currentTarget.checked,props.id)
            }

            return <li key={t.id}>
              <input type="checkbox"
              onChange={onChangeHandler} 
              checked={t.isDone}/>
              <span>{t.title}</span>
              <button onClick={onRemoveHandler} className="removeTaskBtn">x</button>
            </li>
          })
        }
        
      </ul>
      <div>
        <button className={props.filter === 'all' ? "active-filter": "simpleBtn"}
        onClick={onAllClickHandler}>All</button>
        <button className={props.filter === 'active' ? "active-filter": "simpleBtn"}
        onClick={onActiveClickHandler}>Active</button>
        <button className={props.filter === 'completed' ? "active-filter": "simpleBtn"}
        onClick={onComplitedClickHandler}>Complited</button>
      </div>
    </div>

  )
 
}