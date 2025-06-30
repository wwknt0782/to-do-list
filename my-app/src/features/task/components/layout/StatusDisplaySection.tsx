// タスクの数を表示
"use client";

import { useEffect, useState } from "react";
import { CircleCheckBig } from "lucide-react";
import { useTaskList } from "../../store/UseTaskList";

// ==============================================================
export const StatusDisplaySection = () => {
    const taskList = useTaskList((state) => state.taskList);

    const [checkedTaskAmount, setCheckedTaskAmount] = useState(0);
    const [unCheckedTaskAmount, setUnCheckedTaskAmount] = useState(0);

    // taskListが更新されたら再度カウント
    useEffect(() => {
        setCheckedTaskAmount(
            taskList.filter((task) => task.check === true).length
        ); // チェック済みタスクの数
        setUnCheckedTaskAmount(
            taskList.filter((task) => task.check === false).length
        ); // チェック済みタスクの数
    }, [taskList]);

    const allTaskAmount = checkedTaskAmount + unCheckedTaskAmount;
    const progressRate =
        allTaskAmount > 0 ? (checkedTaskAmount / allTaskAmount) * 100 : 0;

    // ==========================================================
    return (
        <div className="border-1 border-gray-500 flex flex-col items-start justify-center w-full px-5 py-2">
            <div className="flex flex-row items-center justify-start ml-2 w-full">
                <CircleCheckBig className="inline-block size-4 mb-0.5 w-10" />
                <p className="inline-block text-right ml-2 pr-2 w-10">
                    {checkedTaskAmount}
                </p>
                <p> / </p>
                <p className="inline-block text-left pl-2.5 w-10">
                    {allTaskAmount}
                </p>
                <p className="w-full text-right pr-2">
                    {Math.round(progressRate)} %
                </p>
            </div>
            <div className="w-full h-3 mx-1 my-1 px-0.5 py-0.5 flex items-center justify-start bg-gray-300 rounded-full">
                <div
                    style={{ width: `${progressRate}%` }}
                    className={`h-full bg-sky-400 rounded-full`}
                ></div>
            </div>
        </div>
    );
};
