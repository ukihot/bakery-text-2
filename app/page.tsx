"use client";

import { TerminalProvider } from "./context/TerminalContext";
import { BackgroundConsole } from "./components/BackgroundConsole";
import { MyTerminalWindow } from "./components/MyTerminalWindow";
import React from "react";
import { TerminalContext } from "./context/TerminalContext";

export default function Home() {
	return (
		<TerminalProvider>
			<BackgroundConsole />
			<TerminalWindows />
		</TerminalProvider>
	);
}

const TerminalWindows = () => {
	const { terminals } = React.useContext(TerminalContext) ?? { terminals: [] };
	return (
		<>
			{terminals.map((terminal) => (
				<MyTerminalWindow key={terminal.id} {...terminal} />
			))}
		</>
	);
};
