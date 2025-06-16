"use client";

import { TaskElement } from "./TaskElement";
import { UseTaskStore } from "../../store/UseTaskStore";

// =====================================================================
export const ListDisplaySection = () => {
    const taskList = UseTaskStore((state) => state.taskList);

    // =====================================================================
    return (
        <section className="w-full mt-10 shadow-md">
            <ol className="flex flex-col">
                {/*子コンポーネントにmap内で情報を渡す*/}
                {taskList.map((task) => (
                    <TaskElement key={task.id} id={task.id} />
                ))}
            </ol>
        </section>
    );
};
