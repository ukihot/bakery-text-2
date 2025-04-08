import { useCallback, useContext } from "react";
import { LogLevel, TerminalSectionId, type UsageCode } from "../bt.types";
import { TerminalContext, TerminalStatus } from "../context/TerminalContext";
import { ShapingCommands } from "../utils/Command";
import {
    USAGE_SHAPING_REPAIR_FAILURE,
    USAGE_SHAPING_REPAIR_SUCCESS,
    USAGE_UNKNOWN_SHAPING_COMMAND,
} from "../utils/usage/usageShaping";

export const useShapingCommand = (
    addOutput: (usage: UsageCode, level?: LogLevel) => void,
) => {
    const context = useContext(TerminalContext);
    if (!context) {
        throw new Error("TerminalContext is not available");
    }
    const { terminals, updateTerminalStatus } = context;

    const repairExec = useCallback(() => {
        const shapingTerminal = terminals.find(
            (terminal) => terminal.id === TerminalSectionId.Shaping,
        );

        if (
            shapingTerminal &&
            shapingTerminal.statusText.terminalStatus !== TerminalStatus.HEALTHY
        ) {
            updateTerminalStatus(shapingTerminal.id, {
                terminalStatus: TerminalStatus.HEALTHY,
                errorMessage: "",
            });
            addOutput(USAGE_SHAPING_REPAIR_SUCCESS);
        } else {
            addOutput(USAGE_SHAPING_REPAIR_FAILURE, LogLevel.WARN);
        }
    }, [terminals, updateTerminalStatus, addOutput]);

    return (cmd: ShapingCommands) => {
        switch (cmd) {
            case ShapingCommands.REPAIR:
                repairExec();
                break;
            default:
                addOutput(USAGE_UNKNOWN_SHAPING_COMMAND(cmd), LogLevel.ERROR);
        }
    };
};
