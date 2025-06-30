"use client";

import { TaskElement } from "./TaskElement";
import { useDisplayTaskList } from "../../store/UseListControl";
import { useEffect } from "react";
import { useTaskList } from "../../store/UseTaskList";

// =====================================================================
export const ListDisplaySection = () => {
    const { taskList } = useTaskList(); // ローカルストレージのデータ
    const { displayTaskList, initializeDisplayTaskList } = useDisplayTaskList(); // 表示するタスクのIDリスト

    // localstorageのデータが更新されたら表示に反映する
    useEffect(() => {
        initializeDisplayTaskList(taskList);
    }, [JSON.stringify(taskList)]); // ←ソートでtaskListの参照が変化して発火しまうので文字列でトリガーする(再レンダリング時にzustandのpersistがsetを呼ぶため？)

    // =====================================================================
    return (
        <section className="w-full mt-10 ">
            {displayTaskList.length > 0 &&
            displayTaskList.find((task) => task.display && task.match) ? (
                <ol className="flex flex-col shadow-md">
                    {/*displayがtrueのタスクをリスト表示する*/}
                    {displayTaskList
                        .filter((task) => task.display && task.match)
                        .map((task) => (
                            <div key={task.id + "div"}>
                                <TaskElement id={task.id} />
                            </div>
                        ))}
                </ol>
            ) : (
                <div className="h-50 flex items-center justify-center text-2xl">
                    <p>No Data</p>
                </div>
            )}
        </section>
    );
};
