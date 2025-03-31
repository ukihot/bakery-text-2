import { useCallback } from "react";
import { LogLevel, PurchasingCommands } from "../utils/Command";

export const usePurchasingCommands = (
	addOutput: (message: string, level?: LogLevel) => void,
) => {
	const buy_exec = useCallback(
		(item: string | undefined) => {
			if (!item) {
				addOutput("No item specified for 'buy' command", LogLevel.ERROR);
				return;
			}
			addOutput(`Purchasing item: ${item}`, LogLevel.INFO);
			// ここに購入処理のロジックを追加できます
		},
		[addOutput],
	);

	return useCallback(
		(command: PurchasingCommands, ...args: string[]) => {
			switch (command) {
				case PurchasingCommands.BUY:
					buy_exec(args[0]);
					break;
				default:
					addOutput(`Unknown purchasing command: ${command}`, LogLevel.ERROR);
			}
		},
		[buy_exec, addOutput],
	);
};
