export const TaskAddButton = (props: { onClick: () => void }) => {
    return (
        <button
            type="button"
            onClick={props.onClick}
            className="
        relative w-fit h-10 px-2 py-1
        border-2 border-gray-800 rounded-md bg-gray-800 text-white cursor-pointer  shadow-md"
        >
            {/*ボタンの表示部分*/}
            <p className="pt-0.5">タスクを追加</p>
        </button>
    );
};
