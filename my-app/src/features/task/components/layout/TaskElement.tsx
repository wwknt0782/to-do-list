import { Circle, CircleCheckBig, Trash2 } from "lucide-react";
import { TaskDateSelectButton, TaskPrioritySelectButton } from "../ui";

type TaskElementProps = {
    id: number;
    title: string;
    explanation: string;
    date: string;
    priority: string;
    check: boolean;
    toggleCheck: (id: number) => void;
    titleInput: (id: number, value: string) => void;
    explanationInput: (id: number, value: string) => void;
    dateInput: (id: number, value: string) => void;
    priorityInput: (id: number, value: string) => void;
    deleteTask: (id: number) => void;
};

export const TaskElement = ({
    id,
    title,
    explanation,
    date,
    priority,
    check,
    toggleCheck,
    titleInput,
    explanationInput,
    dateInput,
    priorityInput,
    deleteTask,
}: TaskElementProps) => {
    return (
        <li
            key={id}
            className="flex flex-row items-center justify-between px-5 py-2 border-b-1 border-gray-500"
        >
            {/*チェックボタン*/}
            <button
                onClick={() => {
                    toggleCheck(id);
                }}
                className="w-5 min-w-5 aspect-square cursor-pointer"
            >
                {check ? <CircleCheckBig /> : <Circle />}
            </button>
            <div className="flex flex-col sm:flex-row items-center justify-between w-full">
                <div className="flex flex-col items-start justify-center w-full min-w-50 ml-4">
                    {/*タイトル*/}
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => titleInput(id, e.target.value)}
                        placeholder="タイトル"
                        className="w-full font-semibold px-2 py-1 border-1 border-white hover:border-gray-500 rounded-md"
                    />
                    {/*説明*/}
                    <input
                        type="text"
                        value={explanation}
                        onChange={(e) => explanationInput(id, e.target.value)}
                        placeholder="説明"
                        className="w-full px-2 py-1 border-1 border-white hover:border-gray-500 rounded-md"
                    />
                </div>
                <div className="flex items-center justify-end">
                    {/*日付*/}
                    <div className="w-[20%] min-w-32 ml-4 flex items-center justify-center">
                        <TaskDateSelectButton
                            value={date}
                            onChange={(e) => dateInput(id, e.target.value)}
                            size="mini"
                        />
                    </div>

                    {/*優先度*/}
                    <div className="w-[10%] min-w-15 ml-4 flex items-center justify-center">
                        <TaskPrioritySelectButton
                            value={priority}
                            onChange={(value) => priorityInput(id, value)}
                            size="mini"
                        />
                    </div>

                    {/*削除ボタン*/}
                    <button
                        type="button"
                        onClick={() => deleteTask(id)}
                        className="ml-4 px-2 border-1 border-white hover:border-gray-500 rounded-md hover-shadow-sm cursor-pointer"
                    >
                        <Trash2 className="size-5" />
                    </button>
                </div>
            </div>
        </li>
    );
};
