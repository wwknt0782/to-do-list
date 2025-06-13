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
    const titleDoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.target.value);
    };
    const explanationDoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExplanationValue(e.target.value);
    };

    return (
        <section className="border-2 border-gray-500">
            {/*タイトル・説明入力欄*/}
            <TaskDataInputForm
                titleValue={titleValue}
                titleOnChange={titleDoChange}
                explanationValue={explanationValue}
                explanationOnChange={explanationDoChange}
            />
            <div>
                <div>
                    {/*日付選択ボタン*/}
                    <TaskDateSelectButton />
                    {/*優先度選択ボタン*/}
                    <TaskPrioritySelectButton />
                </div>
                {/*タスク追加ボタン*/}
                <TaskAddButton />
            </div>
        </section>
    );
};
