export type Task = {
    id?: number;
    statusString: TaskStatus;
    task: string;
}

export type Action = "DELETE" | "MOVE" | "ADD" | "";
export type TaskStatus = "DONE" | "TASKTODO";

