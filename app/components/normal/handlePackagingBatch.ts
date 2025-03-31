import { BreadCookingStatus } from "@/app/bt.types";
import {
    type TerminalContextType,
    TerminalSectionId,
} from "@/app/context/TerminalContext";
import {
    USAGE_NO_BAKED_BREAD,
    USAGE_PACKAGING_ACTIVITY,
} from "@/app/utils/usage/usagePackaging";

export const handlePackagingBatch = async (context: TerminalContextType) => {
    const { bread, updateBread, addNews, updateProgress } = context;

    // Baked 状態のパンを検索
    const bakedBread = bread.filter(
        (b) => b.cookStatus === BreadCookingStatus.Baked,
    );
    if (bakedBread.length === 0) {
        addNews(TerminalSectionId.Packaging, USAGE_NO_BAKED_BREAD);
        return; // Baked 状態のパンがない場合は終了
    }

    let progress = 0;

    const updateProgressAsync = () =>
        new Promise<void>((resolve) => {
            const intervalId = setInterval(() => {
                updateProgress(TerminalSectionId.Packaging, progress);
                progress += 10;

                if (progress >= 100) {
                    updateProgress(TerminalSectionId.Packaging, 100);
                    clearInterval(intervalId);
                    resolve();
                }
            }, 500);
        });

    await updateProgressAsync();

    // Packaged 状態に更新
    const packagedBread = bread.map((b) =>
        b.cookStatus === BreadCookingStatus.Baked
            ? { ...b, cookStatus: BreadCookingStatus.Packaged }
            : b,
    );
    updateBread(packagedBread);

    // ニュースを追加
    addNews(TerminalSectionId.Packaging, USAGE_PACKAGING_ACTIVITY);
};
