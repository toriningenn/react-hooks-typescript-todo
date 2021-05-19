import {Action, Task, TaskStatus} from "./Types";

export const UndoButton = (props: {
    lastActionType: Action, lastDeleted: Task, lastMoved: Task,
    moveFunc: (index: number, currentState: TaskStatus) => void, addFunc: (task: Task) => void,
    doneArr: Task[], todoArr: Task[]
}) => {
    function clickHandler() {
        if (props.lastActionType === "DELETE") {
            props.addFunc(props.lastDeleted)
        } else {
            switch (props.lastMoved.statusString) {
                case "TASKTODO":
                    props.moveFunc(props.todoArr.indexOf(props.lastMoved),props.lastMoved.statusString)
                    break;
                case "DONE":
                    props.moveFunc(props.doneArr.indexOf(props.lastMoved),props.lastMoved.statusString)
                    break;
            }
        }
    }
    return <button onClick={clickHandler}>⎌</button>
}

