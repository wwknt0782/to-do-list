// タスクを追加するフォーム
"use client";

// ==========================================================================
import { useState } from "react";
import {
    TaskTitleInputForm,
    TaskExplanationInputForm,
    TaskDateSelectButton,
    TaskPrioritySelectButton,
    TaskAddButton,
} from "../ui";
import { LocalStorageAddFunction } from "../../utils/LocalStorageEditFunction";

// ==========================================================================
export const TaskAddSection = () => {
    // const --------
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

    // function ----------
    // タスク追加ボタンをクリックしたらローカルストレージに保存する ------------
    const addClick = () => {
        if (titleValue) {
            LocalStorageAddFunction({
                title: titleValue,
                explanation: explanationValue,
                date: dateValue,
                priority: priorityValue,
            });
            console.log("タスク追加完了");
            setTitleValue("");
            setExplanationValue("");
            setDateValue("");
            setPriorityValue("");
        } else return;
    };

    // =====================================================================
    return (
        <section
            className="flex flex-col items-first justify-center
            px-5 py-4
        border-1 border-gray-500 shadow-md"
        >
            {/*タイトル入力欄*/}
            <div className="flex flex-col">
                <TaskTitleInputForm value={titleValue} onChange={titleChange} />
                {/*説明入力欄*/}
                <TaskExplanationInputForm
                    value={explanationValue}
                    onChange={explanationChange}
                />
            </div>

            <div className="flex justify-between pt-2">
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
                <TaskAddButton onClick={addClick} />
            </div>
        </section>
    );
};
