export const TaskDataInputForm = (props: {
    titleValue: string;
    titleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    explanationValue: string;
    explanationOnChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
    return (
        <form className="flex flex-col">
            <input
                type="text"
                value={props.titleValue}
                onChange={props.titleOnChange}
                placeholder="タイトル"
                className="px-2 py-1 mb-2 w-[50%]
                border-b-1 border-gray-500"
            />
            <textarea
                value={props.explanationValue}
                onChange={props.explanationOnChange}
                placeholder="説明"
                className="px-2 py-1 mb-2 overflow-y-auto
                border-b-1 border-gray-500"
            />
        </form>
    );
};
