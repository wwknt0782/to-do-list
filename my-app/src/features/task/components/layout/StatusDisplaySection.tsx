// タスクの数を表示
"use client";

import { useEffect, useState } from "react";
import { Circle, CircleCheckBig } from "lucide-react";

type taskListType = {
    id: number;
    title: string;
    explanation: string;
    date: string;
    priority: string;
    check: boolean;
};

export const StatusDisplaySection = () => {
    const [taskList, setTaskList] = useState<taskListType[]>(() => []);
    const [checkedTaskAmount, setCheckedTaskAmount] = useState(0);
    const [unCheckedTaskAmount, setUnCheckedTaskAmount] = useState(0);

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

    // taskListが更新されたら再度カウント
    useEffect(() => {
        setCheckedTaskAmount(
            taskList.filter((task) => task.check === true).length
        ); // チェック済みタスクの数
        setUnCheckedTaskAmount(
            taskList.filter((task) => task.check === false).length
        ); // チェック済みタスクの数
    }, [taskList]);

    // ==========================================================
    return (
        <div className="border-1 border-gray-500 flex flex-row items-center justify-start space-x-10 w-full px-5 py-2">
            <div className="flex flex-col items-start justify-center space-y-1">
                <div className="flex items-center justify-start">
                    <CircleCheckBig className="inline-block size-4" />
                    <p className="inline-block pl-2 w-18 min-w-18">完了済み</p>
                    <p className="inline-block">: {checkedTaskAmount}</p>
                </div>

                <div className="flex items-center justify-start">
                    <Circle className="inline-block size-4" />
                    <p className="inline-block pl-2 w-18 min-w-18">未完了</p>
                    <p className="inline-block">: {unCheckedTaskAmount}</p>
                </div>
            </div>
        </div>
    );
};
