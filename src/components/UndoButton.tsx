import {Action, Task, TaskStatus} from "../Types";
import undo from "../UndoLogic";
import React, {KeyboardEventHandler} from "react";

export const UndoButton = (props: {
    lastActionType: Action, lastDeleted: Task, lastMoved: Task, lastAdded: Task,
    moveFunc: (index: number, currentState: TaskStatus) => void, addFunc: (task: Task) => void,
    deleteFunc: (index: number, currentState: TaskStatus) => void,
    doneArr: Task[], todoArr: Task[]
}) => {

    function clickHandler() {
        undo(props);
    }

    return <button onClick={clickHandler}>⎌</button> ;
}

