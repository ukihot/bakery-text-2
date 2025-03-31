import type { UsageCode } from "../../bt.types";

export const USAGE_UNKNOWN_SHAPING_COMMAND = (cmd: string): UsageCode => ({
    ja: `不明な成形コマンド: ${cmd}`,
    en: `Unknown shaping command: ${cmd}`,
});

export const USAGE_SHAPING_ACTIVITY: UsageCode = {
    ja: "成型処理が完了しました。",
    en: "Shaping process completed.",
};

export const USAGE_NO_FIRST_PROOFED_BREAD: UsageCode = {
    ja: "一次発酵済みのパンがありません。",
    en: "No first-proofed bread available.",
};
