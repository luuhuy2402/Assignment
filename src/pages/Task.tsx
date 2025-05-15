import { Modal } from "antd";
import type { Task } from "../types/task";
import FormTask from "../components/FormTask";
import TableTask from "../components/TableTask";
import DashBoard from "../components/DashBoard";
import useStorage from "../hooks/useStorage";

export default function Task() {
    const [modal, contextHolder] = Modal.useModal();
    const [tasks, setTasks] = useStorage([]);

    return (
        <div className="max-w-3xl border m-auto mt-4 p-6">
            {contextHolder}
            <h1 className="font-bold">Task Management App</h1>
            <DashBoard tasks={tasks} />

            <FormTask tasks={tasks} setTasks={setTasks} modal={modal} />

            <TableTask tasks={tasks} setTasks={setTasks} modal={modal} />
        </div>
    );
}
