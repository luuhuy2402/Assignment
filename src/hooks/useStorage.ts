import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { Task } from "../types/task";

export default function useStorage(
    initial: Task[]
): [Task[], Dispatch<SetStateAction<Task[]>>] {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const saveTasks = localStorage.getItem("tasks");
        return saveTasks ? JSON.parse(saveTasks) : initial;
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);
    return [tasks, setTasks];
}
