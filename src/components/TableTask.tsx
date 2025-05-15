import { Space, Table, type TableProps } from "antd";
import type { Task } from "../types/task";
import type { HookAPI } from "antd/es/modal/useModal";

interface Props {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    modal: HookAPI;
}

export default function TableTask({ tasks, setTasks, modal }: Props) {
    const columns: TableProps<Task>["columns"] = [
        {
            title: "Task Title",
            dataIndex: "task",
            key: "task",
            render: (text) => (
                <span className="text-black capitalize">{text}</span>
            ),
        },
        {
            title: "Time Required(in Hrs)",
            dataIndex: "time",
            key: "time",
            render: (time) => <span className="text-black">{time} </span>,
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <a
                        onClick={() => record.id && handleDelete(record.id)}
                        style={{
                            color: "#ee2a2a",
                            textDecoration: "underline",
                        }}
                    >
                        Delete
                    </a>
                </Space>
            ),
        },
    ];

    const handleDelete = (id: number) => {
        modal.confirm({
            title: "Confirm Delete",
            content: "Are you sure you want to delete this task?",
            onOk: () => {
                const updateTasks = tasks.filter((task) => task.id !== id);
                setTasks(updateTasks);
            },
        });
    };

    return (
        <div>
            <p>Todo list</p>
            <Table<Task>
                columns={columns}
                dataSource={tasks}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                bordered
            />
        </div>
    );
}
