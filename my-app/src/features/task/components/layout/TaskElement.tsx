type TaskElementProps = {
    id: number;
    title: string;
    explanation: string;
    date: string;
    priority: string;
    check: boolean;
};

export const TaskElement = ({
    id,
    title,
    explanation,
    date,
    priority,
    check,
}: TaskElementProps) => {
    return (
        <li key={id} className="flex flex-row items-center justify-start">
            <button className="w-5 h-5 border-2 border-gray-500 rounded-full">
                {check ? "✓" : ""}
            </button>
            <div className="flex flex-col items-start justify-center w-[50%]">
                <p className="min-h-4">{title}</p>
                <p className="min-h-4">{explanation}</p>
            </div>
            <div>{date}</div>
            <div>{priority}</div>
        </li>
    );
};
