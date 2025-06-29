import { forwardRef } from "react";

type Props = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    ref: HTMLTextAreaElement;
};

export const TaskExplanationInputForm = forwardRef<HTMLTextAreaElement, Props>( // refはforwardRefでラップして別個で渡す
    (props, ref) => {
        return (
            <textarea
                ref={ref}
                value={props.value}
                onChange={props.onChange}
                placeholder="説明"
                className="px-2 py-1 mb-2 overflow-y-auto
                border-b-1 border-gray-500"
            />
        );
    }
);

TaskExplanationInputForm.displayName = "TaskExplanationInputForm"; //forwardRef使用時はdisplayNameを明示する
