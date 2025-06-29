export const TaskTitleInputForm = (props: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) => {
    return (
        <input
            type="text"
            value={props.value}
            onChange={props.onChange}
            onKeyDown={(e) => props.onKeyDown(e)}
            placeholder="タイトル"
            className="px-2 py-1 mb-2 w-[50%]
                border-b-1 border-gray-500"
        />
    );
};
