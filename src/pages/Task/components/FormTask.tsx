import { Button, Form, Input } from "antd";
import type { Task } from "../../../types/task";
import type { HookAPI } from "antd/es/modal/useModal";
import { memo, useCallback } from "react";

interface Props {
    handleAddTask: (task: Task) => void;
    modal: HookAPI;
}
function FormTask({ handleAddTask, modal }: Props) {
    const [form] = Form.useForm();
    const handleAdd = useCallback(async () => {
        try {
            const values = await form.validateFields();
            const newTask = {
                id: Date.now(),
                task: values.task,
                time: Number(values.time),
            };
            handleAddTask(newTask);
            form.resetFields();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            modal.error({
                title: "Validation Error",
                content: "Please check your input and try again.",
            });
        }
    }, [form, handleAddTask, modal]);
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

export default memo(FormTask);
