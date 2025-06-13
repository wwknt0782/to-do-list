import {
    TaskAddSection,
    ListControlSection,
    ListDisplaySection,
} from "@/features/task/components/layout";

export default function Home() {
    return (
        <>
            <header className="px-5 sm:px-10">
                {/*ヘッダー*/}
                <h1>ヘッダー</h1>
            </header>

            <main className="px-5 sm:px-10">
                {/*メイン*/}
                <TaskAddSection />

                <ListControlSection />

                <ListDisplaySection />
            </main>

            <footer>{/*フッター*/}</footer>
        </>
    );
}
