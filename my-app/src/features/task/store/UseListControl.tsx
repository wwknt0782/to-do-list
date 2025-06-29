// リストの表示を管理する

import { create } from "zustand";

export const filterOptions = ["filterAll", "filterUnchecked", "filterChecked"];
export const sortOptions = [
    "sortId",
    "sortAscendingDate",
    "sortDescendingDate",
    "sortAscendingPriority",
    "sortDescendingPriority",
];
type taskListType = {
    id: number;
    title: string;
    explanation: string;
    date: string;
    priority: string;
    check: boolean;
    display: boolean;
    match: boolean;
};

export type listControlType = {
    displayTaskList: taskListType[];
    displayConditions: { search: string; sort: string; filter: string };
    initializeDisplayTaskList: (
        taskList: {
            id: number;
            title: string;
            explanation: string;
            date: string;
            priority: string;
            check: boolean;
        }[]
    ) => void;
    updateDisplayBySearch: (search: string) => void;
    updateDisplayBySort: (sort: string) => void;
    updateDisplayByFilter: (filter: string) => void;
};

// =======================================================================================
export const useDisplayTaskList = create<listControlType>()((set) => {
    return {
        // 表示するタスクのID
        displayTaskList: [],

        // 表示条件
        displayConditions: {
            search: "",
            sort: "sortId", // 初期状態はIDでソート
            filter: "filterAll", // 初期状態はすべて表示
        },

        // 表示するタスクのIDリストをlocalStorageに同期する (ここからlocalStorageを参照するとHydrationErrorになるのでListDisplaySection.tsx内で初期化する)
        initializeDisplayTaskList: (taskList) => {
            const localIds = taskList.map((task) => task.id);
            const localMap = new Map(taskList.map((task) => [task.id, task]));

            set((state) => {
                if (localIds.length === 0) return { displayTaskList: [] }; // localStorageが空ならここで終わり

                const existingMap = new Map(
                    state.displayTaskList.map((task) => [task.id, task])
                ); // 現在の表示用データ

                const updatedList = localIds.map((id) => {
                    // 現在の表示用データに存在するならそのまま使う
                    if (existingMap.has(id)) {
                        return {
                            ...localMap.get(id)!,
                            display: existingMap.get(id)?.display ?? true,
                            match: existingMap.get(id)?.match ?? true,
                        }; // undefinedの可能性が無いので!でスルー
                    }
                    // 存在しなければlocalStorageのデータを追加
                    return { ...localMap.get(id)!, display: true, match: true };
                });
                return { displayTaskList: updatedList };
            });
        },

        // ソート
        updateDisplayBySort: (sort) => {
            set((state) => {
                const getDateValue = (task: taskListType) =>
                    task.date ? new Date(task.date).getTime() : Infinity;

                const getPriorityValue = (task: taskListType) =>
                    task.priority
                        ? Number(task.priority.match(/\d+/)?.[0])
                        : Infinity;

                let sortedTaskList;
                switch (sort) {
                    case sortOptions[0]:
                        sortedTaskList = [...state.displayTaskList].sort(
                            (a, b) => {
                                return b.id - a.id;
                            }
                        );

                        break;
                    case sortOptions[1]:
                        sortedTaskList = [...state.displayTaskList].sort(
                            (a, b) => getDateValue(a) - getDateValue(b)
                        );

                        break;
                    case sortOptions[2]:
                        sortedTaskList = [...state.displayTaskList].sort(
                            (a, b) => getDateValue(b) - getDateValue(a)
                        );

                        break;
                    case sortOptions[3]:
                        sortedTaskList = [...state.displayTaskList].sort(
                            (a, b) => getPriorityValue(a) - getPriorityValue(b)
                        );

                        break;
                    case sortOptions[4]:
                        sortedTaskList = [...state.displayTaskList].sort(
                            (a, b) => getPriorityValue(b) - getPriorityValue(a)
                        );

                        break;
                }

                return { displayTaskList: sortedTaskList };
            });
        },

        // フィルター
        updateDisplayByFilter: (filter) => {
            set((state) => {
                let filteredTaskList;
                switch (filter) {
                    case filterOptions[0]: // すべて表示
                        return {
                            displayTaskList: state.displayTaskList.map(
                                (task) => ({
                                    ...task,
                                    display: true,
                                })
                            ),
                        };
                    case filterOptions[1]: // 未実施のみ表示
                        return {
                            displayTaskList: state.displayTaskList.map((task) =>
                                task.check
                                    ? {
                                          ...task,
                                          display: false,
                                      }
                                    : {
                                          ...task,
                                          display: true,
                                      }
                            ),
                        };

                    case filterOptions[2]: // 実施済のみ表示
                        return {
                            displayTaskList: state.displayTaskList.map((task) =>
                                task.check
                                    ? {
                                          ...task,
                                          display: true,
                                      }
                                    : {
                                          ...task,
                                          display: false,
                                      }
                            ),
                        };
                }
                return { displayTaskList: filteredTaskList ?? [] };
            });
        },

        // 検索
        updateDisplayBySearch: (search) => {
            set((state) => {
                // 空文字入力の時はすべて表示
                if (search === undefined || "") {
                    return {
                        displayTaskList: state.displayTaskList.map((task) => ({
                            ...task,
                            match: true,
                        })),
                    };
                } else {
                    return {
                        displayTaskList: state.displayTaskList.map((task) => ({
                            ...task,
                            match:
                                task.title.includes(search) ||
                                task.explanation.includes(search)
                                    ? true // 検索文字とマッチしたときはmatch: trueにして表示
                                    : false,
                        })),
                    };
                }
            });
        },
    };
});
