// 日付選択ボタン
import { CalendarCheck, Calendar } from "lucide-react";

export const TaskDateSelectButton = (props: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    //ボタンのどこを押してもカレンダーが出るようにする---------------------------
    const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
        const input = e.currentTarget;

        // showPicker が存在するか確認してから呼ぶ
        if (
            "showPicker" in input &&
            typeof (input as HTMLInputElement & { showPicker?: () => void })
                .showPicker === "function"
        ) {
            (
                input as HTMLInputElement & { showPicker?: () => void }
            ).showPicker?.();
        } else {
            // Fallback: 非対応ブラウザ用にフォーカス or click
            input.focus();
            input.click();
        }
    }; //---------------------------------------------------------------------

    return (
        <button
            className="
        relative w-fit h-8 px-3 py-1
        border-1 border-gray-500 rounded-md shadow-sm hover:bg-gray-100"
        >
            {/*ボタンの入力部分*/}
            <input
                type="date"
                value={props.value}
                onClick={onClick}
                onChange={props.onChange}
                className="
                z-10 absolute top-0 left-0
                w-full h-full
                opacity-0 cursor-pointer [&::-webkit-calendar-picker-indicator]:cursor-pointer"
            />

            {/*ボタンの表示部分 日付が選択されたらその日付を表示する*/}
            <div className="flex items-center justify-center">
                {props.value ? (
                    <>
                        <CalendarCheck className="inline-block size-5 mr-1" />
                        <p className="pt-0.5">{props.value}</p>
                    </>
                ) : (
                    <>
                        <Calendar className="inline-block text-gray-500 size-5 mr-1" />
                        <p className="pt-0.5 text-gray-500">期限</p>
                    </>
                )}
            </div>
        </button>
    );
};
