// フィルター条件を親に渡す
"use client";

import { useState, useRef, useEffect } from "react";
import { filterOptions } from "../../store/UseListControl";
import { ListFilter, Circle, CircleCheckBig } from "lucide-react";

export type TaskFilterButtonProps = {
    onSelect: (sort: string) => void;
};

const options = [
    {
        title: "－",
        value: filterOptions[0],
        icon: <ListFilter className="size-5 mx-auto my-auto text-gray-500" />,
        pullDownIcon: <div className="size-3"></div>,
    },
    {
        title: "未実施",
        value: filterOptions[1],
        icon: <Circle className="size-5.5 mx-auto" />,
        pullDownIcon: <Circle className="inline-block size-4 w-9" />,
    },
    {
        title: "実施済",
        value: filterOptions[2],
        icon: <CircleCheckBig className="size-5.5 mx-auto" />,
        pullDownIcon: <CircleCheckBig className="inline-block size-4 w-9" />,
    },
];

// ==========================================================================
export const TaskFilterButton = ({ onSelect }: TaskFilterButtonProps) => {
    // const -------------------
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(options[0].value);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 外クリックでプルダウンを閉じる-----------
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // ==============================================================================
    return (
        <div ref={dropdownRef} className="relative h-10">
            {/*ボタン*/}
            <button
                type="button"
                onClick={() => setIsOpen((state) => !state)}
                className=" w-11 h-10 border-1 border-gray-500 rounded-md shadow-sm hover:bg-gray-100 cursor-pointer"
            >
                {options.find((option) => selected === option.value)?.icon}
            </button>

            {/*プルダウン*/}
            {isOpen && (
                <ul
                    className="absolute right-0 z-15
                    w-35
                    bg-white
                border-1 border-gray-500 rounded shadow-sm"
                >
                    {options.map((option) => {
                        return (
                            <li key={option.value}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        onSelect(option.value);
                                        setSelected(option.value);
                                        setIsOpen(false);
                                    }}
                                    className="flex items-center justify-start w-full py-1 text-left cursor-pointer hover:bg-gray-100"
                                >
                                    {option.pullDownIcon}
                                    <p className="inline-block text-left">
                                        {option.title}
                                    </p>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};
