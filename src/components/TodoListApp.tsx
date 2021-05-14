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

    function addNewTask(task: Task){
        setNewTask(axiosService.sendJsonGetNewTask(task));
    };


    function deleteTask(){};
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
        <ul>
            <li>kek</li>
            {toDoTasks.map((task: Task) => <li>{task.task}</li>)}
        </ul>
    </div>
}

export default TodoListApp;