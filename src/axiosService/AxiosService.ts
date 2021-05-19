import axios from "axios";
import {Task} from "../components/Types";
import React from "react";


export const getAllTasks = (): Promise<Task[]> => {
    return axios.get("http://localhost:8080/api/tasks")
        .then((responce) => responce.data as Task[])
}

export const getAllDoneTasks = (): Promise<Task[] | void> => {
    return getAllTasks().then((responce) => responce.filter(task => task.statusString === "DONE"), (error) => {
        console.log(error)
    })
}

export const getAllTODOTasks = (): Promise<Task[] | void> => {
    return getAllTasks().then((responce) => responce.filter(task => task.statusString === "TASKTODO"), (error) => {
        console.log(error)
    })
}

export const sendJsonGetNewTask = (task: Task): Promise<Task> => {
    return axios.post("http://localhost:8080/api/add", task)
        .then((responce) => responce.data as Task)
}

export const changeTaskStatus = (id: number) => {
    return axios.post(`http://localhost:8080/api/${id}`)
        .then((responce) => responce.data as Task, (error) => {
            console.log(error)
        });
}

export const deleteTask = (id: number) => {
    return axios.delete(`http://localhost:8080/api/${id}`)
        .catch(function (error) {
            console.log(error);
        });
}

export function checkAndSave(arr: void | Task[], setFunction: React.Dispatch<React.SetStateAction<Task[]>>) {
    if (Array.isArray(arr)) {
        setFunction(arr);
    }
    return;
}

