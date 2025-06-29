// 検索ボックスに入力されたテキストを親に渡す
"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";

export type TaskSearchFormProps = {
    onSearch: (text: string) => void;
    onClear: () => void;
};

// ===============================================================================
export const TaskSearchForm = ({ onSearch, onClear }: TaskSearchFormProps) => {
    const [input, setInput] = useState("");

    // テキストの入力が完了したら入力値を親に渡す
    const handleSubmit = () => {
        onSearch(input);
    };

    // ===============================================================================
    return (
        <div className="relative flex items-center w-[70%]">
            <input
                type="text"
                placeholder="検索"
                value={input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setInput(e.target.value)
                }
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSubmit();
                    }
                }}
                onBlur={() => handleSubmit()}
                className="z-10 absolute left-0 w-full h-10 px-2 border-1 border-gray-500 rounded-md shadow-sm hover:bg-gray-100"
            ></input>
            {/*アイコン*/}
            {input ? (
                <button
                    type="button"
                    onClick={() => {
                        setInput("");
                        onClear();
                    }}
                    className="z-50 absolute right-2"
                >
                    <X className="size-5 cursor-pointer" />
                </button>
            ) : (
                <Search className="z-50 size-5 absolute right-2 pointer-events-none" />
            )}
        </div>
    );
};
