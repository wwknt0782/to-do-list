import { create } from "zustand";
import { persist } from "zustand/middleware";

export type taskType = {
    id: number;
    title: string;
    explanation: string;
    date: string;
    priority: string;
    check: boolean;
};

type taskState = {
    taskList: taskType[];
    addTask: (task: taskType) => void;
    removeTask: (id: number) => void;
    updateTask: (task: taskType) => void;
    toggleComplete: (id: number) => void;
};

export const UseTaskState = create<taskState>()(
    persist(
        (set) => ({
            taskList: [],

            addTask: (newTask) =>
                set((state) => ({
                    taskList: [...state.taskList, newTask],
                })), //タスクを追加する

            removeTask: (id) =>
                set((state) => ({
                    taskList: state.taskList.filter((t) => t.id !== id),
                })), // 指定したIDのタスクを削除する

            updateTask: (newTask) =>
                set((state) => ({
                    taskList: state.taskList.map((t) =>
                        t.id === newTask.id ? newTask : t
                    ),
                })), // 指定したタスクを更新する

            toggleComplete: (id) =>
                set((state) => ({
                    taskList: state.taskList.map((t) =>
                        t.id === id ? { ...t, check: !t.check } : t
                    ),
                })), // 指定したIDの完了・未完了を切り替える
        }),
        {
            name: "task-store",
        }
    )
);
