import { useCallback, useContext } from "react";
import { LogLevel, TerminalSectionId, type UsageCode } from "../bt.types";
import { TerminalContext, TerminalStatus } from "../context/TerminalContext";
import { CoolingCommands } from "../utils/Command";
import {
    USAGE_COOLING_REPAIR_FAILURE,
    USAGE_COOLING_REPAIR_SUCCESS,
    USAGE_UNKNOWN_COOLING_COMMAND,
} from "../utils/usage/usageCooling";

export const useCoolingCommand = (
    addOutput: (usage: UsageCode, level?: LogLevel) => void,
) => {
    const context = useContext(TerminalContext);
    if (!context) {
        throw new Error("TerminalContext is not available");
    }
    const { terminals, updateTerminalStatus } = context;

    const repairExec = useCallback(() => {
        const coolingTerminal = terminals.find(
            (terminal) => terminal.id === TerminalSectionId.Cooling,
        );

        if (
            coolingTerminal &&
            coolingTerminal.statusText.terminalStatus !== TerminalStatus.HEALTHY
        ) {
            updateTerminalStatus(coolingTerminal.id, {
                terminalStatus: TerminalStatus.HEALTHY,
                errorMessage: "",
            });
            addOutput(USAGE_COOLING_REPAIR_SUCCESS);
        } else {
            addOutput(USAGE_COOLING_REPAIR_FAILURE, LogLevel.WARN);
        }
    }, [terminals, updateTerminalStatus, addOutput]);

    return (cmd: CoolingCommands) => {
        switch (cmd) {
            case CoolingCommands.REPAIR:
                repairExec();
                break;
            default:
                addOutput(USAGE_UNKNOWN_COOLING_COMMAND(cmd), LogLevel.ERROR);
        }
    };
};
