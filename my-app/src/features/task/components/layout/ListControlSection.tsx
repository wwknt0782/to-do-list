import { TaskSearchForm, TaskSortButton, TaskFilterButton } from "../ui";

export const ListControlSection = () => {
    return (
        <div className="w-full flex flex-row items-center justify-end space-x-2">
            <TaskSearchForm />
            <TaskSortButton />
            <TaskFilterButton />
        </div>
    );
};
