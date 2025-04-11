"use client";

import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { LogLevel, TerminalSectionId, type UsageCode } from "../bt.types";
import { TerminalContext } from "../context/TerminalContext";
import { useBakingCommand } from "../hooks/useBakingCommand";
import { useCoolingCommand } from "../hooks/useCoolingCommand";
import { useGeneralCommand } from "../hooks/useGeneralCommand";
import { useMixingCommand } from "../hooks/useMixingCommand";
import { usePackagingCommand } from "../hooks/usePackagingCommand";
import { usePantryCommand } from "../hooks/usePantryCommand";
import { usePurchasingCommand } from "../hooks/usePurchasingCommand";
import { useSalesFrontCommand } from "../hooks/useSalesFrontCommand";
import { useShapingCommand } from "../hooks/useShapingCommand";
import { useUtilitiesCommand } from "../hooks/useUtilitiesCommand";
import { useWasteCommand } from "../hooks/useWasteCommand";
import {
    BakingCommands,
    CoolingCommands,
    GeneralCommands,
    MixingCommands,
    PackagingCommands,
    PantryCommands,
    PurchasingCommands,
    SalesFrontCommands,
    ShapingCommands,
    UtilitiesCommands,
    WasteCommands,
} from "../utils/Command";
import { greeting } from "../utils/greeting";
import {
    USAGE_COMMAND_NOT_ALLOWED,
    USAGE_EMPTY,
    USAGE_OPERATION_CEASED,
    USAGE_UNKNOWN_COMMAND,
} from "../utils/usage/usageGeneral";
import { CommandInput } from "./CommandInput";

export type LogProps = { message: string; level: LogLevel };

const OutputLog = ({ output }: { output: LogProps[] }) => {
    const outputRef = useRef<HTMLDivElement>(null);

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [output]);

    return (
        <div className="flex-grow overflow-y-auto">
            <div className="h-full overflow-y-auto">
                {output.map(({ message, level }) => (
                    <div
                        key={uuidv4()}
                        className={`py-0.5 ${
                            level === LogLevel.INFO
                                ? "text-green-500"
                                : level === LogLevel.WARN
                                  ? "text-amber-200"
                                  : "text-red-500"
                        }`}
                    >
                        {message.split("\n").map((line) => (
                            <span key={uuidv4()}>
                                {line}
                                <br />
                            </span>
                        ))}
                    </div>
                ))}
                {/* スクロール用ダミー */}
                <div ref={outputRef} />
            </div>
        </div>
    );
};

const CommandInputSection = ({
    input,
    setInput,
    handleKeyDown,
    inputRef,
    mode,
    isInputEnabled,
}: {
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    handleKeyDown: (e: React.KeyboardEvent) => void;
    inputRef: React.RefObject<HTMLInputElement>;
    mode: TerminalSectionId;
    isInputEnabled: boolean;
}) => (
    <CommandInput
        handleKeyDown={handleKeyDown}
        input={input}
        inputRef={inputRef}
        mode={mode}
        setInput={setInput}
        isInputEnabled={isInputEnabled}
    />
);

