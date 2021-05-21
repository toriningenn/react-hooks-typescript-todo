export type Task = {
    id?: number;
    statusString: TaskStatus;
    task: string;
}

export type UndoProps = {
    lastActionType: Action,
    lastDeleted: Task,
    lastMoved: Task,
    lastAdded: Task,
    moveFunc: (index: number, currentState: TaskStatus) => void,
    addFunc: (task: Task) => void,
    deleteFunc: (index: number, currentState: TaskStatus) => void,
    doneArr: Task[],
    todoArr: Task[],
}

export type Action = "DELETE" | "MOVE" | "ADD";

export type TaskStatus = "DONE" | "TASKTODO";

