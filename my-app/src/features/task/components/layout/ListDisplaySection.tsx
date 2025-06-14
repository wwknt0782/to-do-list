"use client";

import { useEffect, useState } from "react";
import { TaskElement } from "./TaskElement";

type taskListType = {
    id: number;
    title: string;
    explanation: string;
    date: string;
    priority: string;
    check: boolean;
};

// =====================================================================
export const ListDisplaySection = () => {
    const [existingTask, setExistingTask] = useState("");

    // localStorageに変更があったら再読み込み
    useEffect(() => {
        const loadTask = () => {
            setExistingTask(localStorage.getItem("task") || "");
        };
        window.addEventListener("localStorageChange", loadTask);
        loadTask();
        return () => {
            window.removeEventListener("localStorageChange", loadTask);
        };
    }, []);

    // タスクをオブジェクト型で取得する
    const taskList: taskListType[] = existingTask
        ? JSON.parse(existingTask)
        : [];

    return (
        <section className="w-full h-10 mt-10 border-1 border-gray-500">
            <ol>
                {/*子コンポーネントにmap内で情報を渡す*/}
                {taskList.map((task) => (
                    <TaskElement
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        explanation={task.explanation}
                        date={task.date}
                        priority={task.priority}
                        check={task.check}
                    />
                ))}
            </ol>
        </section>
    );
};
