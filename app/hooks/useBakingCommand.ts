import { useCallback, useContext } from "react";
import { LogLevel, TerminalSectionId, type UsageCode } from "../bt.types";
import { TerminalContext, TerminalStatus } from "../context/TerminalContext";
import { BakingCommands } from "../utils/Command";
import {
    USAGE_BAKING_REPAIR_FAILURE,
    USAGE_BAKING_REPAIR_SUCCESS,
    USAGE_UNKNOWN_BAKING_COMMAND,
} from "../utils/usage/usageBaking";

export const useBakingCommand = (
    addOutput: (usage: UsageCode, level?: LogLevel) => void,
) => {
    const context = useContext(TerminalContext);
    if (!context) {
        throw new Error("TerminalContext is not available");
    }
    const { terminals, updateTerminalStatus } = context;

    const repairExec = useCallback(() => {
        const bakingTerminal = terminals.find(
            (terminal) => terminal.id === TerminalSectionId.Baking,
        );

        if (
            bakingTerminal &&
            bakingTerminal.statusText.terminalStatus !== TerminalStatus.HEALTHY
        ) {
            updateTerminalStatus(bakingTerminal.id, {
                terminalStatus: TerminalStatus.HEALTHY,
                errorMessage: "",
            });
            addOutput(USAGE_BAKING_REPAIR_SUCCESS);
        } else {
            addOutput(USAGE_BAKING_REPAIR_FAILURE, LogLevel.WARN);
        }
    }, [terminals, updateTerminalStatus, addOutput]);

    return (cmd: BakingCommands) => {
        switch (cmd) {
            case BakingCommands.REPAIR:
                repairExec();
                break;
            default:
                addOutput(USAGE_UNKNOWN_BAKING_COMMAND(cmd), LogLevel.ERROR);
        }
    };
};
