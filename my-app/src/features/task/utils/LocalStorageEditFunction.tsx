"use client";

type taskListType = {
    id: number;
    title: string;
    explanation: string;
    date: string;
    priority: string;
    check: boolean;
};

//============================================================
export const LocalStorageAddFunction = (props: {
    title: string;
    explanation: string;
    date: string;
    priority: string;
}) => {
    const newTask: taskListType = {
        id: Date.now(),
        title: props.title || "",
        explanation: props.explanation || "",
        date: props.date || "",
        priority: props.priority || "",
        check: false,
    };

    const existingTask = localStorage.getItem("task");
    const taskList: taskListType[] = existingTask
        ? JSON.parse(existingTask)
        : [];
    taskList.push(newTask);
    localStorage.setItem("task", JSON.stringify(taskList));
    window.dispatchEvent(new Event("localStorageChange")); // localStorageの変更を明示
};
