"use client";

// ==========================================================================
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { ArrowUpDown, Calendar } from "lucide-react";

const options = [
    { value: "sortDate", icon: "" },
    { value: "sortPriority", icon: "priority_0.svg" },
];

export const TaskSortButton = () => {
    // const -------------------
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("");
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
            <button
                type="button"
                onClick={() => setIsOpen((state) => !state)}
                className=" w-11 h-10 border-1 border-gray-500 rounded-md shadow-sm hover:bg-gray-100 cursor-pointer"
            >
                {selected === "" ? (
                    <ArrowUpDown className="size-5 mx-auto my-auto text-gray-500" />
                ) : selected === "sortDate" ? (
                    <Calendar className="size-5.5 mx-auto" />
                ) : selected === "sortPriority" ? (
                    <Image
                        src="priority_0_black.svg"
                        width={25}
                        height={25}
                        alt="priority icon"
                        className="size-6 mx-auto"
                    />
                ) : (
                    ""
                )}
            </button>

            {/*プルダウン*/}
            {isOpen && (
                <ul
                    className="absolute right-0 z-15
                    w-35
                    bg-white
                border-1 border-gray-500 rounded shadow-sm"
                >
                    <li>
                        <button
                            type="button"
                            onClick={() => {
                                setSelected(options[0].value);
                                setIsOpen(false);
                            }}
                            className="flex items-center justify-start w-full py-1 text-left cursor-pointer hover:bg-gray-100"
                        >
                            <Calendar className="inline-block size-5 w-9" />{" "}
                            <p className="inline-block text-left">期限</p>
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={() => {
                                setSelected(options[1].value);
                                setIsOpen(false);
                            }}
                            className="flex items-center justify-start w-full py-1 text-left cursor-pointer hover:bg-gray-100"
                        >
                            <Image
                                src="priority_0_black.svg"
                                width={20}
                                height={20}
                                alt={options[1].value}
                                className="inline-block size-5 w-9"
                            />
                            <p className="inline-block text-left">優先度</p>
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
};
