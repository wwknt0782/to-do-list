import { ListFilter } from "lucide-react";

export const TaskFilterButton = () => {
    return (
        <button
            type="button"
            className="w-11 h-10 border-1 border-gray-500 rounded-md shadow-sm hover:bg-gray-100 cursor-pointer"
        >
            <ListFilter className="size-5 mx-auto my-auto" />
        </button>
    );
};
