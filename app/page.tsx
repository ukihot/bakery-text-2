"use client";

import dynamic from "next/dynamic";

const TerminalProvider = dynamic(
    () =>
        import("./context/TerminalContext").then((mod) => mod.TerminalProvider),
    { ssr: false, loading: () => <div>Loading TerminalProvider...</div> },
);

const TerminalWindows = dynamic(
    () =>
        import("./components/TerminalWindows").then(
            (mod) => mod.TerminalWindows,
        ),
    { ssr: false, loading: () => <div>Loading TerminalWindows...</div> },
);

const BackgroundConsole = dynamic(
    () => import("./components/BackgroundConsole"),
    { ssr: false, loading: () => <div>Loading BackgroundConsole...</div> },
);

export default function Home() {
    return (
        <TerminalProvider>
            <BackgroundConsole />
            <TerminalWindows />
        </TerminalProvider>
    );
}
