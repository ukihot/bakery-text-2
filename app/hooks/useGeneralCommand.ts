import { useCallback } from "react";
import type { TerminalContextType } from "../context/TerminalContext";
import { GeneralCommands, LogLevel, TerminalSectionId } from "../utils/Command";

export const useGeneralCommand = (
	addOutput: (message: string, level?: LogLevel) => void,
	context: TerminalContextType & {
		setMode: React.Dispatch<React.SetStateAction<TerminalSectionId>>;
	},
) => {
	const ls_exec = useCallback(() => {
		addOutput("dir1", LogLevel.INFO);
		addOutput("dir2", LogLevel.INFO);
		addOutput("file1.txt", LogLevel.INFO);
		addOutput("file2.txt", LogLevel.INFO);
	}, [addOutput]);

	const term_exec = useCallback(
		(subCommand: string, id: string | undefined) => {
			const { terminals, updateTerminalPosition, addTerminal } = context;

			switch (subCommand) {
				case "list":
					addOutput(`Open Terminals: ${terminals.length}`, LogLevel.INFO);
					for (const t of terminals) {
						addOutput(
							`ID: ${t.id} Position: (${t.position.x}, ${t.position.y}, ${t.position.z})`,
							LogLevel.INFO,
						);
					}
					break;
				case "open":
					if (id) {
						const terminalId = Number(id);
						if (
							Number.isNaN(terminalId) ||
							!(terminalId in TerminalSectionId)
						) {
							addOutput(
								`Invalid Terminal ID: ${id}. Must be a number corresponding to a valid TerminalSectionId.`,
								LogLevel.ERROR,
							);
							break;
						}
						const existingTerminal = terminals.find((t) => t.id === terminalId);
						if (existingTerminal) {
							addOutput(
								`Terminal ID: ${terminalId} already exists`,
								LogLevel.WARN,
							);
						} else {
							addOutput(`Creating Terminal ID: ${terminalId}`, LogLevel.INFO);
							addTerminal(terminalId as TerminalSectionId);
						}
					} else {
						addOutput("Invalid or missing ID for 'term open'", LogLevel.ERROR);
					}
					break;
				case "format": {
					const spacing = 81; // ターミナル間のスペース
					let currentY = 10; // 現在のY座標を追跡

					// 画面サイズを取得
					const screenWidth = window.innerWidth;

					// ターミナルをIDの昇順でソート
					const sortedTerminals = [...terminals].sort((a, b) => a.id - b.id);

					for (const terminal of sortedTerminals) {
						const newPosition = {
							x: screenWidth / 2,
							y: currentY,
							z: terminal.position.z,
						}; // 中央に配置
						updateTerminalPosition(terminal.id, newPosition);
						addOutput(
							`Updated Terminal ID: ${terminal.id} to Position: (${newPosition.x}, ${newPosition.y}, ${newPosition.z})`,
							LogLevel.INFO,
						);
						currentY += spacing;
					}
					addOutput("Terminals have been formatted", LogLevel.INFO);
					break;
				}
				default:
					addOutput(`Invalid term subcommand: ${subCommand}`, LogLevel.ERROR);
			}
		},
		[addOutput, context],
	);

	const mode_exec = useCallback(
		(id: string | undefined) => {
			if (id) {
				const modeId = Number(id);
				if (Number.isNaN(modeId) || !(modeId in TerminalSectionId)) {
					addOutput(
						`Invalid Mode ID: ${id}. Must be a number corresponding to a valid TerminalSectionId.`,
						LogLevel.ERROR,
					);
					return;
				}
				context.setMode(modeId); // モードを変更

				addOutput(
					`Mode changed to: ${TerminalSectionId[modeId].toUpperCase()}`,
					LogLevel.INFO,
				);
			} else {
				addOutput("Invalid or missing ID for 'mode'", LogLevel.ERROR);
			}
		},
		[addOutput, context],
	);

	return useCallback(
		(command: GeneralCommands, ...args: string[]) => {
			switch (command) {
				case GeneralCommands.LS:
					ls_exec();
					break;
				case GeneralCommands.TERM:
					term_exec(args[0], args[1]);
					break;
				case GeneralCommands.MODE:
					mode_exec(args[0]);
					break;
				default:
					addOutput(`Unknown command: ${command}`, LogLevel.ERROR);
			}
		},
		[ls_exec, term_exec, mode_exec, addOutput],
	);
};
