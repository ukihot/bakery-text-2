import { useCallback, useContext } from "react";
import { LogLevel, TerminalSectionId, type UsageCode } from "../bt.types";
import { TerminalContext, TerminalStatus } from "../context/TerminalContext";
import { MixingCommands } from "../utils/Command";
import {
    USAGE_MIXING_REPAIR_FAILURE,
    USAGE_MIXING_REPAIR_SUCCESS,
    USAGE_UNKNOWN_MIXING_COMMAND,
} from "../utils/usage/usageMixing";

export const useMixingCommand = (
    addOutput: (usage: UsageCode, level?: LogLevel) => void,
) => {
    const context = useContext(TerminalContext);
    if (!context) {
        throw new Error("TerminalContext is not available");
    }
    const { terminals, updateTerminalStatus } = context;
    const repairExec = useCallback(() => {
        const mixingTerminal = terminals.find(
            (terminal) => terminal.id === TerminalSectionId.Mixing,
        );

        if (
            mixingTerminal &&
            mixingTerminal.statusText.terminalStatus !== TerminalStatus.HEALTHY
        ) {
            updateTerminalStatus(mixingTerminal.id, {
                terminalStatus: TerminalStatus.HEALTHY,
                errorMessage: "",
            });
            addOutput(USAGE_MIXING_REPAIR_SUCCESS);
        } else {
            addOutput(USAGE_MIXING_REPAIR_FAILURE, LogLevel.WARN);
        }
    }, [terminals, updateTerminalStatus, addOutput]);

    return (cmd: MixingCommands) => {
        switch (cmd) {
            case MixingCommands.REPAIR:
                repairExec();
                break;
            default:
                addOutput(USAGE_UNKNOWN_MIXING_COMMAND(cmd), LogLevel.ERROR);
        }
    };
};
