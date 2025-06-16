import { UseTaskStore, taskType } from "../store/UseTaskStore";

export const UseFilteredTaskList = (
    search: string,
    showCompleted?: boolean,
    sortBy: "title" | "createdAt" = "createdAt"
): taskType[] => {
    let tasks = UseTaskStore((state) => state.taskList);

    // フィルター
    if (showCompleted !== undefined) {
        tasks = tasks.filter((t) => t.check === showCompleted);
    }

    // 検索
    if (search) {
        tasks = tasks.filter((t) =>
            t.title.toLowerCase().includes(search.toLowerCase())
        );
    }

    // ソート
    if (sortBy === "title") {
        tasks = [...tasks].sort((a, b) => a.title.localeCompare(b.title));
    } else {
        tasks = [...tasks].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    }

    return tasks;
};