export const BackgroundConsole = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [input, setInput] = useState(""); // 現在の入力値
    const [output, setOutput] = useState<LogProps[]>(greeting); // 出力ログ
    const [buffer, setBuffer] = useState<string[]>([]); // コマンド履歴
    const [mode, setMode] = useState<TerminalSectionId>(
        TerminalSectionId.Purchasing,
    );
    const [isInputEnabled, setIsInputEnabled] = useState(true);
    const context = useContext(TerminalContext);
    if (!context) {
        throw new Error("TerminalContext is not available");
    }
    const { language } = context;
    const getLocalizedMessage = useCallback(
        (usage: UsageCode) =>
            language === "en" && usage.en ? usage.en : usage.ja,
        [language],
    );

    const addOutput = useCallback(
        (usage: UsageCode, level: LogLevel = LogLevel.INFO) =>
            setOutput((prev) => [
                ...prev,
                { message: getLocalizedMessage(usage), level },
            ]),
        [getLocalizedMessage],
    );

    const replaceOutput = useCallback(
        (usage: UsageCode, level: LogLevel = LogLevel.INFO) =>
            setOutput((prevOutput) =>
                prevOutput.map((log, i) =>
                    i === prevOutput.length - 1
                        ? { message: `| ${getLocalizedMessage(usage)}`, level }
                        : log,
                ),
            ),
        [getLocalizedMessage],
    );

    // 各セクションのコマンド実行関数を取得
    const generalCommandExecutor = useGeneralCommand(addOutput, mode, setMode);
    const purchasingCommandExecutor = usePurchasingCommand(
        addOutput,
        replaceOutput,
        setIsInputEnabled,
    );
    const pantryCommandExecutor = usePantryCommand(addOutput);
    const utilitiesCommandExecutor = useUtilitiesCommand(addOutput);
    const mixingCommandExecutor = useMixingCommand(addOutput);
    const coolingCommandExecutor = useCoolingCommand(addOutput);
    const shapingCommandExecutor = useShapingCommand(addOutput);
    const bakingCommandExecutor = useBakingCommand(addOutput);
    const packagingCommandExecutor = usePackagingCommand(addOutput);
    const salesFrontCommandExecutor = useSalesFrontCommand(addOutput);
    const wasteCommandExecutor = useWasteCommand(addOutput);

    // コマンドを実行
    const handleExecuteCommand = (command: string) => {
        if (command.trim() === "") {
            addOutput(USAGE_EMPTY); // 空行を追加
            return;
        }
        const [cmd, ...args] = command.split(/\s+/);

        // 各セクションのコマンドと対応するモードをマッピング
        const commandMap = [
            {
                commands: GeneralCommands,
                modes: [] as TerminalSectionId[], // 全モードで許容
                executor: generalCommandExecutor,
            },
            {
                commands: PurchasingCommands,
                modes: [TerminalSectionId.Purchasing] as TerminalSectionId[],
                executor: purchasingCommandExecutor,
            },
            {
                commands: PantryCommands,
                modes: [TerminalSectionId.Pantry] as TerminalSectionId[],
                executor: pantryCommandExecutor,
            },
            {
                commands: MixingCommands,
                modes: [TerminalSectionId.Mixing] as TerminalSectionId[],
                executor: mixingCommandExecutor,
            },
            {
                commands: CoolingCommands,
                modes: [TerminalSectionId.Cooling] as TerminalSectionId[],
                executor: coolingCommandExecutor,
            },
            {
                commands: ShapingCommands,
                modes: [TerminalSectionId.Shaping] as TerminalSectionId[],
                executor: shapingCommandExecutor,
            },
            {
                commands: BakingCommands,
                modes: [TerminalSectionId.Baking] as TerminalSectionId[],
                executor: bakingCommandExecutor,
            },
            {
                commands: PackagingCommands,
                modes: [TerminalSectionId.Packaging] as TerminalSectionId[],
                executor: packagingCommandExecutor,
            },
            {
                commands: SalesFrontCommands,
                modes: [TerminalSectionId.SalesFront] as TerminalSectionId[],
                executor: salesFrontCommandExecutor,
            },
            {
                commands: WasteCommands,
                modes: [TerminalSectionId.Waste] as TerminalSectionId[],
                executor: wasteCommandExecutor,
            },
            {
                commands: UtilitiesCommands,
                modes: [TerminalSectionId.Utilities] as TerminalSectionId[],
                executor: utilitiesCommandExecutor,
            },
        ] as const;

        // コマンドを検索して実行
        const matched = commandMap.find(({ commands }) =>
            Object.values(commands).includes(cmd as keyof typeof commands),
        );

        if (matched) {
            const { commands, modes, executor } = matched;

            // 現在のモードが許容されているか確認
            if (modes.length > 0 && !modes.includes(mode)) {
                // 現在のモードに基づいて適切なコマンドセットを選択
                const alternativeMatch = commandMap.find(
                    ({ commands: altCommands, modes: altModes }) =>
                        Object.values(altCommands).includes(
                            cmd as keyof typeof altCommands,
                        ) && altModes.includes(mode),
                );

                if (alternativeMatch) {
                    alternativeMatch.executor?.(
                        cmd as keyof typeof alternativeMatch.commands,
                        ...args,
                    );
                    return;
                }

                addOutput(USAGE_COMMAND_NOT_ALLOWED(cmd), LogLevel.WARN);
                return;
            }

            // 実行関数がある場合は実行
            if (executor) {
                executor(cmd as keyof typeof commands, ...args);
            }
        } else {
            addOutput(USAGE_UNKNOWN_COMMAND, LogLevel.ERROR);
        }
    };

    // コマンド履歴を上下に移動する
    const history = (direction: "up" | "down") =>
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
            setTimeout(() =>
                inputRef.current?.setSelectionRange(
                    newInput.length,
                    newInput.length,
                ),
            );
            return newInput;
        });

    const handleKeyDown = (e: React.KeyboardEvent) => {
        const actions: Record<string, () => void> = {
            Enter: () => {
                setOutput((prev) => [
                    ...prev,
                    {
                        message: `${TerminalSectionId[mode]} $ ${input}`,
                        level: LogLevel.INFO,
                    },
                ]);
                handleExecuteCommand(input);
                setBuffer((prev) => [...prev, input]);
                setInput("");
            },
            ArrowUp: () => history("up"),
            ArrowDown: () => history("down"),
        };
        actions[e.key]?.();
    };

    useEffect(() => {
        if (context.isGameOver()) {
            addOutput(USAGE_OPERATION_CEASED, LogLevel.ERROR);
        }
    }, [context, addOutput]);

    return (
        <div className="crt-grid crt-effect crt-flicker crt-noise crt-glass flex max-h-screen w-full flex-col rounded-t-2xl border-2 border-green-300 p-2 text-white">
            {/* 出力ログを表示 */}
            <OutputLog output={output} />
            {/* コマンド入力を表示 */}
            <CommandInputSection
                input={input}
                setInput={setInput}
                handleKeyDown={handleKeyDown}
                inputRef={inputRef as React.RefObject<HTMLInputElement>}
                mode={mode}
                isInputEnabled={isInputEnabled && !context.isGameOver()}
            />
        </div>
    );
};

export default BackgroundConsole;
