import { Button, Form, Input } from "antd";
import type { Task } from "../types/task";
import type { HookAPI } from "antd/es/modal/useModal";

interface Props {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    modal: HookAPI;
}
export default function FormTask({ tasks, setTasks, modal }: Props) {
    const [form] = Form.useForm();

    const handleAdd = async () => {
        try {
            const values = await form.validateFields();
            const newTask = {
                id: Date.now(),
                task: values.task,
                time: Number(values.time),
            };
            const updateTasks = [...tasks, newTask];
            setTasks(updateTasks);
            form.resetFields();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            modal.error({
                title: "Validation Error",
                content: "Please check your input and try again.",
            });
        }
    };
    return (
        <Form
            className="flex items-center gap-2"
            form={form}
            onFinish={handleAdd}
            layout="vertical"
        >
            <Form.Item<Task>
                label="Task title"
                name="task"
                validateFirst={true}
                rules={[
                    {
                        required: true,
                        message: "Please input Task Title!",
                    },
                    {
                        max: 128,
                        message: "Task Title must not exceed 128 characters!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item<Task>
                label="Time Required (in Hrs)"
                name="time"
                validateFirst={true}
                rules={[
                    {
                        required: true,
                        message: "Please input Time!",
                    },
                    {
                        validator: (_, value) => {
                            if (isNaN(value)) {
                                return Promise.reject(
                                    "Please enter a valid number!"
                                );
                            }
                            if (value < 0 || value > 24) {
                                return Promise.reject(
                                    "Time must be between 0 and 24 hours!"
                                );
                            }
                            return Promise.resolve();
                        },
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Button htmlType="submit" type="primary" className="mt-1.5">
                Add
            </Button>
        </Form>
    );
}
