export type Task = {
    id: number;
    task: string;
    time: number;
};

export type TaskFormValues = Omit<Task, "id">;
