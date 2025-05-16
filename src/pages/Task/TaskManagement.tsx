import { Modal } from "antd";
import FormTask from "./components/FormTask";
import TableTask from "./components/TableTask";
import DashBoard from "./components/DashBoard";
import useStorage from "../../hooks/useStorage";
import { useCallback, useMemo } from "react";
import type { Task } from "../../types/task";

export default function TaskManagement() {
    const [modal, contextHolder] = Modal.useModal();
    const [tasks, setTasks] = useStorage([]);

    const handleAddTask = useCallback(
        (task: Task) => {
            setTasks((prev) => [...prev, task]);
        },
        [setTasks]
    );

    const handleDeleteTask = useCallback(
        (id: number) => {
            setTasks((prev) => prev.filter((t) => t.id !== id));
        },
        [setTasks]
    );
    const dashboardData = useMemo(() => {
        const totalTasks = tasks.length;
        const totalHours = tasks.reduce(
            (sum, task) => sum + (task.time || 0),
            0
        );
        const totalDays = parseFloat((totalHours / 8).toFixed(2));
        return { totalTasks, totalHours, totalDays };
    }, [tasks]);
    return (
        <div className="max-w-3xl border m-auto mt-4 p-6">
            {contextHolder}
            <h1 className="font-bold">Task Management App</h1>
            <DashBoard dashboardData={dashboardData} />

            <FormTask handleAddTask={handleAddTask} modal={modal} />

            <TableTask
                tasks={tasks}
                handleDeleteTask={handleDeleteTask}
                modal={modal}
            />
        </div>
    );
}
