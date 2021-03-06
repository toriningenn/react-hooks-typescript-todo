import React, {useEffect} from 'react';
import DeleteButton from "./DeleteButton";
import MoveButton from "./MoveButton";
import {Action, Task, TaskStatus} from "../Types";
import * as axiosService from "../axiosService/AxiosService";
import Form from "./Form";
import {UndoButton} from "./UndoButton";

const TodoListApp = (props: {}) => {
    const [toDoTasks, setToDoTasks] = React.useState(Array<Task>(0));
    const [doneTasks, setDoneTasks] = React.useState(Array<Task>(0));
    const [newTask, setNewTask] = React.useState({} as Task);
    const [movedTask, setMovedTask] = React.useState({} as Task);
    const [deletedTask, setDeletedTask] = React.useState({} as Task);
    const [lastActionType, setLastActionType] = React.useState("" as Action);

    function getAndSetBothLists() {
        getTodosAndSet();
        getDoneAndSet();
    }

    function getTodosAndSet() {
        axiosService.getAllTODOTasks().then((responce) => axiosService.checkAndSave(responce, setToDoTasks));
    }

    function getDoneAndSet() {
        axiosService.getAllDoneTasks().then((responce) => axiosService.checkAndSave(responce, setDoneTasks));
    }

    useEffect(() => {
        getAndSetBothLists();
        document.addEventListener("keydown", keyDownHandler);
    }, [])

    function addNewTask(task: Task) {
        axiosService.sendNewTask(task)
            .then((responce) => {
                setNewTask(responce);
            })
            .then(() => {
                setLastActionType("ADD");
            })
            .then(() => getAndSetBothLists());
    };

    function deleteTask(index: number, currentState: TaskStatus) {
        let taskToDelete: Task;
        switch (currentState) {
            case "DONE":
                taskToDelete = doneTasks.splice(index, 1)[0];
                if (taskToDelete && taskToDelete.id) {
                    axiosService.deleteTask(taskToDelete.id).then(() => getDoneAndSet())
                        .then(() => {setDeletedTask(taskToDelete)})
                }
                break;
            case "TASKTODO":
                taskToDelete = toDoTasks.splice(index, 1)[0];
                if (taskToDelete && taskToDelete.id) {
                    axiosService.deleteTask(taskToDelete.id).then(() => getTodosAndSet())
                        .then(() => {setDeletedTask(taskToDelete)})
                }
                break;
        }
        setLastActionType("DELETE");
    };

    function moveTask(index: number, currentState: TaskStatus) {
        let taskToMove: Task;
        switch (currentState) {
            case "DONE":
                taskToMove = doneTasks.splice(index, 1)[0];
                if (taskToMove && taskToMove.id) {
                    axiosService.changeTaskStatus(taskToMove.id)
                        .then((returnedChangedTask) => {
                            setMovedTask(returnedChangedTask as Task)
                        })
                        .then(() => getAndSetBothLists());
                }
                break;
            case "TASKTODO":
                taskToMove = toDoTasks.splice(index, 1)[0];
                if (taskToMove && taskToMove.id) {
                    axiosService.changeTaskStatus(taskToMove.id)
                        .then((returnedChangedTask) => {
                            setMovedTask(returnedChangedTask as Task)
                        })
                        .then(() => getAndSetBothLists());
                }
                break;
        }
        setLastActionType("MOVE");
    };

    function keyDownHandler(this: Document, event: KeyboardEvent) {
        if (event.ctrlKey && event.key === 'z') {
            event.preventDefault();
            let undoButton = document.getElementById('undoButton');
            if (undoButton)
                undoButton.click();
        }
    }

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
        <UndoButton lastActionType={lastActionType} lastDeleted={deletedTask} lastMoved={movedTask}
                    moveFunc={moveTask} addFunc={addNewTask} deleteFunc={deleteTask}
                    lastAdded={newTask} doneArr={doneTasks} todoArr={toDoTasks}/>
    </div>
}

export default TodoListApp;
