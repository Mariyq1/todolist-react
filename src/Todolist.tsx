import React, { ChangeEvent, useState } from "react";
import { FilterValuesType } from "./App";
import "./App.css"

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
    changeTaskStatus: (taskId: string, isDone:boolean)=>void
    filter: FilterValuesType
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
      props.addTask(title.trim());
      setTitle("");
    }else{
      setError("Title is required")
    }
  }
  const onAllClickHandler = ()=>props.changeFilter("all");
  const onActiveClickHandler = ()=> props.changeFilter("active");
  const onComplitedClickHandler = ()=>props.changeFilter("completed")
  return (
    <div>
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
            const onRemoveHandler = () =>{props.removeTask(t.id);}
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeTaskStatus(t.id, e.currentTarget.checked)
            }

            return <li key={t.id}>
              <input type="checkbox"
              onChange={onChangeHandler} 
              checked={t.isDone}/>
              <span>{t.title}</span>
              <button onClick={onRemoveHandler}>X</button>
            </li>
          })
        }
        
      </ul>
      <div>
        <button className={props.filter === 'all' ? "active-filter": ""}
        onClick={onAllClickHandler}>All</button>
        <button className={props.filter === 'active' ? "active-filter": ""}
        onClick={onActiveClickHandler}>Active</button>
        <button className={props.filter === 'completed' ? "active-filter": ""}
        onClick={onComplitedClickHandler}>Complited</button>
      </div>
    </div>

  )
 
}