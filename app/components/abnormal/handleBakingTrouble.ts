import {
    type TerminalContextType,
    TerminalSectionId,
    type TerminalStatusText,
} from "@/app/context/TerminalContext";
import { USAGE_TEXTS } from "@/app/utils/usage/usageGeneral";

export const handleBakingTrouble = (context: TerminalContextType) => {
    const { addNews, updateTerminalStatus } = context;

    const trouble: TerminalStatusText = {
        terminalStatus: "ANOMALY",
        sectionText: "GAS LEAKS",
    };

    updateTerminalStatus(TerminalSectionId.Baking, trouble);
    addNews(TerminalSectionId.Baking, USAGE_TEXTS.BAKING_TROUBLE);
};
