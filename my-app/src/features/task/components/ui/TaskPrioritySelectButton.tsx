// 優先度選択ボタン

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const options = [
    { value: "", icon: "" },
    { value: "priority1", icon: "priority_1.svg" },
    { value: "priority2", icon: "priority_2.svg" },
    { value: "priority3", icon: "priority_3.svg" },
];

type Props = {
    onChange: (value: string) => void;
    defaultValue?: string;
};

export const TaskPrioritySelectButton = ({ onChange }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(options[0]);

    const dropdownRef = useRef<HTMLDivElement>(null);

    // 外クリックでプルダウンを閉じる-------------------------------------------------------
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
    }, []); //------------------------------------------------------------------

    return (
        <div ref={dropdownRef}>
            {/*ボタン=====================================================*/}
            <button
                type="button"
                onClick={() => {
                    setIsOpen((state) => !state);
                }}
                className="
                z-10
        relative w-fit h-8 px-3 py-1
        border-1 border-gray-500 rounded-md cursor-pointer hover:bg-gray-100 shadow-sm"
            >
                <div className="flex items-center justify-center">
                    {/*アイコンの表示-----------------------------------*/}
                    {selected.value === "" ? (
                        <p className="pt-0.5 text-gray-500">! 優先度</p>
                    ) : (
                        <Image
                            src={selected.icon}
                            width={20}
                            height={20}
                            alt="priority1"
                            className="inline-block mr-1"
                        />
                    )}{" "}
                    {/*文字の表示------------------------------------*/}
                    {selected.value === "priority1" ? (
                        <p className="pt-0.5 ">最優先</p>
                    ) : selected.value === "priority2" ? (
                        <p className="pt-0.5 ">優先</p>
                    ) : (
                        ""
                    )}
                    {/*---------------------------------------------*/}
                </div>
            </button>

            {/*プルダウン=================================================*/}
            {isOpen && (
                <ul
                    className="absolute z-10
                    w-35
                    bg-white
                border-1 border-gray-500 rounded shadow-sm"
                >
                    <li>
                        <button
                            type="button"
                            onClick={() => {
                                onChange(options[0].value);
                                setSelected(options[0]);
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
                                setSelected(options[1]);
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
                            最優先
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={() => {
                                onChange(options[2].value);
                                setSelected(options[2]);
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
                            優先
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
};
