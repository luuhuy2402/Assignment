import { Space, Table, type TableProps } from "antd";
import type { Task } from "../../../types/task";
import type { HookAPI } from "antd/es/modal/useModal";
import { memo, useCallback } from "react";

interface Props {
    tasks: Task[];
    handleDeleteTask: (id: number) => void;
    modal: HookAPI;
}

function TableTask({ tasks, handleDeleteTask, modal }: Props) {
    const handleDelete = useCallback(
        (id: number) => {
            modal.confirm({
                title: "Confirm Delete",
                content: "Are you sure you want to delete this task?",
                onOk: () => {
                    handleDeleteTask(id);
                },
            });
        },
        [modal, handleDeleteTask]
    );
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

export default memo(TableTask);
