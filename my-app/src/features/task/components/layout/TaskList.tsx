import { UseFilteredTaskStore } from "../../store/UseTaskStore";
import { UseTaskStore } from "../../store/UseTaskStore";

type TaskListProps = {
    search: string;
    check: boolean;
    sortBy: "title" | "date" | "priority";
};

export const TaskList = ({ search, check, sortBy }: TaskListProps) => {
    const tasks = UseFilteredTaskStore(search, check, sortBy);
    const toggle = UseTaskStore((s) => s.toggleComplete);
    const remove = UseTaskStore((s) => s.removeTask);

    return (
        <ul>
            {tasks.map((task) => (
                <li
                    key={task.id}
                    className="flex items-center justify-between p-2 border-b"
                >
                    <label>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggle(task.id)}
                        />
                        <span
                            className={
                                task.completed ? "line-through ml-2" : "ml-2"
                            }
                        >
                            {task.title}
                        </span>
                    </label>
                    <button
                        onClick={() => remove(task.id)}
                        className="text-red-500 hover:underline"
                    >
                        削除
                    </button>
                </li>
            ))}
        </ul>
    );
};
