import { BreadCookingStatus } from "@/app/bt.types";
import {
    type TerminalContextType,
    TerminalSectionId,
} from "@/app/context/TerminalContext";
import {
    USAGE_NO_PACKAGED_BREAD,
    USAGE_SALESFRONT_ACTIVITY,
} from "@/app/utils/usage/usageSalesFront";

export const handleSalesFrontBatch = async (context: TerminalContextType) => {
    const { bread, updateBread, addNews, updateProgress } = context;

    // Packaged 状態のパンを検索
    const packagedBread = bread.filter(
        (b) => b.cookStatus === BreadCookingStatus.Packaged,
    );
    if (packagedBread.length === 0) {
        addNews(TerminalSectionId.SalesFront, USAGE_NO_PACKAGED_BREAD);
        return; // Packaged 状態のパンがない場合は終了
    }

    let progress = 0;

    const updateProgressAsync = () =>
        new Promise<void>((resolve) => {
            const intervalId = setInterval(() => {
                updateProgress(TerminalSectionId.SalesFront, progress);
                progress += 10;

                if (progress >= 100) {
                    updateProgress(TerminalSectionId.SalesFront, 100);
                    clearInterval(intervalId);
                    resolve();
                }
            }, 500);
        });

    await updateProgressAsync();

    // Shelved 状態に更新
    const shelvedBread = bread.map((b) =>
        b.cookStatus === BreadCookingStatus.Packaged
            ? { ...b, cookStatus: BreadCookingStatus.Shelved }
            : b,
    );
    updateBread(shelvedBread);

    // ニュースを追加
    addNews(TerminalSectionId.SalesFront, USAGE_SALESFRONT_ACTIVITY);
};
