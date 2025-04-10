import {
    type TerminalContextType,
    TerminalSectionId,
} from "@/app/context/TerminalContext";
import { USAGE_TEXTS } from "@/app/utils/usage/usageGeneral";

export const handlePantryBatch = (context: TerminalContextType) => {
    const { addNews } = context;
    addNews(TerminalSectionId.Pantry, USAGE_TEXTS.PANTRY_ACTIVITY);
};
