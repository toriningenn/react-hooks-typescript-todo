import React, {SetStateAction, useEffect} from 'react';
import DeleteButton from "./DeleteButton";
import MoveButton from "./MoveButton";
import {Action, Task, TaskStatus} from "./Types";
import * as axiosService from "../axiosService/AxiosService";
import Form from "./Form";
import {UndoButton} from "./UndoButton";

const TodoListApp = (props: {}) => {
    const [toDoTasks, setToDoTasks] = React.useState(Array<Task>(0));
    const [doneTasks, setDoneTasks] = React.useState(Array<Task>(0));
    const [newTask, setNewTask] = React.useState({});
    const [movedTask, setMovedTask] = React.useState({} as Task);
    const [deletedTask, setDeletedTask] = React.useState({} as Task);
    const [lastActionType, setLastActionType] = React.useState("" as Action);


    function getTodosAndSet() {
        axiosService.getAllTODOTasks().then((responce) => axiosService.checkAndSave(responce, setToDoTasks));
    }

    function getDoneAndSet() {
        axiosService.getAllDoneTasks().then((responce) => axiosService.checkAndSave(responce, setDoneTasks));
    }

    function getAndSetBothLists() {
        getTodosAndSet();
        getDoneAndSet();
    }

    useEffect(() => {
        getTodosAndSet();
        getDoneAndSet();
    }, [])

    useEffect(() => {
        getTodosAndSet();
    }, [newTask])


    function addNewTask(task: Task) {
        axiosService.sendJsonGetNewTask(task).then((task) => setNewTask(task));

    };

    function deleteTask(index: number, currentState: TaskStatus) {
        let taskToDelete: Task;
        switch (currentState) {
            case "DONE":
                taskToDelete = doneTasks.splice(index, 1)[0];
                if (taskToDelete.id) {
                    axiosService.deleteTask(taskToDelete.id).then(() => getDoneAndSet());
                }
                break;
            case "TASKTODO":
                taskToDelete = toDoTasks.splice(index, 1)[0];
                if (taskToDelete.id) {
                    axiosService.deleteTask(taskToDelete.id).then(() => getTodosAndSet());
                }
                break;
        }
        setDeletedTask(taskToDelete);
        setLastActionType("DELETE");
    };

    function moveTask(index: number, currentState: TaskStatus) {
        let taskToMove: Task;
        switch (currentState) {
            case "DONE":
                taskToMove = doneTasks.splice(index, 1)[0];
                if (taskToMove.id) {
                    axiosService.changeTaskStatus(taskToMove.id).then(() => getAndSetBothLists());
                }
                break;
            case "TASKTODO":
                taskToMove = toDoTasks.splice(index, 1)[0];
                if (taskToMove.id) {
                    axiosService.changeTaskStatus(taskToMove.id).then(() => getAndSetBothLists());
                }
                break;
        }
        setMovedTask(taskToMove);
        setLastActionType("MOVE");
    };

    return <div>
        <h2>To do:</h2>
        <ul className="container">
            {toDoTasks.map((task: Task) =>
                <div className="task">
                    <li>{task.task}</li>
                    <MoveButton moveFunction={moveTask.bind(null, toDoTasks.indexOf(task), task.statusString)}
                                done={false}/>
                    <DeleteButton
                        deleteFunction={deleteTask.bind(null, toDoTasks.indexOf(task), task.statusString)}/></div>)}
        </ul>
        <h2>Done:</h2>
        <ul className="container">
            {doneTasks.map((task: Task) =>
                <div className="task">
                    <li>{task.task}</li>
                    <MoveButton moveFunction={moveTask.bind(null, doneTasks.indexOf(task), task.statusString)}
                                done={true}/>
                    <DeleteButton
                        deleteFunction={deleteTask.bind(null, doneTasks.indexOf(task), task.statusString)}/></div>)}
        </ul>
        <Form addFunction={addNewTask}/>
        <UndoButton lastActionType={lastActionType} lastDeleted={deletedTask}
                    lastMoved={movedTask} moveFunc={moveTask} addFunc={addNewTask}
                    doneArr={doneTasks} todoArr={toDoTasks}/>
    </div>
}

export default TodoListApp;
