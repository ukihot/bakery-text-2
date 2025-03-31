"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { TerminalContext } from "../context/TerminalContext";
import { useGeneralCommand } from "../hooks/useGeneralCommand";
import { usePurchasingCommands } from "../hooks/usePurchasingCommands";
import {
	BakingCommands,
	CoolingCommands,
	GeneralCommands,
	LogLevel,
	MixingCommands,
	PackagingCommands,
	PantryCommands,
	PurchasingCommands,
	QualityControlCommands,
	SalesFrontCommands,
	ShapingCommands,
	StorageCommands,
	TerminalSectionId,
	UtilitiesCommands,
	WasteCommands,
} from "../utils/Command";

export type LogProps = { message: string; level: LogLevel };

// 出力ログを表示するコンポーネント
const OutputLog = ({ output }: { output: LogProps[] }) => {
	const outputRef = useRef<HTMLDivElement>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies:
	useEffect(() => {
		if (outputRef.current) {
			outputRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [output.length]);

	return (
		<div className="h-full overflow-y-auto">
			{output.map(({ message, level }, index) => (
				<div
					key={Math.random()}
					className={`py-0.5 ${
						level === LogLevel.INFO
							? "text-green-500"
							: level === LogLevel.WARN
								? "text-amber-200"
								: "text-red-500"
					}`}
				>
					{message}
				</div>
			))}
			{/* スクロール用ダミー */}
			<div ref={outputRef} />
		</div>
	);
};

// コマンド入力を処理するコンポーネント
const CommandInput = ({
	input,
	mode,
	setInput,
	handleKeyDown,
	inputRef,
}: {
	input: string;
	mode: TerminalSectionId;
	setInput: React.Dispatch<React.SetStateAction<string>>;
	handleKeyDown: (e: React.KeyboardEvent) => void;
	inputRef: React.RefObject<HTMLInputElement | null>;
}) => {
	// 入力フィールドにフォーカス
	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			e.preventDefault();
			inputRef.current?.focus();
		};

		document.addEventListener("click", handleClick);
		inputRef.current?.focus();

		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, [inputRef]);

	return (
		<div className="flex w-full font-bold">
			<span>
				~&gt;&nbsp;{TerminalSectionId[mode].toUpperCase()}&nbsp;$&nbsp;
			</span>
			<input
				ref={inputRef}
				type="text"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				onKeyDown={handleKeyDown}
				className="flex-grow !bg-[#0a0a0a] !shadow-none caret-green-500"
			/>
		</div>
	);
};

// メインコンポーネント
export const BackgroundConsole = () => {
	const [input, setInput] = useState(""); // 現在の入力値
	const [output, setOutput] = useState<LogProps[]>([]); // 出力ログ
	const [buffer, setBuffer] = useState<string[]>([]); // コマンド履歴
	const [mode, setMode] = useState<TerminalSectionId>(
		TerminalSectionId.Purchasing,
	);
	const terminalContext = useContext(TerminalContext);
	const inputRef = useRef<HTMLInputElement>(null);

	if (!terminalContext) throw new Error("TerminalContext is not available");

	const { terminals, updateTerminalPosition, addTerminal } = terminalContext;

	const addOutput = (message: string, level: LogLevel = LogLevel.INFO) =>
		setOutput((prev) => [...prev, { message: `| ${message}`, level }]);

	const executeGeneralCommand = useGeneralCommand(addOutput, {
		terminals,
		updateTerminalPosition,
		addTerminal,
		setMode,
	});

	const executePurchasingCommand = usePurchasingCommands(addOutput);

	// コマンドを実行
	const handleExecuteCommand = (command: string) => {
		if (command.trim() === "") {
			addOutput(""); // 空行を追加
			return;
		}
		const [cmd, ...args] = command.split(/\s+/);

		// 各セクションのコマンドと対応するモードをマッピング
		const commandMap = [
			{
				commands: GeneralCommands,
				mode: null,
				executor: executeGeneralCommand,
			},
			{ commands: PurchasingCommands, mode: TerminalSectionId.Purchasing },
			{ commands: PantryCommands, mode: TerminalSectionId.Pantry },
			{ commands: MixingCommands, mode: TerminalSectionId.Mixing },
			{ commands: CoolingCommands, mode: TerminalSectionId.Cooling },
			{ commands: ShapingCommands, mode: TerminalSectionId.Shaping },
			{ commands: BakingCommands, mode: TerminalSectionId.Baking },
			{ commands: PackagingCommands, mode: TerminalSectionId.Packaging },
			{
				commands: QualityControlCommands,
				mode: TerminalSectionId.QualityControl,
			},
			{ commands: StorageCommands, mode: TerminalSectionId.Storage },
			{ commands: SalesFrontCommands, mode: TerminalSectionId.SalesFront },
			{ commands: WasteCommands, mode: TerminalSectionId.Waste },
			{ commands: UtilitiesCommands, mode: TerminalSectionId.Utilities },
		] as const;

		// コマンドを検索して実行
		const matched = commandMap.find(({ commands }) =>
			Object.values(commands).includes(cmd as keyof typeof commands),
		);

		if (matched) {
			const { commands, mode: requiredMode } = matched;
			const executor = "executor" in matched ? matched.executor : undefined;

			// モードが一致しない場合は警告を表示
			if (requiredMode !== null && mode !== requiredMode) {
				addOutput(
					`Command "${cmd}" is not allowed in the current mode.`,
					LogLevel.WARN,
				);
				return;
			}

			// 実行関数がある場合は実行、ない場合はデフォルトの出力
			if (executor) {
				executor(cmd as keyof typeof commands, ...args);
			} else {
				addOutput(`Executed ${commands.constructor.name} command: ${cmd}`);
			}
		} else {
			addOutput(`Unknown command: ${cmd}`, LogLevel.ERROR);
		}
	};

	// コマンド履歴を上下に移動する
	const history = (direction: "up" | "down") => {
		setInput((prevInput) => {
			const currentIndex = buffer.indexOf(prevInput);
			const newIndex =
				direction === "up"
					? currentIndex === -1
						? buffer.length - 1
						: Math.max(currentIndex - 1, 0)
					: currentIndex === -1 || currentIndex === buffer.length - 1
						? -1
						: currentIndex + 1;

			const newInput = newIndex === -1 ? "" : buffer[newIndex] || "";
			setTimeout(() => {
				inputRef.current?.setSelectionRange(newInput.length, newInput.length);
			}, 0);
			return newInput;
		});
	};

	// キー入力を処理する
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			setOutput((prev) => [
				...prev,
				{
					message: `${TerminalSectionId[mode]} $ ${input}`, // 表示時にキー文字列を使用
					level: LogLevel.INFO,
				},
			]); // プロンプトをログに追加
			handleExecuteCommand(input); // コマンドを実行
			setBuffer((prev) => [...prev, input]); // 履歴に追加
			setInput(""); // 入力フィールドをクリア
		} else if (e.key === "ArrowUp")
			history("up"); // 履歴を上に移動
		else if (e.key === "ArrowDown") history("down"); // 履歴を下に移動
	};

	return (
		<div className="w-full max-h-screen text-white flex flex-col px-4">
			{/* 出力ログを表示 */}
			<div className="flex-grow overflow-y-auto">
				<OutputLog output={output} />
			</div>
			{/* コマンド入力を表示 */}
			<CommandInput
				input={input}
				mode={mode} // 型変更に対応
				setInput={setInput}
				inputRef={inputRef}
				handleKeyDown={handleKeyDown}
			/>
		</div>
	);
};

export default BackgroundConsole;
