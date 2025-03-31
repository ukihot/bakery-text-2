import type { UsageCode } from "../../bt.types";

export const USAGE_UNKNOWN_PACKAGING_COMMAND = (cmd: string): UsageCode => ({
    ja: `不明な包装コマンド: ${cmd}`,
    en: `Unknown packaging command: ${cmd}`,
});

export const USAGE_PACKAGING_ACTIVITY: UsageCode = {
    ja: "包装処理が完了しました。",
    en: "Packaging process completed.",
};

export const USAGE_NO_BAKED_BREAD: UsageCode = {
    ja: "焼成済みのパンがありません。",
    en: "No baked bread available.",
};
