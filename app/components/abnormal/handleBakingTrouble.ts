import {
    type TerminalContextType,
    TerminalSectionId,
    TerminalStatus,
    type TerminalStatusText,
} from "@/app/context/TerminalContext";
import {
    USAGE_BAKING_PANIC1,
    USAGE_BAKING_TROUBLE,
} from "@/app/utils/usage/usageBaking";

export const handleBakingTrouble = (context: TerminalContextType) => {
    const { addNews, updateTerminalStatus, terminals } = context;

    const bakingTerminal = terminals.find(
        (terminal) => terminal.id === TerminalSectionId.Baking,
    );

    if (
        bakingTerminal?.statusText.terminalStatus ===
        TerminalStatus.ABNORMAL_EVENT
    ) {
        // トラブル内容
        addNews(TerminalSectionId.Baking, USAGE_BAKING_PANIC1);

        return;
    }
    const trouble: TerminalStatusText = {
        terminalStatus: TerminalStatus.ABNORMAL_EVENT,
        errorMessage: "GAS LEAKS",
    };

    updateTerminalStatus(TerminalSectionId.Baking, trouble);
    addNews(TerminalSectionId.Baking, USAGE_BAKING_TROUBLE);
};
