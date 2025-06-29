// ソート条件を親に渡す
"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { ArrowUpDown, Calendar } from "lucide-react";
import { sortOptions } from "../../store/UseListControl";

export type TaskSortButtonProps = {
    onSelect: (sort: string) => void;
};

const options = [
    {
        title: "－",
        value: sortOptions[0], // "sortId"
        icon: <ArrowUpDown className="size-5 mx-auto my-auto text-gray-500" />,
        pullDownIcon: <div className="size-3"></div>,
    },
    {
        title: "日付昇順",
        value: sortOptions[1], // "sortAscendingDate"
        icon: (
            <div className="flex items-center justify-center">
                <Calendar className="size-4.5" />
                <p className="text-lg pl-1 pb-1">↑</p>
            </div>
        ),
        pullDownIcon: (
            <div className="flex items-center justify-center w-9">
                <Calendar className="size-4.5" />
                <p className="text-sm pb-1">↑</p>
            </div>
        ),
    },
    {
        title: "日付降順",
        value: sortOptions[2], // "sortDescendingDate"
        icon: (
            <div className="flex items-center justify-center">
                <Calendar className="size-4.5" />
                <p className="text-lg pl-1 pb-1">↓</p>
            </div>
        ),
        pullDownIcon: (
            <div className="flex items-center justify-center w-9">
                <Calendar className="size-4.5" />
                <p className="text-sm pb-1">↓</p>
            </div>
        ),
    },
    {
        title: "優先度昇順",
        value: sortOptions[3], // "sortAscendingPriority"
        icon: (
            <div className="flex items-center justify-center">
                <Image
                    src="priority_0_black.svg"
                    width={25}
                    height={25}
                    alt="priority icon"
                    className="size-5"
                />
                <p className="text-lg pl-0.5 pb-1">↑</p>
            </div>
        ),
        pullDownIcon: (
            <div className="flex items-center justify-center w-9">
                <Image
                    src="priority_0_black.svg"
                    width={20}
                    height={20}
                    alt="priority icon"
                    className="size-4.5"
                />
                <p className="text-sm pb-1">↑</p>
            </div>
        ),
    },
    {
        title: "優先度降順",
        value: sortOptions[4], // "sortAscendingPriority"
        icon: (
            <div className="flex items-center justify-center">
                <Image
                    src="priority_0_black.svg"
                    width={25}
                    height={25}
                    alt="priority icon"
                    className="size-5"
                />
                <p className="text-lg pl-0.5 pb-1">↓</p>
            </div>
        ),
        pullDownIcon: (
            <div className="flex items-center justify-center w-9">
                <Image
                    src="priority_0_black.svg"
                    width={20}
                    height={20}
                    alt="priority icon"
                    className="size-4.5"
                />
                <p className="text-sm pb-1">↓</p>
            </div>
        ),
    },
];

// ==========================================================================
export const TaskSortButton = ({ onSelect }: TaskSortButtonProps) => {
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
