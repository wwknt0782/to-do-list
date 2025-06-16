// 優先度選択ボタン
"use client";

// ==========================================================================
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const options = [
    { value: "", icon: "priority_0.svg" },
    { value: "priority1", icon: "priority_1.svg" },
    { value: "priority2", icon: "priority_2.svg" },
    { value: "priority3", icon: "priority_3.svg" },
];

type TaskPrioritySelectButtonProps = {
    value: string;
    onChange: (value: string) => void;
    size?: "mini";
};

// ==========================================================================
export const TaskPrioritySelectButton = ({
    value,
    onChange,
    size,
}: TaskPrioritySelectButtonProps) => {
    // const -------------------
    const [isOpen, setIsOpen] = useState(false);
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

    // ==========================================================================
    return (
        <div ref={dropdownRef}>
            {/*ボタン*/}
            {size === "mini" ? (
                <button //ミニサイズ-----------------
                    type="button"
                    onClick={() => {
                        setIsOpen((state) => !state);
                    }}
                    className="z-10 relative w-fit h-8 px-3 py-1
                border-1 border-white hover:border-gray-500 rounded-md cursor-pointer hover:shadow-sm"
                >
                    <div className="flex items-center justify-center">
                        {/*アイコン表示*/}

                        <Image
                            src={
                                options.find((o) => o.value === value)?.icon ||
                                ""
                            }
                            width={25}
                            height={25}
                            alt="priorityIcon"
                            className="inline-block"
                        />
                    </div>
                </button>
            ) : (
                <button //通常サイズ----------------
                    type="button"
                    onClick={() => {
                        setIsOpen((state) => !state);
                    }}
                    className="z-10 relative w-fit min-w-25 h-8 px-3 py-1
                border-1 border-gray-500 rounded-md cursor-pointer hover:bg-gray-100 shadow-sm"
                >
                    <div className="flex items-center justify-center">
                        {/*アイコン表示*/}

                        <Image
                            src={
                                options.find((o) => o.value === value)?.icon ||
                                ""
                            }
                            width={20}
                            height={20}
                            alt="priorityIcon"
                            className="inline-block"
                        />

                        {/*文字表示*/}
                        {value === "" ? (
                            <p className="pt-0.5 ml-1 text-gray-500">優先度</p>
                        ) : value === "priority1" ? (
                            <p className="pt-0.5 ml-1 ">優先度 高</p>
                        ) : value === "priority2" ? (
                            <p className="pt-0.5 ml-1 ">優先度 中</p>
                        ) : value === "priority3" ? (
                            <p className="pt-0.5 ml-1 ">優先度 低</p>
                        ) : (
                            ""
                        )}
                    </div>
                </button>
            )}

            {/*プルダウン*/}
            {isOpen && (
                <ul
                    className="absolute z-15
                    w-35
                    bg-white
                border-1 border-gray-500 rounded shadow-sm"
                >
                    <li>
                        <button
                            type="button"
                            onClick={() => {
                                onChange(options[0].value);
                                setIsOpen(false);
                            }}
                            className="w-full pl-3 py-1 text-left cursor-pointer hover:bg-gray-100"
                        >
                            ー
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={() => {
                                onChange(options[1].value);
                                setIsOpen(false);
                            }}
                            className="w-full px-2 py-1 text-left cursor-pointer hover:bg-gray-100"
                        >
                            <Image
                                src={options[1].icon}
                                width={20}
                                height={20}
                                alt={options[1].value}
                                className="inline-block mr-1"
                            />
                            優先度 高
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={() => {
                                onChange(options[2].value);
                                setIsOpen(false);
                            }}
                            className="w-full px-2 py-1 text-left cursor-pointer hover:bg-gray-100"
                        >
                            <Image
                                src={options[2].icon}
                                width={20}
                                height={20}
                                alt={options[2].value}
                                className="inline-block mr-1"
                            />
                            優先度 中
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={() => {
                                onChange(options[3].value);
                                setIsOpen(false);
                            }}
                            className="w-full px-2 py-1 text-left cursor-pointer hover:bg-gray-100"
                        >
                            <Image
                                src={options[3].icon}
                                width={20}
                                height={20}
                                alt={options[3].value}
                                className="inline-block mr-1"
                            />
                            優先度 低
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
};
