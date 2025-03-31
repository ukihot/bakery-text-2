import { BreadCookingStatus } from "@/app/bt.types";
import {
    type TerminalContextType,
    TerminalSectionId,
} from "@/app/context/TerminalContext";
import {
    USAGE_SHAPING_ACTIVITY,
    USAGE_NO_FIRST_PROOFED_BREAD,
} from "@/app/utils/usage/usageShaping";

export const handleShapingBatch = async (context: TerminalContextType) => {
    const { bread, updateBread, addNews, updateProgress } = context;

    // FirstProofed 状態のパンを検索
    const firstProofedBread = bread.filter(
        (b) => b.cookStatus === BreadCookingStatus.FirstProofed,
    );
    if (firstProofedBread.length === 0) {
        addNews(TerminalSectionId.Shaping, USAGE_NO_FIRST_PROOFED_BREAD);
        return; // FirstProofed 状態のパンがない場合は終了
    }

    let progress = 0;

    const updateProgressAsync = () =>
        new Promise<void>((resolve) => {
            const intervalId = setInterval(() => {
                updateProgress(TerminalSectionId.Shaping, progress);
                progress += 10;

                if (progress >= 100) {
                    updateProgress(TerminalSectionId.Shaping, 100);
                    clearInterval(intervalId);
                    resolve();
                }
            }, 500);
        });

    await updateProgressAsync();

    // Shaped 状態に更新
    const shapedBread = bread.map((b) =>
        b.cookStatus === BreadCookingStatus.FirstProofed
            ? { ...b, cookStatus: BreadCookingStatus.Shaped }
            : b,
    );
    updateBread(shapedBread);

    // ニュースを追加
    addNews(TerminalSectionId.Shaping, USAGE_SHAPING_ACTIVITY);
};
