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
    const [taskList, setTaskList] = useState<taskListType[]>(() => []);

    // localStorageに変更があったら再読み込み
    useEffect(() => {
        const loadTask = () => {
            const existingTask = localStorage.getItem("task") || "";
            setTaskList(existingTask ? JSON.parse(existingTask) : []);
        };

        window.addEventListener("localStorageChange", loadTask);
        loadTask();
        return () => {
            window.removeEventListener("localStorageChange", loadTask);
        };
    }, []);

    // データが編集されたらlocalStorageに保存
    useEffect(() => {
        const saveTask = () => {
            localStorage.setItem("task", JSON.stringify(taskList));
        };
        saveTask();
    }, [taskList]);

    // 完了ボタン
    const toggleCheck = (id: number) => {
        const updatedList = taskList.map((task) =>
            task.id === id ? { ...task, check: !task.check } : task
        );
        setTaskList(updatedList);
    };

    // タイトル編集
    const editTitle = (id: number, value: string) => {
        const updatedList = taskList.map((task) =>
            task.id === id ? { ...task, title: value } : task
        );
        setTaskList(updatedList);
    };

    // 説明編集
    const editExplanation = (id: number, value: string) => {
        const updatedList = taskList.map((task) =>
            task.id === id ? { ...task, explanation: value } : task
        );
        setTaskList(updatedList);
    };

    // 日付編集
    const editDate = (id: number, value: string) => {
        const updatedList = taskList.map((task) =>
            task.id === id ? { ...task, date: value } : task
        );
        setTaskList(updatedList);
    };

    // 優先度編集
    const editPriority = (id: number, value: string) => {
        const updatedList = taskList.map((task) =>
            task.id === id ? { ...task, priority: value } : task
        );
        setTaskList(updatedList);
    };

    // 削除
    const deleteTask = (id: number) => {
        const updatedList = taskList.filter((task) => task.id !== id);
        setTaskList(updatedList);
    };

    // =====================================================================
    return (
        <section className="w-full mt-10 shadow-md">
            <ol className="flex flex-col">
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
                        toggleCheck={toggleCheck}
                        titleInput={(id, value) => editTitle(id, value)}
                        explanationInput={(id, value) =>
                            editExplanation(id, value)
                        }
                        dateInput={(id, value) => editDate(id, value)}
                        priorityInput={(id, value) => editPriority(id, value)}
                        deleteTask={(id) => deleteTask(id)}
                    />
                ))}
            </ol>
        </section>
    );
};
