"use client";

import { TaskSearchForm, TaskSortButton, TaskFilterButton } from "../ui";
import { useDisplayTaskList } from "../../store/UseListControl";

// =====================================================================================
export const ListControlSection = () => {
    const {
        updateDisplayBySearch,
        updateDisplayBySort,
        updateDisplayByFilter,
    } = useDisplayTaskList();

    // フィルター・ソート・検索ロジック ---------------------------------------
    // 表示条件を受け取ってIDリストをセットする関数

    // =====================================================================================
    return (
        <div className="w-full flex flex-row items-center justify-end space-x-2">
            <TaskSearchForm
                onSearch={(text) => updateDisplayBySearch(text)} // 検索文字列受け取り
                onClear={
                    () => updateDisplayBySearch("") // 検索ボックスクリア
                }
            />
            <TaskFilterButton
                onSelect={(filter) => updateDisplayByFilter(filter)} // フィルター条件受け取り
            />
            <TaskSortButton
                onSelect={(sort) => updateDisplayBySort(sort)} // ソート条件受け取り
            />
        </div>
    );
};
