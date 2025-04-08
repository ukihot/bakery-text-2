import type { UsageCode } from "../../bt.types";

export const USAGE_UNKNOWN_SALESFRONT_COMMAND = (cmd: string): UsageCode => ({
    ja: `不明な販売フロントコマンド: ${cmd}`,
    en: `Unknown sales front command: ${cmd}`,
});

export const USAGE_SALESFRONT_ACTIVITY: UsageCode = {
    ja: "販売フロント処理が完了しました。",
    en: "Sales front process completed.",
};

export const USAGE_NO_PACKAGED_BREAD: UsageCode = {
    ja: "包装済みのパンがありません。",
    en: "No packaged bread available.",
};
