import type { UsageCode } from "../../bt.types";

export const USAGE_UNKNOWN_BAKING_COMMAND = (cmd: string): UsageCode => ({
    ja: `不明な焼成コマンド: ${cmd}`,
    en: `Unknown baking command: ${cmd}`,
});

export const USAGE_BAKING_ACTIVITY: UsageCode = {
    ja: "焼成処理が完了しました。",
    en: "Baking process completed.",
};

export const USAGE_NO_SECOND_PROOFED_BREAD: UsageCode = {
    ja: "二次発酵済みのパンがありません。",
    en: "No second-proofed bread available.",
};
