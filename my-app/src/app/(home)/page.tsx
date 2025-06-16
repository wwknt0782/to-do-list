import {
    TaskAddSection,
    //ListControlSection,
    ListDisplaySection,
    StatusDisplaySection,
} from "@/features/task/components/layout";
import { Share_Tech_Mono } from "next/font/google";

const shareTechMono = Share_Tech_Mono({
    subsets: ["latin"],
    weight: "400",
});

export default function Home() {
    return (
        <>
            <header className="flex items-center px-5 sm:px-10 mb-10 bg-gray-500 h-10">
                {/*ヘッダー*/}
                <h1
                    className={`${shareTechMono.className} text-2xl text-gray-200`}
                >
                    To Do List
                </h1>
            </header>

            <main className="px-5 sm:px-10 overflow-x-scroll">
                {/*メイン*/}
                <TaskAddSection />

                <div className="mt-10 flex flex-col-reverse sm:flex-row items-center justify-between space-x-5">
                    <StatusDisplaySection />
                    {/*<ListControlSection />  未実装*/}
                </div>

                <ListDisplaySection />
            </main>

            <footer className="h-50">{/*フッター*/}</footer>
        </>
    );
}
