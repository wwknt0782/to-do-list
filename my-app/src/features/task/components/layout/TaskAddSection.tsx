"use client";

import { useState } from "react";
import {
    TaskDataInputForm,
    TaskDateSelectButton,
    TaskPrioritySelectButton,
    TaskAddButton,
} from "../ui";

export const TaskAddSection = () => {
    const [titleValue, setTitleValue] = useState("");
    const [explanationValue, setExplanationValue] = useState("");
    const [value, setValue] = useState("");
    const [priorityValue, setPriorityValue] = useState("");

    const titleDoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.target.value);
    };
    const explanationDoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setExplanationValue(e.target.value);
    };
    const doChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <section
            className="flex flex-col items-first justify-center
            px-5 py-4
        border-1 border-gray-500 shadow-md"
        >
            {/*タイトル・説明入力欄*/}
            <TaskDataInputForm
                titleValue={titleValue}
                titleOnChange={titleDoChange}
                explanationValue={explanationValue}
                explanationOnChange={explanationDoChange}
            />
            <div className="flex justify-between pt-2">
                <div className="flex items-end justify-start space-x-5">
                    {/*日付選択ボタン*/}
                    <TaskDateSelectButton value={value} onChange={doChange} />
                    {/*優先度選択ボタン*/}
                    <TaskPrioritySelectButton
                        onChange={(value) => setPriorityValue(value)}
                    />
                    <p>{value}</p>
                    <p>{priorityValue}</p>
                </div>
                {/*タスク追加ボタン*/}
                <TaskAddButton />
            </div>
        </section>
    );
};
