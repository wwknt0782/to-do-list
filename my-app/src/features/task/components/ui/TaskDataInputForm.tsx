export const TaskDataInputForm = (props: {
    titleValue: string;
    titleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    explanationValue: string;
    explanationOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    return (
        <form className="flex flex-col">
            <input
                type="text"
                value={props.titleValue}
                onChange={props.titleOnChange}
                placeholder="タイトル"
            />
            <input
                type="text"
                value={props.explanationValue}
                onChange={props.explanationOnChange}
                placeholder="説明"
            />
        </form>
    );
};
