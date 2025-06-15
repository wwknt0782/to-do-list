export const TaskAddButton = (props: { onClick: () => void }) => {
    return (
        <button
            type="button"
            onClick={props.onClick}
            className="
        relative w-fit h-10 px-2 py-1
        rounded-md bg-gray-800 text-white border-2 border-gray-800 shadow-md
        hover:text-gray-800 hover:bg-white cursor-pointer duration-100"
        >
            {/*ボタンの表示部分*/}
            <p className="pt-0.5">タスクを追加</p>
        </button>
    );
};
