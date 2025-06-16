import { Search } from "lucide-react";

export const TaskSearchForm = () => {
    return (
        <div className="relative flex items-center w-[70%]">
            <input
                type="text"
                className="z-10 absolute left-0 w-full h-10 px-2 border-1 border-gray-500 rounded-md shadow-sm hover:bg-gray-100"
            ></input>
            <Search className="size-5 absolute right-2" />
        </div>
    );
};
