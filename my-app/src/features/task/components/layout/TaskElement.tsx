// タスク要素
"use client";

import { Circle, CircleCheckBig, Trash2 } from "lucide-react";
import { TaskDateSelectButton, TaskPrioritySelectButton } from "../ui";
import { useEffect, useState } from "react";
import { useTaskList } from "../../store/UseTaskList";

type TaskElementProps = {
    id: number;
};
// ===============================================================================
export const TaskElement = ({ id }: TaskElementProps) => {
    const taskList = useTaskList((state) => state.taskList);
    const updateTask = useTaskList((state) => state.updateTask);
    const removeTask = useTaskList((state) => state.removeTask);

    const task = taskList.find((task) => task.id === id);

    const [title, setTitle] = useState("");
    const [explanation, setExplanation] = useState("");
    const [date, setDate] = useState("");
    const [priority, setPriority] = useState("");
    const [check, setCheck] = useState(false);

    // 初回レンダリング時にlocalStorageのデータを反映する
    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setExplanation(task.explanation);
            setDate(task.date);
            setPriority(task.priority);
            setCheck(task.check);
        }
    }, []);

    // 編集されたらlocalStorageに反映する
    useEffect(() => {
        updateTask(id, title, explanation, date, priority, check);
    }, [id, title, explanation, date, priority, check, updateTask]);

    // ===============================================================================
    return (
        <li
            key={id}
            className="flex flex-row items-center justify-between px-5 py-2 border-b-1 border-gray-500"
        >
            {/*チェックボタン*/}
            <button
                onClick={() => {
                    setCheck((state: boolean) => !state);
                }}
                className="w-5 min-w-5 aspect-square cursor-pointer"
            >
                {check ? <CircleCheckBig /> : <Circle />}
            </button>
            <div className="flex flex-col sm:flex-row items-center justify-between w-full">
                <div className="flex flex-col items-start justify-center w-full min-w-50 ml-4">
                    {/*タイトル*/}
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="タイトル"
                        className="w-full font-semibold px-2 py-1 border-1 border-white hover:border-gray-500 rounded-md"
                    />

                    {/*説明*/}
                    <input
                        type="text"
                        value={explanation}
                        onChange={(e) => setExplanation(e.target.value)}
                        placeholder="説明"
                        className="w-full px-2 py-1 border-1 border-white hover:border-gray-500 rounded-md"
                    />
                </div>
                <div className="flex items-center justify-end">
                    {/*日付*/}
                    <div className="w-[20%] min-w-32 ml-4 flex items-center justify-center">
                        <TaskDateSelectButton
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            size="mini"
                        />
                    </div>

                    {/*優先度*/}
                    <div className="w-[10%] min-w-15 ml-4 flex items-center justify-center">
                        <TaskPrioritySelectButton
                            value={priority}
                            onChange={(value) => setPriority(value)}
                            size="mini"
                        />
                    </div>

                    {/*削除ボタン*/}
                    <button
                        type="button"
                        onClick={() => removeTask(id)}
                        className="ml-4 px-2 py-1 border-1 border-white hover:border-gray-500 rounded-md hover-shadow-sm cursor-pointer"
                    >
                        <Trash2 className="size-5" />
                    </button>
                </div>
            </div>
        </li>
    );
};
