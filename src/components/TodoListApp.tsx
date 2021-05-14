import React, {SetStateAction, useEffect} from 'react';
import * as ReactDOM from 'react-dom';
import { useState } from 'react';
import DeleteButton from "./DeleteButton";
import MoveButton from "./MoveButton";
import {Task, TaskStatus} from "./Types";
import * as axiosService from "./axiosService/AxiosService";

const TodoListApp = (props: {}) => {
    const [toDoTasks, setToDoTasks] = React.useState(Array<Task>(0));
    const [doneTasks, setDoneTasks] = React.useState(Array<Task>(0));
    const [newTask, setNewTask] = React.useState({});
    const [movedTask, setMovedTask] = React.useState({});
    const [deletedTask, setDeletedTask] = React.useState({});


    function getTodosAndSet() {
        axiosService.getAllTODOTasks().then((responce) => axiosService.checkAndSave(responce, setToDoTasks));
    }
    function getDoneAndSet() {
        axiosService.getAllDoneTasks().then((responce) => axiosService.checkAndSave(responce, setDoneTasks));
    }

    useEffect(()=>{
        getTodosAndSet();
        getDoneAndSet();
    },[])

    useEffect(()=>{
        getTodosAndSet();
    },[newTask])

    useEffect(()=>{
        getTodosAndSet();
        getDoneAndSet();
    },[movedTask])

    useEffect(()=>{
        getTodosAndSet();
        getDoneAndSet();
    },[deletedTask])

    function addNewTask(task: Task){
        setNewTask(axiosService.sendJsonGetNewTask(task));
    };

    function deleteTask(index: number, currentState: TaskStatus){
        let taskToDelete: Task;
        switch (currentState) {
            case "DONE":
                taskToDelete = doneTasks.splice(index,1)[0];
                if(taskToDelete.id) {
                    axiosService.deleteTask(taskToDelete.id);
                }
                break;
            case "TASKTODO":
                taskToDelete = toDoTasks.splice(index,1)[0];
                if(taskToDelete.id) {
                    axiosService.deleteTask(taskToDelete.id);
                }
                break;
        }
        setDeletedTask(taskToDelete);
    };

    function moveTask(index: number, currentState: TaskStatus){
        let taskToMove: Task;
        switch (currentState) {
            case "DONE":
                taskToMove = doneTasks.splice(index,1)[0];
                if(taskToMove.id) {
                    axiosService.changeTaskStatus(taskToMove.id);
                }
                break;
            case "TASKTODO":
                taskToMove = toDoTasks.splice(index,1)[0];
                if(taskToMove.id) {
                    axiosService.changeTaskStatus(taskToMove.id);
                }
                break;
        }
        setMovedTask(taskToMove);
    };

    return <div>
        <h2>To do:</h2>
        <ul>
            {toDoTasks.map((task: Task) =>
                <div><DeleteButton deleteFunction={()=>deleteTask.bind(null, toDoTasks.indexOf(task),"TASKTODO")}/><li>{task.task}</li><MoveButton moveFunction={moveTask}/></div>)}
        </ul>
        <h2>Done:</h2>
        <ul>
            <li>kek</li>
            {doneTasks.map((task: Task) =>
                <div><DeleteButton deleteFunction={()=>deleteTask.bind(null, doneTasks.indexOf(task),"DONE")}/><li>{task.task}</li><MoveButton moveFunction={moveTask}/></div>)}
        </ul>
    </div>
}

export default TodoListApp;