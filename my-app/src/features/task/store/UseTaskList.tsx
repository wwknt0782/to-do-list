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
    addTask: (
        title: string,
        explanation: string,
        date: string,
        priority: string
    ) => void;
    removeTask: (id: number) => void;
    updateTask: (
        id: number,
        title: string,
        explanation: string,
        date: string,
        priority: string,
        check: boolean
    ) => void;
    toggleComplete: (id: number) => void;
};

export const useTaskList = create<taskState>()(
    persist(
        (set) => ({
            //タスクリスト
            taskList: [],

            //タスクを追加する
            addTask: (title, explanation, date, priority) =>
                set((state) => {
                    const newTask: taskType = {
                        id: Date.now(),
                        title: title || "タイトル",
                        explanation: explanation || "",
                        date: date || "",
                        priority: priority || "",
                        check: false,
                    };
                    return {
                        taskList: [...state.taskList, newTask],
                    };
                }),

            // 指定したIDのタスクを削除する
            removeTask: (id) =>
                set((state) => ({
                    taskList: state.taskList.filter((t) => t.id !== id),
                })),

            // 指定したタスクの内容を更新する
            updateTask: (id, title, explanation, date, priority, check) =>
                set((state) => {
                    return {
                        taskList: state.taskList.map((t) =>
                            t.id === id
                                ? {
                                      ...t,
                                      title: title,
                                      explanation: explanation,
                                      date: date,
                                      priority: priority,
                                      check: check,
                                  }
                                : t
                        ),
                    };
                }),

            // 指定したIDの完了・未完了を切り替える
            toggleComplete: (id) =>
                set((state) => ({
                    taskList: state.taskList.map((t) =>
                        t.id === id ? { ...t, check: !t.check } : t
                    ),
                })),
        }),
        {
            name: "task-store",
        }
    )
);
