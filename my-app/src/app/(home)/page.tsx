import {
    TaskAddSection,
    ListControlSection,
    ListDisplaySection,
} from "@/features/task/components/layout";

export default function Home() {
    return (
        <>
            <header>
                {/*ヘッダー*/}
                <h1>ヘッダー</h1>
            </header>

            <main>
                {/*メイン*/}
                <TaskAddSection />

                <ListControlSection />

                <ListDisplaySection />
            </main>

            <footer>{/*フッター*/}</footer>
        </>
    );
}
