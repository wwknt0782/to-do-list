"use client";

import { UseTaskStore } from "@/features/task/store/UseTaskStore";

type taskListType = {
    id: number;
    title: string;
    explanation: string;
    date: string;
    priority: string;
    check: boolean;
};

//============================================================
// タスクデータのオブジェクトを生成する
export const LocalStorageAddFunction = (props: {
    title: string;
    explanation: string;
    date: string;
    priority: string;
}) => {
    //const addTask = UseTaskStore((state) => state.addTask);

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

    //addTask(newTask);
    //saveLocalStorage("task-store", taskList, true);
};

// ============================================================
// localStorageにデータを保存する
export const saveLocalStorage = (
    key: string,
    value: taskListType[],
    emitEvent: boolean = false // falseの時はイベント発火しない
) => {
    const current = localStorage.getItem(key);
    const next = JSON.stringify(value);
    // localStorageと入力データが違うときだけデータ更新
    if (current !== next) {
        localStorage.setItem(key, next);
        if (emitEvent) {
            window.dispatchEvent(new Event("localStorageChange"));
        }
    }
};

// ============================================================
// localStorageのデータを呼び出す
//export const loadLocalStorage = () => {
//    const existingTask = localStorage.getItem("task") || "";
//    return existingTask ? JSON.parse(existingTask) : [];
//};
