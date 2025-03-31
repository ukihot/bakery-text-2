"use client";

import type React from "react";
import { createContext, useCallback, useState } from "react";
import { TerminalSectionId } from "../utils/Command";

export interface TerminalPosition {
	x: number;
	y: number;
	z: number;
}

export interface Terminal {
	id: TerminalSectionId;
	position: TerminalPosition;
	zIndex: number;
	statusTexts: string[];
}

export interface TerminalContextType {
	terminals: Terminal[];
	updateTerminalPosition: (
		id: TerminalSectionId,
		position: TerminalPosition,
	) => void;
	addTerminal: (id: TerminalSectionId) => void;
}

export const TerminalContext = createContext<TerminalContextType | undefined>(
	undefined,
);

export const TerminalProvider = ({
	children,
}: { children: React.ReactNode }) => {
	const [terminals, setTerminals] = useState<Terminal[]>([]);

	const updateTerminalPosition = useCallback(
		(id: TerminalSectionId, position: TerminalPosition) => {
			setTerminals((prev) =>
				prev.map((terminal) =>
					terminal.id === id ? { ...terminal, position } : terminal,
				),
			);
		},
		[],
	);

	const addTerminal = (id: TerminalSectionId) => {
		setTerminals((prev) => {
			if (prev.some((terminal) => terminal.id === id)) return prev;
			const maxZIndex = Math.max(0, ...prev.map((t) => t.zIndex));
			return [
				...prev,
				{
					id,
					position: { x: 100 + id * 50, y: 100 + id * 50, z: maxZIndex + 1 },
					zIndex: maxZIndex + 1,
					statusTexts: ["Press F1 for help", "Slide 1", "CPU Usage: 14%"], // 初期値を設定
				},
			];
		});
	};

	return (
		<TerminalContext.Provider
			value={{ terminals, updateTerminalPosition, addTerminal }}
		>
			{children}
		</TerminalContext.Provider>
	);
};
export { TerminalSectionId };
