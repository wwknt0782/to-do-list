// タスクを追加するフォーム
"use client";

// ==========================================================================
import { useState, useRef } from "react";
import { useTaskList } from "@/features/task/store/UseTaskList";
import {
    TaskTitleInputForm,
    TaskExplanationInputForm,
    TaskDateSelectButton,
    TaskPrioritySelectButton,
    TaskAddButton,
} from "../ui";

// ==========================================================================
export const TaskAddSection = () => {
    // const --------
    const addTask = useTaskList((state) => state.addTask);
    const [titleValue, setTitleValue] = useState("");
    const [explanationValue, setExplanationValue] = useState("");
    const [dateValue, setDateValue] = useState("");
    const [priorityValue, setPriorityValue] = useState("");
    const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.target.value);
    };
    const explanationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setExplanationValue(e.target.value);
    };
    const dateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDateValue(e.target.value);
    };
    const priorityChange = (value: string) => setPriorityValue(value);

    // タスク追加ボタンをクリックしたらローカルストレージに保存する ------------
    const addClick = () => {
        if (titleValue) {
            addTask(titleValue, explanationValue, dateValue, priorityValue);

            console.log("タスク追加完了");
            setTitleValue("");
            setExplanationValue("");
            setDateValue("");
            setPriorityValue("");
        } else return;
    };

    const explanationInputRef = useRef<HTMLTextAreaElement>(null);
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault(); // テキストエリアにEnterが入力されるのを防ぐ
            explanationInputRef.current?.focus();
        }
    };

    // =====================================================================
    return (
        <section
            className="flex flex-col items-first justify-center
            px-5 py-4 mx-auto max-w-200
        border-1 border-gray-500 shadow-md "
        >
            {/*タイトル入力欄*/}
            <div className="flex flex-col">
                <TaskTitleInputForm
                    value={titleValue}
                    onChange={titleChange}
                    onKeyDown={(e) => handleKeyDown(e)}
                />
                {/*説明入力欄*/}
                <TaskExplanationInputForm
                    value={explanationValue}
                    onChange={explanationChange}
                    ref={explanationInputRef}
                />
            </div>

            <div className="flex flex-col sm:flex-row space-y-4 justify-between pt-2">
                <div className="flex items-end justify-start space-x-5">
                    {/*日付選択ボタン*/}
                    <TaskDateSelectButton
                        value={dateValue}
                        onChange={dateChange}
                    />
                    {/*優先度選択ボタン*/}
                    <TaskPrioritySelectButton
                        value={priorityValue}
                        onChange={priorityChange}
                    />
                </div>
                {/*タスク追加ボタン*/}
                <div className="flex justify-end">
                    <TaskAddButton onClick={addClick} />
                </div>
            </div>
        </section>
    );
};
