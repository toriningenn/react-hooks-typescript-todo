import {Action, Task, TaskStatus} from "./Types";

const undo = ({
                  lastActionType, lastDeleted, lastMoved, lastAdded,
                  moveFunc, addFunc,
                  deleteFunc,
                  doneArr, todoArr
              }: {
        lastActionType: Action, lastDeleted: Task, lastMoved: Task, lastAdded: Task,
        moveFunc: (index: number, currentState: TaskStatus) => void, addFunc: (task: Task) => void,
        deleteFunc: (index: number, currentState: TaskStatus) => void,
        doneArr: Task[], todoArr: Task[]
    }) => {
        switch (lastActionType) {
            case "DELETE":
                addFunc(lastDeleted);
                break;
            case "MOVE": {
                switch (lastMoved.statusString) {
                    case "TASKTODO":
                        moveFunc(todoArr.indexOf(lastMoved), lastMoved.statusString)
                        break;
                    case "DONE":
                        moveFunc(doneArr.indexOf(lastMoved), lastMoved.statusString)
                        break;
                }
                break;
            }
            case "ADD":
                console.log(lastAdded);
                deleteFunc(todoArr.findIndex((task)=>task.task === lastAdded.task), "TASKTODO");
                break;
            case "":
                break;
        }
    }
;

export default undo;