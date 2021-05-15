export type Task = {
    id?: number;
    statusString: TaskStatus;
    task: string;
}

export type TaskStatus = "DONE"|"TASKTODO"

