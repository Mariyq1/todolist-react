import React, {useState} from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { takeCoverage } from 'v8';


export type FilterValuesType = "all" | "completed" | "active";
type TodolistType={
  id: string
  title: string 
  filter: FilterValuesType
}
function App() {
  
  
  function removeTask(id:string, todolistId: string){
    let tasks = tasksObj[todolistId];
    let filteredTasks = tasks.filter(t=>t.id!=id);
    tasksObj[todolistId] = filteredTasks;
    setTasks({...tasksObj});
  }
  function addTask (title: string,todolistId: string) {
    let task = {id: v1(), title: title, isDone: false}
    let tasks = tasksObj[todolistId];
    let newTasks=[task,...tasks];
    tasksObj[todolistId] = newTasks;
    setTasks({...tasksObj})
  }
  function changeStatus(taskId: string, isDone:boolean,todolistId: string){
    let tasks=tasksObj[todolistId];
    let task = tasks.find(t=>t.id === taskId);
    if(task){
      task.isDone = isDone;
      setTasks({...tasksObj})
    }
  }
  
  
  function changeFilter(value: FilterValuesType, todolistId:string){
    let todolist = todolists.find(tl=>tl.id === todolistId);
    if(todolist){
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  }
  let todolistId1=v1();
  let todolistId2 = v1();
  let todolistId3=v1();
  let [todolists, setTodolists]=useState<Array<TodolistType>>([
    {id:todolistId1, title: "What to learn ❓", filter:"active"},
    {id:todolistId2, title: "What to buy ❓", filter:"completed"},
    {id:todolistId3, title: "Where to go ❓", filter:"completed"}
  ]);
  let removeTodolist= (todolistId:string)=>{
    let filteredTodolist = todolists.filter(tl=> tl.id !==todolistId)
    setTodolists(filteredTodolist);
    delete tasksObj[todolistId];
    setTasks({...tasksObj});
  }
  let [tasksObj, setTasks] = useState({
    [todolistId1]:[{id: v1(), title: "CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "React", isDone: false},
    {id: v1(), title: "Redux", isDone: false}],
    [todolistId2]:[
    {id: v1(), title: "Book", isDone: false},
    {id: v1(), title: "Camera", isDone: true},
    {id: v1(), title: "Laptop", isDone: true}
    ],
    [todolistId3]:[
    {id: v1(), title: "London", isDone: false},
    {id: v1(), title: "Paris", isDone: true},
    {id: v1(), title: "Montreal", isDone: true},
    {id: v1(), title: "New York", isDone: true}
    ]

  });
  
 
  return (
    <div className="App">
      {
        todolists.map((tl)=>{
          let tasksForTodolist = tasksObj[tl.id];
          if(tl.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
        }
         if(tl.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
        }
        return <Todolist 
                title = {tl.title} 
                tasks={tasksForTodolist}
                removeTask = {removeTask}
                changeFilter = {changeFilter}
                addTask = {addTask}
                changeTaskStatus  = {changeStatus}
                filter = {tl.filter}
                id={tl.id}
                key={tl.id}
                removeTodolist={removeTodolist}/>
        })
      }
      
    </div>
  );
}

export default App;
