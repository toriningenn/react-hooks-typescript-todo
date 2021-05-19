import {Action, Task, TaskStatus} from "./Types";
import {deleteTask} from "../axiosService/AxiosService";

export const UndoButton = (props: {
    lastActionType: Action, lastDeleted: Task, lastMoved: Task, lastAdded: Task,
    moveFunc: (index: number, currentState: TaskStatus) => void, addFunc: (task: Task) => void,
    deleteFunc: (index: number, currentState: TaskStatus) => void,
    doneArr: Task[], todoArr: Task[]
}) => {
    function clickHandler() {
        switch (props.lastActionType) {
            case "DELETE":
                props.addFunc(props.lastDeleted);
                break;
            case "MOVE": {
                switch (props.lastMoved.statusString) {
                    case "TASKTODO":
                        props.moveFunc(props.todoArr.indexOf(props.lastMoved), props.lastMoved.statusString)
                        break;
                    case "DONE":
                        props.moveFunc(props.doneArr.indexOf(props.lastMoved), props.lastMoved.statusString)
                        break;
                }
                break;
            }
            case "ADD":
                props.deleteFunc(props.todoArr.indexOf(props.lastAdded), props.lastAdded.statusString);
                break;
            case "":
                break;
        }
    }

    return <button onClick={clickHandler}>⎌</button>
}

