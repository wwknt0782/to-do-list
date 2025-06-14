export const TaskExplanationInputForm = (props: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
    return (
        <textarea
            value={props.value}
            onChange={props.onChange}
            placeholder="説明"
            className="px-2 py-1 mb-2 overflow-y-auto
                border-b-1 border-gray-500"
        />
    );
};
