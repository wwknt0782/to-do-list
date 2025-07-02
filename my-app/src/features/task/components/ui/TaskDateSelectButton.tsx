// 日付選択ボタン
"use client";

import { CalendarCheck, Calendar } from "lucide-react";
import { useRef, useState } from "react";

type TaskDateSelectButtonProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    size?: "mini";
};

// ================================================================================
export const TaskDateSelectButton = ({
    value,
    onChange,
    size,
}: TaskDateSelectButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    //showPickerでボタンのどこを押してもカレンダーが出るようにする
    const onClick = () => {
        if (!isOpen) {
            //カレンダーが閉じているときだけ開く処理をする
            const input = inputRef.current;
            if (!input) return;
            if (
                "showPicker" in input &&
                typeof (input as HTMLInputElement & { showPicker?: () => void })
                    .showPicker === "function"
            ) {
                (
                    input as HTMLInputElement & { showPicker?: () => void }
                ).showPicker?.();
                setIsOpen(true);
            } else {
                // Fallback: 非対応ブラウザ用にフォーカス or click
                inputRef.current?.focus();
                inputRef.current?.click();
                setIsOpen(true);
            }
        } else {
            //カレンダーが開いているときは開く処理をしない
            setIsOpen(false);
        }
    };

    // ============================================================================
    return (
        <div className="relative">
            {/*ボタン*/}
            {size === "mini" ? (
                <button // ミニサイズ
                    type="button"
                    onClick={onClick}
                    className="z-10 relative w-fit h-8 px-3 py-1
        border-1 border-white hover:border-gray-500 rounded-md cursor-pointer"
                >
                    {/*ボタンの表示部分 日付が選択されたらその日付を表示する*/}
                    <div className="flex items-center justify-center">
                        {value ? (
                            <>
                                <CalendarCheck className="inline-block size-6" />
                                <p className="ml-1 pt-0.5">{value}</p>
                            </>
                        ) : (
                            <>
                                <Calendar className="inline-block text-gray-500 size-6" />
                            </>
                        )}
                    </div>
                </button>
            ) : (
                <button // 通常サイズ
                    type="button"
                    onClick={onClick}
                    className="z-10 relative w-fit min-w-20 h-8 px-3 py-1
        border-1 border-gray-500 rounded-md shadow-sm hover:bg-gray-100 cursor-pointer"
                >
                    {/*ボタンの表示部分 日付が選択されたらその日付を表示する*/}
                    <label
                        htmlFor="input-date"
                        className="flex items-center justify-center"
                    >
                        {value ? (
                            <>
                                <CalendarCheck className="inline-block size-5" />
                                <p className="ml-1 pt-0.5">{value}</p>
                            </>
                        ) : (
                            <>
                                <Calendar className="inline-block text-gray-500 size-5" />
                                <p className="ml-1 pt-0.5 text-gray-500">
                                    期限
                                </p>
                            </>
                        )}
                    </label>
                </button>
            )}

            {/*入力エリア(透過)*/}
            <input
                id="input-date"
                type="date"
                ref={inputRef}
                value={value}
                onChange={onChange}
                className="
                z-1 absolute top-0 left-0
                w-full h-full
                opacity-0"
            />
        </div>
    );
};
